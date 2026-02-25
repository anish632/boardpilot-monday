import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export async function getOrCreateCustomer(accountId: string, email?: string): Promise<string> {
  // Search for existing customer by metadata
  const existingCustomers = await stripe.customers.list({
    limit: 1,
    email: email,
  });

  if (existingCustomers.data.length > 0) {
    const customer = existingCustomers.data[0];
    // Update metadata if needed
    if (!customer.metadata.accountId) {
      await stripe.customers.update(customer.id, {
        metadata: { accountId },
      });
    }
    return customer.id;
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email: email,
    metadata: {
      accountId,
    },
  });

  return customer.id;
}

export async function createCheckoutSession(
  customerId: string,
  accountId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const priceId = process.env.BOARDPILOT_PRICE_ID;
  if (!priceId) {
    throw new Error("BOARDPILOT_PRICE_ID is not set");
  }

  return await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      accountId,
    },
  });
}

export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
