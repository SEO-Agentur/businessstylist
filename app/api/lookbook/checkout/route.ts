import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(request: Request) {
  try {
    const { kibbeType, utmParams = {} } = await request.json() as {
      kibbeType?: string;
      utmParams?: Record<string, string>;
    };

    if (!kibbeType) {
      return NextResponse.json(
        { error: 'Kibbe-Typ ist erforderlich' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'paypal'],
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Lookbook 2026 – ${kibbeType}`,
              description: `Personalisiertes Business-Lookbook mit 2 Outfits für den Kibbe-Typ: ${kibbeType}. Sofortiger PDF-Download.`,
            },
            unit_amount: 2900,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&product=lookbook`,
      cancel_url: `${appUrl}/lookbook`,
      metadata: {
        product: 'lookbook_2026',
        kibbeType,
        pdfVersion: '2026-v1',
        ...(utmParams.utm_source ? { utm_source: utmParams.utm_source } : {}),
        ...(utmParams.utm_medium ? { utm_medium: utmParams.utm_medium } : {}),
        ...(utmParams.utm_campaign ? { utm_campaign: utmParams.utm_campaign } : {}),
        ...(utmParams.utm_content ? { utm_content: utmParams.utm_content } : {}),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Lookbook checkout error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen der Checkout-Session' },
      { status: 500 }
    );
  }
}
