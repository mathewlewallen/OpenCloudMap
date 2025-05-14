'use client';

import * as React from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { GrLinkedin, GrGithub } from 'react-icons/gr';
import BuyMeACoffee from '@/components/shared/buymeacoffee';
import { buttonVariants } from '@/components/ui/button';

const companyLinks = [
  { name: "Security", href: "/dashboard/security" },
  { name: "Privacy Policy", href: "/docs/privacy-policy" },
  { name: "Terms of Service", href: "/docs/terms-of-service" },
  { name: "Cookie Settings", href: "/docs/cookie-settings" },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Map', href: '/map' },
  { name: 'Security', href: '/dashboard/security' },
];

export function Footer() {
  const [copied, setCopied] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: hook up to your newsletter API
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 md:px-6 lg:px-8">
        {/* GRID: Newsletter | Quick Links | Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Newsletter Section */}
          <section aria-labelledby="newsletter-heading">
            <h2
              id="newsletter-heading"
              className="mb-3 text-lg font-bold tracking-tight"
            >
              Stay Connected
            </h2>
            <p className="mb-4 text-muted-foreground">
              Join our newsletter for the latest updates and exclusive offers.
            </p>

            <form onSubmit={onSubmit} className="relative flex w-full items-center">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                className="h-10 pr-10 rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 rounded-full"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>

            <p
              aria-live="polite"
              className={`mt-2 text-sm transition-opacity ${
                copied ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Thanks for subscribing!
            </p>

            <a
              href="https://www.buymeacoffee.com/mathewlewallen"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border px-5 py-2 text-sm font-medium transition hover:scale-105 hover:bg-accent"
            >
              <BuyMeACoffee className="h-5 w-5" />
              Buy me a coffee
            </a>
          </section>

          {/* Quick Links Section */}
          <nav aria-label="Quick links">
            <h3 className="mb-3 text-md font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-primary"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social & Docs Section */}
          <section aria-labelledby="social-heading" className="flex flex-col">
            <h3 id="social-heading" className="mb-3 text-md font-semibold">
              Connect
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <a
                aria-label="GitHub"
                href="https://github.com/mathewlewallen/opencloudmap"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                <GrGithub className="h-5 w-5" />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com/in/mathewlewallen"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                <GrLinkedin className="h-5 w-5" />
              </a>
            </div>
            {/* Documentation button placed below social icons */}
            <Link
              href="/docs"
              className={buttonVariants({ size: 'lg', className: 'w-full justify-center' })}
            >
              Documentation
            </Link>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Mathew Lewallen. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {companyLinks.slice(1).map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors hover:text-primary"
              >
                {name}
              </Link>
            ))}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}