# 📝 Notion CMS 기반 개인 개발 블로그 - 프로젝트 제출

---

## 🔗 GitHub 저장소 URL

**https://github.com/gayulz/notion-cms-project**

---

## 📋 프로젝트 개요

### 프로젝트명
**Notion CMS 기반 개인 개발 블로그 (Personal Dev Blog with Notion CMS)**

### 주요 기능
Notion을 CMS(Content Management System)로 활용하여, 개발자가 **Notion에서 글을 작성하면 자동으로 웹 블로그에 반영**되는 개인 기술 블로그 플랫폼입니다.

#### 핵심 기능
1. **Notion 데이터베이스 연동**
   - Notion에서 글 작성/수정 시 자동 반영
   - Status(초안/발행됨) 관리를 통한 글 공개 제어

2. **블로그 글 관리**
   - 카테고리별 분류 (Frontend, Backend, DevOps 등)
   - 태그 시스템 (React, Next.js, TypeScript 등)
   - 발행일 관리
   - URL 슬러그 자동 생성

3. **반응형 디자인**
   - 모바일/태블릿/데스크톱 완벽 지원
   - shadcn/ui 기반 모던 UI/UX

4. **성능 최적화**
   - Next.js 15 App Router + ISR (Incremental Static Regeneration)
   - 60초마다 자동 재검증으로 최신 콘텐츠 반영

---

## 🛠️ CMS

**Notion API** (@notionhq/client v2.3.0)

### Notion을 CMS로 선택한 이유
- ✅ **직관적인 UI/UX**: 별도의 관리자 페이지 개발 불필요
- ✅ **강력한 블록 시스템**: 코드 블록, 이미지, 임베드 등 다양한 콘텐츠 타입 지원
- ✅ **무료 API**: 개인 사용 시 충분한 무료 플랜 제공
- ✅ **모바일 앱 지원**: 언제 어디서나 콘텐츠 작성 가능
- ✅ **데이터베이스 기능**: 태그, 카테고리, 필터링 등 강력한 데이터 관리

### Notion 데이터베이스 구조
| 속성명 | 타입 | 설명 |
|--------|------|------|
| Title | title | 글 제목 |
| Category | select | 카테고리 (Frontend, Backend, DevOps 등) |
| Tags | multi_select | 태그 (React, TypeScript, Next.js 등) |
| Published | date | 발행일 |
| Status | select | 상태 (초안/발행됨) |
| Slug | rich_text | URL 슬러그 |
| Summary | rich_text | 글 요약 |

---

## 💻 사용 기술

### Frontend Framework
- **Next.js** 15.5.3 (App Router + Turbopack)
- **React** 19.1.0
- **TypeScript** 5.x

### Styling
- **Tailwind CSS** v4
- **shadcn/ui** (new-york style)
- **Lucide React** (아이콘)

### CMS & API Integration
- **@notionhq/client** v2.3.0 - Notion API 클라이언트
- **notion-to-md** v3.1.9 - Notion 블록을 Markdown으로 변환

### Development Tools
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** + **lint-staged** - Git Hook 자동화
- **tsx** - TypeScript 실행 환경

### Deployment
- **Vercel** (예정) - 배포 및 호스팅 플랫폼

---

## 📊 프로젝트 구조

```
notion-cms-project/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── page.tsx           # 홈 페이지 (예정)
│   │   ├── posts/[slug]/      # 글 상세 페이지 (예정)
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # shadcn/ui 컴포넌트
│   │   └── ...               # 커스텀 컴포넌트 (예정)
│   ├── lib/
│   │   ├── notion.ts         # ✅ Notion API 클라이언트
│   │   └── utils.ts          # 공통 유틸리티
│   └── types/
│       └── notion.ts         # ✅ Notion 관련 타입 정의
├── scripts/
│   ├── test-notion.ts        # ✅ Notion API 연결 테스트
│   └── debug-notion.ts       # ✅ Notion 데이터 디버깅
├── docs/
│   ├── PRD.md               # ✅ 프로젝트 요구사항 정의서
│   └── guides/              # 개발 가이드
├── .env.local               # ✅ 환경 변수 (Notion API Key, DB ID)
├── .env.example             # ✅ 환경 변수 예시
└── README.md                # ✅ 프로젝트 소개 및 사용 가이드
```

---

## ✅ 완료된 작업 (현재까지)

