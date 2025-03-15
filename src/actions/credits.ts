'use server';

import { getSessionFromCookie } from "@/utils/auth";
import {
  getCreditTransactions,
  updateUserCredits,
  logTransaction,
  getCreditPackage,
} from "@/utils/credits";
import { CREDIT_TRANSACTION_TYPE } from "@/db/schema";
import { getStripe } from "@/lib/stripe";

// Action types
type GetTransactionsInput = {
  page: number;
  limit: number;
};

type PurchaseCreditsInput = {
  packageId: string;
  paymentMethodId: string;
};

// TODO This should happen directly in the server side component page
export async function getTransactions({ page, limit }: GetTransactionsInput) {
  const session = await getSessionFromCookie();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const result = await getCreditTransactions({
    userId: session.user.id,
    page,
    limit,
  });

  return {
    transactions: result.transactions,
    pagination: {
      total: result.pagination.total,
      pages: result.pagination.pages,
      current: result.pagination.current,
    }
  };
}

// TODO This should happen directly in the server side component page
export async function purchaseCredits({ packageId, paymentMethodId }: PurchaseCreditsInput) {
  const session = await getSessionFromCookie();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const creditPackage = getCreditPackage(packageId);
    if (!creditPackage) {
      throw new Error("Invalid package");
    }

    // Create Stripe payment intent
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: creditPackage.price * 100,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      // Add credits and log transaction
      await updateUserCredits(session.user.id, creditPackage.credits);
      await logTransaction(
        session.user.id,
        creditPackage.credits,
        `Purchased ${creditPackage.credits} credits`,
        CREDIT_TRANSACTION_TYPE.PURCHASE
      );

      return { success: true };
    }

    throw new Error("Payment failed");
  } catch (error) {
    console.error("Purchase error:", error);
    throw new Error("Failed to process payment");
  }
}
