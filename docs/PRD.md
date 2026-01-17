# 📋 PRD: Notion CMS 기반 개인 개발 블로그

> **문서 버전**: 1.0.0
> **최종 수정일**: 2026-01-17
> **작성자**: gayul.kim

---

## 📌 1. 프로젝트 개요

### 1.1 프로젝트명
**개인 개발 블로그 (Personal Dev Blog)**

### 1.2 프로젝트 목적
Notion을 CMS(Content Management System)로 활용하여, 개발자가 Notion에서 글을 작성하면 자동으로 웹 블로그에 반영되는 개인 기술 블로그 플랫폼 구축

### 1.3 핵심 가치 제안
- **편리한 콘텐츠 관리**: Notion의 익숙한 에디터로 글 작성
- **자동 동기화**: Notion 데이터베이스 변경 시 실시간 반영
- **개발자 친화적**: 코드 블록, 마크다운 지원
- **빠른 배포**: Vercel을 통한 자동 배포

### 1.4 CMS로 Notion을 선택한 이유
1. **직관적인 UI/UX**: 별도의 관리자 페이지 개발 불필요
2. **강력한 에디터**: 코드 블록, 임베드, 파일 첨부 등 다양한 블록 타입 지원
3. **무료 플랜**: 개인 사용 시 충분한 무료 API 제공
4. **데이터베이스 기능**: 태그, 카테고리, 필터링 등 데이터 관리 용이
5. **모바일 앱 지원**: 언제 어디서나 콘텐츠 작성 가능

---

## 🎯 2. 목표 및 비전

### 2.1 단기 목표 (MVP)
- Notion API 연동을 통한 블로그 글 목록 및 상세 페이지 구현
- 반응형 디자인으로 모바일/데스크톱 최적화
- Vercel 배포 자동화

### 2.2 장기 비전
- SEO 최적화로 검색 노출 향상
- 댓글 시스템 통합 (예: Giscus, Utterances)
- 다크 모드 지원
- 조회수, 좋아요 등 상호작용 기능 추가
- RSS 피드 제공

---

## ⚙️ 3. 기술 스택

### 3.1 Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 15.5.3 | App Router, SSR/SSG, API Routes |
| **React** | 19.1.0 | UI 컴포넌트 |
| **TypeScript** | 5.x | 타입 안정성 |
| **Tailwind CSS** | v4 | 스타일링 |
| **shadcn/ui** | latest | UI 컴포넌트 라이브러리 |
| **Lucide React** | latest | 아이콘 |

### 3.2 CMS & API
| 기술 | 용도 |
|------|------|
| **Notion API** | 콘텐츠 관리 및 데이터 소스 |
| **@notionhq/client** | Notion API 클라이언트 |
| **notion-to-md** | Notion 블록을 Markdown으로 변환 |

### 3.3 Deployment & DevOps
| 기술 | 용도 |
|------|------|
| **Vercel** | 배포 및 호스팅 |
| **Git** | 버전 관리 |
| **ESLint** | 코드 품질 관리 |
| **Prettier** | 코드 포맷팅 |

---

## 📊 4. Notion 데이터베이스 구조

### 4.1 데이터베이스 스키마

| 속성명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| **Title** | `title` | ✅ | 글 제목 |
| **Category** | `select` | ✅ | 카테고리 (예: Frontend, Backend, DevOps) |
| **Tags** | `multi_select` | ❌ | 태그 (예: React, TypeScript, Next.js) |
| **Published** | `date` | ✅ | 발행일 |
| **Status** | `select` | ✅ | 상태 (초안/발행됨) |
| **Slug** | `rich_text` | ❌ | URL 슬러그 (자동 생성 가능) |
| **Thumbnail** | `files` | ❌ | 썸네일 이미지 |
| **Summary** | `rich_text` | ❌ | 요약 (미리보기용) |

### 4.2 Status 값
- `초안` (Draft): 작성 중, 블로그에 노출되지 않음
- `발행됨` (Published): 블로그에 공개

### 4.3 Content (본문)
- Notion 페이지의 블록 콘텐츠가 본문
- `notion-to-md` 라이브러리로 Markdown 변환
- 코드 블록, 이미지, 임베드 등 지원

---

## 🖼️ 5. 화면 구성 및 기능 명세

### 5.1 페이지 구조

```
/                     → 홈 (최근 글 목록)
/posts/[slug]         → 글 상세 페이지
/category/[category]  → 카테고리별 글 목록 (선택 사항)
/about                → 소개 페이지 (선택 사항)
```

### 5.2 주요 화면

#### 5.2.1 홈 페이지 (`/`)
**기능**:
- 최근 발행된 글 목록 표시 (최신순)
- 각 글 카드에 제목, 썸네일, 요약, 발행일, 카테고리, 태그 표시
- 카테고리별 필터링 버튼
- 검색 바 (제목, 태그 검색)

**레이아웃**:
```
┌─────────────────────────────────────────┐
│  [로고]     [검색]    [카테고리 필터]  │
├─────────────────────────────────────────┤
│  [글 카드 1]  [글 카드 2]  [글 카드 3] │
│  [글 카드 4]  [글 카드 5]  [글 카드 6] │
├─────────────────────────────────────────┤
│            [더보기/페이지네이션]         │
└─────────────────────────────────────────┘
```

