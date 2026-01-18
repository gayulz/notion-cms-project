/**
 * [NEW] 블로그 포스트의 메타 정보를 표시하는 컴포넌트입니다.
 * 발행일, 카테고리, 태그 정보를 시각적으로 제공합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 */
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/notion'
import { CalendarIcon, TagIcon, FolderIcon } from 'lucide-react' // CategoryIcon 대신 FolderIcon 사용
import { formatDate } from '@/lib/utils' // Assuming a formatDate utility will be available later

interface PostMetaProps {
  post: Pick<Post, 'published' | 'category' | 'tags'>
}

export function PostMeta({ post }: PostMetaProps) {
  const { published, category, tags } = post

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
      <div className="flex items-center gap-1">
        <CalendarIcon className="h-4 w-4" />
        <time dateTime={published}>{formatDate(published)}</time>
      </div>
      <div className="flex items-center gap-1">
        <FolderIcon className="h-4 w-4" />
        <Badge variant="secondary">{category}</Badge>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-1">
          <TagIcon className="h-4 w-4" />
          {tags.map(tag => (
            <Badge key={tag} variant="outline" className="mr-1">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
