import type { Metadata } from "next";
import {
  buildLanguageAlternates,
  createCanonicalUrl,
  ogLocaleMap,
  siteUrl,
  type Locale,
} from "@/i18n/config";

const defaultSiteName = "Haeun Portfolio";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSiteName,
    template: `%s | ${defaultSiteName}`,
  },
  description:
    "Frontend developer Haeun Park's portfolio across resume, projects, contact, and blog.",
  keywords: ["portfolio", "frontend", "resume", "projects", "blog", "contact"],
  openGraph: {
    title: defaultSiteName,
    description:
      "Explore Haeun Park's resume, representative projects, blog posts, and contact information.",
    url: siteUrl,
    siteName: defaultSiteName,
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
};

type OpenGraphInput = {
  title: string;
  description: string;
  type: "website" | "profile" | "article";
  siteName?: string;
};

export type LocalizedMetaInput = {
  title: string;
  description: string;
  openGraph: OpenGraphInput;
};

export const buildLocalizedMetadata = (
  locale: Locale,
  path: string,
  meta: LocalizedMetaInput,
): Metadata => {
  const url = createCanonicalUrl(locale, path);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      ...meta.openGraph,
      url,
      locale: ogLocaleMap[locale],
      siteName: meta.openGraph.siteName ?? defaultSiteName,
    },
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
  };
};

