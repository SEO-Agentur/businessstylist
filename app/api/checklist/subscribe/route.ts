import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';

const CHECKLIST_GROUP_ENV: Record<string, string> = {
  'smart-casual': 'MAILERLITE_GROUP_ID_SMART_CASUAL',
  'business-attire': 'MAILERLITE_GROUP_ID_BUSINESS_ATTIRE',
  'wardrobe-declutter': 'MAILERLITE_GROUP_ID_WARDROBE_DECLUTTER',
};

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function subscribeToMailerLite(
  apiKey: string,
  email: string,
  groupIds: string[]
): Promise<{ ok: boolean; status: number; bodyPreview: string; networkError?: string }> {
  const payload = JSON.stringify({
    email,
    groups: groupIds,
    status: 'unconfirmed',
  });

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(
        'https://connect.mailerlite.com/api/subscribers',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: payload,
        },
        10000
      );
      const text = await res.text().catch(() => '');
      return { ok: res.ok || res.status === 422, status: res.status, bodyPreview: text.slice(0, 300) };
    } catch (err: any) {
      const msg = err?.message || String(err);
      console.error(`[checklist] MailerLite fetch attempt ${attempt} failed:`, msg);
      if (attempt === 2) {
        return { ok: false, status: 0, bodyPreview: '', networkError: msg };
      }
    }
  }
  return { ok: false, status: 0, bodyPreview: '', networkError: 'unreachable' };
}

export async function POST(request: NextRequest) {
  try {
    const { email, checklists } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte gib eine gueltige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(checklists) || checklists.length === 0) {
      return NextResponse.json(
        { error: 'Bitte waehle mindestens eine Checkliste aus.' },
        { status: 400 }
      );
    }

    const groupIds: string[] = [];
    const validSlugs: string[] = [];
    for (const slug of checklists) {
      const envKey = CHECKLIST_GROUP_ENV[slug];
      if (!envKey) continue;
      const id = process.env[envKey];
      if (id) {
        groupIds.push(id);
        validSlugs.push(slug);
      }
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey || groupIds.length === 0) {
      console.error('[checklist] missing config', { hasApiKey: !!apiKey, groups: groupIds.length });
      return NextResponse.json(
        { error: 'Der Versand ist aktuell nicht verfuegbar. Bitte versuche es spaeter erneut.' },
        { status: 500 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const admin = getSupabaseAdmin();
      await admin.from('newsletter_subscribers').upsert(
        { email: normalizedEmail, source: `checklist:${validSlugs.join(',')}` },
        { onConflict: 'email' }
      );
    } catch (err) {
      console.error('[checklist] supabase persist failed (non-fatal):', err);
    }

    const result = await subscribeToMailerLite(apiKey, normalizedEmail, groupIds);

    if (!result.ok) {
      console.error('[checklist] MailerLite failed', {
        status: result.status,
        body: result.bodyPreview,
        networkError: result.networkError,
      });
      return NextResponse.json(
        { error: 'Anmeldung konnte gerade nicht uebermittelt werden. Bitte versuche es in wenigen Minuten erneut.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        'Perfekt! Wir haben dir eine Bestaetigungs-E-Mail gesendet. Bitte bestaetige deine Anmeldung, um die Checklisten zu erhalten.',
    });
  } catch (error: any) {
    console.error('[checklist] unhandled error:', error?.message || error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
