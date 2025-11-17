import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const languageNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: Locale };
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
  const locale = params.locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href={basePath} className="text-lg font-semibold">
            {dictionary.common.brand}
          </Link>
          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-zinc-600">
            {navEntries.map((nav) => (
              <Link
                key={nav.key}
                href={`${basePath}${nav.path}`}
                className="transition hover:text-black"
              >
                {dictionary.common.nav[nav.key]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{dictionary.common.languagesLabel}</span>
            <div className="flex gap-1">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  aria-label={`${dictionary.common.languagesLabel} ${languageNames[loc]}`}
                  className={`rounded-full border px-3 py-1 ${
                    loc === locale
                      ? "border-black bg-black text-white"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {languageNames[loc]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-zinc-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Haeun Park.</p>
          <p>{dictionary.common.footer.crafted}</p>
        </div>
      </footer>
    </div>
  );
}

