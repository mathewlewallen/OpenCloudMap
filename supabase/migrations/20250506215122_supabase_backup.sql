

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE SCHEMA IF NOT EXISTS "stripe";


ALTER SCHEMA "stripe" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";






CREATE TYPE "public"."activity_type" AS ENUM (
    'SIGN_UP',
    'SIGN_IN',
    'SIGN_OUT',
    'UPDATE_PASSWORD',
    'DELETE_ACCOUNT',
    'UPDATE_ACCOUNT',
    'CREATE_TEAM',
    'REMOVE_TEAM_MEMBER',
    'INVITE_TEAM_MEMBER',
    'ACCEPT_INVITATION'
);


ALTER TYPE "public"."activity_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE FOREIGN DATA WRAPPER "stripe_wrapper" HANDLER "extensions"."stripe_fdw_handler" VALIDATOR "extensions"."stripe_fdw_validator";




CREATE SERVER "stripe_server" FOREIGN DATA WRAPPER "stripe_wrapper" OPTIONS (
    "api_url" 'https://api.stripe.com/v1/',
    "api_version" '2025-04-30.basil'
);


ALTER SERVER "stripe_server" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."activity_log" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "action" "public"."activity_type" NOT NULL,
    "ip_address" "text",
    "timestamp" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."activity_log" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_log_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_log_id_seq" OWNED BY "public"."activity_log"."id";



CREATE TABLE IF NOT EXISTS "public"."chat" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "path" "text" DEFAULT ''::"text",
    "sharepath" "text",
    "messages" "text"[],
    "title" "text" DEFAULT ''::"text",
    "profile_id" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."chat" OWNER TO "postgres";


ALTER TABLE "public"."chat" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."chat_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."continents" (
    "id" character(2) NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."continents" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."countries" (
    "id" character(2) NOT NULL,
    "continent_id" character(2) NOT NULL,
    "name" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "iso3" character(3) NOT NULL,
    "number" character(3) NOT NULL
);


ALTER TABLE "public"."countries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."inqueries" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL,
    "message" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."inqueries" OWNER TO "postgres";


ALTER TABLE "public"."inqueries" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."inqueries_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."meetings" (
    "id" bigint NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "summary" "text" NOT NULL,
    "description" "text",
    "start_time" timestamp with time zone NOT NULL,
    "end_time" timestamp with time zone NOT NULL,
    "meet_link" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."meetings" OWNER TO "postgres";


ALTER TABLE "public"."meetings" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."meetings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."members_table" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" DEFAULT ''::"text",
    "member_id" "uuid" NOT NULL,
    "email" "text" DEFAULT ''::"text",
    "password" "text" DEFAULT ''::"text" NOT NULL
);


ALTER TABLE "public"."members_table" OWNER TO "postgres";


ALTER TABLE "public"."members_table" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."members_table_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."permission_table" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "role" "text" NOT NULL,
    "status" "text" NOT NULL,
    "member_id" "uuid" NOT NULL
);


ALTER TABLE "public"."permission_table" OWNER TO "postgres";


ALTER TABLE "public"."permission_table" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."permission_table_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "website" "text",
    "email" "text",
    "waddress" "text",
    "xhandle" "text",
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "company" "text",
    "company_logo_url" "text",
    "job_title" "text",
    "linkedin_url" "text",
    "public_id" "uuid",
    "card_styles" "text",
    "card_style" "jsonb",
    "role" "text" DEFAULT 'user'::"text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."todos" (
    "id" bigint NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "task" "text",
    "is_complete" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" DEFAULT ''::"text" NOT NULL,
    "created_by" "uuid" NOT NULL,
    CONSTRAINT "todos_task_check" CHECK (("char_length"("task") > 3))
);


ALTER TABLE "public"."todos" OWNER TO "postgres";


