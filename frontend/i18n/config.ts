export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const siteUrl = "https://haeun.dev";

export const ogLocaleMap: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
};

export const buildLanguageAlternates = (path = "") => {
  const normalizedPath = path.replace(/^\//, "");
  return locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = `${siteUrl}/${locale}${
      normalizedPath ? `/${normalizedPath}` : ""
    }`;
    return acc;
  }, {});
};

export const createCanonicalUrl = (locale: Locale, path = "") =>
  `${siteUrl}/${locale}${path}`;

