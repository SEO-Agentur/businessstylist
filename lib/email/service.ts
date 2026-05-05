import nodemailer, { Transporter } from 'nodemailer';
import { getSupabaseAdmin } from '@/lib/db/supabase';

interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  bcc?: string;
  attachments?: EmailAttachment[];
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const secure = (process.env.SMTP_SECURE || 'true').toLowerCase() !== 'false';

  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return cachedTransporter;
}

async function logEmail(
  to: string,
  subject: string,
  status: 'sent' | 'failed',
  errorMessage?: string
) {
  try {
    const admin = getSupabaseAdmin();
    await admin.from('email_log').insert({
      to_address: to,
      subject,
      status,
      provider: 'smtp',
      error_message: errorMessage || null,
    });
  } catch (err) {
    console.error('[email] failed to write email_log:', err);
  }
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const from = process.env.EMAIL_FROM || 'Businessstylist <info@businessstylist.de>';
  const bcc = options.bcc ?? process.env.EMAIL_BCC;
  const transporter = getTransporter();

  if (!transporter) {
    console.error('[email] SMTP not configured, skipping send to', options.to);
    await logEmail(options.to, options.subject, 'failed', 'SMTP not configured');
    return false;
  }

  try {
    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      bcc: bcc || undefined,
      attachments: options.attachments,
    });
    await logEmail(options.to, options.subject, 'sent');
    return true;
  } catch (err: any) {
    console.error('[email] SMTP send error:', err);
    await logEmail(options.to, options.subject, 'failed', err?.message || String(err));
    return false;
  }
}

export function generateWelcomeEmail(
  name: string,
  password: string,
  kibbeType: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
    .content { background: #f9f7f4; padding: 30px; }
    .button { display: inline-block; background: #d4a574; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Willkommen bei Businessstylist</h1>
    </div>
    <div class="content">
      <h2>Hallo ${name || 'liebe Kundin'},</h2>
      <p>Vielen Dank, dass du deine Typenanalyse bei uns gemacht hast!</p>

      <p><strong>Dein Ergebnis: ${kibbeType}</strong></p>

      <p>Wir haben für dich ein Nutzerkonto angelegt. Hier sind deine Zugangsdaten:</p>

      <p>
        <strong>Passwort:</strong> ${password}
      </p>

      <p>Bitte ändere dein Passwort nach der ersten Anmeldung.</p>

      <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/signin" class="button">Jetzt anmelden</a>

      <p>In deinem Account findest du:</p>
      <ul>
        <li>Dein detailliertes Typenanalyse-Ergebnis</li>
        <li>Personalisierte Styling-Empfehlungen</li>
        <li>Zugang zu passenden Lookbooks (optional)</li>
      </ul>

      <p>Bei Fragen sind wir jederzeit für dich da!</p>

      <p>Herzliche Grüße,<br>Dein Businessstylist-Team</p>
    </div>
    <div class="footer">
      <p>Businessstylist | <a href="${process.env.NEXT_PUBLIC_APP_URL}/datenschutz">Datenschutz</a> | <a href="${process.env.NEXT_PUBLIC_APP_URL}/impressum">Impressum</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
