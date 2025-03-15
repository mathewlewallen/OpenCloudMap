import "server-only"

import { z } from "zod"
import { getSessionFromCookie } from "@/utils/auth"
import { jsonResponse } from "@/utils/api"

const purchaseSchema = z.object({
  componentId: z.string(),
  credits: z.number().int().positive(),
})

// TODO: Implement credit checking and deduction and also implmenet it as a server action
export async function POST(request: Request) {
  const session = await getSessionFromCookie()

  if (!session) {
    return jsonResponse({
      error: "Unauthorized",
      message: "You must be logged in to purchase components",
    }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { componentId, credits } = purchaseSchema.parse(body)

    // TODO: Implement credit checking and deduction
    // TODO: Add the component to user's purchased components

    return jsonResponse({
      success: true,
      message: "Component purchased successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({
        error: "Invalid request",
        message: "Invalid request body",
        details: error.errors,
      }, { status: 400 })
    }

    return jsonResponse({
      error: "Internal server error",
      message: "Something went wrong",
    }, { status: 500 })
  }
}
