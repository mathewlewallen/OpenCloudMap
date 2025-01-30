import "server-only";

import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getDB } from "@/db";
import { passKeyCredentialTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PasskeysList } from "./passkey.client";

export default async function SecurityPage() {
  const session = await getSessionFromCookie();

  if (!session) {
    redirect("/sign-in");
  }

  const db = await getDB();
  const passkeys = await db
    .select()
    .from(passKeyCredentialTable)
    .where(eq(passKeyCredentialTable.userId, session.user.id));

  return (
    <div className="container max-w-4xl space-y-8">
      <PasskeysList passkeys={passkeys} email={session.user.email!} />
    </div>
  );
}

