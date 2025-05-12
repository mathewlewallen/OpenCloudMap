"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

export default function ToggleSidebar() {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="block lg:hidden"
      onClick={() => document.getElementById("toggle-sidebar")?.click()}
      aria-label="Toggle sidebar"
    >
      <HamburgerMenuIcon className="h-4 w-4" />
    </Button>
  )
}
