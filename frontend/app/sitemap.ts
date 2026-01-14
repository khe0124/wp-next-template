import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/i18n/config";
import { getAllPostIds, getPost } from "@/lib/wp-queries";

const staticPaths = ["", "/resume", "/project", "/contact", "/blog"];

export default async function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 정적 페이지 URL 생성
  const staticUrls = locales.flatMap((locale) =>
    staticPaths.map((path) => {
      const urlPath = `${siteUrl}/${locale}${path}`;
      return {
        url: urlPath,
        lastModified,
        changeFrequency: "weekly" as const,
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

  // 동적 블로그 포스트 URL 생성
  try {
    const postIds = await getAllPostIds();
    const postUrls = await Promise.all(
      locales.flatMap((locale) =>
        postIds.map(async (id) => {
          const post = await getPost(id.toString(), "DATABASE_ID");
          return {
            url: `${siteUrl}/${locale}/blog/${id}`,
            lastModified: post?.modified ? new Date(post.modified) : lastModified,
            changeFrequency: "daily" as const,
            priority: 0.9,
            alternates: {
              languages: locales.reduce<Record<string, string>>(
                (acc, lang) => ({
                  ...acc,
                  [lang]: `${siteUrl}/${lang}/blog/${id}`,
                }),
                {},
              ),
            },
          };
        }),
      ),
    );

    return [...staticUrls, ...postUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // 에러 발생 시 정적 페이지만 반환
    return staticUrls;
  }
}

