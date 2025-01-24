import "server-only"

import { getCloudflareContext } from "@opennextjs/cloudflare"
import { cache } from "react"

export async function isGoogleSSOEnabled() {
  const { env } = await getCloudflareContext()

  return Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)
}

export async function isTurnstileEnabled() {
  const { env } = await getCloudflareContext()
  return Boolean(env.TURNSTILE_SECRET_KEY)
}

export const getConfig = cache(async () => {
  return {
    isGoogleSSOEnabled: await isGoogleSSOEnabled(),
    isTurnstileEnabled: await isTurnstileEnabled(),
  }
})
