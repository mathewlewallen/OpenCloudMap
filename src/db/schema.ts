import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { type InferSelectModel } from "drizzle-orm";

import { createId } from '@paralleldrive/cuid2'

export const ROLES_ENUM = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

const roleTuple = Object.values(ROLES_ENUM) as [string, ...string[]];

const commonColumns = {
  createdAt: integer({
    mode: "timestamp",
  }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer({
    mode: "timestamp",
  }).$onUpdateFn(() => new Date()).notNull(),
  updateCounter: integer().default(0).$onUpdate(() => sql`updateCounter + 1`),
}

export const userTable = sqliteTable("user", {
  ...commonColumns,
  id: text().primaryKey().$defaultFn(() => `usr_${createId()}`).notNull(),
  firstName: text({
    length: 255,
  }),
  lastName: text({
    length: 255,
  }),
  email: text({
    length: 255,
  }).unique(),
  passwordHash: text(),
  role: text({
    enum: roleTuple,
  }).default(ROLES_ENUM.USER).notNull(),
  emailVerified: integer({
    mode: "timestamp",
  }),
  signUpIpAddress: text({
    length: 100,
  }),
  googleAccountId: text({
    length: 255,
  }),
  /**
   * This can either be an absolute or relative path to an image
   */
  avatar: text({
    length: 600,
  }),
  // Credit system fields
  currentCredits: integer().default(0).notNull(),
  lastCreditRefreshAt: integer({
    mode: "timestamp",
  }),
}, (table) => ([
  index('email_idx').on(table.email),
  index('google_account_id_idx').on(table.googleAccountId),
  index('role_idx').on(table.role),
]));

export const passKeyCredentialTable = sqliteTable("passkey_credential", {
  ...commonColumns,
  id: text().primaryKey().$defaultFn(() => `pkey_${createId()}`).notNull(),
  userId: text().notNull().references(() => userTable.id),
  credentialId: text({
    length: 255,
  }).notNull().unique(),
  credentialPublicKey: text({
    length: 255,
  }).notNull(),
  counter: integer().notNull(),
  // Optional array of AuthenticatorTransport as JSON string
  transports: text({
    length: 255,
  }),
  // Authenticator Attestation GUID. We use this to identify the device/authenticator app that created the passkey
  aaguid: text({
    length: 255,
  }),
  // The user agent of the device that created the passkey
  userAgent: text({
    length: 255,
  }),
  // The IP address that created the passkey
  ipAddress: text({
    length: 100,
  }),
}, (table) => ([
  index('user_id_idx').on(table.userId),
  index('credential_id_idx').on(table.credentialId),
]));

// Credit transaction types
export const CREDIT_TRANSACTION_TYPE = {
  PURCHASE: 'PURCHASE',
  USAGE: 'USAGE',
  MONTHLY_REFRESH: 'MONTHLY_REFRESH',
} as const;

export const creditTransactionTypeTuple = Object.values(CREDIT_TRANSACTION_TYPE) as [string, ...string[]];

export const creditTransactionTable = sqliteTable("credit_transaction", {
  ...commonColumns,
  id: text().primaryKey().$defaultFn(() => `ctxn_${createId()}`).notNull(),
  userId: text().notNull().references(() => userTable.id),
  amount: integer().notNull(),
  // Track how many credits are still available from this transaction
  remainingAmount: integer().default(0).notNull(),
  type: text({
    enum: creditTransactionTypeTuple,
  }).notNull(),
  description: text({
    length: 255,
  }).notNull(),
  expirationDate: integer({
    mode: "timestamp",
  }),
  expirationDateProcessedAt: integer({
    mode: "timestamp",
  }),
  paymentIntentId: text({
    length: 255,
  }),
}, (table) => ([
  index('credit_transaction_user_id_idx').on(table.userId),
  index('credit_transaction_type_idx').on(table.type),
  index('credit_transaction_created_at_idx').on(table.createdAt),
  index('credit_transaction_expiration_date_idx').on(table.expirationDate),
  index('credit_transaction_payment_intent_id_idx').on(table.paymentIntentId),
]));

// Define item types that can be purchased
export const PURCHASABLE_ITEM_TYPE = {
  COMPONENT: 'COMPONENT',
  // Add more types in the future (e.g., TEMPLATE, PLUGIN, etc.)
} as const;

export const purchasableItemTypeTuple = Object.values(PURCHASABLE_ITEM_TYPE) as [string, ...string[]];

export const purchasedItemsTable = sqliteTable("purchased_item", {
  ...commonColumns,
  id: text().primaryKey().$defaultFn(() => `pitem_${createId()}`).notNull(),
  userId: text().notNull().references(() => userTable.id),
  // The type of item (e.g., COMPONENT, TEMPLATE, etc.)
  itemType: text({
    enum: purchasableItemTypeTuple,
  }).notNull(),
  // The ID of the item within its type (e.g., componentId)
  itemId: text().notNull(),
  purchasedAt: integer({
    mode: "timestamp",
  }).$defaultFn(() => new Date()).notNull(),
}, (table) => ([
  index('purchased_item_user_id_idx').on(table.userId),
  index('purchased_item_type_idx').on(table.itemType),
  // Composite index for checking if a user owns a specific item of a specific type
  index('purchased_item_user_item_idx').on(table.userId, table.itemType, table.itemId),
]));

export const creditTransactionRelations = relations(creditTransactionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [creditTransactionTable.userId],
    references: [userTable.id],
  }),
}));

export const purchasedItemsRelations = relations(purchasedItemsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [purchasedItemsTable.userId],
    references: [userTable.id],
  }),
}));

export const userRelations = relations(userTable, ({ many }) => ({
  passkeys: many(passKeyCredentialTable),
  creditTransactions: many(creditTransactionTable),
  purchasedItems: many(purchasedItemsTable),
}));

export const passKeyCredentialRelations = relations(passKeyCredentialTable, ({ one }) => ({
  user: one(userTable, {
    fields: [passKeyCredentialTable.userId],
    references: [userTable.id],
  }),
}));

export type User = InferSelectModel<typeof userTable>;
export type PassKeyCredential = InferSelectModel<typeof passKeyCredentialTable>;
export type CreditTransaction = InferSelectModel<typeof creditTransactionTable>;
export type PurchasedItem = InferSelectModel<typeof purchasedItemsTable>;
