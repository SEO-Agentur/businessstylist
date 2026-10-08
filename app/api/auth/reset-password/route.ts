import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

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

    const tokenHash = hashToken(String(token));
    const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

    if (!row) {
      return NextResponse.json({ error: 'Ungueltiger oder abgelaufener Link' }, { status: 400 });
    }

    if (row.usedAt) {
      return NextResponse.json({ error: 'Dieser Link wurde bereits verwendet' }, { status: 400 });
    }

    if (row.expiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Der Link ist abgelaufen' }, { status: 400 });
    }

    const hashed = await hash(String(password), 12);

    try {
      await prisma.user.update({ where: { id: row.userId }, data: { password: hashed } });
      await prisma.passwordResetToken.update({ where: { id: row.id }, data: { usedAt: new Date() } });
    } catch (updateError) {
      console.error('[reset-password] user update failed:', updateError);
      return NextResponse.json({ error: 'Passwort konnte nicht gesetzt werden' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[reset-password] error:', err);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten' }, { status: 500 });
  }
}
