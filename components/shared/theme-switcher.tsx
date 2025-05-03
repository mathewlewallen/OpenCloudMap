import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
    variant="ghost"
    size="sm"
    className="rounded-full"
    onClick={toggleTheme}
    aria-label="Toggle theme"
  >
    {isDark ? (
      <Sun size={20} className="hover:text-primary transition" />
    ) : (
      <Moon size={20} className="hover:text-primary transition" />
    )}
  </Button>
  );
};

export default ThemeSwitcher;
