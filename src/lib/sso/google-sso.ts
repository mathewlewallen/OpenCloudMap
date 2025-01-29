import "server-only"

import { SITE_URL } from "@/constants";
import { Google } from "arctic";

const googleSSOClient = new Google(
  process.env.GOOGLE_CLIENT_ID ?? "",
  process.env.GOOGLE_CLIENT_SECRET ?? "",
  `${SITE_URL}/sso/google/callback`
)

export default googleSSOClient;
