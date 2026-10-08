import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get('email') || '').trim().toLowerCase();
    if (!email || !/.+@.+\..+/.test(email)) {
      return NextResponse.json({ exists: false, hasPassword: false });
    }

    const data = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    return NextResponse.json({
      exists: !!data,
      hasPassword: !!data?.password,
    });
  } catch (err) {
    console.error('[check-email] error:', err);
    return NextResponse.json({ exists: false, hasPassword: false });
  }
}
