import { NextRequest, NextResponse } from "next/server";
import { getSubscription } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json(
        { error: "Missing accountId parameter" },
        { status: 400 }
      );
    }

    const subscription = getSubscription(accountId);

    return NextResponse.json({
      tier: subscription.tier,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
    });
  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json(
      { error: "Failed to check subscription" },
      { status: 500 }
    );
  }
}
