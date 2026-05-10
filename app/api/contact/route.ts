import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { sendEmail } from '@/lib/email/service';

const RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL || 'info@businessstylist.de';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const subject = (body.subject || '').toString().trim();
    const message = (body.message || '').toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse' }, { status: 400 });
    }
    if (name.length > 200 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Eingabe zu lang' }, { status: 400 });
    }

    const hdrs = headers();
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0].trim() || '';
    const userAgent = hdrs.get('user-agent') || '';

    const { error: dbError } = await getSupabaseAdmin().from('contact_messages').insert({
      name,
      email,
      phone,
      subject,
      message,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (dbError) {
      console.error('[contact] DB insert error:', dbError);
      return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 500 });
    }

    const html = `
      <h2 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif;">Neue Nachricht über das Kontaktformular</h2>
      <table style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; border-collapse: collapse;">
        <tr><td style="padding:6px 12px; color:#64748b;">Name</td><td style="padding:6px 12px;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:6px 12px; color:#64748b;">E-Mail</td><td style="padding:6px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 12px; color:#64748b;">Telefon</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>` : ''}
        <tr><td style="padding:6px 12px; color:#64748b;">Betreff</td><td style="padding:6px 12px;">${escapeHtml(subject) || '-'}</td></tr>
      </table>
      <h3 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin-top:20px;">Nachricht</h3>
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; white-space: pre-wrap; padding:16px; background:#f8fafc; border-left:3px solid #0f1c2d; border-radius:4px;">${escapeHtml(message)}</div>
    `;

    const text = [
      `Neue Kontaktformular-Nachricht`,
      ``,
      `Name:    ${name}`,
      `E-Mail:  ${email}`,
      phone ? `Telefon: ${phone}` : '',
      `Betreff: ${subject || '-'}`,
      ``,
      `Nachricht:`,
      message,
    ].filter(Boolean).join('\n');

    await sendEmail({
      to: RECIPIENT,
      subject: `Kontaktformular: ${subject || 'Neue Nachricht'} – ${name}`,
      html,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error:', err);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
