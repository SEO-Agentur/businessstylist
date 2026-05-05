import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { sendEmail } from '@/lib/email/service';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const admin = getSupabaseAdmin();

    const { data: existingUser } = await admin
      .from('users')
      .select('id')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse wird bereits verwendet' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const { data: user, error: insertError } = await admin
      .from('users')
      .insert({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'USER',
      })
      .select('id, name, email')
      .maybeSingle();

    if (insertError || !user) {
      console.error('Signup insert error:', insertError);
      return NextResponse.json(
        { error: insertError?.message || 'Fehler beim Erstellen des Benutzers' },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';
    sendEmail({
      to: user.email,
      subject: 'Willkommen bei Businessstylist',
      html: `<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1a1a1a;">
        <div style="max-width:600px;margin:0 auto;padding:24px;">
          <h1 style="color:#0f1c2d;">Willkommen bei Businessstylist</h1>
          <p>Hallo ${user.name || 'liebe Kundin'},</p>
          <p>Dein Nutzerkonto wurde erfolgreich angelegt. Du kannst Dich jederzeit mit Deiner E-Mail-Adresse und Deinem gewählten Passwort anmelden.</p>
          <p><a href="${appUrl}/auth/signin" style="display:inline-block;background:#0f1c2d;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">Jetzt anmelden</a></p>
          <p>Herzliche Grüße<br>Anika Schmitz – Businessstylist</p>
        </div></body></html>`,
      text: `Willkommen bei Businessstylist\n\nHallo ${user.name || 'liebe Kundin'},\n\nDein Nutzerkonto wurde erfolgreich angelegt. Du kannst Dich unter ${appUrl}/auth/signin anmelden.\n\nHerzliche Grüße\nAnika Schmitz – Businessstylist`,
      replyTo: 'info@businessstylist.de',
    }).catch((err) => console.error('Welcome email failed:', err));

    return NextResponse.json(
      {
        message: 'Registrierung erfolgreich',
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
