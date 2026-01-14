/**
 * Next-SEO 설정
 * Next.js 14+ App Router와 호환되도록 설정
 */

import type { DefaultSeoProps } from "next-seo";
import { siteUrl, ogLocaleMap, buildLanguageAlternates, type Locale } from "@/i18n/config";

const defaultSiteName = "Haeun Portfolio";
const defaultTitle = defaultSiteName;
const defaultDescription =
  "Frontend developer Haeun Park's portfolio across resume, projects, contact, and blog.";

/**
 * 기본 SEO 설정
 */
export const defaultSEO: DefaultSeoProps = {
  defaultTitle,
  titleTemplate: `%s | ${defaultSiteName}`,
  description: defaultDescription,
  canonical: siteUrl,
  openGraph: {
    type: "website",
    locale: ogLocaleMap.ko,
    url: siteUrl,
    siteName: defaultSiteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: defaultSiteName,
      },
    ],
  },
  twitter: {
    handle: "@haeun",
    site: "@haeun",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "keywords",
      content: "portfolio, frontend, resume, projects, blog, contact",
    },
    {
      name: "author",
      content: "Haeun Park",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "googlebot",
      content: "index, follow",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
};

/**
 * 로케일별 SEO 설정 생성
 */
export function buildLocalizedSEO(
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
) {
  const url = `${siteUrl}/${locale}${path}`;
  const title = options?.title || defaultTitle;
  const description = options?.description || defaultDescription;

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      type: options?.type || "website",
      locale: ogLocaleMap[locale],
      url,
      siteName: defaultSiteName,
      title,
      description,
      images: options?.image
        ? [
            {
              url: options.image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : defaultSEO.openGraph?.images,
      ...(options?.type === "article" && {
        article: {
          publishedTime: options.publishedTime,
          modifiedTime: options.modifiedTime,
          authors: options.author ? [options.author] : undefined,
          tags: options.tags,
        },
      }),
    },
    twitter: defaultSEO.twitter,
    languageAlternates: Object.entries(buildLanguageAlternates(path)).map(
      ([lang, href]) => ({
        hrefLang: lang,
        href,
      })
    ),
  };
}
