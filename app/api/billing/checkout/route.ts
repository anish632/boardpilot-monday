import { NextRequest, NextResponse } from "next/server";
import { getOrCreateCustomer, createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { accountId, email } = await req.json();

    if (!accountId) {
      return NextResponse.json(
        { error: "Missing accountId" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://boardpilot.com";
    const successUrl = `${appUrl}?billing=success`;
    const cancelUrl = `${appUrl}?billing=cancel`;

    // Get or create Stripe customer
    const customerId = await getOrCreateCustomer(accountId, email);

    // Create checkout session
    const session = await createCheckoutSession(
      customerId,
      accountId,
      successUrl,
      cancelUrl
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
