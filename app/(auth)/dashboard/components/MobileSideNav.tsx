"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideBar } from "@/app/(auth)/dashboard/components/SideNav"
import { Button } from "@/components/ui/button"

export default function MobileSideNav() {
  const sidebarRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const handleResize = (e: UIEvent) => {
      const w = e.target as Window
      if (w.innerWidth >= 1024) {
        sidebarRef.current?.click()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          id="toggle-sidebar"
          ref={sidebarRef}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex">
        <SideBar />
      </SheetContent>
    </Sheet>
  )
}
