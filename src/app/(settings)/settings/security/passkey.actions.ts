"use server";

import { z } from "zod";
import { generatePasskeyRegistrationOptions, verifyPasskeyRegistration } from "@/utils/webauthn";
import { createAndStoreSession } from "@/utils/auth";
import { getDB } from "@/db";
import { userTable, passKeyCredentialTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createServerAction, ZSAError } from "zsa";
import { getSessionFromCookie } from "@/utils/auth";
import type { User } from "@/db/schema";
import type { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import { generatePasskeyAuthenticationOptions, verifyPasskeyAuthentication } from "@/utils/webauthn";
import type { AuthenticationResponseJSON } from "@simplewebauthn/typescript-types";

const generateRegistrationOptionsSchema = z.object({
  email: z.string().email(),
});

export const generateRegistrationOptionsAction = createServerAction()
  .input(generateRegistrationOptionsSchema)
  .handler(async ({ input }) => {
    const db = await getDB();
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, input.email),
    });

    if (!user) {
      throw new ZSAError("NOT_FOUND", "User not found");
    }

    const options = await generatePasskeyRegistrationOptions(user.id, input.email);
    return options;
  });

const verifyRegistrationSchema = z.object({
  email: z.string().email(),
  response: z.custom<RegistrationResponseJSON>(),
  challenge: z.string(),
});

export const verifyRegistrationAction = createServerAction()
  .input(verifyRegistrationSchema)
  .handler(async ({ input }) => {
    const db = await getDB();
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, input.email),
    });

    if (!user) {
      throw new ZSAError("NOT_FOUND", "User not found");
    }

    await verifyPasskeyRegistration(user.id, input.response, input.challenge);
    await createAndStoreSession(user.id);
    return { success: true };
  });

export const getPasskeysAction = createServerAction()
  .input(z.object({}))
  .handler(async () => {
    const session = await getSessionFromCookie();

    if (!session) {
      throw new ZSAError("NOT_AUTHORIZED", "You must be logged in to view passkeys");
    }

    const db = await getDB();
    const passkeys = await db
      .select()
      .from(passKeyCredentialTable)
      .where(eq(passKeyCredentialTable.userId, session.user.id));

    return passkeys;
  });

const deletePasskeySchema = z.object({
  credentialId: z.string(),
});

export const deletePasskeyAction = createServerAction()
  .input(deletePasskeySchema)
  .handler(async ({ input }) => {
    const session = await getSessionFromCookie();

    if (!session) {
      throw new ZSAError("NOT_AUTHORIZED", "You must be logged in to delete passkeys");
    }

    const db = await getDB();

    // Get all user's passkeys
    const passkeys = await db
      .select()
      .from(passKeyCredentialTable)
      .where(eq(passKeyCredentialTable.userId, session.user.id));

    // Get full user data to check password
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, session.user.id),
    }) as User;

    // Check if this is the last passkey and if the user has a password
    if (passkeys.length === 1 && !user.passwordHash) {
      throw new ZSAError(
        "FORBIDDEN",
        "Cannot delete the last passkey when no password is set"
      );
    }

    await db
      .delete(passKeyCredentialTable)
      .where(eq(passKeyCredentialTable.credentialId, input.credentialId));

    return { success: true };
  });

export const generateAuthenticationOptionsAction = createServerAction()
  .input(z.object({}))
  .handler(async () => {
    const options = await generatePasskeyAuthenticationOptions();
    return options;
  });

const verifyAuthenticationSchema = z.object({
  response: z.custom<AuthenticationResponseJSON>((val): val is AuthenticationResponseJSON => {
    return typeof val === "object" && val !== null && "id" in val && "rawId" in val;
  }, "Invalid authentication response"),
  challenge: z.string(),
});

export const verifyAuthenticationAction = createServerAction()
  .input(verifyAuthenticationSchema)
  .handler(async ({ input }) => {
    const { verification, credential } = await verifyPasskeyAuthentication(input.response, input.challenge);

    if (!verification.verified) {
      throw new ZSAError("PRECONDITION_FAILED", "Passkey authentication failed");
    }

    await createAndStoreSession(credential.userId);
    return { success: true };
  });
