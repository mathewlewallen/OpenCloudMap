'use server';

import { requireVerifiedEmail } from "@/utils/auth";
import {
  getCreditTransactions,
  updateUserCredits,
  logTransaction,
  getCreditPackage,
} from "@/utils/credits";
import { CREDIT_TRANSACTION_TYPE } from "@/db/schema";
import { getStripe } from "@/lib/stripe";
import { MAX_TRANSACTIONS_PER_PAGE } from "@/constants";

// Action types
type GetTransactionsInput = {
  page: number;
  limit?: number;
};

type PurchaseCreditsInput = {
  packageId: string;
  paymentMethodId: string;
};

// TODO This should happen directly in the server side component page
export async function getTransactions({ page, limit = MAX_TRANSACTIONS_PER_PAGE }: GetTransactionsInput) {
  if (page < 1 || limit < 1) {
    throw new Error("Invalid page or limit");
  }

  if (limit > MAX_TRANSACTIONS_PER_PAGE) {
    throw new Error(`Limit cannot be greater than ${MAX_TRANSACTIONS_PER_PAGE}`);
  }

  if (!limit) {
    limit = MAX_TRANSACTIONS_PER_PAGE;
  }

  const session = await requireVerifiedEmail();

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

export async function purchaseCredits({ packageId, paymentMethodId }: PurchaseCreditsInput) {
  const session = await requireVerifiedEmail();
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
