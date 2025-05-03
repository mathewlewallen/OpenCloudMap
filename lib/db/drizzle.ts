import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

export const client = neon(process.env.POSTGRES_URL);
export const db = drizzle(client, { schema });
