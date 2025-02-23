import { Button } from "@/components/ui/button";
import { GITHUB_REPO_URL } from "@/constants";
import Link from "next/link";
import ShinyButton from "@/components/ui/shiny-button";
import { getTotalUsers } from "@/utils/stats";

export async function Hero() {
  const totalUsers = await getTotalUsers();

  return (
    <div className="relative isolate pt-14 dark:bg-gray-900">
      <div className="pt-20 pb-24 sm:pt-20 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-10 flex justify-center gap-4 flex-wrap">
              <ShinyButton className="rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                100% Free & Open Source
              </ShinyButton>
              {Boolean(totalUsers) && (
                <ShinyButton className="rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  {totalUsers} Users & Growing
                </ShinyButton>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Production-Ready SaaS Template
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A modern, open-source template for building SaaS applications with Next.js 14,
              Cloudflare Workers, and everything you need to launch quickly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4 md:gap-x-6">
              <Link href={GITHUB_REPO_URL} target="_blank">
                <Button size="lg" className="rounded-full">
                  View on GitHub
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg" className="rounded-full">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
