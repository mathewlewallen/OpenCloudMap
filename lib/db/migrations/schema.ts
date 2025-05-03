import { pgTable, text, integer, jsonb, numeric, boolean, timestamp, unique, serial, varchar, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const airports = pgTable("airports", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	icaoCode: text("icao_code"),
	iataCode: text("iata_code"),
	altIdentifier: text("alt_identifier"),
	type: integer(),
	country: text(),
	geometry: jsonb().notNull(),
	elevation: jsonb(),
	elevationGeoid: jsonb("elevation_geoid"),
	trafficType: jsonb("traffic_type"),
	magneticDeclination: numeric("magnetic_declination"),
	ppr: boolean(),
	private: boolean(),
	skydiveActivity: boolean("skydive_activity"),
	winchOnly: boolean("winch_only"),
	services: jsonb(),
	frequencies: jsonb(),
	runways: jsonb(),
	hoursOfOperation: jsonb("hours_of_operation"),
	contact: text(),
	remarks: text(),
	telephoneServices: jsonb("telephone_services"),
	images: jsonb(),
	createdBy: text("created_by"),
	updatedBy: text("updated_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const teams = pgTable("teams", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	stripeCustomerId: text("stripe_customer_id"),
	stripeSubscriptionId: text("stripe_subscription_id"),
	stripeProductId: text("stripe_product_id"),
	planName: varchar("plan_name", { length: 50 }),
	subscriptionStatus: varchar("subscription_status", { length: 20 }),
}, (table) => [
	unique("teams_stripe_customer_id_unique").on(table.stripeCustomerId),
	unique("teams_stripe_subscription_id_unique").on(table.stripeSubscriptionId),
]);

export const activityLogs = pgTable("activity_logs", {
	id: serial().primaryKey().notNull(),
	teamId: integer("team_id").notNull(),
	userId: integer("user_id"),
	action: text().notNull(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
	ipAddress: varchar("ip_address", { length: 45 }),
}, (table) => [
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "activity_logs_team_id_teams_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "activity_logs_user_id_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	role: varchar({ length: 20 }).default('member').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const invitations = pgTable("invitations", {
	id: serial().primaryKey().notNull(),
	teamId: integer("team_id").notNull(),
	email: varchar({ length: 255 }).notNull(),
	role: varchar({ length: 50 }).notNull(),
	invitedBy: integer("invited_by").notNull(),
	invitedAt: timestamp("invited_at", { mode: 'string' }).defaultNow().notNull(),
	status: varchar({ length: 20 }).default('pending').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "invitations_team_id_teams_id_fk"
		}),
	foreignKey({
			columns: [table.invitedBy],
			foreignColumns: [users.id],
			name: "invitations_invited_by_users_id_fk"
		}),
]);

export const teamMembers = pgTable("team_members", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	teamId: integer("team_id").notNull(),
	role: varchar({ length: 50 }).notNull(),
	joinedAt: timestamp("joined_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "team_members_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "team_members_team_id_teams_id_fk"
		}),
]);

export const airspaces = pgTable("airspaces", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	dataIngestion: boolean("data_ingestion"),
	type: integer(),
	icaoClass: integer("icao_class"),
	activity: integer(),
	onDemand: boolean("on_demand"),
	onRequest: boolean("on_request"),
	byNotam: boolean("by_notam"),
	specialAgreement: boolean("special_agreement"),
	requestCompliance: boolean("request_compliance"),
	geometry: jsonb().notNull(),
	country: text(),
	upperLimit: jsonb("upper_limit"),
	lowerLimit: jsonb("lower_limit"),
	upperLimitMax: jsonb("upper_limit_max"),
	lowerLimitMin: jsonb("lower_limit_min"),
	frequencies: jsonb(),
	transponderSettings: jsonb("transponder_settings"),
	hoursOfOperation: jsonb("hours_of_operation"),
	activeFrom: timestamp("active_from", { withTimezone: true, mode: 'string' }).notNull(),
	activeUntil: timestamp("active_until", { withTimezone: true, mode: 'string' }).notNull(),
	remarks: text(),
	createdBy: text("created_by"),
	updatedBy: text("updated_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const navaids = pgTable("navaids", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	type: integer(),
	identifier: text(),
	country: text(),
	geometry: jsonb().notNull(),
	elevation: jsonb(),
	elevationGeoid: jsonb("elevation_geoid"),
	magneticDeclination: numeric("magnetic_declination"),
	alignedTrueNorth: boolean("aligned_true_north"),
	channel: text(),
	frequency: jsonb(),
	range: jsonb(),
	hoursOfOperation: jsonb("hours_of_operation"),
	images: jsonb(),
	remarks: text(),
	createdBy: text("created_by"),
	updatedBy: text("updated_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});
