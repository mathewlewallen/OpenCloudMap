# Credit-Based Billing System Implementation Plan

## Overview
This document outlines the implementation plan for a credit-based billing system integrated with Stripe. The system will manage user credits, handle monthly credit allocations with expiration tracking, and provide billing functionality.

## 1. Database Schema Changes

### User Table Additions:
Add the following fields to the existing user table:
```typescript
currentCredits: integer().default(0).notNull(),
lastCreditRefreshAt: integer({
  mode: "timestamp",
}),
```

### New Tables Required:
- `credit_transaction`: Log all credit transactions
  - Fields:
    - id: text().primaryKey().$defaultFn(() => createId()).notNull()
    - userId: text().notNull().references(() => userTable.id)
    - amount: integer().notNull()
    - type: text({ enum: ['PURCHASE', 'USAGE', 'MONTHLY_REFRESH'] }).notNull()
    - description: text().notNull()
    - createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()).notNull()
    - expirationDate: integer({ mode: "timestamp" })
    - expirationDateProcessedAt: integer({ mode: "timestamp" })

## 2. Monthly Credit Refresh System with Expiration

### Implementation: Lazy Evaluation
We'll use a lazy evaluation approach that checks and updates credits when users perform actions:
- More efficient as it only processes active users
- No need for scheduled jobs
- Simpler implementation in serverless environment

### Credit Refresh Logic:

```typescript
const FREE_MONTHLY_CREDITS = 100;

async function checkAndRefreshCredits(userId: string) {
  // Fetch user data
  const user = await getUserData(userId);
  const currentTime = new Date();

  // Check if it's been at least a month since last refresh
  if (shouldRefreshCredits(user.lastCreditRefreshAt, currentTime)) {
    // Process any expired credits first
    await processExpiredCredits(userId, currentTime);

    // Add free monthly credits with 1 month expiration
    const expirationDate = new Date(currentTime);
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    await updateUserCredits(userId, FREE_MONTHLY_CREDITS);
    await logTransaction(
      userId,
      FREE_MONTHLY_CREDITS,
      'Monthly free credits',
      'MONTHLY_REFRESH',
      expirationDate
    );

    // Update last refresh date
    await updateLastRefreshDate(userId, currentTime);
  }

  return user.currentCredits;
}

async function processExpiredCredits(userId: string, currentTime: Date) {
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

function shouldRefreshCredits(lastRefreshDate: Date | null, currentTime: Date): boolean {
  if (!lastRefreshDate) return true;

  const lastRefresh = new Date(lastRefreshDate);
  // Check if the month or year has changed since last refresh
  return (
    lastRefresh.getMonth() !== currentTime.getMonth() ||
    lastRefresh.getFullYear() !== currentTime.getFullYear()
  );
}

// Helper functions
async function getUserData(userId: string) {
  return await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
    columns: {
      currentCredits: true,
      lastCreditRefreshAt: true,
    }
  });
}

async function updateUserCredits(userId: string, creditsToAdd: number) {
  await db
    .update(userTable)
    .set({
      currentCredits: sql`${userTable.currentCredits} + ${creditsToAdd}`,
    })
    .where(eq(userTable.id, userId));
}

async function updateLastRefreshDate(userId: string, date: Date) {
  await db
    .update(userTable)
    .set({
      lastCreditRefreshAt: date,
    })
    .where(eq(userTable.id, userId));
}

async function logTransaction(
  userId: string,
  amount: number,
  description: string,
  type: 'PURCHASE' | 'USAGE' | 'MONTHLY_REFRESH',
  expirationDate?: Date
) {
  await db.insert(creditTransactionTable).values({
    userId,
    amount,
    description,
    type,
    expirationDate,
  });
}
```

### Integration Points:
The credit refresh check should be performed:
1. When user logs in
2. Before any credit-consuming action
3. When viewing credit balance
4. Before marketplace purchases

## 3. Credit Usage System

### Component Purchase Flow:
1. Check user's current credit balance
2. Validate sufficient credits for purchase
3. Create transaction record
4. Deduct credits from user balance
5. Grant access to component

### Error Handling:
- Insufficient credits
- Transaction failures
- Concurrent transaction protection

## 4. Billing Page Implementation

### User Interface Components:
1. **Credit Balance Display**
   - Current balance
   - Next refresh date
   - Visual credit usage meter

2. **Transaction History Table**
   - Date/Time
   - Transaction Type
   - Amount
   - Description
   - Component (if applicable)
   - Pagination support

3. **Credit Top-up Section**
   - Multiple credit package options
   - Stripe integration
   - Purchase history

### Server Actions Implementation:

