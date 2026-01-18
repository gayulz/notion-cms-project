# 🗺️ ROADMAP: Notion CMS 기반 개인 개발 블로그

> **문서 버전**: 1.0.0
> **최종 수정일**: 2026-01-18
> **작성자**: gayul.kim

---

## 📋 개발 로드맵 개요

이 로드맵은 **올바른 개발 순서**를 따라 프로젝트를 단계적으로 완성하기 위한 가이드입니다.

### 전체 개발 흐름

```
Phase 1: 프로젝트 초기 설정 (골격 구축)
   ↓
Phase 2: 공통 모듈/컴포넌트 개발
   ↓
Phase 3: 핵심 기능 개발
   ↓
Phase 4: 추가 기능 개발
   ↓
Phase 5: 최적화 및 배포
```

---

## ✅ Phase 1: 프로젝트 초기 설정 (골격 구축)

### 📌 목적
견고한 프로젝트 기반을 구축하여 이후 개발이 원활하게 진행되도록 합니다.

### 🎯 왜 이 순서인가?
- **토대 구축**: 프로젝트 구조와 환경 설정이 완료되어야 코드 작성이 가능합니다
- **의존성 해결**: 필요한 라이브러리와 API 연동을 먼저 완료해야 기능 개발 시 막힘이 없습니다
- **타입 안정성**: TypeScript 타입 정의를 먼저 해야 이후 코드 작성 시 자동완성과 타입 체크가 가능합니다

### ⏱️ 예상 소요 시간
**1주 (5일)**

### 📋 작업 항목

#### 1.1 개발 환경 구축 ✅
- [x] Next.js 15.5.3 프로젝트 생성
- [x] TypeScript, ESLint, Prettier 설정
- [x] Tailwind CSS v4 설정
- [x] shadcn/ui 초기 설정

#### 1.2 Notion API 연동 ✅
- [x] Notion 인티그레이션 생성
- [x] API 키 발급
- [x] 환경 변수 설정 (`.env.local`)
  ```env
  NOTION_API_KEY=secret_xxxxx
  NOTION_DATABASE_ID=xxxxx
  ```
- [x] 필요한 패키지 설치
  ```bash
  npm install @notionhq/client notion-to-md
  ```

#### 1.3 Notion 데이터베이스 구성
- [ ] Notion 데이터베이스 생성
  - Title (제목)
  - Category (카테고리)
  - Tags (태그)
  - Published (발행일)
  - Status (상태: 초안/발행됨)
  - Slug (URL 슬러그)
  - Thumbnail (썸네일)
  - Summary (요약)
- [ ] 샘플 데이터 3~5개 작성
- [ ] 인티그레이션에 데이터베이스 접근 권한 부여

#### 1.4 타입 정의
- [ ] `types/notion.ts` 생성
  ```typescript
  interface Post {
    id: string;
    title: string;
    category: string;
    tags: string[];
    published: string;
    slug: string;
    thumbnail?: string;
    summary?: string;
  }

  interface PostContent extends Post {
    content: string; // Markdown 변환된 본문
  }
  ```

#### 1.5 API 연결 테스트
- [ ] Notion API 쿼리 테스트 코드 작성
- [ ] 데이터베이스에서 데이터 가져오기 확인
- [ ] 에러 핸들링 확인

### ✅ 완료 기준
- [ ] `npm run dev` 실행 시 에러 없이 서버 시작
- [ ] Notion API로 데이터베이스 쿼리 성공
- [ ] 샘플 데이터 3개 이상 확인
- [ ] TypeScript 타입 에러 0개

---

## ✅ Phase 2: 공통 모듈/컴포넌트 개발

### 📌 목적
재사용 가능한 핵심 모듈과 UI 컴포넌트를 먼저 개발하여 이후 기능 개발의 효율성을 높입니다.

### 🎯 왜 이 순서인가?
- **재사용성**: 공통 모듈을 먼저 만들어야 중복 코드를 방지할 수 있습니다
- **일관성**: 공통 컴포넌트를 먼저 정의하면 전체 UI의 일관성이 유지됩니다
- **의존성 관리**: 페이지 컴포넌트가 공통 모듈에 의존하므로 순서를 지켜야 합니다

### ⏱️ 예상 소요 시간
**1주 (5일)**

### 📋 작업 항목

#### 2.1 Notion API 유틸리티 함수
- [ ] `lib/notion.ts` 생성
  ```typescript
  // 발행된 글 목록 가져오기
  export async function getPosts(): Promise<Post[]>

  // 특정 글 가져오기 (Slug 기반)
  export async function getPostBySlug(slug: string): Promise<PostContent | null>

  // 카테고리별 글 가져오기
  export async function getPostsByCategory(category: string): Promise<Post[]>

  // 모든 슬러그 가져오기 (SSG용)
  export async function getAllPostSlugs(): Promise<string[]>
  ```
