import { getSessionFromCookie } from "@/utils/auth"
import { NextResponse } from "next/server"
import { tryCatch } from "@/lib/try-catch"

export async function GET() {
  const { data, error } = await tryCatch(getSessionFromCookie())

  const headers = new Headers()
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")

  if (error) {
    return NextResponse.json(null, {
      headers
    })
  }

  return NextResponse.json(data, {
    headers
  })
}
