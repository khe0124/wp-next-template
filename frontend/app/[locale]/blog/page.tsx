import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";
import { getPosts } from "@/lib/wp-queries";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/i18n/config";
import { AdSense } from "@/components/AdSense";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

const path = "/blog";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const meta = dictionary.blog.metadata;

  return buildLocalizedMetadata(locale, path, {
    title: meta.title,
    description: meta.description,
    type: meta.openGraph.type,
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const posts = await getPosts(10);

  // JSON-LD 구조화된 데이터 생성 (ItemList 스키마)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dictionary.blog.heroTitle,
    description: dictionary.blog.heroDescription,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/${locale}/blog/${post.databaseId}`,
        headline: post.title.replace(/<[^>]*>/g, ""),
        description: post.excerpt?.replace(/<[^>]*>/g, "").substring(0, 160),
        datePublished: post.date,
        author: post.author?.node
          ? {
              "@type": "Person",
              name: post.author.node.name,
            }
          : undefined,
        image: post.featuredImage?.node?.sourceUrl,
      },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {dictionary.common.nav.blog}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {dictionary.blog.heroTitle}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {dictionary.blog.heroDescription}
          </p>
        </header>

        {posts.length > 0 ? (
          <section
            className="space-y-8"
            aria-label="블로그 포스트 목록"
            aria-live="polite"
            aria-atomic="false"
          >
            {/* 광고 배치 (목록 상단) */}
            <AdSense slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST_TOP || ""} />

            {posts.map((post, index) => (
              <div key={post.id}>
                <PostCard
                  post={post}
                  locale={locale}
                  dateLocale={dictionary.blog.dateLocale}
                  readMoreLabel={dictionary.blog.readMoreLabel}
                />
                {/* 목록 중간에 광고 배치 (3번째 포스트 이후) */}
                {index === 2 && (
                  <AdSense slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST_MIDDLE || ""} />
                )}
              </div>
            ))}

            {/* 광고 배치 (목록 하단) */}
            <AdSense slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST_BOTTOM || ""} />
          </section>
        ) : (
          <div
            className="card rounded-lg border-dashed p-12 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm text-muted-foreground">
              {locale === "ko"
                ? "아직 게시된 글이 없습니다."
                : "No posts published yet."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
