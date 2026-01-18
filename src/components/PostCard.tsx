/**
 * [NEW] 블로그 포스트를 카드 형태로 표시하는 컴포넌트입니다.
 * Notion에서 가져온 BlogPost 데이터를 기반으로 제목, 요약, 카테고리, 발행일 등을 표시합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 */
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Post } from '@/types/notion'
import { formatDate } from '@/lib/utils' // Assuming a formatDate utility will be available later

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { title, slug, category, published, summary, thumbnail, tags } = post

  return (
    <Card className="flex h-full flex-col">
      <Link href={`/posts/${slug}`}>
        {thumbnail && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {tags && tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <CardTitle className="hover:text-primary text-xl transition-colors">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {formatDate(published)}
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {summary}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}
