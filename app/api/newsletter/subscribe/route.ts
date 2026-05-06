import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { sendEmail } from '@/lib/email/service';

const LEAD_MAGNETS: Record<string, { url: string; title: string }> = {
  'smart-casual': {
    url: '/smart-casual-checkliste.pdf',
    title: 'Smart Casual Checkliste',
  },
  'dresscode-playbook': {
    url: '/dresscode-playbook.pdf',
    title: 'Dresscode Playbook',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, leadMagnet } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const magnet = leadMagnet ? LEAD_MAGNETS[leadMagnet] : null;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';

    try {
      const admin = getSupabaseAdmin();
      await admin.from('newsletter_subscribers').upsert(
        {
          email: normalizedEmail,
          source: leadMagnet || 'newsletter',
        },
        { onConflict: 'email' }
      );
    } catch (err) {
      console.error('[newsletter] subscriber persist failed (non-fatal):', err);
    }

    if (magnet) {
      const downloadUrl = magnet.url;
      const absoluteDownloadUrl = `${appUrl}${downloadUrl}`;

      sendEmail({
        to: normalizedEmail,
        subject: `Dein Download: ${magnet.title}`,
        html: `<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1a1a1a;">
          <div style="max-width:600px;margin:0 auto;padding:24px;">
            <h1 style="color:#0f1c2d;">Dein Download ist bereit</h1>
            <p>Hallo,</p>
            <p>vielen Dank für Dein Interesse. Hier ist Dein persönlicher Download der <strong>${magnet.title}</strong>:</p>
            <p><a href="${absoluteDownloadUrl}" style="display:inline-block;background:#0f1c2d;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">${magnet.title} herunterladen</a></p>
            <p>Der Download startet automatisch, sobald Du auf den Button klickst. Alternativ kannst Du diesen Link in Deinem Browser öffnen:<br><a href="${absoluteDownloadUrl}">${absoluteDownloadUrl}</a></p>
            <p>Herzliche Grüße<br>Anika Schmitz – Businessstylist</p>
          </div></body></html>`,
        text: `Dein Download ist bereit\n\n${magnet.title}:\n${absoluteDownloadUrl}\n\nHerzliche Grüße\nAnika Schmitz – Businessstylist`,
        replyTo: 'info@businessstylist.de',
      }).catch((err) => console.error('[newsletter] email failed:', err));

      return NextResponse.json({
        success: true,
        message: 'Dein Download startet. Wir haben dir den Link zusätzlich per E-Mail geschickt.',
        downloadUrl,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Erfolgreich angemeldet!',
      downloadUrl: null,
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
