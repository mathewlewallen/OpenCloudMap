'use client';

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import StartupStudioLogo from "./startupstudio-logo";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE_KEY = 'startup-studio-banner-collapsed';

export function StartupStudioStickyBanner() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Get initial state from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsCollapsed(JSON.parse(stored));
    }
    setIsHydrated(true);
  }, []);

  const toggleCollapsed = (value: boolean) => {
    setIsCollapsed(value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

  if (!isHydrated) return null; // Prevent flash of content

  return (
    <div className="fixed bottom-4 right-4 z-[100] print:hidden">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out transform",
          isCollapsed ? "translate-x-[calc(100%+1rem)]" : "translate-x-0"
        )}
      >
        <div className="relative flex items-center">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-0 h-8 w-8 rounded-full shadow-lg -translate-x-full",
              "bg-background hover:bg-background",
              "border-2 hover:border-border",
              isCollapsed ? "opacity-100" : "opacity-0"
            )}
            onClick={() => toggleCollapsed(false)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="bg-gray-100 dark:bg-background rounded-lg shadow-xl border-2">
            <div className="flex items-center gap-2">
              <a
                href="https://startupstudio.dev"
                target="_blank"
                className="flex items-center font-medium text-sm hover:text-foreground transition-colors py-3 pl-3"
              >
                <span className="whitespace-nowrap">Built by</span>
                <StartupStudioLogo className="h-7 w-7 mx-1.5" />
                <span className="whitespace-nowrap">startupstudio.dev</span>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mr-2"
                onClick={() => toggleCollapsed(true)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
