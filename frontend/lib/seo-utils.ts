/**
 * SEO 유틸리티 함수
 * Next.js Metadata API와 next-seo를 함께 사용하기 위한 헬퍼
 */

import type { Metadata } from "next";
import type { DefaultSeoProps } from "next-seo";
import { buildLocalizedSEO } from "@/seo/config";
import { buildLanguageAlternates, createCanonicalUrl, type Locale } from "@/i18n/config";

/**
 * next-seo 설정을 Next.js Metadata로 변환
 */
export function seoToMetadata(seoConfig: DefaultSeoProps): Metadata {
  return {
    title: seoConfig.title || seoConfig.defaultTitle,
    titleTemplate: seoConfig.titleTemplate,
    description: seoConfig.description,
    canonical: seoConfig.canonical,
    openGraph: seoConfig.openGraph
      ? {
          type: seoConfig.openGraph.type || "website",
          locale: seoConfig.openGraph.locale,
          url: seoConfig.openGraph.url,
          siteName: seoConfig.openGraph.siteName,
          title: seoConfig.openGraph.title,
          description: seoConfig.openGraph.description,
          images: seoConfig.openGraph.images?.map((img) => ({
            url: typeof img === "string" ? img : img.url,
            width: typeof img === "string" ? undefined : img.width,
            height: typeof img === "string" ? undefined : img.height,
            alt: typeof img === "string" ? undefined : img.alt,
          })),
        }
      : undefined,
    twitter: seoConfig.twitter
      ? {
          card: seoConfig.twitter.cardType || "summary",
          site: seoConfig.twitter.site,
          creator: seoConfig.twitter.handle,
        }
      : undefined,
    alternates: {
      canonical: seoConfig.canonical,
      languages: seoConfig.languageAlternates?.reduce(
        (acc, lang) => {
          if (lang.hrefLang) {
            acc[lang.hrefLang] = lang.href;
          }
          return acc;
        },
        {} as Record<string, string>
      ),
    },
    other: seoConfig.additionalMetaTags?.reduce(
      (acc, tag) => {
        if (tag.name && tag.content) {
          acc[tag.name] = tag.content;
        }
        return acc;
      },
      {} as Record<string, string>
    ),
  };
}

/**
 * 로케일별 SEO 설정을 Next.js Metadata로 변환
 */
export function buildLocalizedMetadata(
  locale: Locale,
  path: string,
  options?: {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  }
): Metadata {
  const seoConfig = buildLocalizedSEO(locale, path, options);
  const metadata = seoToMetadata(seoConfig);

  // 추가 메타데이터
  if (options?.type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      ...(options.publishedTime && {
        publishedTime: options.publishedTime,
      }),
      ...(options.modifiedTime && {
        modifiedTime: options.modifiedTime,
      }),
    };
  }

  // 언어 대체 링크 추가
  metadata.alternates = {
    ...metadata.alternates,
    languages: buildLanguageAlternates(path),
  };

  return metadata;
}
