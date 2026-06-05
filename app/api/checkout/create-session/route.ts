import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { stripe } from '@/lib/stripe/client';
import { supabase, getSupabaseAdmin } from '@/lib/db/supabase';
import { compare, hash } from 'bcryptjs';
import { randomBytes, createHash } from 'crypto';

interface DiscountRow {
  code: string;
  discount_type: string;
  discount_value_cents: number;
  discount_percent: number;
  applies_to_product_ids: string[];
  active: boolean;
  valid_from: string | null;
  valid_until: string | null;
  max_redemptions: number | null;
  redemptions: number;
}

async function resolveDiscount(code: string | null | undefined): Promise<DiscountRow | null> {
  if (!code) return null;
  const { data } = await supabase
    .from('discount_codes')
    .select('code, discount_type, discount_value_cents, discount_percent, applies_to_product_ids, active, valid_from, valid_until, max_redemptions, redemptions')
    .ilike('code', code.trim())
    .maybeSingle();
  if (!data) return null;

  const now = Date.now();
  if (!data.active) return null;
  if (data.valid_from && new Date(data.valid_from).getTime() > now) return null;
  if (data.valid_until && new Date(data.valid_until).getTime() < now) return null;
  if (data.max_redemptions !== null && data.redemptions >= data.max_redemptions) return null;

  return data as DiscountRow;
}

function computeDiscountEuros(
  items: Array<{ id: string; price: number; quantity: number }>,
  discount: DiscountRow
): number {
  const applicable = discount.applies_to_product_ids.length === 0
    ? items
    : items.filter((i) => discount.applies_to_product_ids.includes(i.id));
  const applicableTotal = applicable.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (applicableTotal <= 0) return 0;
  if (discount.discount_type === 'fixed') {
    return Math.min(applicableTotal, discount.discount_value_cents / 100);
  }
  return Math.round(applicableTotal * (Number(discount.discount_percent) / 100) * 100) / 100;
}

