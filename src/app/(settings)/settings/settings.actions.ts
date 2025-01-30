"use server";

import { createServerAction, ZSAError } from "zsa";
import { getDB } from "@/db";
import { userTable } from "@/db/schema";
import { getSessionFromCookie } from "@/utils/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { userSettingsSchema } from "@/schemas/settings.schema";
import { updateAllSessionsOfUser } from "@/utils/kv-session";
import { withRateLimit, RATE_LIMITS } from "@/utils/with-rate-limit";

export const updateUserProfileAction = createServerAction()
  .input(userSettingsSchema)
  .handler(async ({ input }) => {
    return withRateLimit(
      async () => {
        const session = await getSessionFromCookie();

        if (!session) {
          throw new ZSAError(
            "NOT_AUTHORIZED",
            "Not authenticated"
          );
        }

        if (!session?.user?.emailVerified) {
          throw new ZSAError(
            "NOT_AUTHORIZED",
            "Email not verified"
          );
        }

        const db = await getDB();

        try {
          await db.update(userTable)
            .set({
              ...input,
            })
            .where(eq(userTable.id, session.user.id));

          await updateAllSessionsOfUser(session.user.id)

          revalidatePath("/settings");
          return { success: true };
        } catch (error) {
          console.error(error)
          throw new ZSAError(
            "INTERNAL_SERVER_ERROR",
            "Failed to update profile"
          );
        }
      },
      RATE_LIMITS.SETTINGS
    );
  });
