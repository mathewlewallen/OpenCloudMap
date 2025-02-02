import Link from "next/link";
import { SiX as XIcon, SiGithub as GithubIcon } from '@icons-pack/react-simple-icons'
import ThemeSwitch from "@/components/theme-switch";
import { GITHUB_REPO_URL, SITE_NAME } from "@/constants";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="border-t dark:bg-muted/30 bg-muted/60 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8">
          {/* Responsive grid with better mobile spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
            {/* Legal Links */}
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
              <h3 className="text-sm font-semibold text-foreground text-center sm:text-left">Legal</h3>
              <ul className="space-y-2 flex flex-col items-center sm:items-start">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground text-center sm:text-left">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground text-center sm:text-left">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
              <h3 className="text-sm font-semibold text-foreground text-center sm:text-left">Company</h3>
              <ul className="space-y-2 flex flex-col items-center sm:items-start">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground text-center sm:text-left">
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links and Theme Switch */}
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
              <h3 className="text-sm font-semibold text-foreground text-center sm:text-left">Social</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/LubomirGeorgiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <GithubIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://x.com/LubomirGeorg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">X (formerly Twitter)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright - Optimized for mobile */}
          <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </p>

              <div className="flex items-center space-x-3 sm:space-x-4">
                {GITHUB_REPO_URL && (
                  <Button variant="outline" size="sm" className="h-8 sm:h-9" asChild>
                    <Link
                      href={GITHUB_REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>Fork on Github</span>
                    </Link>
                  </Button>
                )}
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
