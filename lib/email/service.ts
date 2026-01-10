// Email Service Adapter
// This is a stub implementation that logs to console
// Replace with actual email service (Resend, SendGrid, etc.) via environment variables

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Email would be sent:');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('HTML:', options.html);
    console.log('---');
    return true;
  }

  // Production: Check for email service configuration
  const emailService = process.env.EMAIL_SERVICE; // 'resend', 'sendgrid', etc.

  if (!emailService) {
    console.warn('No EMAIL_SERVICE configured. Email not sent.');
    return false;
  }

  // TODO: Implement actual email service integration
  // Example for Resend:
  // if (emailService === 'resend') {
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: process.env.EMAIL_FROM!,
  //     to: options.to,
  //     subject: options.subject,
  //     html: options.html,
  //   });
  // }

  return false;
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
