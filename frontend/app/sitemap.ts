import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/i18n/config";

const staticPaths = ["", "/resume", "/project", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    staticPaths.map((path) => {
      const urlPath = `${siteUrl}/${locale}${path}`;
      return {
        url: urlPath,
        lastModified,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: locales.reduce<Record<string, string>>(
            (acc, lang) => ({
              ...acc,
              [lang]: `${siteUrl}/${lang}${path}`,
            }),
            {},
          ),
        },
      };
    }),
  );
}

