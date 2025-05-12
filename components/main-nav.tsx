"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-2 hidden gap-4 md:flex md:gap-8 bg-background">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      <nav className="flex gap-4">
        {siteConfig.navGroups.map((group) =>
          group.items.length > 1 ? (
            <DropdownMenu key={group.title}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm font-medium px-10">
                  {group.title}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {group.items.map((item) => {
                  const Icon = item.icon ? Icons[item.icon] : undefined
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href ?? "#"}
                        className={cn(
                          "flex items-center",
                          pathname === item.href && "font-semibold"
                        )}
                      >
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            group.items.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : undefined
              return (
                <Link
                  key={item.href}
                  href={item.href ?? "#"}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    pathname === item.href && "text-foreground font-semibold"
                  )}
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {item.title}
                </Link>
              )
            })
          )
        )}
      </nav>
    </div>
  )
}
