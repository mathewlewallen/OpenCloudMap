"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { purchaseCredits } from "@/actions/credits";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { CREDIT_PACKAGES } from "@/constants";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CreditPackages() {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async (packageId: string) => {
    try {
      setIsPurchasing(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Failed to load Stripe");

      // For now, we'll use a test payment method ID
      // In production, you should use Stripe Elements to collect card details
      await purchaseCredits({
        packageId,
        // TODO This seems wrong
        paymentMethodId: "pm_card_visa", // Test payment method ID
      });

      toast.success("Credits purchased successfully!");

      // Refresh the page to show updated credit balance
      window.location.reload();
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process payment");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Packages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {CREDIT_PACKAGES.map((pkg) => (
            <Card key={pkg.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      {pkg.credits.toLocaleString()} credits
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${pkg.price}
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={isPurchasing}
                  >
                    Purchase
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
