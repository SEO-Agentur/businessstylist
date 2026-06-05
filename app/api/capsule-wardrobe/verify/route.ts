import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const { data: order } = await supabase
    .from('capsule_wardrobe_orders')
    .select('id, name, email, status')
    .eq('stripe_session_id', sessionId)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  if (order.status === 'questionnaire_completed') {
    return NextResponse.json({ valid: false, reason: 'already_completed' });
  }

  return NextResponse.json({
    valid: true,
    name: order.name,
    email: order.email,
  });
}
