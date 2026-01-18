/**
 * [MIG] 블로그의 메인 페이지입니다.
 * Notion에서 가져온 게시물 목록을 최신순으로 표시합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 */
import type { Metadata } from 'next'
import { getPosts } from '@/lib/notion'
import { PostCard } from '@/components/PostCard'

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
    <section className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="col-span-full text-center">게시물이 없습니다.</p>
      )}
    </section>
  )
}