### 1. 프로젝트 초기 설정
- [x] Next.js 15.5.3 프로젝트 생성
- [x] TypeScript, Tailwind CSS, shadcn/ui 설정
- [x] Git 저장소 초기화 및 GitHub 업로드
- [x] 프로젝트 문서화 (README.md, PRD.md)

### 2. Notion API 연동
- [x] Notion Integration 생성 및 API Key 발급
- [x] Notion 데이터베이스 생성 (블로그 글 관리)
- [x] 환경 변수 설정 (.env.local)
- [x] Notion API 클라이언트 구현 (src/lib/notion.ts)
- [x] TypeScript 타입 정의 (src/types/notion.ts)
- [x] **API 연결 테스트 성공** ✅

### 3. API 기능 구현
- [x] `getPosts()` - 발행된 블로그 글 목록 가져오기
- [x] `getPostBySlug()` - 슬러그로 특정 글 가져오기
- [x] `getPostById()` - ID로 특정 글 가져오기
- [x] `getAllPostSlugs()` - 모든 글의 슬러그 목록 (Static Path 생성용)
- [x] Notion 페이지 → BlogPost 타입 변환 로직

### 4. 테스트 및 디버깅
- [x] 테스트 스크립트 작성 (scripts/test-notion.ts)
- [x] 디버깅 스크립트 작성 (scripts/debug-notion.ts)
- [x] Notion API 연결 검증 완료

---

## 🚀 다음 단계 (예정)

### Phase 1: 블로그 페이지 구현
- [ ] 홈 페이지 - Notion 글 목록 표시
- [ ] 글 상세 페이지 - Markdown 렌더링
- [ ] 카테고리별 필터링 페이지

### Phase 2: UI/UX 개선
- [ ] 디자인 시스템 적용
- [ ] 반응형 레이아웃 구현
- [ ] 다크 모드 지원

### Phase 3: 배포 및 최적화
- [ ] Vercel 배포
- [ ] SEO 최적화 (메타 태그, Sitemap)
- [ ] 성능 최적화 (이미지, 폰트)

---

## 📸 현재 상태 스크린샷

### Notion 데이터베이스
![Notion Database](https://via.placeholder.com/800x400?text=Notion+Database+Screenshot)

### API 연결 테스트 성공
```bash
$ npm run test:notion

✅ 성공! 총 1개의 글을 찾았습니다.

📝 글 목록:

1. 첫 번째 테스트 글
   - ID: 2eb884a8-ef92-8050-9b70-cc68493fc75d
   - 카테고리: frontend
   - 태그: React, Next.js
   - 발행일: 2026-01-17
   - 슬러그: first-test-post
   - 요약: 테스트용 첫 글입니다.

✅ Notion API 연결 테스트 완료!
```

---

## 🔧 로컬 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/gayulz/notion-cms-project.git
cd notion-cms-project
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일 생성 후 다음 내용 입력:
```env
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

### 4. Notion API 연결 테스트
```bash
npm run test:notion
```

### 5. 개발 서버 실행 (예정)
```bash
npm run dev
# http://localhost:3000
```

---

## 📚 참고 문서

- **[README.md](./README.md)**: 프로젝트 소개 및 사용 가이드
- **[PRD.md](./docs/PRD.md)**: 프로젝트 요구사항 정의서 (17,453자)
- **[Notion API 공식 문서](https://developers.notion.com/)**
- **[Next.js 15 공식 문서](https://nextjs.org/docs)**

---

## 👤 작성자

- **이름**: 김준석 (gayul.kim)
- **GitHub**: [@gayulz](https://github.com/gayulz)
- **프로젝트 저장소**: [notion-cms-project](https://github.com/gayulz/notion-cms-project)

---

## 📝 프로젝트 타임라인

| 날짜 | 작업 내용 |
|------|-----------|
| 2026-01-17 | 프로젝트 초기 설정, Notion API 연동 완료, 첫 커밋 |
| 2026-01-18 (예정) | 홈 페이지 및 글 상세 페이지 구현 |
| 2026-01-20 (예정) | UI/UX 개선 및 스타일링 |
| 2026-01-22 (예정) | Vercel 배포 및 최종 테스트 |

---

**제출일**: 2026-01-17
**프로젝트 상태**: API 연동 완료, 페이지 구현 예정
**완성도**: 약 30% (Notion API 연동 완료, UI 구현 필요)
