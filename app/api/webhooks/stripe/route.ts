import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe/client';
import { getSupabaseAdmin } from '@/lib/db/supabase';
const supabase = getSupabaseAdmin();
import { updateSubscriberField } from '@/lib/mailerlite/client';
import { sendEmail } from '@/lib/email/service';
import { renderInvoiceEmail } from '@/lib/email/invoice';
import Stripe from 'stripe';

async function generateInvoiceNumber(): Promise<string> {
  const { data, error } = await supabase.rpc('next_invoice_number');
  if (!error && typeof data === 'string') {
    return data;
  }
  console.error('[webhook] next_invoice_number rpc failed, using fallback', error);
  return `R-${new Date().getFullYear()}-${Math.floor(Date.now() / 1000)}`;
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    console.warn('[webhook] No customer email on session', session.id);
    return;
  }

  const { data: existing } = await supabase
    .from('invoices')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle();

  if (existing) {
    return;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
  const firstItem = lineItems.data[0];
  const productName = firstItem?.description || 'Businessstylist Bestellung';
  const productDescription = session.metadata?.kibbeType
    ? `Kibbe-Typ: ${session.metadata.kibbeType}`
    : (session.metadata?.notes || '');

  const amountCents = session.amount_total ?? firstItem?.amount_total ?? 0;
  const currency = (session.currency || 'eur').toLowerCase();

  const customerName =
    session.customer_details?.name ||
    session.metadata?.customerName ||
    '';

  const invoiceNumber = await generateInvoiceNumber();
  const createdAt = new Date();

  const { error: insertError } = await supabase.from('invoices').insert({
    invoice_number: invoiceNumber,
    email,
    customer_name: customerName,
    product_name: productName,
    product_description: productDescription,
    amount_cents: amountCents,
    currency,
    tax_rate: 19,
    stripe_session_id: session.id,
    stripe_payment_intent_id: (session.payment_intent as string) || null,
    metadata: session.metadata || {},
  });

  if (insertError) {
    console.error('[webhook] Failed to insert invoice:', insertError);
    return;
  }

  const { subject, html, text } = renderInvoiceEmail({
    invoiceNumber,
    customerName,
    email,
    productName,
    productDescription,
    amountCents,
    currency,
    taxRate: 19,
    createdAt,
  });

  const sent = await sendEmail({
    to: email,
    subject,
    html,
    text,
    replyTo: 'kontakt@businessstylist.de',
  });

  if (sent) {
    await supabase
      .from('invoices')
      .update({ sent_at: new Date().toISOString() })
      .eq('invoice_number', invoiceNumber);
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email || session.customer_email || null;

        const { error: upsertError } = await supabase
          .from('orders')
          .upsert(
            {
              stripe_checkout_session_id: session.id,
              stripe_payment_intent_id: (session.payment_intent as string) || null,
              email: customerEmail,
              user_id: session.client_reference_id || null,
              product_id: session.metadata?.product || null,
              amount: ((session.amount_total ?? 0) / 100),
              currency: (session.currency || 'eur').toLowerCase(),
              status: 'COMPLETED',
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'stripe_checkout_session_id' }
          );
        if (upsertError) {
          console.error('[webhook] orders upsert failed:', upsertError);
        }

        if (session.metadata?.product === 'lookbook_2026') {
          const customerEmail = session.customer_details?.email || session.customer_email;
          if (customerEmail) {
            try {
              await updateSubscriberField(
                customerEmail,
                { bought_lookbook: true }
              );
            } catch (err) {
              console.error('MailerLite lookbook update error:', err);
            }
          }
        }

        try {
          await handleSuccessfulCheckout(session);
        } catch (err) {
          console.error('[webhook] Invoice/email error:', err);
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;

        await supabase
          .from('orders')
          .update({
            status: 'FAILED',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_checkout_session_id', session.id);

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        await supabase
          .from('orders')
          .update({
            status: 'FAILED',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
