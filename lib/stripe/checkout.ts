import { stripe } from './client';
import { Product } from '@/types';

export async function createCheckoutSession(
  product: Product,
  userId: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!product.stripePriceId) {
    throw new Error('Product does not have a Stripe price ID');
  }

  const session = await stripe.checkout.sessions.create({
    mode: product.type === 'SUBSCRIPTION' ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: product.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      productId: product.id,
      userId: userId,
    },
  });

  return session;
}
