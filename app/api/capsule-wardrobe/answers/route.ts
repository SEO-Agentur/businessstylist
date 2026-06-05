import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
    const { session_id, answers } = await request.json();

    if (!session_id || typeof session_id !== 'string') {
      return NextResponse.json({ error: 'Session-ID fehlt.' }, { status: 400 });
    }
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Fragebogen-Daten fehlen.' }, { status: 400 });
    }

    const admin = getSupabaseAdmin();

    const { data: order } = await admin
      .from('capsule_wardrobe_orders')
      .select('id, status')
      .eq('stripe_session_id', session_id)
      .maybeSingle();

    if (!order) {
      return NextResponse.json({ error: 'Bestellung nicht gefunden.' }, { status: 404 });
    }

    if (order.status === 'questionnaire_completed') {
      return NextResponse.json({ error: 'Fragebogen wurde bereits ausgefuellt.' }, { status: 409 });
    }

    const { error: updateErr } = await admin
      .from('capsule_wardrobe_orders')
      .update({
        answers,
        status: 'questionnaire_completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    if (updateErr) {
      console.error('[capsule] answers update failed:', updateErr);
      return NextResponse.json({ error: 'Speichern fehlgeschlagen.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[capsule] answers error:', error);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten.' }, { status: 500 });
  }
}
