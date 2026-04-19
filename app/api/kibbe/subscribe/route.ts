import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createHash } from 'crypto';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import {
  subscribeToKibbeFunnel,
  isValidKibbeType,
  KIBBE_TYPE_DISPLAY_MAP,
} from '@/lib/mailerlite/client';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const PRIVACY_POLICY_VERSION = '2026-04';

function hashValue(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function getClientIp(headersList: ReturnType<typeof headers>): string {
  return (
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'
  );
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const headersList = headers();
  const ip = getClientIp(headersList);
  const userAgent = headersList.get('user-agent') || '';

  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { status: 'error', message: 'Zu viele Anfragen. Bitte versuche es in einer Stunde erneut.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: 'error', message: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const { firstName, email, kibbeType, consentAccepted } = body as {
    firstName?: string;
    email?: string;
    kibbeType?: string;
    consentAccepted?: boolean;
  };

  if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2 || firstName.trim().length > 100) {
    return NextResponse.json(
      { status: 'error', message: 'Vorname muss mindestens 2 Zeichen haben.' },
      { status: 400 }
    );
  }

  if (!email || !validateEmail(email)) {
    return NextResponse.json(
      { status: 'error', message: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
      { status: 400 }
    );
  }

  if (!kibbeType || !isValidKibbeType(kibbeType)) {
    return NextResponse.json(
      { status: 'error', message: 'Ungültiger Kibbe-Typ.' },
      { status: 400 }
    );
  }

  if (!consentAccepted) {
    return NextResponse.json(
      { status: 'error', message: 'Zustimmung zur Datenschutzerklärung ist erforderlich.' },
      { status: 400 }
    );
  }

  const emailNormalized = email.toLowerCase().trim();
  const emailHash = hashValue(emailNormalized);
  const ipHash = hashValue(ip);
  const kibbeTypeDisplay = KIBBE_TYPE_DISPLAY_MAP[kibbeType];
  const isDev = process.env.NODE_ENV !== 'production';

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Kibbe subscribe config error:', errorMessage);
    return NextResponse.json(
      {
        status: 'error',
        message: isDev
          ? `Server-Konfigurationsfehler: ${errorMessage}`
          : 'Etwas ist schiefgelaufen. Bitte versuche es in wenigen Minuten erneut.',
      },
      { status: 500 }
    );
  }

  const consentInsert = await supabaseAdmin.from('consent_logs').insert({
    email_hash: emailHash,
    ip_hash: ipHash,
    user_agent: userAgent.slice(0, 500),
    privacy_policy_version: PRIVACY_POLICY_VERSION,
    consent_type: 'kibbe_funnel_newsletter',
  });

  if (consentInsert.error) {
    console.error('Kibbe consent_logs insert error:', consentInsert.error.message);
  }

  try {
    const result = await subscribeToKibbeFunnel({
      email: emailNormalized,
      firstName: firstName.trim(),
      kibbeType,
      kibbeTypeDisplay,
    });

    if (result.alreadySubscribed) {
      return NextResponse.json({ status: 'already_subscribed' });
    }

    const subscriberInsert = await supabaseAdmin.from('kibbe_subscribers').insert({
      email: emailNormalized,
      first_name: firstName.trim(),
      kibbe_type: kibbeType,
      kibbe_type_display: kibbeTypeDisplay,
      mailerlite_subscriber_id: result.subscriberId || null,
      status: 'pending_doi',
    });

    if (subscriberInsert.error) {
      console.error('Kibbe subscribers insert error:', subscriberInsert.error.message);
    }

    return NextResponse.json({ status: 'ok', message: 'check_email' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Kibbe subscribe error:', errorMessage);

    await supabaseAdmin.from('kibbe_subscribers').insert({
      email: emailNormalized,
      first_name: firstName.trim(),
      kibbe_type: kibbeType,
      kibbe_type_display: kibbeTypeDisplay,
      status: 'error',
      error_message: errorMessage.slice(0, 500),
    });

    return NextResponse.json(
      {
        status: 'error',
        message: isDev
          ? `Fehler: ${errorMessage}`
          : 'Etwas ist schiefgelaufen. Bitte versuche es in wenigen Minuten erneut.',
      },
      { status: 500 }
    );
  }
}
