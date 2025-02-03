import "server-only";
import { checkRateLimit } from "./rate-limit";
import { getIP } from "./getIP";
import ms from "ms";
import isProd from "./isProd";

interface RateLimitConfig {
  identifier: string;
  limit: number;
  windowInSeconds: number;
}

export async function withRateLimit<T>(
  action: () => Promise<T>,
  config: RateLimitConfig
): Promise<T> {

  if (!isProd) {
    return action();
  }

  const ip = await getIP();

  const rateLimitResult = await checkRateLimit({
    key: ip || "",
    options: {
      identifier: config.identifier,
      limit: config.limit,
      windowInSeconds: config.windowInSeconds,
    },
  });

  if (!rateLimitResult.success) {
    throw new Error(
      `Rate limit exceeded. Try again in ${Math.ceil(
        (rateLimitResult.reset - Date.now() / 1000) / 60
      )} minutes.`
    );
  }

  return action();
}

// Common rate limit configurations
export const RATE_LIMITS = {
  SIGN_IN: {
    identifier: "sign-in",
    limit: 15,
    windowInSeconds: Math.floor(ms("60 minutes") / 1000),
  },
  GOOGLE_SSO_REQUEST: {
    identifier: "google-sso-request",
    limit: 15,
    windowInSeconds: Math.floor(ms("60 minutes") / 1000),
  },
  GOOGLE_SSO_CALLBACK: {
    identifier: "google-sso-callback",
    limit: 15,
    windowInSeconds: Math.floor(ms("60 minutes") / 1000),
  },
  SIGN_UP: {
    identifier: "sign-up",
    limit: 3,
    windowInSeconds: Math.floor(ms("1 hour") / 1000),
  },
  SIGN_OUT: {
    identifier: "sign-out",
    limit: 5,
    windowInSeconds: Math.floor(ms("10 minutes") / 1000),
  },
  RESET_PASSWORD: {
    identifier: "auth",
    limit: 7,
    windowInSeconds: Math.floor(ms("1 hour") / 1000),
  },
  DELETE_SESSION: {
    identifier: "delete-session",
    limit: 10,
    windowInSeconds: Math.floor(ms("10 minutes") / 1000),
  },
  EMAIL: {
    identifier: "email",
    limit: 10,
    windowInSeconds: Math.floor(ms("1 hour") / 1000),
  },
  FORGOT_PASSWORD: {
    identifier: "forgot-password",
    limit: 4,
    windowInSeconds: Math.floor(ms("1 hour") / 1000),
  },
  SETTINGS: {
    identifier: "settings",
    limit: 10,
    windowInSeconds: Math.floor(ms("5 minutes") / 1000),
  },
} as const;
