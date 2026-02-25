export type SubscriptionTier = "free" | "pro";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "incomplete";

export interface SubscriptionData {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  subscriptionId?: string;
  customerId?: string;
  cancelAtPeriodEnd?: boolean;
}

// In-memory storage for subscriptions
// In production, replace with database
const subscriptions = new Map<string, SubscriptionData>();

export function getSubscription(accountId: string): SubscriptionData {
  return subscriptions.get(accountId) || {
    tier: "free",
    status: "active",
  };
}

export function setSubscription(accountId: string, data: SubscriptionData): void {
  subscriptions.set(accountId, data);
}

export function deleteSubscription(accountId: string): void {
  subscriptions.delete(accountId);
}

export function updateSubscription(
  accountId: string,
  updates: Partial<SubscriptionData>
): void {
  const current = getSubscription(accountId);
  subscriptions.set(accountId, { ...current, ...updates });
}

// Debug helper
export function getAllSubscriptions(): Map<string, SubscriptionData> {
  return new Map(subscriptions);
}
