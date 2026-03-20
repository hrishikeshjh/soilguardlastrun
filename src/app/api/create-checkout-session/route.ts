import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia', // Latest Stripe API version format
});

export async function POST(req: Request) {
  try {
    const { items, customerEmail } = await req.json();

    // Map your cart items cleanly into the strict format Stripe requires
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'inr', // Force INR
        product_data: {
          name: item.name,
          images: [item.img],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects the lowest currency denominator (paise)
      },
      quantity: item.quantity,
    }));

    // Generate the incredibly secure Stripe Checkout URL session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail || undefined,
      success_url: `${process.env.NEXTAUTH_URL}/checkout?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Session Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
