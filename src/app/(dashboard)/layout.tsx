import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getSessionFromCookie()

  if (!session) {
    redirect('/')
  }

  return (
    <>{children}</>
  );
}
