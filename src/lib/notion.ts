/**
 * Notion API 클라이언트 유틸리티
 * @author gayul.kim
 * @since 2026-01-17
 */

import type { Post, PostContent } from '@/types/notion'
import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

// 환경 변수 가져오기
const getNotionConfig = () => {
  const NOTION_API_KEY = process.env.NOTION_API_KEY
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    throw new Error(
      '환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
    )
  }

  return { NOTION_API_KEY, NOTION_DATABASE_ID }
}

// Notion 클라이언트 초기화 (lazy initialization)
let notionClient: Client | null = null
let n2mClient: NotionToMarkdown | null = null

export const getNotionClient = () => {
  if (!notionClient) {
    const { NOTION_API_KEY } = getNotionConfig()
    notionClient = new Client({ auth: NOTION_API_KEY })
  }
  return notionClient
}

export const getN2M = () => {
  if (!n2mClient) {
    const client = getNotionClient() // 클라이언트 초기화
    n2mClient = new NotionToMarkdown({ notionClient: client })
  }
  return n2mClient!
}

/**
 * [MIG] Notion 페이지의 콘텐츠를 Markdown 문자열로 변환합니다.
 * @author gayul.kim
 * @since 2026-01-18
 * @param pageId - Notion 페이지 ID
 * @returns 페이지 콘텐츠의 Markdown 문자열 또는 null
 */
export async function getMarkdownContent(
  pageId: string
): Promise<string | null> {
  try {
    const n2m = getN2M()
    const mdBlocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdBlocks)
    return mdString.parent
  } catch (error) {
    console.error(
      `Notion API 오류 (Markdown 콘텐츠 변환): 페이지 ID ${pageId}):`,
      error
    )
    return null
  }
}

/**
 * 발행된 블로그 글 목록 가져오기
 * @returns 발행된 블로그 글 배열
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const notion = getNotionClient()
    const { NOTION_DATABASE_ID } = getNotionConfig()
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })

    return response.results.map(page =>
      convertNotionPageToBlogPost(page as PageObjectResponse)
    )
  } catch (error) {
    console.error('Notion API 오류:', error)
    throw new Error('블로그 글 목록을 가져오는데 실패했습니다.')
  }
}

/**
 * 특정 카테고리에 해당하는 발행된 블로그 글 목록 가져오기
 * @author gayul.kim
 * @since 2026-01-18
 * @param category - 글 카테고리
 * @returns 특정 카테고리에 속하는 발행된 블로그 글 배열
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const notion = getNotionClient()
    const { NOTION_DATABASE_ID } = getNotionConfig()
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
          {
            property: 'Category',
            select: {
              equals: category,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })

    return response.results.map(page =>
      convertNotionPageToBlogPost(page as PageObjectResponse)
    )
  } catch (error) {
    console.error(`Notion API 오류 (카테고리: ${category}):`, error)
    throw new Error(
      `카테고리 "${category}"의 블로그 글 목록을 가져오는데 실패했습니다.`
    )
  }
}

/**
 * 슬러그로 특정 블로그 글 가져오기
 * @param slug - 글 슬러그
 * @returns 블로그 글 또는 null
 */
export async function getPostBySlug(slug: string): Promise<PostContent | null> {
  try {
    const notion = getNotionClient()
    const { NOTION_DATABASE_ID } = getNotionConfig()
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      return null
    }

    const page = response.results[0] as PageObjectResponse
    const post = convertNotionPageToBlogPost(page) as PostContent
    post.content = (await getMarkdownContent(page.id)) || ''

    return post
  } catch (error) {
    console.error('Notion API 오류:', error)
    throw new Error('블로그 글을 가져오는데 실패했습니다.')
  }
}

/**
 * ID로 특정 블로그 글 가져오기
 * @param id - 글 ID
 * @returns 블로그 글 또는 null
 */
export async function getPostById(id: string): Promise<PostContent | null> {
  try {
    const notion = getNotionClient()
    const page = await notion.pages.retrieve({ page_id: id })
    const post = convertNotionPageToBlogPost(
      page as unknown as PageObjectResponse
    ) as PostContent
    post.content = (await getMarkdownContent(id)) || ''

    return post
  } catch (error) {
    console.error('Notion API 오류:', error)
    return null
  }
}

/**
 * 모든 글의 슬러그 목록 가져오기 (Static Path 생성용)
 * @returns 슬러그 배열
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const notion = getNotionClient()
    const { NOTION_DATABASE_ID } = getNotionConfig()
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
    })

    return response.results
      .map(page => {
        const notionPage = page as PageObjectResponse
        const slugProperty = notionPage.properties.Slug
        if (
          slugProperty &&
          slugProperty.type === 'rich_text' &&
          slugProperty.rich_text.length > 0
        ) {
          return slugProperty.rich_text[0].plain_text
        }
        return null
      })
      .filter((slug): slug is string => slug !== null)
  } catch (error) {
    console.error('Notion API 오류:', error)
    return []
  }
}

/**
 * Notion 페이지 객체를 BlogPost 타입으로 변환
 * @param page - Notion 페이지 객체
 * @returns BlogPost 객체
 */
function convertNotionPageToBlogPost(page: PageObjectResponse): Post {
  const { properties } = page

  const getTitle = () => {
    const titleProp = properties.Title
    if (titleProp?.type === 'title') {
      return titleProp.title[0]?.plain_text || '제목 없음'
    }
    return '제목 없음'
  }

  const getCategory = () => {
    const categoryProp = properties.Category
    if (categoryProp?.type === 'select') {
      return categoryProp.select?.name || '미분류'
    }
    return '미분류'
  }

  const getTags = () => {
    const tagsProp = properties.Tags
    if (tagsProp?.type === 'multi_select') {
      return tagsProp.multi_select.map(tag => tag.name)
    }
    return []
  }

  const getPublishedDate = () => {
    const publishedProp = properties.Published
    if (publishedProp?.type === 'date') {
      return publishedProp.date?.start || new Date().toISOString()
    }
    return new Date().toISOString()
  }

  const getStatus = () => {
    const statusProp = properties.Status
    if (statusProp?.type === 'status') {
      return (
        (statusProp.status?.name as 'Draft' | 'Published' | 'Archived') ||
        'Draft'
      )
    }
    return 'Draft'
  }

  const getSlug = (title: string) => {
    const slugProp = properties.Slug
    if (slugProp?.type === 'rich_text' && slugProp.rich_text[0]?.plain_text) {
      return slugProp.rich_text[0].plain_text
    }
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  const getSummary = () => {
    const summaryProp = properties.Summary
    if (summaryProp?.type === 'rich_text') {
      return summaryProp.rich_text[0]?.plain_text || ''
    }
    return ''
  }

  const title = getTitle()
  const slug = getSlug(title)

  return {
    id: page.id,
    title,
    category: getCategory(),
    tags: getTags(),
    published: getPublishedDate(),
    status: getStatus(),
    slug,
    summary: getSummary(),
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  }
}
