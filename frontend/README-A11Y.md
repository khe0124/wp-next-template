# 접근성(A11y) 가이드

이 프로젝트는 WCAG 2.1 AA 수준의 접근성을 준수하도록 설계되었습니다.

## 🔧 ESLint 접근성 규칙

`eslint-plugin-jsx-a11y`가 활성화되어 있으며, 다음 규칙들이 적용됩니다:

### 주요 규칙
- **alt-text**: 모든 이미지에 alt 텍스트 필수
- **anchor-is-valid**: 유효한 링크 사용
- **aria-props**: 올바른 ARIA 속성 사용
- **aria-role**: 올바른 role 속성 사용
- **heading-has-content**: 제목에 내용 포함
- **html-has-lang**: HTML에 lang 속성 필수
- **label-has-associated-control**: 폼 필드에 label 연결
- **click-events-have-key-events**: 클릭 이벤트에 키보드 이벤트 포함

## ✅ 구현된 접근성 기능

### 1. Semantic HTML
- `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>` 사용
- 적절한 제목 계층 구조 (h1 → h2 → h3)
- `<figure>` 및 `<figcaption>` 사용

### 2. ARIA 속성
- `aria-label`: 명확한 레이블 제공
- `aria-labelledby`: 요소 간 레이블 연결
- `aria-describedby`: 추가 설명 제공
- `aria-hidden`: 장식용 요소 숨김
- `aria-live`: 동적 콘텐츠 업데이트 알림
- `aria-pressed`: 토글 버튼 상태 표시

### 3. 키보드 네비게이션
- 모든 인터랙티브 요소에 포커스 가능
- `focus:ring` 스타일로 포커스 표시
- "본문으로 건너뛰기" 링크 제공
- Tab 순서 논리적 구성

### 4. 스크린 리더 지원
- `sr-only` 클래스로 숨김 텍스트 제공
- 의미 있는 링크 텍스트
- 이미지에 설명적인 alt 텍스트
- 폼 필드에 적절한 label 연결

### 5. 색상 대비
- WCAG AA 수준의 색상 대비 비율 준수
- 고대비 모드 지원
- 색상만으로 정보 전달하지 않음

## 📋 접근성 체크리스트

### 이미지
- ✅ 모든 이미지에 `alt` 속성
- ✅ 장식용 이미지는 `aria-hidden="true"`
- ✅ 의미 있는 이미지는 설명적인 alt 텍스트

### 링크
- ✅ 모든 링크에 명확한 텍스트 또는 `aria-label`
- ✅ 외부 링크에 `rel="noopener noreferrer"`
- ✅ 새 창 열기 시 사용자에게 알림

### 폼
- ✅ 모든 입력 필드에 `<label>` 연결
- ✅ `htmlFor`와 `id` 속성으로 연결
- ✅ 필수 필드에 `aria-required="true"`
- ✅ 오류 메시지에 `aria-describedby` 연결

### 버튼
- ✅ 모든 버튼에 `type` 속성
- ✅ 명확한 `aria-label` 또는 텍스트
- ✅ 토글 버튼에 `aria-pressed` 상태

### 네비게이션
- ✅ `<nav>` 요소 사용
- ✅ `aria-label`로 네비게이션 설명
- ✅ 현재 페이지 표시 (`aria-current`)

### 제목 구조
- ✅ 논리적인 제목 계층 (h1 → h2 → h3)
- ✅ 페이지당 하나의 h1
- ✅ 섹션에 적절한 제목

## 🧪 접근성 테스트 도구

### 브라우저 확장 프로그램
- **axe DevTools**: Chrome/Firefox 확장 프로그램
- **WAVE**: 웹 접근성 평가 도구
- **Lighthouse**: Chrome DevTools 내장

### 스크린 리더
- **NVDA** (Windows, 무료)
- **JAWS** (Windows, 유료)
- **VoiceOver** (macOS/iOS, 내장)
- **TalkBack** (Android, 내장)

### 테스트 방법
```bash
# ESLint로 접근성 규칙 확인
pnpm lint

# Lighthouse 접근성 점수 확인
# Chrome DevTools > Lighthouse > Accessibility
```

## 🎯 접근성 개선 팁

1. **항상 키보드로 테스트**: 마우스 없이 모든 기능 사용 가능한지 확인
2. **스크린 리더로 테스트**: 실제 사용자 경험 확인
3. **색상 대비 확인**: WebAIM Contrast Checker 사용
4. **포커스 표시**: 모든 인터랙티브 요소에 명확한 포커스 표시
5. **의미 있는 텍스트**: "여기 클릭" 같은 모호한 텍스트 피하기

## 📚 참고 자료

- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN 접근성 가이드](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM 접근성 체크리스트](https://webaim.org/standards/wcag/checklist)
- [ARIA 사양](https://www.w3.org/WAI-ARIA/)
