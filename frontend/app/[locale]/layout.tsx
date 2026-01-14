import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ThemeToggle } from "@/components/ThemeToggle";
import "../globals.css";

const languageNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

type NavKey = "home" | "resume" | "project" | "contact" | "blog";

const navEntries: { key: NavKey; path: string }[] = [
  { key: "home", path: "" },
  { key: "resume", path: "/resume" },
  { key: "project", path: "/project" },
  { key: "contact", path: "/contact" },
  { key: "blog", path: "/blog" },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link
            href={basePath}
            className="text-lg font-semibold"
            aria-label={`${dictionary.common.brand} 홈으로 이동`}
          >
            {dictionary.common.brand}
          </Link>
          <nav
            className="flex flex-wrap items-center gap-5 text-sm font-medium text-zinc-600 dark:text-zinc-400"
            aria-label="주요 네비게이션"
          >
            {navEntries.map((nav) => (
              <Link
                key={nav.key}
                href={`${basePath}${nav.path}`}
                className="transition hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`${dictionary.common.nav[nav.key]} 페이지로 이동`}
              >
                {dictionary.common.nav[nav.key]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span id="language-label">{dictionary.common.languagesLabel}</span>
              <div
                className="flex gap-1"
                role="group"
                aria-labelledby="language-label"
              >
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    aria-label={`${dictionary.common.languagesLabel} ${languageNames[loc]}`}
                    aria-pressed={loc === locale}
                    role="button"
                    className={`rounded-full border px-3 py-1 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      loc === locale
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {languageNames[loc]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6 py-12" role="main">
        {children}
      </main>
      <footer className="border-t border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Haeun Park.</p>
          <p>{dictionary.common.footer.crafted}</p>
        </div>
      </footer>
    </div>
  );
}