- [ ] Notion 블록 → Markdown 변환 함수
  ```typescript
  // lib/notion-to-markdown.ts
  export async function convertNotionToMarkdown(pageId: string): Promise<string>
  ```
- [ ] 에러 핸들링 및 로깅 추가
- [ ] Rate Limit 고려한 재시도 로직

#### 2.2 공통 UI 컴포넌트
- [ ] shadcn/ui 컴포넌트 설치
  ```bash
  npx shadcn@latest add card
  npx shadcn@latest add button
  npx shadcn@latest add badge
  ```
- [ ] `PostCard` 컴포넌트 (`components/PostCard.tsx`)
  - 썸네일 이미지
  - 제목, 요약
  - 발행일, 카테고리, 태그
  - 링크
- [ ] `PostMeta` 컴포넌트 (`components/PostMeta.tsx`)
  - 발행일, 카테고리, 태그 표시
- [ ] `Layout` 컴포넌트 (`components/Layout.tsx`)
  - Header (로고, 네비게이션)
  - Footer
  - 공통 레이아웃 구조

#### 2.3 유틸리티 함수
- [ ] `lib/utils.ts` 생성
  ```typescript
  // 날짜 포맷팅
  export function formatDate(date: string): string

  // 슬러그 생성
  export function generateSlug(title: string): string

  // 읽기 시간 계산
  export function calculateReadingTime(content: string): number
  ```

#### 2.4 스타일링 기반 구축
- [ ] Tailwind CSS 설정 커스터마이징
  - 색상 팔레트 정의
  - 타이포그래피 설정
  - 브레이크포인트 확인
- [ ] 글로벌 스타일 (`app/globals.css`)
  - 기본 폰트 설정
  - 다크 모드 변수 (추후 사용)
  - 코드 블록 스타일

### ✅ 완료 기준
- [ ] `getPosts()` 함수 실행 시 Notion 데이터 정상 반환
- [ ] `PostCard` 컴포넌트 스토리북 또는 테스트 페이지에서 확인
- [ ] `Layout` 컴포넌트 렌더링 확인
- [ ] TypeScript 타입 에러 0개
- [ ] ESLint 에러 0개

---

## ✅ Phase 3: 핵심 기능 개발

### 📌 목적
블로그의 핵심인 글 목록 페이지와 상세 페이지를 구현하여 MVP를 완성합니다.

### 🎯 왜 이 순서인가?
- **MVP 우선**: 가장 중요한 기능(글 읽기)을 먼저 완성해야 빠르게 테스트할 수 있습니다
- **데이터 흐름 검증**: 공통 모듈이 제대로 작동하는지 실제 페이지에서 확인합니다
- **사용자 피드백**: 핵심 기능 완성 후 배포하여 조기 피드백을 받을 수 있습니다

### ⏱️ 예상 소요 시간
**1.5주 (7일)**

### 📋 작업 항목

#### 3.1 홈 페이지 (글 목록) 구현
- [ ] `app/page.tsx` 생성
  ```typescript
  // SSG + ISR 설정
  export const revalidate = 60; // 60초마다 재검증

  export default async function HomePage() {
    const posts = await getPosts();
    // ...
  }
  ```
- [ ] 글 목록 렌더링
  - 그리드 레이아웃 (반응형)
  - `PostCard` 컴포넌트 사용
  - 최신순 정렬
- [ ] 메타 데이터 설정
  ```typescript
  export const metadata: Metadata = {
    title: '개인 개발 블로그',
    description: 'Notion CMS 기반 개발 블로그',
  };
  ```

#### 3.2 글 상세 페이지 구현
- [ ] `app/posts/[slug]/page.tsx` 생성
- [ ] `generateStaticParams` 구현
  ```typescript
  export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  }
  ```
- [ ] Notion 콘텐츠 → Markdown 변환 및 렌더링
  - `react-markdown` 또는 `next-mdx-remote` 사용
  - 코드 하이라이팅 (`prism-react-renderer`)
- [ ] 메타 정보 표시 (`PostMeta` 컴포넌트 사용)
- [ ] 동적 메타 데이터
  ```typescript
  export async function generateMetadata({ params }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.summary,
      // Open Graph, Twitter Card 등
    };
  }
  ```

#### 3.3 이미지 처리
- [ ] `next/image` 컴포넌트로 최적화
- [ ] Notion 이미지 URL 프록시 처리
  - Notion 이미지는 만료되는 URL이므로 주의
  - 필요 시 이미지 캐싱 또는 재호스팅 고려

#### 3.4 네비게이션
- [ ] 이전/다음 글 링크 구현
- [ ] 홈으로 돌아가기 버튼

