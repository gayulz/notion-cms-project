'use client'

import { PostCard } from '@/components/PostCard'
import { Post } from '@/types/notion'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface PostListProps {
  initialPosts: Post[]
}

export function PostList({ initialPosts }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = initialPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative mx-auto max-w-md">
        <label htmlFor="search" className="sr-only">
          검색
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            id="search"
            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 sm:text-sm"
            placeholder="게시글 제목 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Post Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              검색 결과가 없습니다.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
