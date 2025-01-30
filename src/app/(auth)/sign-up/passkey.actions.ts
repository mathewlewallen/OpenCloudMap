"use server";

import { createServerAction, ZSAError } from "zsa";
import { z } from "zod";
import { generatePasskeyRegistrationOptions, verifyPasskeyRegistration } from "@/utils/webauthn";
import { getDB } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { cookies } from "next/headers";
import { createSession, generateSessionToken, setSessionTokenCookie } from "@/utils/auth";
import type { RegistrationResponseJSON, PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { withRateLimit, RATE_LIMITS } from "@/utils/with-rate-limit";
import { getIP } from "@/utils/getIP";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getVerificationTokenKey } from "@/utils/auth-utils";
import { sendVerificationEmail } from "@/utils/email";
import { EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS } from "@/constants";

const passkeyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const startPasskeyRegistrationAction = createServerAction()
  .input(passkeyEmailSchema)
  .handler(async ({ input }) => {
    return withRateLimit(
      async () => {
        const db = await getDB();
        const existingUser = await db.query.userTable.findFirst({
          where: eq(userTable.email, input.email),
        });

        if (existingUser) {
          throw new ZSAError(
            "CONFLICT",
            "An account with this email already exists"
          );
        }

        // Create a new user
        const userId = createId();
        const ipAddress = await getIP();

        const [user] = await db.insert(userTable)
          .values({
            id: userId,
            email: input.email,
            signUpIpAddress: ipAddress,
          })
          .returning();

        if (!user) {
          throw new ZSAError(
            "INTERNAL_SERVER_ERROR",
            "Failed to create user"
          );
        }

        // Generate passkey registration options
        const options = await generatePasskeyRegistrationOptions(userId, input.email);

        // Store the challenge in a cookie for verification
        cookies().set("passkey_challenge", options.challenge, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 5 * 60, // 5 minutes
        });

        // Store the user ID in a cookie for verification
        cookies().set("passkey_user_id", userId, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 5 * 60, // 5 minutes
        });

        // Convert options to the expected type
        const optionsJSON: PublicKeyCredentialCreationOptionsJSON = {
          rp: options.rp,
          user: options.user,
          challenge: options.challenge,
          pubKeyCredParams: options.pubKeyCredParams,
          timeout: options.timeout,
          excludeCredentials: options.excludeCredentials,
          authenticatorSelection: options.authenticatorSelection,
          attestation: options.attestation,
          extensions: options.extensions,
        };

        return { optionsJSON };
      },
      RATE_LIMITS.SIGN_UP
    );
  });

const completePasskeyRegistrationSchema = z.object({
  response: z.custom<RegistrationResponseJSON>((val): val is RegistrationResponseJSON => {
    return typeof val === "object" && val !== null && "id" in val && "rawId" in val;
  }, "Invalid registration response"),
});

export const completePasskeyRegistrationAction = createServerAction()
  .input(completePasskeyRegistrationSchema)
  .handler(async ({ input }) => {
    const cookieStore = cookies();
    const challenge = cookieStore.get("passkey_challenge")?.value;
    const userId = cookieStore.get("passkey_user_id")?.value;

    if (!challenge || !userId) {
      throw new ZSAError(
        "PRECONDITION_FAILED",
        "Invalid registration session"
      );
    }

    try {
      // Verify the registration
      await verifyPasskeyRegistration(userId, input.response, challenge);

      // Get user details for email verification
      const db = await getDB();
      const user = await db.query.userTable.findFirst({
        where: eq(userTable.id, userId),
      });

      if (!user || !user.email) {
        throw new ZSAError(
          "INTERNAL_SERVER_ERROR",
          "User not found"
        );
      }

      // Generate verification token
      const { env } = await getCloudflareContext();
      const verificationToken = createId();
      const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS * 1000);

      // Save verification token in KV with expiration
      await env.NEXT_CACHE_WORKERS_KV.put(
        getVerificationTokenKey(verificationToken),
        JSON.stringify({
          userId: user.id,
          expiresAt: expiresAt.toISOString(),
        }),
        {
          expirationTtl: Math.floor((expiresAt.getTime() - Date.now()) / 1000),
        }
      );

      // Send verification email
      await sendVerificationEmail({
        email: user.email,
        verificationToken,
        username: user.firstName || user.email,
      });

      // Create a session
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, userId);

      // Set the session cookie
      await setSessionTokenCookie({
        token: sessionToken,
        userId,
        expiresAt: new Date(session.expiresAt)
      });

      // Clean up cookies
      cookieStore.delete("passkey_challenge");
      cookieStore.delete("passkey_user_id");

      return { success: true };
    } catch (error) {
      console.error("Failed to register passkey:", error);
      throw new ZSAError(
        "PRECONDITION_FAILED",
        "Failed to register passkey"
      );
    }
  });
