import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'Kein Code angegeben' }, { status: 400 });
    }

    const normalized = code.trim().toUpperCase();

    const data = await prisma.discountCode.findUnique({
      where: { code: normalized },
    });

    if (!data) {
      return NextResponse.json({ valid: false, error: 'Code ungültig' }, { status: 200 });
    }

    const now = Date.now();
    if (!data.active) return NextResponse.json({ valid: false, error: 'Code nicht aktiv' });
    if (data.validFrom && new Date(data.validFrom).getTime() > now) {
      return NextResponse.json({ valid: false, error: 'Code noch nicht gültig' });
    }
    if (data.validUntil && new Date(data.validUntil).getTime() < now) {
      return NextResponse.json({ valid: false, error: 'Code abgelaufen' });
    }
    if (data.maxRedemptions !== null && data.redemptions >= data.maxRedemptions) {
      return NextResponse.json({ valid: false, error: 'Code aufgebraucht' });
    }

    return NextResponse.json({
      valid: true,
      code: data.code,
      description: data.description,
      discountType: data.discountType,
      discountValueCents: data.discountValueCents,
      discountPercent: Number(data.discountPercent),
      appliesToProductIds: data.appliesToProductIds || [],
    });
  } catch {
    return NextResponse.json({ valid: false, error: 'Fehler' }, { status: 500 });
  }
}
