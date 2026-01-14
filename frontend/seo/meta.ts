/**
 * SEO 메타데이터 설정
 * next-seo와 Next.js Metadata API를 함께 사용
 */

import type { Metadata } from "next";
import { defaultSEO } from "@/seo/config";
import { seoToMetadata, buildLocalizedMetadata as buildLocalizedMetadataUtil } from "@/lib/seo-utils";
import { siteUrl } from "@/i18n/config";

/**
 * 기본 메타데이터 (next-seo 설정 기반)
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...seoToMetadata(defaultSEO),
};

/**
 * 로케일별 메타데이터 생성 (next-seo 기반)
 */
export { buildLocalizedMetadataUtil as buildLocalizedMetadata };

