/**
 * PostCard 컴포넌트
 * SEO 최적화 및 웹 접근성을 고려한 포스트 카드 컴포넌트
 * - 고대비 모드 지원
 * - 스크린 리더 최적화
 * - Semantic HTML 사용
 */

import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/wp-graphql";
import type { Locale } from "@/i18n/config";

interface PostCardProps {
  post: Post;
  locale: Locale;
  dateLocale?: string;
  readMoreLabel?: string;
}

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

/**
 * 포스트 제목 추출 (HTML 제거)
 */
function getPostTitle(post: Post): string {
  return stripHtml(post.title);
}

/**
 * 포스트 요약 추출 (HTML 제거)
 */
function getPostExcerpt(post: Post, maxLength = 150): string {
  const excerpt = stripHtml(post.excerpt);
  if (excerpt.length <= maxLength) return excerpt;
  return excerpt.substring(0, maxLength).trim() + "...";
}

/**
 * 포스트 썸네일 URL 추출
 */
function getPostThumbnail(post: Post): string | null {
  return post.featuredImage?.node?.sourceUrl || null;
}

/**
 * 포스트 썸네일 alt 텍스트
 */
function getPostThumbnailAlt(post: Post): string {
  const altText = post.featuredImage?.node?.altText;
  if (altText) return altText;
  return `${getPostTitle(post)} - 썸네일 이미지`;
}

export function PostCard({
  post,
  locale,
  dateLocale = "ko-KR",
  readMoreLabel = "더 읽기",
}: PostCardProps) {
  const title = getPostTitle(post);
  const excerpt = getPostExcerpt(post);
  const thumbnail = getPostThumbnail(post);
  const thumbnailAlt = getPostThumbnailAlt(post);
  const postUrl = `/${locale}/blog/${post.databaseId}`;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article
      className="group card relative overflow-hidden p-6 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* 썸네일 이미지 */}
      {thumbnail && (
        <div className="relative mb-6 overflow-hidden rounded-lg bg-muted">
          <Link
            href={postUrl}
            className="block focus-ring focus:outline-none"
            aria-label={`${title} 포스트 읽기`}
          >
            <Image
              src={thumbnail}
              alt={thumbnailAlt}
              width={800}
              height={400}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              itemProp="image"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}

      {/* 메타 정보 */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {formattedDate && (
          <time
            dateTime={post.date}
            className="font-medium text-muted-foreground"
            itemProp="datePublished"
          >
            {formattedDate}
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
      <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
        <Link
          href={postUrl}
          className="focus-ring focus:outline-none"
          itemProp="url"
        >
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>

      {/* 요약 */}
      {excerpt && (
        <p
          className="mt-3 text-sm leading-relaxed text-muted-foreground"
          itemProp="description"
        >
          {excerpt}
        </p>
      )}

      {/* 카테고리 */}
      {post.categories?.nodes && post.categories.nodes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2" aria-label="카테고리">
          {post.categories.nodes.map((category) => (
            <span
              key={category.id}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              itemProp="articleSection"
            >
              {category.name}
            </span>
          ))}
        </div>
      )}

      {/* 더 읽기 링크 */}
      <div className="mt-6">
        <Link
          href={postUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-ring focus:outline-none"
          aria-label={`${title} 포스트 전체 읽기`}
        >
          {readMoreLabel}
          <span
            className="transition-transform group-hover:translate-x-1 group-focus-within:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>

      {/* 스키마 마크업을 위한 숨김 메타데이터 */}
      <meta itemProp="dateModified" content={post.modified} />
      {post.seo?.metaDesc && (
        <meta itemProp="description" content={stripHtml(post.seo.metaDesc)} />
      )}
    </article>
  );
}
