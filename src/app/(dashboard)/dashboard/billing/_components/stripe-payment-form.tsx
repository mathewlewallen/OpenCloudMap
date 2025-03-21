"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { confirmPayment } from "@/actions/credits";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { getPackageIcon } from "./credit-packages";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripePaymentFormProps {
  packageId: string;
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
  credits: number;
  price: number;
}

function PaymentForm({ packageId, clientSecret, onSuccess, onCancel, credits, price }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed");
      } else {
        // The payment was successful
        const paymentIntent = await stripe.retrievePaymentIntent(clientSecret);
        if (paymentIntent.paymentIntent) {
          const { success } = await confirmPayment({
            packageId,
            paymentIntentId: paymentIntent.paymentIntent.id,
          });

          if (success) {
            toast.success("Payment successful!");
            onSuccess();
          } else {
            toast.error("Payment failed");
          }
        } else {
          throw new Error("No payment intent found");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getPackageIcon(credits)}
                <div>
                  <div className="text-2xl font-bold">
                    {credits.toLocaleString()} credits
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${price}
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="text-sm text-muted-foreground">
              Your payment is secure and encrypted. Credits will be added to your account immediately after successful payment.
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        <PaymentElement />
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isProcessing || !stripe || !elements}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function StripePaymentForm(props: StripePaymentFormProps) {
  const { resolvedTheme: theme } = useTheme();

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret,
        appearance: {
          theme: theme === "dark" ? "night" : "stripe",
        },
      }}
    >
      <PaymentForm {...props} />
    </Elements>
  );
}
