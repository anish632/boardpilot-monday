import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { setSubscription, updateSubscription } from "@/lib/storage";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const accountId = session.metadata?.accountId;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (accountId) {
          setSubscription(accountId, {
            tier: "pro",
            status: "active",
            customerId,
            subscriptionId,
          });
          console.log(`✅ Subscription created for account ${accountId}`);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find account by customer ID
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const accountId = customer.metadata?.accountId;
        if (!accountId) break;

        const status = subscription.status;
        const tier = status === "active" || status === "trialing" ? "pro" : "free";

        updateSubscription(accountId, {
          tier,
          status: status as any,
          subscriptionId: subscription.id,
          customerId,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        });

        console.log(`✅ Subscription updated for account ${accountId}: ${tier}/${status}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const accountId = customer.metadata?.accountId;
        if (!accountId) break;

        updateSubscription(accountId, {
          tier: "free",
          status: "canceled",
        });

        console.log(`❌ Subscription canceled for account ${accountId}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const accountId = customer.metadata?.accountId;
        if (!accountId) break;

        updateSubscription(accountId, {
          status: "past_due",
        });

        console.log(`⚠️ Payment failed for account ${accountId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
