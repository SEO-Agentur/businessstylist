import { NextResponse } from 'next/server';
import { randomBytes, createHash } from 'crypto';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { sendEmail } from '@/lib/email/service';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const TOKEN_TTL_MS = 60 * 60 * 1000;

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return true;
  bucket.count += 1;
  return false;
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);
    if (rateLimited(`${ip}:${normalizedEmail}`)) {
      return NextResponse.json({ ok: true });
    }

    const admin = getSupabaseAdmin();

    const { data: user } = await admin
      .from('users')
      .select('id, email, name')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const token = randomBytes(32).toString('hex');
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    const { error: insertError } = await admin
      .from('password_reset_tokens')
      .insert({
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
        ip_address: ip,
      });

    if (insertError) {
      console.error('[forgot-password] insert token failed:', insertError);
      return NextResponse.json({ ok: true });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';
    const resetUrl = `${appUrl}/auth/reset-password?token=${token}`;
    const name = user.name || 'liebe Kundin';

    await sendEmail({
      to: user.email,
      subject: 'Passwort zuruecksetzen - Businessstylist',
      html: `<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1a1a1a;">
        <div style="max-width:600px;margin:0 auto;padding:24px;">
          <h1 style="color:#0f1c2d;">Passwort zuruecksetzen</h1>
          <p>Hallo ${name},</p>
          <p>Du hast ein neues Passwort fuer Dein Businessstylist-Konto angefordert.
          Klicke auf den folgenden Link, um ein neues Passwort zu setzen:</p>
          <p><a href="${resetUrl}" style="display:inline-block;background:#0f1c2d;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">Neues Passwort setzen</a></p>
          <p style="color:#666;font-size:14px;">Der Link ist 60 Minuten gueltig. Solltest Du die Anfrage nicht gestellt haben, kannst Du diese E-Mail ignorieren.</p>
          <p>Herzliche Gruesse<br>Anika Schmitz - Businessstylist</p>
        </div></body></html>`,
      text: `Passwort zuruecksetzen\n\nHallo ${name},\n\nDu hast ein neues Passwort angefordert. Oeffne diesen Link innerhalb von 60 Minuten:\n${resetUrl}\n\nSolltest Du die Anfrage nicht gestellt haben, ignoriere diese E-Mail.\n\nAnika Schmitz - Businessstylist`,
      replyTo: 'info@businessstylist.de',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[forgot-password] error:', err);
    return NextResponse.json({ ok: true });
  }
}
