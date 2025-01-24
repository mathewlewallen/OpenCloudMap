import {
  GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME,
  GOOGLE_OAUTH_STATE_COOKIE_NAME
} from "@/constants";
import getGoogleSSOClient from "@/lib/sso/google-sso";
import { withRateLimit, RATE_LIMITS } from "@/utils/with-rate-limit";
import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getDB } from "@/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema";
import { createAndStoreSession, getSessionFromCookie } from "@/utils/auth";
import { isGoogleSSOEnabled } from "@/flags";
import { getIP } from "@/utils/getIP";

type GoogleSSOResponse = {
  /**
   * Issuer
   * Example: https://accounts.google.com
   */
  iss: string
  /**
   * Authorized party
   * Example: 111111111111-x403h5fq3e4ts2qa022tcgdpm9lqhvj5.apps.googleusercontent.com
   */
  azp: string
  /**
   * Audience
   * Example: 111111111111-x403h5fq3e4ts2qa022tcgdpm9lqhvj5.apps.googleusercontent.com
   */
  aud: string
  /**
   * Subject
   * Example: 111111111111111111111
   */
  sub: string
  email: string
  email_verified: boolean
  /**
   * Access token hash
   * Example: HhYIlZToOmC0QB1-N_SzE
   */
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}

export async function GET(request: NextRequest) {
  return withRateLimit(async () => {
    if (!(await isGoogleSSOEnabled())) {
      console.error("Google client ID or secret is not set")
      return redirect('/')
    }

    const session = await getSessionFromCookie()

    if (session) {
      return redirect('/dashboard')
    }

    const queryParamCode = request.nextUrl.searchParams.get("code")
    const queryParamState = request.nextUrl.searchParams.get("state")

    const cookieStore = await cookies()
    const cookieState = cookieStore.get(GOOGLE_OAUTH_STATE_COOKIE_NAME)?.value ?? null
    const cookieCodeVerifier = cookieStore.get(GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME)?.value ?? null

    if (!queryParamCode || !queryParamState || !cookieState || !cookieCodeVerifier) {
      console.error("Google OAuth callback: Missing query parameters or cookies")
      return redirect('/')
    }

    if (queryParamState !== cookieState) {
      console.error("Google OAuth callback: State mismatch")
      return redirect('/')
    }

    let tokens: OAuth2Tokens

    try {
      const google = await getGoogleSSOClient()

      tokens = await google.validateAuthorizationCode(queryParamCode, cookieCodeVerifier);
    } catch (error) {
      console.error("Google OAuth callback: Error validating authorization code", error)
      return redirect('/')
    }

    const claims = decodeIdToken(tokens.idToken()) as GoogleSSOResponse

    const googleAccountId = claims.sub
    const avatarUrl = claims.picture
    const email = claims.email

    const db = await getDB()

    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.googleAccountId, googleAccountId)
    })

    if (existingUser?.id) {
      await createAndStoreSession(existingUser.id)

      return redirect('/dashboard')
    }

    const [user] = await db.insert(userTable)
      .values({
        googleAccountId,
        firstName: claims.given_name || claims.name || null,
        lastName: claims.family_name || null,
        avatar: avatarUrl,
        email,
        emailVerified: claims?.email_verified ? new Date() : null,
        signUpIpAddress: await getIP(),
      })
      .returning()

    await createAndStoreSession(user.id)

    redirect('/dashboard')

  }, RATE_LIMITS.GOOGLE_SSO_CALLBACK)
}
