import "server-only";

import { userTable } from "@/db/schema";
import { init } from "@paralleldrive/cuid2";
import { encodeHexLowerCase } from "@oslojs/encoding"
import { sha256 } from "@oslojs/crypto/sha2"
import ms from "ms"
import { getDB } from "@/db";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import isProd from "@/utils/isProd";
// eslint-disable-next-line import/no-cycle
import {
  createKVSession,
  deleteKVSession,
  getKV,
  getSessionKey,
  type KVSession,
  type CreateKVSessionParams
} from "./kv-session";
import { cache } from "react"
import type { SessionValidationResult } from "@/types";
import { SESSION_COOKIE_NAME } from "@/constants";
import { ZSAError } from "zsa";

const getSessionLength = () => {
  return ms("30d");
}

/**
 * This file is based on https://lucia-auth.com
 */

export const getUserFromDB = async (userId: string) => {
  const db = getDB();
  return db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
    columns: {
      id: true,
      createdAt: true,
      updatedAt: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      emailVerified: true,
      avatar: true,
    }
  })
}

const createId = init({
  length: 32,
});

export function generateSessionToken(): string {
  return createId();
}

function encodeSessionCookie(userId: string, token: string): string {
  return `${userId}:${token}`;
}

function decodeSessionCookie(cookie: string): { userId: string; token: string } | null {
  const parts = cookie.split(':');
  if (parts.length !== 2) return null;
  return { userId: parts[0], token: parts[1] };
}

interface CreateSessionParams extends Pick<CreateKVSessionParams, "authenticationType" | "passkeyCredentialId" | "userId"> {
  token: string;
}

export async function createSession({
  token,
  userId,
  authenticationType,
  passkeyCredentialId
}: CreateSessionParams): Promise<KVSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + getSessionLength());

  const user = await getUserFromDB(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return createKVSession({
    sessionId,
    userId,
    expiresAt,
    user,
    authenticationType,
    passkeyCredentialId
  });
}

export async function createAndStoreSession(
  userId: string,
  authenticationType?: CreateKVSessionParams["authenticationType"],
  passkeyCredentialId?: CreateKVSessionParams["passkeyCredentialId"]
) {
  const sessionToken = generateSessionToken();
  const session = await createSession({
    token: sessionToken,
    userId,
    authenticationType,
    passkeyCredentialId
  });
  await setSessionTokenCookie({
    token: sessionToken,
    userId,
    expiresAt: new Date(session.expiresAt)
  });
}

async function validateSessionToken(token: string, userId: string): Promise<SessionValidationResult | null> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const kv = await getKV();

  const sessionStr = await kv.get(getSessionKey(userId, sessionId));
  if (!sessionStr) return null;

  const session = JSON.parse(sessionStr) as KVSession;

  // If the session has expired, delete it and return null
  if (Date.now() >= session.expiresAt) {
    await deleteKVSession(sessionId, userId);
    return null;
  }

  // TODO: Error: Cookies can only be modified in a Server Action or Route Handler.
  // if (Date.now() >= session.expiresAt - (getSessionLength() / 2)) {
  //   const newExpiresAt = new Date(Date.now() + getSessionLength());
  //   const updatedSession = await updateKVSession(sessionId, userId, newExpiresAt);

  //   if (!updatedSession) return null;

  //   // Update the session in the cookie
  //   await setSessionTokenCookie({
  //     token,
  //     userId,
  //     expiresAt: newExpiresAt
  //   });

  //   return {
  //     ...user,
  //     session: updatedSession,
  //   };
  // }

  // Return the user data directly from the session
  return session;
}

export async function invalidateSession(sessionId: string, userId: string): Promise<void> {
  await deleteKVSession(sessionId, userId);
}

interface SetSessionTokenCookieParams {
  token: string;
  userId: string;
  expiresAt: Date;
}

export async function setSessionTokenCookie({ token, userId, expiresAt }: SetSessionTokenCookieParams): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, encodeSessionCookie(userId, token), {
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    secure: isProd,
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * This function can only be called in a Server Components, Server Action or Route Handler
 */
export const getSessionFromCookie = cache(async (): Promise<SessionValidationResult | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  const decoded = decodeSessionCookie(sessionCookie);

  if (!decoded || !decoded.token || !decoded.userId) {
    return null;
  }

  return validateSessionToken(decoded.token, decoded.userId);
})

/**
 * Helper function to require a verified email for protected actions
 * @throws {ZSAError} If user is not authenticated or email is not verified
 * @returns The verified session
 */
export async function requireVerifiedEmail() {
  const session = await getSessionFromCookie();

  if (!session) {
    throw new ZSAError("NOT_AUTHORIZED", "Not authenticated");
  }

  if (!session.user.emailVerified) {
    throw new ZSAError("FORBIDDEN", "Please verify your email first");
  }

  return session;
}
