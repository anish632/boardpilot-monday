import { NextRequest, NextResponse } from "next/server";
import { createPortalSession } from "@/lib/stripe";
import { getSubscription } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { accountId } = await req.json();

    if (!accountId) {
      return NextResponse.json(
        { error: "Missing accountId" },
        { status: 400 }
      );
    }

    // Get subscription data to find customer ID
    const subscription = getSubscription(accountId);

    if (!subscription.customerId) {
      return NextResponse.json(
        { error: "No customer found for this account" },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://boardpilot.com";
    const returnUrl = `${appUrl}?billing=portal`;

    // Create portal session
    const session = await createPortalSession(subscription.customerId, returnUrl);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
