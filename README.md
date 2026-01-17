# 📝 Notion CMS 기반 개인 개발 블로그

> Notion을 CMS로 활용하여 콘텐츠를 관리하는 모던 개인 기술 블로그 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

---

## 🎯 프로젝트 개요

이 프로젝트는 Notion을 CMS(Content Management System)로 활용하여, **Notion에서 글을 작성하면 자동으로 웹 블로그에 반영되는** 개인 기술 블로그 플랫폼입니다.

### 왜 Notion을 CMS로?

- ✅ **직관적인 에디터**: 별도의 관리자 페이지 개발 불필요
- ✅ **강력한 블록 시스템**: 코드 블록, 이미지, 임베드 등 다양한 콘텐츠 타입 지원
- ✅ **무료 API**: 개인 사용 시 충분한 무료 플랜 제공
- ✅ **모바일 앱 지원**: 언제 어디서나 콘텐츠 작성 가능
- ✅ **데이터베이스 기능**: 태그, 카테고리, 필터링 등 강력한 데이터 관리

---

## ✨ 주요 기능

- 📄 **Notion 데이터베이스 연동**: Notion에서 글 작성/수정 시 자동 반영
- 🎨 **모던 UI/UX**: shadcn/ui 기반의 세련된 디자인
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- 🔍 **카테고리 & 태그**: 효율적인 콘텐츠 분류 및 검색
- ⚡ **빠른 성능**: Next.js 15 App Router + ISR (Incremental Static Regeneration)
- 🎯 **SEO 최적화**: 메타 태그, Open Graph, Sitemap 지원

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.5.3 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS v4 + shadcn/ui
- **Icons**: Lucide React

### CMS & API
- **CMS**: Notion API
- **Client**: @notionhq/client
- **Markdown**: notion-to-md

### Deployment
- **Platform**: Vercel
- **CI/CD**: GitHub Actions

---

## 🚀 빠른 시작

### 1. 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- Notion 계정

### 2. Notion 설정

#### 2.1 Notion 인티그레이션 생성

1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 접속
2. **"New integration"** 클릭
3. 이름 입력 (예: `개인 블로그`)
4. **Internal Integration** 선택
5. **Submit** 클릭
6. **API Key 복사** (나중에 사용)

#### 2.2 Notion 데이터베이스 생성

1. Notion에서 새 페이지 생성
2. **Database - Full page** 선택
3. 다음 속성 추가:

| 속성명 | 타입 | 설명 |
|--------|------|------|
| **Title** | Title | 글 제목 |
| **Category** | Select | 카테고리 (예: Frontend, Backend) |
| **Tags** | Multi-select | 태그 |
| **Published** | Date | 발행일 |
| **Status** | Select | 상태 (`초안`, `발행됨`) |
| **Slug** | Text | URL 슬러그 (선택) |
| **Summary** | Text | 요약 (선택) |

4. 데이터베이스 우측 상단 **`...`** → **"Add connections"** → 위에서 만든 인티그레이션 선택
5. 데이터베이스 URL에서 **Database ID 복사**
   ```
   https://www.notion.so/[workspace]/[DATABASE_ID]?v=...
                                    ↑ 이 부분
   ```

### 3. 프로젝트 설정

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/notion-cms-project.git
cd notion-cms-project

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
```

### 4. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `NOTION_API_KEY`: 2.1 단계에서 복사한 API Key
- `NOTION_DATABASE_ID`: 2.2 단계에서 복사한 Database ID

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 📂 프로젝트 구조

```
notion-cms-project/
├── app/                      # Next.js 15 App Router
│   ├── page.tsx             # 홈 페이지 (글 목록)
│   ├── posts/[slug]/        # 글 상세 페이지
│   └── layout.tsx           # 루트 레이아웃
├── components/              # React 컴포넌트
│   ├── ui/                  # shadcn/ui 컴포넌트
│   └── ...                  # 커스텀 컴포넌트
├── lib/                     # 유틸리티 함수
│   ├── notion.ts            # Notion API 클라이언트
│   └── utils.ts             # 공통 유틸리티
├── types/                   # TypeScript 타입 정의
│   └── notion.ts            # Notion 관련 타입
├── docs/                    # 프로젝트 문서
│   ├── PRD.md              # 프로젝트 요구사항 정의서
│   ├── ROADMAP.md          # 개발 로드맵
│   └── guides/             # 개발 가이드
└── public/                  # 정적 파일
```

---

## 📚 개발 문서

- **[PRD (Product Requirements Document)](./docs/PRD.md)**: 프로젝트 요구사항 정의서
- **[ROADMAP](./docs/ROADMAP.md)**: 개발 단계별 로드맵
- **[프로젝트 구조 가이드](./docs/guides/project-structure.md)**: 디렉토리 구조 설명
- **[Next.js 15 가이드](./docs/guides/nextjs-15.md)**: Next.js 15 전문 개발 가이드
- **[스타일링 가이드](./docs/guides/styling-guide.md)**: Tailwind CSS + shadcn/ui 사용법
- **[컴포넌트 패턴](./docs/guides/component-patterns.md)**: 컴포넌트 작성 규칙

---

## 🔧 개발 명령어

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint

# 타입 체크
npm run type-check

# 코드 포맷팅
npm run format

# 모든 검사 통합 실행
npm run check-all
```

---

## 🌐 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. **Environment Variables** 설정:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
4. **Deploy** 클릭

### 수동 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 확인
npm start
```

---

## 📝 사용 방법

### 1. 새 글 작성

1. Notion 데이터베이스에서 새 페이지 생성
2. 제목, 카테고리, 태그, 발행일 입력
3. **Status**를 `발행됨`으로 설정
4. 본문 작성 (Notion 블록 사용)
5. 60초 후 블로그에 자동 반영 (ISR)

### 2. 글 수정

1. Notion에서 해당 글 수정
2. 60초 후 블로그에 자동 반영

### 3. 글 삭제 (임시)

1. **Status**를 `초안`으로 변경
2. 블로그에서 숨김 처리

---

## 🎨 커스터마이징

### 색상 테마 변경

`app/globals.css`에서 CSS 변수 수정:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```

---

## 🤝 기여 가이드

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m '새로운 기능 추가'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 문의

- **작성자**: gayul.kim
- **이메일**: [your-email@example.com](mailto:your-email@example.com)
- **블로그**: [your-blog-url.com](https://your-blog-url.com)
- **GitHub**: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 🙏 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**
