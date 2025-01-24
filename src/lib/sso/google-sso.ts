import "server-only"

import { SITE_URL } from "@/constants";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Google } from "arctic";

export default async function getGoogleSSOClient() {
  const { env } = await getCloudflareContext()

  return new Google(
    env.GOOGLE_CLIENT_ID ?? "",
    env.GOOGLE_CLIENT_SECRET ?? "",
    `${SITE_URL}/sso/google/callback`
  )
}
