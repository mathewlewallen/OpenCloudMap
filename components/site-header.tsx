import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="pl-4 pr-4 sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 w-full items-center justify-between bg-background pl-4 pr-4">
        {/* Left side: Logo + Nav */}
        <div className="flex items-center">
          <MainNav />
          <MobileNav />
        </div>

        {/* Right side: Icons */}
        <div className="flex items-center space-x-1">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Icons.gitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Icons.linkedin className="h-4 w-4 fill-current" />
              <span className="sr-only">LinkedIn</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