**데이터 패칭**:
- SSG (Static Site Generation) 사용
- `revalidate: 60` (60초마다 재검증)

#### 5.2.2 글 상세 페이지 (`/posts/[slug]`)
**기능**:
- 글 제목, 발행일, 카테고리, 태그 표시
- Notion 본문 렌더링 (Markdown 변환)
- 이전/다음 글 네비게이션
- 공유 버튼 (Twitter, Facebook, 링크 복사)

**레이아웃**:
```
┌─────────────────────────────────────────┐
│            [글 제목]                     │
│  [발행일] [카테고리] [태그]              │
├─────────────────────────────────────────┤
│                                          │
│         [본문 콘텐츠]                    │
│                                          │
├─────────────────────────────────────────┤
│  [이전 글] ← → [다음 글]                │
│            [공유 버튼]                   │
└─────────────────────────────────────────┘
```

**데이터 패칭**:
- SSG with Dynamic Routes
- `generateStaticParams`로 모든 글 경로 사전 생성

#### 5.2.3 카테고리 페이지 (`/category/[category]`)
**기능**:
- 특정 카테고리의 글 목록 표시
- 홈 페이지와 유사한 레이아웃

**데이터 패칭**:
- SSG with Dynamic Routes

---

## 🚀 6. MVP (Minimum Viable Product) 범위

### 6.1 필수 기능 (Phase 1)
- [x] Notion API 연동
- [x] 환경 변수 설정 (`.env.local`)
- [ ] Notion 데이터베이스 생성 및 샘플 데이터 입력
- [ ] 글 목록 페이지 구현 (홈)
- [ ] 글 상세 페이지 구현
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 기본 스타일링 (Tailwind CSS + shadcn/ui)
- [ ] Vercel 배포

### 6.2 후순위 기능 (Phase 2+)
- [ ] 카테고리별 필터링
- [ ] 검색 기능
- [ ] 다크 모드
- [ ] SEO 최적화 (메타 태그, Open Graph, Sitemap)
- [ ] 페이지네이션 또는 무한 스크롤
- [ ] 댓글 시스템 (Giscus/Utterances)
- [ ] RSS 피드
- [ ] 조회수 카운터
- [ ] 목차 (Table of Contents)

---

## 📈 7. 개발 단계

### Phase 1: 프로젝트 셋업 (1주차)
**목표**: 개발 환경 구축 및 Notion API 연동

**작업 항목**:
1. Next.js 15 프로젝트 생성
2. 필요한 패키지 설치
   ```bash
   npm install @notionhq/client
   npm install notion-to-md
   ```
3. Notion 인티그레이션 생성 및 API 키 발급
   - https://www.notion.so/my-integrations 접속
   - "New integration" 생성
   - API 키 복사
4. Notion 데이터베이스 생성
   - 블로그 글 관리용 데이터베이스 생성
   - 위 4.1 스키마대로 속성 추가
   - 샘플 글 3~5개 작성
5. 환경 변수 설정
   ```env
   # .env.local
   NOTION_API_KEY=secret_xxxxx
   NOTION_DATABASE_ID=xxxxx
   ```
6. Notion API 테스트
   - API 연결 확인
   - 데이터베이스 쿼리 테스트

**산출물**:
- [x] 프로젝트 초기 세팅 완료
- [ ] Notion API 연동 성공
- [ ] 샘플 데이터 3개 이상

---

### Phase 2: 글 목록 페이지 구현 (2주차)
**목표**: 홈 페이지에 Notion 글 목록 표시

**작업 항목**:
1. Notion API 유틸리티 함수 작성
   ```typescript
   // lib/notion.ts
   - getPosts(): 발행된 글 목록 가져오기
   - getPostBySlug(slug): 특정 글 가져오기
   ```
2. 홈 페이지 구현 (`app/page.tsx`)
   - SSG로 글 목록 패칭
   - 글 카드 컴포넌트 생성
   - 반응형 그리드 레이아웃
3. 타입 정의
   ```typescript
   // types/notion.ts
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
   ```
4. 스타일링
   - shadcn/ui Card 컴포넌트 활용
   - Tailwind CSS 반응형 클래스 적용

**산출물**:
- [ ] 글 목록 페이지 완성
- [ ] 최소 3개 이상 글 표시
- [ ] 모바일/데스크톱 반응형 확인

---

### Phase 3: 글 상세 페이지 구현 (3주차)
**목표**: 개별 글 내용 렌더링

**작업 항목**:
1. 동적 라우트 생성 (`app/posts/[slug]/page.tsx`)
2. `notion-to-md`로 Notion 블록을 Markdown 변환
3. Markdown 렌더링
   - `react-markdown` 또는 `next-mdx-remote` 사용
   - 코드 하이라이팅 (`prism-react-renderer` 또는 `highlight.js`)
