import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "./schema";

// eslint-disable-next-line import/no-unused-modules
export let db: DrizzleD1Database<typeof schema> | null = null;

export const getDB = async () => {
  if (db) {
    return db;
  }

  // TODO: Make syncronous after https://github.com/opennextjs/opennextjs-cloudflare/pull/265 is released
  const { env } = await getCloudflareContext();

  db = drizzle(env.DATABASE, { schema, logger: true });

  return db;
};