export async function POST(request: Request) {
  try {
    let session: Session | null = null;
    try {
      session = await getServerSession(authOptions);
    } catch (e) {
      console.warn('[checkout] getServerSession failed (non-fatal):', (e as Error).message);
    }

    const { items, customerInfo, discountCode, authAction, authPassword } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Keine Artikel im Warenkorb' },
        { status: 400 }
      );
    }

    if (!customerInfo?.email) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(customerInfo.email).trim().toLowerCase();
    let admin: ReturnType<typeof getSupabaseAdmin> | null = null;
    try {
      admin = getSupabaseAdmin();
    } catch (e) {
      console.warn('[checkout] getSupabaseAdmin failed (non-fatal):', (e as Error).message);
    }
    let checkoutUserId: string | null = session?.user?.id || null;

    if (!checkoutUserId && admin) {
      try {
        const { data: existingUser } = await admin
          .from('users')
          .select('id, password')
          .ilike('email', normalizedEmail)
          .maybeSingle();

        if (existingUser) {
          if (existingUser.password) {
            if (authAction === 'login') {
              if (!authPassword) {
                return NextResponse.json({ error: 'Passwort erforderlich', code: 'password_required' }, { status: 400 });
              }
              const ok = await compare(String(authPassword), existingUser.password);
              if (!ok) {
                return NextResponse.json({ error: 'Ungueltige Anmeldedaten', code: 'invalid_password' }, { status: 400 });
              }
              checkoutUserId = existingUser.id;
            } else {
              return NextResponse.json(
                { error: 'Fuer diese E-Mail existiert bereits ein Konto. Bitte melde Dich an.', code: 'password_required' },
                { status: 400 }
              );
            }
          } else {
            if (authAction === 'set_password' && authPassword) {
              if (String(authPassword).length < 6) {
                return NextResponse.json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' }, { status: 400 });
              }
              const hashed = await hash(String(authPassword), 12);
              await admin
                .from('users')
                .update({ password: hashed, updated_at: new Date().toISOString() })
                .eq('id', existingUser.id);
            }
            checkoutUserId = existingUser.id;
          }
        } else {
          const newRow: Record<string, unknown> = {
            email: normalizedEmail,
            name: customerInfo.name || '',
            phone: customerInfo.phone || null,
            role: 'USER',
          };
          if (authAction === 'set_password' && authPassword) {
            if (String(authPassword).length < 6) {
              return NextResponse.json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' }, { status: 400 });
            }
            newRow.password = await hash(String(authPassword), 12);
          }
          const { data: createdUser, error: createErr } = await admin
            .from('users')
            .insert(newRow)
            .select('id')
            .maybeSingle();
          if (createErr) {
            console.error('[checkout] user create failed:', createErr);
          } else if (createdUser) {
            checkoutUserId = createdUser.id;
          }
        }
      } catch (e) {
        console.warn('[checkout] user lookup/create failed (non-fatal):', (e as Error).message);
      }
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.type,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const discountRow = await resolveDiscount(discountCode).catch((e) => {
      console.error('resolveDiscount failed:', e);
      return null;
    });
    let discountsParam: { coupon: string }[] | undefined;
    let discountAmountEuros = 0;

    if (discountRow) {
      discountAmountEuros = computeDiscountEuros(items, discountRow);
      if (discountAmountEuros > 0) {
        try {
          const coupon = await stripe.coupons.create({
            name: `Code ${discountRow.code}`,
            amount_off: Math.round(discountAmountEuros * 100),
            currency: 'eur',
            duration: 'once',
            max_redemptions: 1,
          });
          discountsParam = [{ coupon: coupon.id }];
        } catch (e) {
          console.error('Stripe coupon create failed, continuing without discount:', e);
          discountAmountEuros = 0;
        }
      }
    }

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://businessstylist.de';

    let loginToken: string | null = null;
    if (checkoutUserId && !session?.user?.id && admin) {
      loginToken = randomBytes(32).toString('hex');
      const tokenHash = createHash('sha256').update(loginToken).digest('hex');
      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
      const { error: tokenErr } = await admin.from('auth_login_tokens').insert({
        user_id: checkoutUserId,
        token_hash: tokenHash,
        expires_at: expiresAt,
      });
      if (tokenErr) {
        console.error('[checkout] login token insert failed:', tokenErr);
        loginToken = null;
      }
    }

    const successUrl = loginToken
      ? `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&login_token=${loginToken}`
      : `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'paypal'],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: `${origin}/checkout`,
      customer_email: customerInfo.email,
      invoice_creation: { enabled: true },
      ...(checkoutUserId ? { client_reference_id: checkoutUserId } : {}),
      ...(discountsParam
        ? { discounts: discountsParam }
        : { allow_promotion_codes: true }),
      metadata: {
        ...(checkoutUserId ? { userId: checkoutUserId } : {}),
        customerName: customerInfo.name || '',
        customerPhone: customerInfo.phone || '',
        customerAddress: customerInfo.address || '',
        customerCity: customerInfo.city || '',
        customerPostalCode: customerInfo.postalCode || '',
        notes: customerInfo.notes || '',
        ...(discountRow && discountAmountEuros > 0
          ? { discountCode: discountRow.code, discountAmountCents: String(Math.round(discountAmountEuros * 100)) }
          : {}),
      },
    });

    if (discountRow && discountAmountEuros > 0) {
      const { error: redemptionError } = await supabase
        .from('discount_codes')
        .update({ redemptions: discountRow.redemptions + 1 })
        .ilike('code', discountRow.code);
      if (redemptionError) {
        console.error('discount redemption update failed:', redemptionError);
      }
    }

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    const message =
      error?.raw?.message ||
      error?.message ||
      'Fehler beim Erstellen der Checkout-Session';
    return NextResponse.json(
      { error: `Fehler beim Erstellen der Checkout-Session: ${message}` },
      { status: 500 }
    );
  }
}
