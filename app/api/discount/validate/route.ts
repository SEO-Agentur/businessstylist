import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'Kein Code angegeben' }, { status: 400 });
    }

    const normalized = code.trim().toUpperCase();

    const { data, error } = await supabase
      .from('discount_codes')
      .select('code, description, discount_type, discount_value_cents, discount_percent, applies_to_product_ids, active, valid_from, valid_until, max_redemptions, redemptions')
      .ilike('code', normalized)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ valid: false, error: 'Code ungültig' }, { status: 200 });
    }

    const now = Date.now();
    if (!data.active) return NextResponse.json({ valid: false, error: 'Code nicht aktiv' });
    if (data.valid_from && new Date(data.valid_from).getTime() > now) {
      return NextResponse.json({ valid: false, error: 'Code noch nicht gültig' });
    }
    if (data.valid_until && new Date(data.valid_until).getTime() < now) {
      return NextResponse.json({ valid: false, error: 'Code abgelaufen' });
    }
    if (data.max_redemptions !== null && data.redemptions >= data.max_redemptions) {
      return NextResponse.json({ valid: false, error: 'Code aufgebraucht' });
    }

    return NextResponse.json({
      valid: true,
      code: data.code,
      description: data.description,
      discountType: data.discount_type,
      discountValueCents: data.discount_value_cents,
      discountPercent: Number(data.discount_percent),
      appliesToProductIds: data.applies_to_product_ids || [],
    });
  } catch {
    return NextResponse.json({ valid: false, error: 'Fehler' }, { status: 500 });
  }
}
