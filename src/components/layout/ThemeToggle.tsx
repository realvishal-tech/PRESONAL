"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed right-6 top-24 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 shadow-lg backdrop-blur hover:scale-105"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
