// [NEW] Notion API 연결 테스트 스크립트
// @author gayul.kim
// @since 2026-01-18

import 'dotenv/config' // 환경 변수 로드

import { Client } from '@notionhq/client'
import { env } from '../src/lib/env'
import { Post } from '../src/types/notion'

async function testNotionConnection() {
  console.log('Notion API 연결 테스트를 시작합니다...')

  const notion = new Client({
    auth: env.NOTION_API_KEY,
  })

  try {
    const response = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: '발행됨', // 'Published' 상태의 게시물만 가져오도록 필터링
        },
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })

    if (response.results.length === 0) {
      console.log(
        'Notion 데이터베이스에 "발행됨" 상태의 게시물이 없습니다. 샘플 데이터를 확인해주세요.'
      )
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: Post[] = response.results.map((page: any) => {
      const properties = page.properties
      const title = properties.Title?.title[0]?.plain_text || '제목 없음'
      const category = properties.Category?.select?.name || '카테고리 없음'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tags =
        properties.Tags?.multi_select.map((tag: any) => tag.name) || []
      const published = properties.Published?.date?.start || '날짜 없음'
      const slug = properties.Slug?.rich_text[0]?.plain_text || '슬러그 없음'
      const thumbnail =
        properties.Thumbnail?.files[0]?.file?.url ||
        properties.Thumbnail?.files[0]?.external?.url ||
        undefined
      const summary = properties.Summary?.rich_text[0]?.plain_text || undefined

      return {
        id: page.id,
        title,
        category,
        tags,
        published,
        slug,
        thumbnail,
        summary,
      }
    })

    console.log('--- Notion 데이터베이스 연결 성공 ---')
    console.log(`총 ${posts.length}개의 게시물을 찾았습니다.`)
    posts.forEach((post, index) => {
      console.log(`
게시물 ${index + 1}:`)
      console.log(`  ID: ${post.id}`)
      console.log(`  제목: ${post.title}`)
      console.log(`  카테고리: ${post.category}`)
      console.log(`  태그: ${post.tags.join(', ')}`)
      console.log(`  발행일: ${post.published}`)
      console.log(`  슬러그: ${post.slug}`)
      if (post.thumbnail) console.log(`  썸네일: ${post.thumbnail}`)
      if (post.summary) console.log(`  요약: ${post.summary}`)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Notion API 연결 중 오류가 발생했습니다:')
    if (error.code === 'unauthorized') {
      console.error('  에러 코드: unauthorized (401)')
      console.error(
        '  메시지: Notion API 키가 유효하지 않거나 데이터베이스 접근 권한이 없습니다.'
      )
      console.error(
        '  `.env.local` 파일의 `NOTION_API_KEY`를 확인하거나, Notion 인티그레이션에 데이터베이스 접근 권한을 부여했는지 확인해주세요.'
      )
    } else if (error.code === 'validation_error') {
      console.error('  에러 코드: validation_error')
      console.error(
        '  메시지: Notion API 요청 파라미터가 유효하지 않습니다. `NOTION_DATABASE_ID`가 올바른지, 데이터베이스 속성 이름이 로드맵과 일치하는지 확인해주세요.'
      )
      console.error(`  자세한 내용: ${error.message}`)
    } else {
      console.error(`  예상치 못한 에러: ${error.message}`)
      console.error(
        '  Notion 개발자 문서를 참조하거나 Notion 설정(API 키, 데이터베이스 ID, 권한 등)을 다시 확인해주세요.'
      )
    }
  }
  console.log('\nNotion API 연결 테스트를 완료합니다.')
}

testNotionConnection()