```typescript
// src/app/actions/credits.ts
import { z } from "zod";
import { createSafeAction } from "@/lib/create-safe-action";

// Schema definitions
const GetTransactionsSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

const PurchaseCreditsSchema = z.object({
  packageId: z.string(),
  paymentMethodId: z.string(),
});

// Action types
type GetTransactionsInput = z.infer<typeof GetTransactionsSchema>;
type PurchaseCreditsInput = z.infer<typeof PurchaseCreditsSchema>;

// Server actions
export const getBalance = createSafeAction(async () => {
  const session = await getSessionFromCookie();
  if (!session) return { error: "Unauthorized" };

  // Check and refresh monthly credits
  const currentCredits = await checkAndRefreshCredits(session.user.id);

  return { data: { credits: currentCredits } };
});

export const getTransactions = createSafeAction(
  GetTransactionsSchema,
  async ({ page, limit }: GetTransactionsInput) => {
    const session = await getSessionFromCookie();
    if (!session) return { error: "Unauthorized" };

    const transactions = await db.query.creditTransactionTable.findMany({
      where: eq(creditTransactionTable.userId, session.user.id),
      orderBy: desc(creditTransactionTable.createdAt),
      limit,
      offset: (page - 1) * limit,
    });

    const total = await db.query.creditTransactionTable.count();

    return {
      data: {
        transactions,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          current: page,
        }
      }
    };
  }
);

export const purchaseCredits = createSafeAction(
  PurchaseCreditsSchema,
  async ({ packageId, paymentMethodId }: PurchaseCreditsInput) => {
    const session = await getSessionFromCookie();
    if (!session) return { error: "Unauthorized" };

    try {
      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculatePackageAmount(packageId),
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });

      if (paymentIntent.status === 'succeeded') {
        const creditsToAdd = getPackageCredits(packageId);

        // Add credits and log transaction
        await updateUserCredits(session.user.id, creditsToAdd);
        await logTransaction(
          session.user.id,
          creditsToAdd,
          `Purchased ${creditsToAdd} credits`,
          'PURCHASE'
        );

        return { data: { success: true } };
      }

      return { error: "Payment failed" };
    } catch (error) {
      return { error: "Failed to process payment" };
    }
  }
);

// Client-side usage example:
```typescript
'use client';

import { useAction } from "@/lib/safe-action";
import { getBalance, getTransactions, purchaseCredits } from "@/app/actions/credits";

export function CreditBalance() {
  const { execute, result } = useAction(getBalance);

  useEffect(() => {
    execute();
  }, []);

  return (
    <div>
      {result.data && <p>Current Credits: {result.data.credits}</p>}
    </div>
  );
}

export function TransactionHistory() {
  const { execute, result } = useAction(getTransactions);

  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, []);

  return (
    <div>
      {result.data?.transactions.map(transaction => (
        <TransactionRow key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export function PurchaseCreditsButton({ packageId }: { packageId: string }) {
  const { execute, result } = useAction(purchaseCredits);

  const handlePurchase = async (paymentMethodId: string) => {
    await execute({ packageId, paymentMethodId });
  };

  return (
    <Button onClick={() => handlePurchase("pm_123")}>
      Purchase Credits
    </Button>
  );
}
```

Key benefits of using Server Actions:
1. Type-safe function calls between client and server
2. Automatic validation with Zod schemas
3. Built-in error handling and loading states
4. No need for separate API route handlers
5. Better performance with Next.js optimizations
6. Simpler client-side code with useAction hook

Integration points:
1. Credit balance check in layout or navbar
2. Transaction history in billing page
3. Purchase flow in credit packages section
4. Credit refresh on important user actions

## 5. Stripe Integration

### Credit Packages:
- Define credit packages with different price points
- Example:
  - 500 credits for $10
  - 1000 credits for $18
  - 2500 credits for $40

### Implementation Steps:
1. Set up Stripe product catalog
2. Create serverless functions for:
   - Payment intent creation
   - Webhook handling
   - Success/failure handling
3. Implement client-side Stripe Elements
4. Add security measures (webhook signatures)

## 6. Security Considerations

1. **Transaction Safety**
   - Use database transactions
   - Implement idempotency
   - Handle concurrent credit updates

2. **Stripe Security**
   - Secure webhook endpoints
   - Validate signatures
   - Store sensitive data securely

3. **Rate Limiting**
   - Implement rate limiting on credit-related endpoints
   - Prevent abuse of credit system

## 7. Testing Strategy
1. **Edge Cases**
   - Concurrent transactions
   - Failed payments
   - System outages

## 8. Monitoring and Analytics

1. **Key Metrics**
   - Credit usage patterns
   - Popular components
   - Top-up conversion rate
   - Monthly credit refresh stats

2. **Alerts**
   - Failed transactions
   - Stripe webhook failures
   - Unusual credit usage patterns

## 9. Implementation Phases

### Phase 1: Foundation
- Database schema implementation
- Basic credit tracking
- Transaction logging

### Phase 2: Core Features
- Monthly credit refresh system
- Credit usage implementation
- Basic billing page

### Phase 3: Stripe Integration
- Credit packages
- Payment processing
- Webhook handling

### Phase 4: UI/UX Enhancement
- Advanced billing page features
- Transaction history improvements
- Analytics dashboard

## 10. Future Considerations

1. **Scalability**
   - Optimize credit refresh process
   - Cache frequently accessed data
   - Handle high transaction volumes

2. **Feature Expansion**
   - Credit gifting system
   - Referral bonuses
   - Subscription-based credit plans

3. **Analytics**
   - Credit usage patterns
   - User behavior analysis
   - Revenue optimization

## Next Steps

1. Review and finalize database schema changes
2. Decide on monthly credit refresh approach
3. Begin implementation of core credit tracking
4. Set up Stripe test environment
5. Create basic billing page layout
