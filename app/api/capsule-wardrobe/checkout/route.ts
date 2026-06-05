import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { getSupabaseAdmin } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, name, answers } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Bitte gib eine gueltige E-Mail-Adresse ein.' }, { status: 400 });
    }
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Bitte gib deinen Namen ein.' }, { status: 400 });
    }
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Fragebogen-Daten fehlen.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = getSupabaseAdmin();

    const { data: order, error: insertErr } = await admin
      .from('capsule_wardrobe_orders')
      .insert({
        email: normalizedEmail,
        name: name.trim(),
        answers,
        status: 'pending',
      })
      .select('id')
      .single();

    if (insertErr) {
      console.error('[capsule] insert failed:', insertErr);
      return NextResponse.json({ error: 'Bestellung konnte nicht erstellt werden.' }, { status: 500 });
    }

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://businessstylist.de';

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'paypal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Capsule Wardrobe Plan',
              description: 'Individueller Capsule-Wardrobe-Plan von Stylistin Anika',
            },
            unit_amount: 7900,
          },
          quantity: 1,
        },
      ],
      customer_email: normalizedEmail,
      success_url: `${origin}/capsule-wardrobe/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/capsule-wardrobe`,
      metadata: {
        orderId: order.id,
        productType: 'capsule-wardrobe',
        customerName: name.trim(),
        customerEmail: normalizedEmail,
      },
    });

    await admin
      .from('capsule_wardrobe_orders')
      .update({ stripe_session_id: checkoutSession.id })
      .eq('id', order.id);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('[capsule] checkout error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
