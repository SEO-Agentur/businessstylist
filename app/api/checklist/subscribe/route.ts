import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';

const CHECKLIST_GROUP_ENV: Record<string, string> = {
  'smart-casual': 'MAILERLITE_GROUP_ID_SMART_CASUAL',
  'business-attire': 'MAILERLITE_GROUP_ID_BUSINESS_ATTIRE',
  'wardrobe-declutter': 'MAILERLITE_GROUP_ID_WARDROBE_DECLUTTER',
};

export async function POST(request: NextRequest) {
  try {
    const { email, checklist } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    const envKey = CHECKLIST_GROUP_ENV[checklist];
    if (!envKey) {
      return NextResponse.json(
        { error: 'Unbekannte Checkliste.' },
        { status: 400 }
      );
    }

    const groupId = process.env[envKey];
    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!groupId || !apiKey) {
      console.error('[checklist] missing config', { envKey, hasApiKey: !!apiKey });
      return NextResponse.json(
        { error: 'Der Versand ist aktuell nicht verfügbar. Bitte versuche es später erneut.' },
        { status: 500 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        groups: [groupId],
        status: 'active',
      }),
    });

    if (!response.ok && response.status !== 422) {
      const text = await response.text();
      console.error('[checklist] MailerLite error', response.status, text.slice(0, 300));
      return NextResponse.json(
        { error: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' },
        { status: 500 }
      );
    }

    try {
      const admin = getSupabaseAdmin();
      await admin.from('newsletter_subscribers').upsert(
        { email: normalizedEmail, source: checklist },
        { onConflict: 'email' }
      );
    } catch (err) {
      console.error('[checklist] supabase persist failed (non-fatal):', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Perfekt! Prüfe dein E-Mail-Postfach – deine Checkliste ist unterwegs.',
    });
  } catch (error: any) {
    console.error('[checklist] error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
