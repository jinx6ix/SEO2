import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const { plan } = await req.json();

  let priceId = "";
  if (plan === "Free") priceId = process.env.STRIPE_FREE_PRICE_ID!;
  if (plan === "Pro") priceId = process.env.STRIPE_PRO_PRICE_ID!;
  if (plan === "Enterprise") priceId = process.env.STRIPE_ENTERPRISE_PRICE_ID!;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_URL}/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
