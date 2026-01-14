# 폰트 설정 가이드

이 프로젝트는 프리텐다드 폰트를 사용하여 한국어 가독성을 최적화했습니다.

## 현재 설정

현재는 CDN을 통해 프리텐다드 폰트를 로드하고 있습니다. 더 나은 성능을 위해 로컬 폰트 파일을 사용할 수 있습니다.

## 로컬 폰트 사용하기 (권장)

1. 프리텐다드 폰트 파일 다운로드:
   - https://github.com/orioncactus/pretendard/releases 에서 최신 버전 다운로드
   - 또는 `public/fonts/` 디렉토리에 다음 파일들을 추가:
     - `Pretendard-Regular.woff2`
     - `Pretendard-Medium.woff2`
     - `Pretendard-SemiBold.woff2`
     - `Pretendard-Bold.woff2`

2. `app/layout.tsx`를 다음과 같이 수정:

```typescript
import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
```

3. CDN 링크 제거 (head 태그에서)

## 폰트 변경하기

다른 폰트를 사용하려면 `app/layout.tsx`와 `app/globals.css`의 폰트 설정을 수정하세요.