ALTER TABLE "public"."todos" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."todos_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE FOREIGN TABLE "stripe"."accounts" (
    "id" "text",
    "business_type" "text",
    "country" "text",
    "email" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'accounts',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."accounts" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."balance" (
    "balance_type" "text",
    "amount" bigint,
    "currency" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'balance',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."balance" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."balance_transactions" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "fee" bigint,
    "net" bigint,
    "status" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'balance_transactions',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."balance_transactions" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."billing_meters" (
    "id" "text",
    "display_name" "text",
    "event_name" "text",
    "event_time_window" "text",
    "status" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'billing/meters',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."billing_meters" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."charges" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "customer" "text",
    "description" "text",
    "invoice" "text",
    "payment_intent" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'charges',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."charges" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."checkout_sessions" (
    "id" "text",
    "customer" "text",
    "payment_intent" "text",
    "subscription" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'checkout/sessions',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."checkout_sessions" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."customers" (
    "id" "text",
    "email" "text",
    "name" "text",
    "description" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'customers',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."customers" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."disputes" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "charge" "text",
    "payment_intent" "text",
    "reason" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'disputes',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."disputes" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."events" (
    "id" "text",
    "type" "text",
    "api_version" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'events',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."events" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."file_links" (
    "id" "text",
    "file" "text",
    "url" "text",
    "created" timestamp without time zone,
    "expired" boolean,
    "expires_at" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'file_links',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."file_links" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."files" (
    "id" "text",
    "filename" "text",
    "purpose" "text",
    "title" "text",
    "size" bigint,
    "type" "text",
    "url" "text",
    "created" timestamp without time zone,
    "expires_at" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'files',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."files" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."invoices" (
    "id" "text",
    "customer" "text",
    "subscription" "text",
    "status" "text",
    "total" bigint,
    "currency" "text",
    "period_start" timestamp without time zone,
    "period_end" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'invoices',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."invoices" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."mandates" (
    "id" "text",
    "payment_method" "text",
    "status" "text",
    "type" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'mandates',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."mandates" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."payment_intents" (
    "id" "text",
    "customer" "text",
    "amount" bigint,
    "currency" "text",
    "payment_method" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'payment_intents',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."payment_intents" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."payouts" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "arrival_date" timestamp without time zone,
    "description" "text",
    "statement_descriptor" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'payouts',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."payouts" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."prices" (
    "id" "text",
    "active" boolean,
    "currency" "text",
    "product" "text",
    "unit_amount" bigint,
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'prices',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."prices" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."products" (
    "id" "text",
    "name" "text",
    "active" boolean,
    "default_price" "text",
    "description" "text",
    "created" timestamp without time zone,
    "updated" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'products',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."products" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."refunds" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "charge" "text",
    "payment_intent" "text",
    "reason" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'refunds',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."refunds" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."setup_attempts" (
    "id" "text",
    "application" "text",
    "customer" "text",
    "on_behalf_of" "text",
    "payment_method" "text",
    "setup_intent" "text",
    "status" "text",
    "usage" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'setup_attempts',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."setup_attempts" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."setup_intents" (
    "id" "text",
    "client_secret" "text",
    "customer" "text",
    "description" "text",
    "payment_method" "text",
    "status" "text",
    "usage" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'setup_intents',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."setup_intents" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."subscriptions" (
    "id" "text",
    "customer" "text",
    "currency" "text",
    "current_period_start" timestamp without time zone,
    "current_period_end" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'subscriptions',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."subscriptions" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."tokens" (
    "id" "text",
    "type" "text",
    "client_ip" "text",
    "used" boolean,
    "livemode" boolean,
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'tokens',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."tokens" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."topups" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'topups',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."topups" OWNER TO "postgres";


CREATE FOREIGN TABLE "stripe"."transfers" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "destination" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'transfers',
    "rowid_column" 'id'
);


ALTER FOREIGN TABLE "stripe"."transfers" OWNER TO "postgres";


ALTER TABLE ONLY "public"."activity_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_log_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_log"
    ADD CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "chat_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."continents"
    ADD CONSTRAINT "continents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."countries"
    ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inqueries"
    ADD CONSTRAINT "inqueries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."members_table"
    ADD CONSTRAINT "members_table_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."permission_table"
    ADD CONSTRAINT "permission_table_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."todos"
    ADD CONSTRAINT "todos_pkey" PRIMARY KEY ("id");



CREATE INDEX "countries_continent_id_idx" ON "public"."countries" USING "btree" ("continent_id");



CREATE INDEX "idx_profiles_role" ON "public"."profiles" USING "btree" ("role");



ALTER TABLE ONLY "public"."activity_log"
    ADD CONSTRAINT "activity_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."countries"
    ADD CONSTRAINT "countries_continent_id_fkey" FOREIGN KEY ("continent_id") REFERENCES "public"."continents"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."todos"
    ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Individuals can delete their own permissions." ON "public"."permission_table" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "member_id"));



CREATE POLICY "Individuals can delete their own todos." ON "public"."todos" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Individuals can insert their own permissions." ON "public"."permission_table" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "member_id"));



CREATE POLICY "Individuals can insert their own todos." ON "public"."todos" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Individuals can update their own permissions." ON "public"."permission_table" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "member_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "member_id"));



CREATE POLICY "Individuals can update their own todos." ON "public"."todos" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Individuals can view their own permissions." ON "public"."permission_table" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "member_id"));



CREATE POLICY "Individuals can view their own todos." ON "public"."todos" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."chat" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."inqueries" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."meetings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."members_table" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";





















GRANT ALL ON TABLE "public"."activity_log" TO "anon";
GRANT ALL ON TABLE "public"."activity_log" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."chat" TO "anon";
GRANT ALL ON TABLE "public"."chat" TO "authenticated";
GRANT ALL ON TABLE "public"."chat" TO "service_role";



GRANT ALL ON SEQUENCE "public"."chat_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."chat_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."chat_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."continents" TO "anon";
GRANT ALL ON TABLE "public"."continents" TO "authenticated";
GRANT ALL ON TABLE "public"."continents" TO "service_role";



GRANT ALL ON TABLE "public"."countries" TO "anon";
GRANT ALL ON TABLE "public"."countries" TO "authenticated";
GRANT ALL ON TABLE "public"."countries" TO "service_role";



GRANT ALL ON TABLE "public"."inqueries" TO "anon";
GRANT ALL ON TABLE "public"."inqueries" TO "authenticated";
GRANT ALL ON TABLE "public"."inqueries" TO "service_role";



GRANT ALL ON SEQUENCE "public"."inqueries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."inqueries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."inqueries_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."meetings" TO "anon";
GRANT ALL ON TABLE "public"."meetings" TO "authenticated";
GRANT ALL ON TABLE "public"."meetings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."meetings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."meetings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."meetings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."members_table" TO "anon";
GRANT ALL ON TABLE "public"."members_table" TO "authenticated";
GRANT ALL ON TABLE "public"."members_table" TO "service_role";



GRANT ALL ON SEQUENCE "public"."members_table_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."members_table_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."members_table_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."permission_table" TO "anon";
GRANT ALL ON TABLE "public"."permission_table" TO "authenticated";
GRANT ALL ON TABLE "public"."permission_table" TO "service_role";



GRANT ALL ON SEQUENCE "public"."permission_table_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."permission_table_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."permission_table_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."todos" TO "anon";
GRANT ALL ON TABLE "public"."todos" TO "authenticated";
GRANT ALL ON TABLE "public"."todos" TO "service_role";



GRANT ALL ON SEQUENCE "public"."todos_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."todos_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."todos_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
