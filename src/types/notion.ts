// [MIG] Notion API에서 받아온 데이터의 형태를 정의하기 위한 인터페이스
// @author gayul.kim
// @since 2026-01-18

interface Post {
  id: string
  title: string
  category: string
  tags: string[]
  published: string
  slug: string
  thumbnail?: string
  summary?: string
}

interface PostContent extends Post {
  content: string // Markdown 변환된 본문
}

export type { Post, PostContent }
