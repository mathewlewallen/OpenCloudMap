import "server-only";
import { eq, sql, desc, and, lt, isNull } from "drizzle-orm";
import { getDB } from "@/db";
import { userTable, creditTransactionTable, CREDIT_TRANSACTION_TYPE } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { updateAllSessionsOfUser, KVSession } from "./kv-session";
import { CREDIT_PACKAGES, FREE_MONTHLY_CREDITS } from "@/constants";

export type CreditPackage = typeof CREDIT_PACKAGES[number];

// TODO Update the Readme before merging the credit system

export function getCreditPackage(packageId: string): CreditPackage | undefined {
  return CREDIT_PACKAGES.find((pkg) => pkg.id === packageId);
}

function shouldRefreshCredits(session: KVSession, currentTime: Date): boolean {
  // Check if it's been at least a month since last refresh
  if (!session.user.lastCreditRefreshAt) {
    return true;
  }

  // Check if the month or year has changed since last refresh
  return (
    session.user.lastCreditRefreshAt.getMonth() !== currentTime.getMonth() ||
    session.user.lastCreditRefreshAt.getFullYear() !== currentTime.getFullYear()
  );
}

async function processExpiredCredits(userId: string, currentTime: Date) {
  const db = getDB();
  // Find all expired transactions that haven't been processed
  const expiredTransactions = await db.query.creditTransactionTable.findMany({
    where: and(
      eq(creditTransactionTable.userId, userId),
      lt(creditTransactionTable.expirationDate, currentTime),
      isNull(creditTransactionTable.expirationDateProcessedAt)
    ),
  });

  // Deduct expired credits
  for (const transaction of expiredTransactions) {
    await db.transaction(async (tx) => {
      // Deduct credits from user balance
      await tx
        .update(userTable)
        .set({
          currentCredits: sql`${userTable.currentCredits} - ${transaction.amount}`,
        })
        .where(eq(userTable.id, userId));

      // Mark transaction as processed
      await tx
        .update(creditTransactionTable)
        .set({
          expirationDateProcessedAt: currentTime,
        })
        .where(eq(creditTransactionTable.id, transaction.id));
    });
  }
}

export async function updateUserCredits(userId: string, creditsToAdd: number) {
  const db = getDB();
  await db
    .update(userTable)
    .set({
      currentCredits: sql`${userTable.currentCredits} + ${creditsToAdd}`,
    })
    .where(eq(userTable.id, userId));

  // Update all KV sessions to reflect the new credit balance
  await updateAllSessionsOfUser(userId);
}

async function updateLastRefreshDate(userId: string, date: Date) {
  const db = getDB();
  await db
    .update(userTable)
    .set({
      lastCreditRefreshAt: date,
    })
    .where(eq(userTable.id, userId));
}

export async function logTransaction(
  userId: string,
  amount: number,
  description: string,
  type: keyof typeof CREDIT_TRANSACTION_TYPE,
  expirationDate?: Date
) {
  const db = getDB();
  await db.insert(creditTransactionTable).values({
    id: createId(),
    userId,
    amount,
    type,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    expirationDate,
  });
}

export async function checkAndRefreshCredits(session: KVSession): Promise<number> {
  const currentTime = new Date();

  // Check if it's been at least a month since last refresh
  if (shouldRefreshCredits(session, currentTime)) {
    // Process any expired credits first
    await processExpiredCredits(session.userId, currentTime);

    // Add free monthly credits with 1 month expiration
    const expirationDate = new Date(currentTime);
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    await updateUserCredits(session.userId, FREE_MONTHLY_CREDITS);
    await logTransaction(
      session.userId,
      FREE_MONTHLY_CREDITS,
      'Free monthly credits',
      CREDIT_TRANSACTION_TYPE.MONTHLY_REFRESH,
      expirationDate
    );

    // Update last refresh date
    await updateLastRefreshDate(session.userId, currentTime);

    // Get the updated credit balance from the database
    const db = getDB();
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, session.userId),
      columns: {
        currentCredits: true,
      },
    });

    return user?.currentCredits ?? 0;
  }

  return session.user.currentCredits;
}

export async function hasEnoughCredits({ userId, requiredCredits }: { userId: string; requiredCredits: number }) {
  const user = await getDB().query.userTable.findFirst({
    where: eq(userTable.id, userId),
    columns: {
      currentCredits: true,
    }
  });
  if (!user) return false;

  return user.currentCredits >= requiredCredits;
}

export async function useCredits({ userId, amount, description }: { userId: string; amount: number; description: string }) {
  if (!(await hasEnoughCredits({ userId, requiredCredits: amount }))) {
    throw new Error("Insufficient credits");
  }

  const db = getDB();
  return await db.transaction(async (tx) => {
    // Update user credits
    await tx
      .update(userTable)
      .set({
        currentCredits: sql`${userTable.currentCredits} - ${amount}`,
      })
      .where(eq(userTable.id, userId));

    // Log the transaction
    await tx.insert(creditTransactionTable).values({
      id: createId(),
      userId,
      amount: -amount,
      type: CREDIT_TRANSACTION_TYPE.USAGE,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Get updated credit balance
    const user = await tx.query.userTable.findFirst({
      where: eq(userTable.id, userId),
      columns: {
        currentCredits: true,
      },
    });

    // Update all KV sessions to reflect the new credit balance
    await updateAllSessionsOfUser(userId);

    return user?.currentCredits ?? 0;
  });
}

export async function getCreditTransactions({
  userId,
  page = 1,
  limit = 10
}: {
  userId: string;
  page?: number;
  limit?: number;
}) {
  const db = getDB();
  const transactions = await db.query.creditTransactionTable.findMany({
    where: eq(creditTransactionTable.userId, userId),
    orderBy: [desc(creditTransactionTable.createdAt)],
    limit,
    offset: (page - 1) * limit,
  });

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(creditTransactionTable)
    .where(eq(creditTransactionTable.userId, userId))
    .then((result) => result[0].count);

  return {
    transactions,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      current: page,
    },
  };
}
