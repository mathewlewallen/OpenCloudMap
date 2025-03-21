"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactions } from "@/actions/credits.action";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isPast } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useTransactionStore } from "@/state/transaction";

type TransactionData = Awaited<ReturnType<typeof getTransactions>>

function isTransactionExpired(transaction: TransactionData["transactions"][number]): boolean {
  return transaction.expirationDate ? isPast(new Date(transaction.expirationDate)) : false;
}

export function TransactionHistory() {
  const [data, setData] = useState<TransactionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const refreshTrigger = useTransactionStore((state) => state.refreshTrigger);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactions({ page });
        setData(result);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page, refreshTrigger]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Boolean(data?.transactions.length && data?.transactions.length > 0) ? data?.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="capitalize">
                  {transaction.type.toLowerCase().replace("_", " ")}
                </TableCell>
                <TableCell
                  className={
                    transaction.type === "USAGE"
                      ? "text-red-500"
                      : isTransactionExpired(transaction)
                      ? "text-orange-500"
                      : "text-green-500"
                  }
                >
                  {transaction.type === "USAGE" ? "-" : "+"}
                  {Math.abs(transaction.amount)}
                </TableCell>
                <TableCell>
                  {transaction.description}
                  {transaction.type !== "USAGE" && transaction.expirationDate && (
                    <Badge
                      variant="secondary"
                      className={`mt-1 ml-3 font-normal text-[0.75rem] leading-[1rem] ${
                        isTransactionExpired(transaction)
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-muted"
                      }`}
                    >
                      {isTransactionExpired(transaction) ? "Expired: " : "Expires: "}
                      {format(new Date(transaction.expirationDate), "MMM d, yyyy")}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">No transactions found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {Boolean(data?.pagination.pages && data.pagination.pages > 1) && (
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {data?.pagination.pages ?? 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(data?.pagination.pages ?? 1, p + 1))}
              disabled={page === (data?.pagination.pages ?? 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
