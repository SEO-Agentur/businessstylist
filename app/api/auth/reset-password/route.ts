import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { hash } from 'bcryptjs';
import { getSupabaseAdmin } from '@/lib/db/supabase';

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token und Passwort erforderlich' }, { status: 400 });
    }

    if (String(password).length < 6) {
      return NextResponse.json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const tokenHash = hashToken(String(token));

    const { data: row } = await admin
      .from('password_reset_tokens')
      .select('id, user_id, expires_at, used_at')
      .eq('token_hash', tokenHash)
      .maybeSingle();

    if (!row) {
      return NextResponse.json({ error: 'Ungueltiger oder abgelaufener Link' }, { status: 400 });
    }

    if (row.used_at) {
      return NextResponse.json({ error: 'Dieser Link wurde bereits verwendet' }, { status: 400 });
    }

    if (new Date(row.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ error: 'Der Link ist abgelaufen' }, { status: 400 });
    }

    const hashed = await hash(String(password), 12);

    const { error: updateError } = await admin
      .from('users')
      .update({ password: hashed, updated_at: new Date().toISOString() })
      .eq('id', row.user_id);

    if (updateError) {
      console.error('[reset-password] user update failed:', updateError);
      return NextResponse.json({ error: 'Passwort konnte nicht gesetzt werden' }, { status: 500 });
    }

    await admin
      .from('password_reset_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', row.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[reset-password] error:', err);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten' }, { status: 500 });
  }
}