4. 메타 데이터 표시 (제목, 날짜, 카테고리, 태그)
5. 이전/다음 글 네비게이션
6. 공유 버튼 구현

**산출물**:
- [ ] 글 상세 페이지 완성
- [ ] Markdown 렌더링 확인
- [ ] 코드 블록 하이라이팅 작동

---

### Phase 4: 스타일링 및 최적화 (4주차)
**목표**: UI/UX 개선 및 성능 최적화

**작업 항목**:
1. 디자인 시스템 적용
   - 일관된 색상, 타이포그래피, 간격
   - shadcn/ui 컴포넌트 커스터마이징
2. 이미지 최적화
   - `next/image` 컴포넌트 사용
   - Notion 이미지 프록시 처리
3. SEO 최적화
   - `metadata` API로 메타 태그 설정
   - Open Graph 이미지
   - Sitemap 생성 (`app/sitemap.ts`)
4. 성능 최적화
   - ISR (Incremental Static Regeneration) 설정
   - 이미지 lazy loading
   - 폰트 최적화 (`next/font`)
5. 접근성 개선
   - 시맨틱 HTML
   - 키보드 네비게이션
   - 대체 텍스트

**산출물**:
- [ ] 디자인 시스템 적용 완료
- [ ] Lighthouse 점수 90점 이상
- [ ] SEO 메타 태그 확인

---

### Phase 5: 배포 및 모니터링 (5주차)
**목표**: Vercel 배포 및 운영 준비

**작업 항목**:
1. Vercel 프로젝트 생성
2. 환경 변수 설정 (Vercel 대시보드)
3. 자동 배포 설정 (Git push 시 자동 배포)
4. 커스텀 도메인 연결 (선택 사항)
5. Analytics 연동 (Vercel Analytics 또는 Google Analytics)
6. 에러 모니터링 (Sentry 또는 Vercel Monitoring)

**산출물**:
- [ ] 프로덕션 배포 완료
- [ ] 도메인 연결 (선택)
- [ ] Analytics 확인

---

## 🔧 8. 기술적 고려 사항

### 8.1 Notion API 제한 사항
- **Rate Limit**: 초당 3 requests (평균)
- **페이지 크기**: 한 번에 최대 100개 항목
- **캐싱 전략**: ISR로 60초마다 재검증 권장

### 8.2 데이터 캐싱 전략
```typescript
// app/page.tsx
export const revalidate = 60; // 60초마다 재검증

// 또는 On-Demand Revalidation
// Notion Webhook 연동 시 실시간 반영 가능
```

### 8.3 에러 처리
```typescript
try {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: '발행됨',
      },
    },
  });
} catch (error) {
  console.error('Notion API Error:', error);
  return []; // 빈 배열 반환 또는 에러 페이지 표시
}
```

### 8.4 보안
- API 키는 반드시 `.env.local`에 저장 (`.gitignore`에 추가)
- Vercel 배포 시 환경 변수를 대시보드에서 설정
- Notion 인티그레이션은 필요한 데이터베이스만 접근 권한 부여

---

## 📊 9. 성공 지표

### 9.1 기술적 지표
- ✅ Lighthouse 성능 점수 90점 이상
- ✅ 첫 페이지 로드 시간 (FCP) 1.5초 이하
- ✅ SEO 점수 95점 이상
- ✅ 접근성 점수 90점 이상

### 9.2 사용자 경험 지표
- ✅ 모바일 반응형 디자인 완벽 지원
- ✅ 글 목록 → 상세 페이지 네비게이션 1초 이내
- ✅ Notion에서 글 발행 → 블로그 반영 60초 이내 (ISR)

### 9.3 콘텐츠 지표
- ✅ 런칭 시 최소 5개 이상 글 발행
- ✅ 주 1회 이상 새 글 발행 (운영 목표)

---

## 📚 10. 참고 자료

### 10.1 공식 문서
- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [@notionhq/client API Reference](https://github.com/makenotion/notion-sdk-js)
- [notion-to-md](https://github.com/souvikinator/notion-to-md)

### 10.2 참고 프로젝트
- [Notion Blog Template](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)
- [Notion Blog Example](https://github.com/ijjk/notion-blog)

### 10.3 관련 블로그 포스트
- [How to Build a Blog with Notion API](https://vercel.com/guides/deploying-next-notion)
- [Notion as a CMS](https://www.notion.so/help/guides/notion-as-a-cms)

---

## 🔄 11. 버전 히스토리

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2026-01-17 | 초기 PRD 작성 | gayul.kim |

---

## ✅ 12. 체크리스트

### MVP 출시 전 필수 확인 사항
- [ ] Notion API 연동 정상 작동
- [ ] 글 목록 페이지 렌더링 확인
- [ ] 글 상세 페이지 렌더링 확인
- [ ] 반응형 디자인 테스트 (모바일/태블릿/데스크톱)
- [ ] SEO 메타 태그 설정
- [ ] Vercel 배포 성공
- [ ] 환경 변수 설정 (프로덕션)
- [ ] Lighthouse 점수 확인
- [ ] 크로스 브라우저 테스트 (Chrome, Safari, Firefox)

---

**문서 끝**
