import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 프로덕션 빌드 최적화
  output: "standalone",
  
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "**.wordpress.com",
        pathname: "/wp-content/**",
      },
      // 프로덕션 WordPress 도메인 추가
      ...(process.env.WP_IMAGE_DOMAIN
        ? [
            {
              protocol: "https" as const,
              hostname: process.env.WP_IMAGE_DOMAIN,
              pathname: "/wp-content/**",
            },
          ]
        : []),
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  // 보안 헤더
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
