import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';

const CHECKLIST_GROUP_ENV: Record<string, string> = {
  'smart-casual': 'MAILERLITE_GROUP_ID_SMART_CASUAL',
  'business-attire': 'MAILERLITE_GROUP_ID_BUSINESS_ATTIRE',
  'wardrobe-declutter': 'MAILERLITE_GROUP_ID_WARDROBE_DECLUTTER',
};

export async function POST(request: NextRequest) {
  try {
    const { email, checklists } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(checklists) || checklists.length === 0) {
      return NextResponse.json(
        { error: 'Bitte wähle mindestens eine Checkliste aus.' },
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
        groups: groupIds,
        status: 'unconfirmed',
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
        { email: normalizedEmail, source: `checklist:${validSlugs.join(',')}` },
        { onConflict: 'email' }
      );
    } catch (err) {
      console.error('[checklist] supabase persist failed (non-fatal):', err);
    }

    return NextResponse.json({
      success: true,
      message:
        'Perfekt! Wir haben dir eine Bestätigungs-E-Mail gesendet. Bitte bestätige deine Anmeldung, um die Checklisten zu erhalten.',
    });
  } catch (error: any) {
    console.error('[checklist] error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
