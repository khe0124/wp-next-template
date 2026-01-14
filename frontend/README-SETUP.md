# 수익형 블로그 설정 가이드

이 문서는 WordPress 수익형 블로그를 위한 필수 설정을 안내합니다.

## 🔧 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_LIST_TOP=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_LIST_MIDDLE=1234567892
NEXT_PUBLIC_ADSENSE_SLOT_LIST_BOTTOM=1234567893

# WordPress GraphQL
WP_GRAPHQL_URL=http://localhost:8000/graphql
```

## 📊 Google Analytics 설정

1. [Google Analytics](https://analytics.google.com/)에서 계정 생성
2. 속성(Property) 생성 후 측정 ID 획득 (예: `G-XXXXXXXXXX`)
3. `.env.local`에 `NEXT_PUBLIC_GA_ID` 설정
4. Google Search Console과 연동하여 검색 성과 추적

## 💰 Google AdSense 설정

1. [Google AdSense](https://www.google.com/adsense/)에서 계정 생성 및 승인 대기
2. 승인 후 광고 단위 생성:
   - **본문 중간 광고** (In-Article): `NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE`
   - **목록 상단 광고** (List Top): `NEXT_PUBLIC_ADSENSE_SLOT_LIST_TOP`
   - **목록 중간 광고** (List Middle): `NEXT_PUBLIC_ADSENSE_SLOT_LIST_MIDDLE`
   - **목록 하단 광고** (List Bottom): `NEXT_PUBLIC_ADSENSE_SLOT_LIST_BOTTOM`
3. 각 광고 단위의 슬롯 ID를 `.env.local`에 설정

### 광고 배치 위치

- **블로그 목록 페이지**: 상단, 중간(3번째 포스트 후), 하단
- **블로그 상세 페이지**: 본문 중간, 소셜 공유 버튼 위

## 🔍 SEO 최적화 체크리스트

### 1. Sitemap 확인
- `/sitemap.xml` 접속하여 모든 포스트가 포함되어 있는지 확인
- Google Search Console에 sitemap 제출

### 2. Robots.txt 확인
- `/robots.txt` 접속하여 크롤링 허용 확인

### 3. 메타 태그 확인
- 각 페이지의 Open Graph 태그 확인
- Twitter Card 태그 확인

## 📱 소셜 공유 기능

다음 플랫폼에서 공유 가능:
- Twitter
- Facebook
- LinkedIn
- 카카오톡 (한국 사용자)
- 링크 복사

## 🚀 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- AVIF, WebP 포맷 자동 변환
- 반응형 이미지 크기 최적화

### 캐싱 전략
- ISR (Incremental Static Regeneration): 60초마다 재생성
- 브라우저 캐싱: 1시간
- Stale-while-revalidate: 24시간

## 🔒 보안 설정

다음 보안 헤더가 자동으로 설정됩니다:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📈 트래픽 모니터링

### Google Analytics에서 확인할 지표
- 페이지뷰
- 세션 지속 시간
- 이탈률
- 인기 페이지
- 트래픽 소스

### Google Search Console에서 확인할 지표
- 검색 노출 수
- 클릭 수
- 평균 CTR
- 평균 순위
- 검색 쿼리

## 💡 수익화 팁

1. **콘텐츠 품질**: 고품질 콘텐츠 작성으로 유기적 트래픽 증가
2. **SEO 최적화**: 검색 엔진 최적화로 장기적 트래픽 확보
3. **소셜 공유**: 소셜 미디어 공유로 직접 트래픽 유입
4. **광고 배치**: 사용자 경험을 해치지 않는 적절한 광고 배치
5. **정기 업데이트**: 정기적인 콘텐츠 업데이트로 검색 엔진 크롤링 유도

## 🐛 문제 해결

### 광고가 표시되지 않는 경우
- AdSense 계정 승인 확인
- 환경 변수 설정 확인
- 브라우저 콘솔에서 에러 확인

### Analytics가 작동하지 않는 경우
- 측정 ID 형식 확인 (`G-`로 시작)
- 환경 변수 설정 확인
- Google Analytics 실시간 보고서 확인

### Sitemap이 생성되지 않는 경우
- WordPress GraphQL 연결 확인
- `getAllPostIds` 함수 동작 확인
- 빌드 로그 확인
