import React, { ReactNode } from "react"
import SideNav from "@/app/(auth)/dashboard/components/SideNav"
import ToggleSidebar from "@/app/(auth)/dashboard/components/ToggleSidebar"
import MobileSideNav from "@/app/(auth)/dashboard/components/MobileSideNav"
import { readUserSession } from "@/utils/actions"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: ReactNode }) {
  const { data: userSession } = await readUserSession()

  if (!userSession.session) {
    redirect("/auth")
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-col">
        {/* Green Banner */}
        <div className="w-full bg-green-600 px-4 py-2 text-center text-sm font-medium text-white">
          ⚠️ The dashboard is under development and currently showing placeholder data.
        </div>

        {/* Top Nav + Mobile Sidebar Trigger */}
        <div className="flex items-center justify-between border-b bg-background px-4 py-2">
          <ToggleSidebar />
          <MobileSideNav />
        </div>

        {/* Page Content */}
        <main className="flex-1 space-y-5 bg-gray-100 p-5 dark:bg-background sm:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
