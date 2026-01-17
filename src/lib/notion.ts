/**
 * Notion API 클라이언트 유틸리티
 * @author gayul.kim
 * @since 2026-01-17
 */

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { BlogPost, NotionPage } from "@/types/notion";

// 환경 변수 가져오기
const getNotionConfig = () => {
	const NOTION_API_KEY = process.env.NOTION_API_KEY;
	const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

	if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
		throw new Error(
			"환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요."
		);
	}

	return { NOTION_API_KEY, NOTION_DATABASE_ID };
};

// Notion 클라이언트 초기화 (lazy initialization)
let notionClient: Client | null = null;
let n2mClient: NotionToMarkdown | null = null;

export const getNotionClient = () => {
	if (!notionClient) {
		const { NOTION_API_KEY } = getNotionConfig();
		notionClient = new Client({ auth: NOTION_API_KEY });
	}
	return notionClient;
};

export const getN2M = () => {
	if (!n2mClient) {
		const client = getNotionClient(); // 클라이언트 초기화
		n2mClient = new NotionToMarkdown({ notionClient: client });
	}
	return n2mClient!;
};

/**
 * 발행된 블로그 글 목록 가져오기
 * @returns 발행된 블로그 글 배열
 */
export async function getPosts(): Promise<BlogPost[]> {
	try {
		const notion = getNotionClient();
		const { NOTION_DATABASE_ID } = getNotionConfig();
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: {
				property: "Status",
				select: {
					equals: "발행됨",
				},
			},
			sorts: [
				{
					property: "Published",
					direction: "descending",
				},
			],
		});

		return response.results.map((page) => convertNotionPageToBlogPost(page as NotionPage));
	} catch (error) {
		console.error("Notion API 오류:", error);
		throw new Error("블로그 글 목록을 가져오는데 실패했습니다.");
	}
}

/**
 * 슬러그로 특정 블로그 글 가져오기
 * @param slug - 글 슬러그
 * @returns 블로그 글 또는 null
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const notion = getNotionClient();
		const n2m = getN2M();
		const { NOTION_DATABASE_ID } = getNotionConfig();
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: {
				and: [
					{
						property: "Status",
						select: {
							equals: "발행됨",
						},
					},
					{
						property: "Slug",
						rich_text: {
							equals: slug,
						},
					},
				],
			},
		});

		if (response.results.length === 0) {
			return null;
		}

		const page = response.results[0] as NotionPage;
		const post = convertNotionPageToBlogPost(page);

		// 본문 콘텐츠 가져오기
		const mdBlocks = await n2m.pageToMarkdown(page.id);
		const mdString = n2m.toMarkdownString(mdBlocks);
		post.content = mdString.parent;

		return post;
	} catch (error) {
		console.error("Notion API 오류:", error);
		throw new Error("블로그 글을 가져오는데 실패했습니다.");
	}
}

/**
 * ID로 특정 블로그 글 가져오기
 * @param id - 글 ID
 * @returns 블로그 글 또는 null
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
	try {
		const notion = getNotionClient();
		const n2m = getN2M();
		const page = await notion.pages.retrieve({ page_id: id });
		const post = convertNotionPageToBlogPost(page as unknown as NotionPage);

		// 본문 콘텐츠 가져오기
		const mdBlocks = await n2m.pageToMarkdown(id);
		const mdString = n2m.toMarkdownString(mdBlocks);
		post.content = mdString.parent;

		return post;
	} catch (error) {
		console.error("Notion API 오류:", error);
		return null;
	}
}

/**
 * 모든 글의 슬러그 목록 가져오기 (Static Path 생성용)
 * @returns 슬러그 배열
 */
export async function getAllPostSlugs(): Promise<string[]> {
	try {
		const notion = getNotionClient();
		const { NOTION_DATABASE_ID } = getNotionConfig();
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: {
				property: "Status",
				select: {
					equals: "발행됨",
				},
			},
		});

		return response.results
			.map((page) => {
				const notionPage = page as NotionPage;
				const slugProperty = notionPage.properties.Slug;
				if (slugProperty && slugProperty.rich_text.length > 0) {
					return slugProperty.rich_text[0].plain_text;
				}
				return null;
			})
			.filter((slug): slug is string => slug !== null);
	} catch (error) {
		console.error("Notion API 오류:", error);
		return [];
	}
}

/**
 * Notion 페이지 객체를 BlogPost 타입으로 변환
 * @param page - Notion 페이지 객체
 * @returns BlogPost 객체
 */
function convertNotionPageToBlogPost(page: NotionPage): BlogPost {
	const properties = page.properties;

	// 제목 추출
	const title =
		properties.Title?.title[0]?.plain_text || "제목 없음";

	// 카테고리 추출
	const category = properties.Category?.select?.name || "미분류";

	// 태그 추출
	const tags =
		properties.Tags?.multi_select.map((tag) => tag.name) || [];

	// 발행일 추출
	const published =
		properties.Published?.date?.start || new Date().toISOString();

	// 상태 추출
	const status =
		(properties.Status?.select?.name as "초안" | "발행됨") || "초안";

	// 슬러그 추출 (없으면 제목을 kebab-case로 변환)
	const slug =
		properties.Slug?.rich_text[0]?.plain_text ||
		title
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");

	// 요약 추출
	const summary =
		properties.Summary?.rich_text[0]?.plain_text || "";

	return {
		id: page.id,
		title,
		category,
		tags,
		published,
		status,
		slug,
		summary,
		createdAt: page.created_time,
		updatedAt: page.last_edited_time,
	};
}
