import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: { locale: Locale };
};

const path = "/blog";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await getDictionary(locale);

  return buildLocalizedMetadata(locale, path, dictionary.blog.metadata);
}

export default async function BlogPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold text-zinc-500">
          {dictionary.common.nav.blog}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
          {dictionary.blog.heroTitle}
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          {dictionary.blog.heroDescription}
        </p>
      </header>

      <section className="space-y-4">
        {dictionary.blog.posts.map((post) => (
          <article
            key={`${post.title}-${post.date}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              <span>{post.category}</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(
                  dictionary.blog.dateLocale,
                )}
              </time>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-900">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600">{post.summary}</p>
            <button className="mt-6 text-sm font-semibold text-zinc-900">
              {dictionary.blog.readMoreLabel}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

