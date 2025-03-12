import { Metadata } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import VerifyEmailClientComponent from "./verify-email.client";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const session = await getSessionFromCookie();
  const token = (await searchParams).token;

  if (session?.user.emailVerified) {
    return redirect('/dashboard');
  }

  if (!token) {
    return redirect('/sign-in');
  }

  return <VerifyEmailClientComponent />;
}
