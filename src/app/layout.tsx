import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import "server-only";

import { ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/constants";
import { StartupStudioStickyBanner } from "@/components/startup-studio-sticky-banner";
import { getSessionFromCookie } from "@/utils/auth";
import { getConfig } from "@/flags";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: ["SaaS", "Next.js", "React", "TypeScript", "Cloudflare Workers", "Edge Computing"],
  authors: [{ name: "Lubomir Georgiev" }],
  creator: "Lubomir Georgiev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@LubomirGeorg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// This component will be wrapped in Suspense in the BaseLayout
async function SessionProvider({ children }: { children: React.ReactNode }) {
  // These async operations will be handled by Suspense in the parent component
  const session = await getSessionFromCookie();
  const config = await getConfig();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      session={session}
      config={config}
    >
      <TooltipProvider
        delayDuration={100}
        skipDelayDuration={50}
      >
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense fallback={<ThemeProviderFallback>{children}</ThemeProviderFallback>}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Suspense>
        <Toaster richColors closeButton position="top-right" expand duration={7000} />
        <StartupStudioStickyBanner />
      </body>
    </html>
  );
}

function ThemeProviderFallback({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      session={null}
      config={{ isGoogleSSOEnabled: false, isTurnstileEnabled: false }}
    >
      <TooltipProvider
        delayDuration={100}
        skipDelayDuration={50}
      >
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
