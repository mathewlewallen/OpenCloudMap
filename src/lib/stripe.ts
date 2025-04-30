import "server-only";
import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (stripeInstance) {
    return stripeInstance;
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }

  stripeInstance = new Stripe(stripeSecretKey, {
    apiVersion: "2025-03-31.basil",
    typescript: true,
    httpClient: Stripe.createFetchHttpClient()
  });

  return stripeInstance;
}
