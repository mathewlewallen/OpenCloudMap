"use client"

import React from "react"
import NavLinks from "@/app/(auth)/dashboard/components/NavLinks"
import { cn } from "@/lib/utils"
import { LogoutButton } from "@/components/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"

export default function SideNav() {
  return (
    <SideBar className="hidden lg:block bg-background dark:bg-gradient-dark flex-1" />
  )
}

export const SideBar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div
        className={cn(
          "h-full w-full lg:w-72 xl:w-80 p-6 space-y-6 border-r flex flex-col"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {siteConfig.name}
          </h1>
          <ThemeToggle />
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>

        {/* Footer */}
        <div className="pt-4 border-t">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
