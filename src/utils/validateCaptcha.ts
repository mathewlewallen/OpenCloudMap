import { isTurnstileEnabled } from "@/flags"
import { getCloudflareContext } from "@opennextjs/cloudflare"

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

export async function validateTurnstileToken(token: string) {
  if (!(await isTurnstileEnabled())) {
    return true
  }

  const { env } = await getCloudflareContext()

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  )

  const data = await response.json() as TurnstileResponse

  return data.success
}
