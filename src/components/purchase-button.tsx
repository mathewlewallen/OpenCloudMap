"use client"

import { useState } from "react"
import { toast } from "sonner"
import ShinyButton from "@/components/ui/shiny-button"

interface PurchaseButtonProps {
  componentId: string
  credits: number
}

interface ApiResponse {
  success?: boolean
  error?: string
  message: string
  details?: unknown
}

export default function PurchaseButton({ componentId, credits }: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    try {
      setIsLoading(true)
      // TODO: Implement credit checking and deduction and also implmenet it as a server action
      const response = await fetch("/api/marketplace/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          componentId,
          credits,
        }),
      })

      const data = (await response.json()) as ApiResponse

      if (!response.ok) {
        throw new Error(data.message || "Failed to purchase component")
      }

      toast.success("Component purchased successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to purchase component")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ShinyButton
      onClick={handlePurchase}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Purchase"}
    </ShinyButton>
  )
}
