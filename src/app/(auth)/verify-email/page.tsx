import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getVerificationTokenKey } from "@/utils/auth-utils";
import { getDB } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateAllSessionsOfUser } from "@/utils/kv-session";
import { withRateLimit, RATE_LIMITS } from "@/utils/with-rate-limit";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return notFound();
  }

  const { env } = getCloudflareContext();

  const success = await withRateLimit(async () => {
    const verificationTokenStr = await env.NEXT_CACHE_WORKERS_KV.get(getVerificationTokenKey(token));

    if (!verificationTokenStr) {
      return false;
    }

    const verificationToken = JSON.parse(verificationTokenStr) as {
      userId: string;
      expiresAt: string;
    };

    // Check if token is expired (although KV should have auto-deleted it)
    if (new Date() > new Date(verificationToken.expiresAt)) {
      return false;
    }

    const db = getDB();

    // Find user
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, verificationToken.userId),
    });

    if (!user) {
      return false;
    }

    // Update user's email verification status
    await db.update(userTable)
      .set({ emailVerified: new Date() })
      .where(eq(userTable.id, verificationToken.userId));

    // Update all sessions of the user to reflect the new email verification status
    await updateAllSessionsOfUser(verificationToken.userId);

    // Delete the used token
    await env.NEXT_CACHE_WORKERS_KV.delete(getVerificationTokenKey(token));

    // Add a small delay to ensure all updates are processed
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  }, RATE_LIMITS.EMAIL);

  if (success) {
    redirect("/dashboard");
  }

  return notFound();
}
