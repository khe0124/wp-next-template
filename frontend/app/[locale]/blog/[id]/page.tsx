import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";
import { getPost, getAllPostIds } from "@/lib/wp-queries";
import type { Post } from "@/types/wp-graphql";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/i18n/config";
import { SocialShare } from "@/components/SocialShare";
import { AdSense } from "@/components/AdSense";

type PageProps = {
  params: Promise<{ locale: Locale; id: string }>;
};

/**
 * HTML 태그 제거 및 텍스트 추출
 */
function stripHtml(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim();
}

export async function generateStaticParams() {
  const ids = await getAllPostIds();

  // 모든 로케일에 대해 경로 생성
  const locales: Locale[] = ["ko", "en"];

  return locales.flatMap((locale) =>
    ids.map((id: number) => ({
      locale,
      id: id.toString(),
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const dictionary = await getDictionary(locale);
  const post = await getPost(id, "DATABASE_ID");

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = stripHtml(post.title) || "Blog Post";
  const description =
    stripHtml(post.seo?.metaDesc || post.excerpt)?.substring(0, 160) ||
    dictionary.blog.metadata.description;
  const ogImage = post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl;
  const tags = post.tags?.nodes?.map((tag) => tag.name) || [];

  return buildLocalizedMetadata(locale, `/blog/${id}`, {
    title: post.seo?.title || title,
    description,
    image: ogImage,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified,
    author: post.author?.node?.name,
    tags,
  });
}

export default async function PostDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const dictionary = await getDictionary(locale);
  const post = await getPost(id, "DATABASE_ID");

  if (!post) {
    notFound();
  }

  const title = stripHtml(post.title);
  const thumbnail = post.featuredImage?.node;
  const thumbnailAlt = thumbnail?.altText || `${title} - 포스트 이미지`;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(dictionary.blog.dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const formattedModifiedDate = post.modified
    ? new Date(post.modified).toLocaleDateString(dictionary.blog.dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // JSON-LD 구조화된 데이터 생성
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: stripHtml(post.seo?.metaDesc || post.excerpt),
    image: thumbnail?.sourceUrl
      ? {
          "@type": "ImageObject",
          url: thumbnail.sourceUrl,
          width: thumbnail.mediaDetails?.width,
          height: thumbnail.mediaDetails?.height,
        }
      : undefined,
    datePublished: post.date,
    dateModified: post.modified,
    author: post.author?.node
      ? {
          "@type": "Person",
          name: post.author.node.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Haeun Portfolio",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/blog/${id}`,
    },
    articleSection: post.categories?.nodes?.map((cat) => cat.name),
    keywords: post.tags?.nodes?.map((tag) => tag.name).join(", "),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article
        className="space-y-10"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* 헤더 섹션 */}
        <header className="space-y-6">
          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {formattedDate && (
              <time
                dateTime={post.date}
                className="font-medium text-muted-foreground"
                itemProp="datePublished"
              >
                <span className="sr-only">게시일: </span>
                {formattedDate}
              </time>
            )}
            {formattedModifiedDate && formattedModifiedDate !== formattedDate && (
              <time
                dateTime={post.modified}
                className="text-muted-foreground/70"
                itemProp="dateModified"
              >
                <span className="sr-only">수정일: </span>
                (수정: {formattedModifiedDate})
              </time>
            )}
            {post.author?.node && (
              <div className="text-muted-foreground">
                <span className="sr-only">작성자: </span>
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{post.author.node.name}</span>
                </span>
              </div>
            )}
          </div>

          {/* 제목 */}
          <h1
            className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
            itemProp="headline"
          >
            {title}
          </h1>

          {/* 썸네일 이미지 */}
          {thumbnail?.sourceUrl && (
            <figure className="mt-8 overflow-hidden rounded-lg bg-muted">
              <Image
                src={thumbnail.sourceUrl}
                alt={thumbnailAlt}
                width={thumbnail.mediaDetails?.width || 1200}
                height={thumbnail.mediaDetails?.height || 600}
                className="h-auto w-full object-cover"
                priority
                itemProp="image"
              />
              {thumbnail.altText && (
                <figcaption className="sr-only">{thumbnail.altText}</figcaption>
              )}
            </figure>
          )}
        </header>

        {/* 요약 (Excerpt) */}
        {post.excerpt && (
          <div
            className="card rounded-lg p-6 text-lg leading-relaxed"
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}

        {/* 본문 콘텐츠 */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:rounded-lg prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-4 prose-blockquote:border-l-border prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-muted-foreground"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 광고 배치 (본문 중간) */}
        <AdSense slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || ""} />

        {/* 소셜 공유 버튼 */}
        <div className="border-t border-border pt-8">
          <SocialShare
            url={`${siteUrl}/${locale}/blog/${id}`}
            title={title}
            description={stripHtml(post.seo?.metaDesc || post.excerpt)}
          />
        </div>

        {/* 카테고리 및 태그 */}
        {(post.categories?.nodes && post.categories.nodes.length > 0) ||
        (post.tags?.nodes && post.tags.nodes.length > 0) ? (
          <footer className="space-y-4 border-t border-border pt-8">
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div>
                <h2 className="sr-only">카테고리</h2>
                <div className="flex flex-wrap gap-2" aria-label="카테고리">
                  {post.categories.nodes.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                      itemProp="articleSection"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {post.tags?.nodes && post.tags.nodes.length > 0 && (
              <div>
                <h2 className="sr-only">태그</h2>
                <div className="flex flex-wrap gap-2" aria-label="태그">
                  {post.tags.nodes.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                      itemProp="keywords"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </footer>
        ) : null}

        {/* 네비게이션 */}
        <nav
          className="border-t border-border pt-8"
          aria-label="포스트 네비게이션"
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-ring focus:outline-none"
            aria-label={locale === "ko" ? "블로그 목록으로 돌아가기" : "Back to blog list"}
          >
            <span aria-hidden="true">←</span>
            {locale === "ko" ? "목록으로 돌아가기" : "Back to Blog"}
          </Link>
        </nav>

      {/* 스키마 마크업을 위한 숨김 메타데이터 */}
      <meta itemProp="url" content={`/${locale}/blog/${id}`} />
      {post.seo?.metaDesc && (
        <meta itemProp="description" content={stripHtml(post.seo.metaDesc)} />
      )}
      </article>
    </>
  );
}
