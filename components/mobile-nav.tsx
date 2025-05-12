// app/components/MobileNav.tsx
"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  // Only show nav‐groups that are *not* authRequired
  const freeGroups = siteConfig.navGroups.filter((g) => !g.authRequired)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64">
        {/* Header with logo */}
        <div className="flex items-center px-4 py-2">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
        </div>

        <ScrollArea className="px-4">
          {freeGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <h4 className="px-2 py-1 font-semibold text-sm">{group.title}</h4>
              <nav className="flex flex-col space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href || ""}
                    className={cn(
                      "block px-2 py-2 rounded hover:bg-muted",
                    )}
                    onClick={() => {
                      setOpen(false)
                      router.push(item.href || "")
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* login / signup at the bottom */}
          <div className="mt-8 space-y-2">
            <Link href={siteConfig.links.login} passHref>
              <Button size="sm" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href={siteConfig.links.signup} passHref>
              <Button size="sm" variant="secondary" className="w-full">
                Sign up
              </Button>
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
