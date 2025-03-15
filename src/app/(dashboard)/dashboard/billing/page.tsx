import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { CreditBalance } from "./_components/credit-balance";
import { TransactionHistory } from "./_components/transaction-history";
import { CreditPackages } from "./_components/credit-packages";

export default async function BillingPage() {
  const session = await getSessionFromCookie();

  if (!session) {
    redirect("/auth/login");
  }

  const currentCredits = session.user.currentCredits;

  return (
    <>
      <PageHeader
        items={[
          {
            href: "/dashboard",
            label: "Dashboard"
          },
          {
            href: "/dashboard/billing",
            label: "Billing"
          }
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <CreditBalance credits={currentCredits} />
            <TransactionHistory />
          </div>
          <div>
            <CreditPackages />
          </div>
        </div>
      </div>
    </>
  );
}
