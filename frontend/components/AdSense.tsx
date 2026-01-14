/**
 * Google AdSense 컴포넌트
 * 광고 배치 및 수익화
 */

"use client";

import Script from "next/script";
import { useEffect } from "react";

interface AdSenseProps {
  /**
   * AdSense 광고 슬롯 ID
   */
  slot: string;
  /**
   * 광고 형식 (auto, rectangle, horizontal 등)
   */
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  /**
   * 반응형 여부
   */
  responsive?: boolean;
  /**
   * 광고 스타일 클래스
   */
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSense({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, []);

  if (!adClient) {
    // 개발 환경에서는 플레이스홀더 표시
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`my-8 flex min-h-[100px] items-center justify-center border-2 border-dashed border-muted-foreground/20 bg-muted/10 ${className}`}
          role="region"
          aria-label="광고 영역 (개발 모드)"
        >
          <p className="text-sm text-muted-foreground">
            AdSense Placeholder (Slot: {slot})
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div
      className={`my-8 ${className}`}
      role="region"
      aria-label="광고"
    >
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        aria-label="광고"
      />
    </div>
  );
}
