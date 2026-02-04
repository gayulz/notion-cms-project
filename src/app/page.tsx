/**
 * [MIG] 블로그의 메인 페이지입니다.
 * Notion에서 가져온 게시물 목록을 최신순으로 표시합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 */
import { PostList } from '@/components/PostList'
import { getPosts } from '@/lib/notion'
import type { Metadata } from 'next'

// 60초마다 페이지를 재생성합니다 (ISR)
export const revalidate = 60

// 메타데이터 설정
export const metadata: Metadata = {
  title: '개발 블로그 | gayul.kim',
  description: 'Notion CMS 기반으로 구축된 개인 기술 블로그입니다.',
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <section className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Latest Posts
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          개발 경험과 지식을 공유합니다.
        </p>
      </div>

      <PostList initialPosts={posts} />
    </section>
  )
}
