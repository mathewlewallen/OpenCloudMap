"use client"

import React from "react"
import { PersonIcon, CrumpledPaperIcon, HomeIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export default function NavLinks() {
  const pathname = usePathname()

  const links = [
    {
      href: "/dashboard",
      text: "Dashboard",
      Icon: HomeIcon,
    },
    {
      href: "/dashboard/members",
      text: "Members",
      Icon: PersonIcon,
    },
    {
      href: "/dashboard/todo",
      text: "Todo",
      Icon: CrumpledPaperIcon,
    },
  ]

  return (
    <div className="space-y-2">
      {links.map((link) => {
        const Icon = link.Icon
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() =>
              document.getElementById("sidebar-close")?.click()
            }
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {link.text}
          </Link>
        )
      })}
    </div>
  )
}
