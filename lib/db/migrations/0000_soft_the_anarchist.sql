CREATE TABLE IF NOT EXISTS "activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"user_id" integer,
	"action" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"invited_by" integer NOT NULL,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"role" varchar(50) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_product_id" text,
	"plan_name" varchar(50),
	"subscription_status" varchar(20),
	CONSTRAINT "teams_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "teams_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" varchar(20) DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airports" (
  "id"                 TEXT            PRIMARY KEY NOT NULL,
  "name"               TEXT            NOT NULL,
  "icao_code"          TEXT,
  "iata_code"          TEXT,
  "alt_identifier"     TEXT,
  "type"               INTEGER,
  "country"            TEXT,
  "geometry"           JSONB           NOT NULL,
  "elevation"          JSONB,
  "elevation_geoid"    JSONB,
  "traffic_type"       JSONB,
  "magnetic_declination" NUMERIC,
  "ppr"                BOOLEAN,
  "private"            BOOLEAN,
  "skydive_activity"   BOOLEAN,
  "winch_only"         BOOLEAN,
  "services"           JSONB,
  "frequencies"        JSONB,
  "runways"            JSONB,
  "hours_of_operation" JSONB,
  "contact"            TEXT,
  "remarks"            TEXT,
  "telephone_services" JSONB,
  "images"             JSONB,
  "created_by"         TEXT,
  "updated_by"         TEXT,
  "created_at"         TIMESTAMPTZ     DEFAULT now() NOT NULL,
  "updated_at"         TIMESTAMPTZ     DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airspaces" (
  "id"                   TEXT            PRIMARY KEY NOT NULL,
  "name"                 TEXT            NOT NULL,
  "data_ingestion"       BOOLEAN,
  "type"                 INTEGER,
  "icao_class"           INTEGER,
  "activity"             INTEGER,
  "on_demand"            BOOLEAN,
  "on_request"           BOOLEAN,
  "by_notam"             BOOLEAN,
  "special_agreement"    BOOLEAN,
  "request_compliance"   BOOLEAN,
  "geometry"             JSONB           NOT NULL,
  "country"              TEXT,
  "upper_limit"          JSONB,
  "lower_limit"          JSONB,
  "upper_limit_max"      JSONB,
  "lower_limit_min"      JSONB,
  "frequencies"          JSONB,
  "transponder_settings" JSONB,
  "hours_of_operation"   JSONB,
  "active_from"          TIMESTAMPTZ     NOT NULL,
  "active_until"         TIMESTAMPTZ     NOT NULL,
  "remarks"              TEXT,
  "created_by"           TEXT,
  "updated_by"           TEXT,
  "created_at"           TIMESTAMPTZ     DEFAULT now() NOT NULL,
  "updated_at"           TIMESTAMPTZ     DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "navaids" (
  "id"                   TEXT            PRIMARY KEY NOT NULL,
  "name"                 TEXT            NOT NULL,
  "type"                 INTEGER,
  "identifier"           TEXT,
  "country"              TEXT,
  "geometry"             JSONB           NOT NULL,
  "elevation"            JSONB,
  "elevation_geoid"      JSONB,
  "magnetic_declination" NUMERIC,
  "aligned_true_north"   BOOLEAN,
  "channel"              TEXT,
  "frequency"            JSONB,
  "range"                JSONB,
  "hours_of_operation"   JSONB,
  "images"               JSONB,
  "remarks"              TEXT,
  "created_by"           TEXT,
  "updated_by"           TEXT,
  "created_at"           TIMESTAMPTZ     DEFAULT now() NOT NULL,
  "updated_at"           TIMESTAMPTZ     DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
