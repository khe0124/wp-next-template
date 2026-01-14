"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="테마 전환"
        disabled
        aria-disabled="true"
      >
        <span className="inline-block h-3 w-3" aria-hidden="true">🌓</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
      aria-label={`${theme === "light" ? "다크" : "라이트"} 모드로 전환`}
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? (
        <span className="inline-block h-3 w-3" aria-hidden="true">🌙</span>
      ) : (
        <span className="inline-block h-3 w-3" aria-hidden="true">☀️</span>
      )}
    </button>
  );
}

