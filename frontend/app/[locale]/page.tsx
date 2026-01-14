import Link from "next/link";
import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const path = "";

  return buildLocalizedMetadata(locale, path, dictionary.home.metadata);
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {dictionary.home.roleTag}
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-zinc-900 dark:text-zinc-50 md:text-5xl">
          {dictionary.home.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          {dictionary.home.description.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <nav
        className="grid w-full max-w-2xl grid-cols-2 gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        aria-label="주요 섹션 네비게이션"
      >
        {dictionary.home.cards.map((card) => (
          <Link
            key={card.label}
            href={`${basePath}${card.href}`}
            className="rounded-3xl border border-zinc-200 bg-white py-6 shadow-sm transition hover:-translate-y-1 hover:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-500"
            aria-label={`${card.label} 페이지로 이동`}
          >
            {card.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

