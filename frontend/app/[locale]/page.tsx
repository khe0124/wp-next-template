import Link from "next/link";
import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: { locale: Locale };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await getDictionary(locale);
  const path = "";

  return buildLocalizedMetadata(locale, path, dictionary.home.metadata);
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params;
  const dictionary = await getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {dictionary.home.roleTag}
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-zinc-900 md:text-5xl">
          {dictionary.home.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-zinc-600">
          {dictionary.home.description.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 text-sm font-semibold text-zinc-900">
        {dictionary.home.cards.map((card) => (
          <Link
            key={card.label}
            href={`${basePath}${card.href}`}
            className="rounded-3xl border border-zinc-200 bg-white py-6 shadow-sm transition hover:-translate-y-1 hover:border-zinc-900"
          >
            {card.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

