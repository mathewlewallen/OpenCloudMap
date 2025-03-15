"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FREE_MONTHLY_CREDITS } from "@/constants";

interface CreditBalanceProps {
  credits: number;
}

export function CreditBalance({ credits }: CreditBalanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold">
            {credits.toLocaleString()} credits
          </div>
          <div className="text-sm text-muted-foreground">
            You get {FREE_MONTHLY_CREDITS} free credits every month.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