### ✅ 완료 기준
- [ ] 홈 페이지에서 Notion 글 목록 정상 표시
- [ ] 글 카드 클릭 시 상세 페이지로 이동
- [ ] 상세 페이지에서 Markdown 콘텐츠 렌더링 확인
- [ ] 코드 블록 하이라이팅 작동
- [ ] 이미지 로딩 확인
- [ ] 모바일 반응형 확인 (375px, 768px, 1024px)
- [ ] `npm run build` 성공

---

## ✅ Phase 4: 추가 기능 개발

### 📌 목적
사용자 경험을 향상시키는 부가 기능을 추가하여 블로그의 완성도를 높입니다.

### 🎯 왜 이 순서인가?
- **핵심 먼저**: MVP가 완성된 후 추가 기능을 개발해야 우선순위가 명확합니다
- **점진적 개선**: 기본 기능이 안정화된 후 부가 기능을 추가하면 리스크가 적습니다
- **선택적 구현**: 시간과 리소스에 따라 일부 기능은 건너뛸 수 있습니다

### ⏱️ 예상 소요 시간
**1주 (5일)**

### 📋 작업 항목

#### 4.1 카테고리별 필터링
- [ ] `app/category/[category]/page.tsx` 생성
- [ ] `generateStaticParams`로 모든 카테고리 사전 생성
- [ ] 카테고리별 글 목록 표시
- [ ] 홈 페이지에 카테고리 필터 버튼 추가

#### 4.2 검색 기능 (선택 사항)
- [ ] 클라이언트 사이드 검색 구현
  - 제목, 태그 기반 필터링
  - `useState`로 검색 상태 관리
- [ ] 검색 UI 컴포넌트
  - 검색 입력창
  - 결과 표시

#### 4.3 공유 기능
- [ ] 공유 버튼 컴포넌트 (`components/ShareButtons.tsx`)
  - Twitter 공유
  - Facebook 공유
  - 링크 복사
- [ ] 상세 페이지에 공유 버튼 추가

#### 4.4 목차 (Table of Contents) (선택 사항)
- [ ] Markdown에서 헤딩 추출
- [ ] 우측 사이드바에 목차 표시
- [ ] 스크롤 시 현재 위치 하이라이트

#### 4.5 다크 모드 (선택 사항)
- [ ] `next-themes` 패키지 설치
- [ ] 다크 모드 토글 버튼
- [ ] CSS 변수로 색상 관리
- [ ] 로컬스토리지에 선호도 저장

### ✅ 완료 기준
- [ ] 카테고리 페이지 정상 작동
- [ ] 검색 기능 작동 (구현 시)
- [ ] 공유 버튼 클릭 시 의도한 동작 수행
- [ ] 다크 모드 토글 작동 (구현 시)
- [ ] 모든 기능이 모바일에서도 정상 작동

---

## ✅ Phase 5: 최적화 및 배포

### 📌 목적
성능을 최적화하고 SEO를 개선한 후 프로덕션 배포를 완료합니다.

### 🎯 왜 이 순서인가?
- **안정성 확보**: 모든 기능 개발이 완료된 후 최적화해야 부작용이 적습니다
- **성능 측정**: 실제 콘텐츠가 있어야 정확한 성능 측정이 가능합니다
- **배포 준비**: 최적화 후 배포해야 사용자에게 최상의 경험을 제공합니다

### ⏱️ 예상 소요 시간
**1주 (5일)**

### 📋 작업 항목

#### 5.1 성능 최적화
- [ ] 이미지 최적화
  - WebP 포맷 사용
  - `priority` 속성 (LCP 이미지)
  - Lazy loading
- [ ] 폰트 최적화
  - `next/font`로 폰트 로드
  - `font-display: swap`
- [ ] 번들 크기 분석
  - `@next/bundle-analyzer` 설치
  - 불필요한 의존성 제거
- [ ] ISR 설정 최적화
  - `revalidate` 시간 조정
  - On-Demand Revalidation 고려

#### 5.2 SEO 최적화
- [ ] 메타 태그 설정 (각 페이지)
  ```typescript
  export const metadata: Metadata = {
    title: '...',
    description: '...',
    openGraph: {
      title: '...',
      description: '...',
      images: ['...'],
    },
    twitter: {
      card: 'summary_large_image',
      title: '...',
      description: '...',
      images: ['...'],
    },
  };
  ```
- [ ] Sitemap 생성 (`app/sitemap.ts`)
  ```typescript
  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();
    // ...
  }
  ```
- [ ] Robots.txt 생성 (`app/robots.ts`)
- [ ] Canonical URL 설정
- [ ] 구조화된 데이터 (JSON-LD)
  - Article 스키마

#### 5.3 접근성 개선
- [ ] 시맨틱 HTML 검토
  - `<article>`, `<nav>`, `<main>`, `<aside>` 등
- [ ] Alt 텍스트 누락 확인
- [ ] 키보드 네비게이션 테스트
- [ ] 색상 대비 확인 (WCAG AA 기준)
- [ ] ARIA 속성 추가 (필요 시)

#### 5.4 에러 페이지
- [ ] `app/not-found.tsx` (404 페이지)
- [ ] `app/error.tsx` (에러 페이지)
- [ ] 의미 있는 에러 메시지 표시

#### 5.5 Vercel 배포
- [ ] GitHub 저장소 연결
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정 (Vercel 대시보드)
  - `NOTION_API_KEY`
  - `NOTION_DATABASE_ID`
- [ ] 자동 배포 설정 확인
- [ ] 프로덕션 배포 완료
- [ ] 커스텀 도메인 연결 (선택 사항)

#### 5.6 모니터링 설정
- [ ] Vercel Analytics 활성화
- [ ] Google Analytics 연동 (선택 사항)
- [ ] 에러 모니터링 (Sentry 등, 선택 사항)

#### 5.7 품질 검증
- [ ] Lighthouse 테스트
  - Performance: 90점 이상
  - Accessibility: 90점 이상
  - Best Practices: 90점 이상
  - SEO: 95점 이상
- [ ] 크로스 브라우저 테스트
  - Chrome, Safari, Firefox
  - 모바일 브라우저 (iOS Safari, Chrome Mobile)
- [ ] 다양한 기기에서 테스트
  - 모바일 (375px, 414px)
  - 태블릿 (768px, 1024px)
  - 데스크톱 (1280px, 1920px)

### ✅ 완료 기준
- [ ] Lighthouse 모든 항목 90점 이상
- [ ] `npm run build` 성공 (0 errors)
- [ ] Vercel 배포 성공
- [ ] 프로덕션 URL 접속 가능
- [ ] Sitemap XML 확인 (`/sitemap.xml`)
- [ ] Robots.txt 확인 (`/robots.txt`)
- [ ] Google Search Console 등록 (선택)
- [ ] 최소 5개 이상 글 발행

---

## 📊 전체 진행률 추적

### Phase별 완료율

| Phase | 상태 | 진행률 | 예상 기간 |
|-------|------|--------|-----------|
| Phase 1: 프로젝트 초기 설정 | 🔄 진행중 | 60% | 1주 |
| Phase 2: 공통 모듈/컴포넌트 개발 | ⏸️ 대기중 | 0% | 1주 |
| Phase 3: 핵심 기능 개발 | ⏸️ 대기중 | 0% | 1.5주 |
| Phase 4: 추가 기능 개발 | ⏸️ 대기중 | 0% | 1주 |
| Phase 5: 최적화 및 배포 | ⏸️ 대기중 | 0% | 1주 |

**전체 예상 기간**: 5.5주 (~1.5개월)

### 현재 완료된 항목
- ✅ Next.js 프로젝트 생성
- ✅ TypeScript, Tailwind CSS 설정
- ✅ Notion 인티그레이션 생성
- ✅ 환경 변수 설정
- ✅ 필요한 패키지 설치

### 다음 단계
1. Notion 데이터베이스 생성 및 샘플 데이터 입력
2. 타입 정의 파일 작성
3. Notion API 연결 테스트

---

## 🎯 마일스톤

### 🏁 Milestone 1: MVP 완성
**목표일**: Phase 3 완료 시점 (3.5주차)
- [ ] 홈 페이지 구현
- [ ] 글 상세 페이지 구현
- [ ] 반응형 디자인 완료
- [ ] 로컬 환경에서 정상 작동

### 🏁 Milestone 2: 기능 확장
**목표일**: Phase 4 완료 시점 (4.5주차)
- [ ] 카테고리 필터링
- [ ] 검색/공유 기능 (선택)
- [ ] 다크 모드 (선택)

### 🏁 Milestone 3: 프로덕션 배포
**목표일**: Phase 5 완료 시점 (5.5주차)
- [ ] SEO 최적화 완료
- [ ] Lighthouse 90점 이상
- [ ] Vercel 배포 완료
- [ ] 5개 이상 글 발행

---

## 📚 참고 문서

- **PRD**: `docs/PRD.md` - 프로젝트 요구사항 정의서
- **프로젝트 구조**: `docs/guides/project-structure.md`
- **Next.js 가이드**: `docs/guides/nextjs-15.md`
- **스타일링 가이드**: `docs/guides/styling-guide.md`

---

## 🔄 로드맵 업데이트 규칙

1. **작업 완료 시**: 체크박스를 `[ ]`에서 `[x]`로 변경
2. **Phase 완료 시**: 진행률을 100%로 업데이트하고 상태를 ✅ 완료로 변경
3. **새로운 작업 추가 시**: 해당 Phase에 작업 항목 추가 및 완료 기준 업데이트
4. **일정 변경 시**: "전체 진행률 추적" 테이블 업데이트

---

**문서 끝**
