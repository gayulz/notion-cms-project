/**
 * Notion API 관련 타입 정의
 * @author gayul.kim
 * @since 2026-01-17
 */

// 블로그 포스트 인터페이스
export interface BlogPost {
	id: string;
	title: string;
	category: string;
	tags: string[];
	published: string; // ISO 8601 날짜 문자열
	status: "초안" | "발행됨";
	slug?: string;
	summary?: string;
	thumbnail?: string;
	content?: string; // Markdown 형식
	createdAt: string;
	updatedAt: string;
}

// Notion 데이터베이스 쿼리 결과
export interface NotionDatabaseQueryResult {
	results: NotionPage[];
	has_more: boolean;
	next_cursor: string | null;
}

// Notion 페이지 타입 (간소화)
export interface NotionPage {
	id: string;
	properties: NotionPageProperties;
	created_time: string;
	last_edited_time: string;
}

// Notion 페이지 속성
export interface NotionPageProperties {
	Title: {
		title: Array<{
			plain_text: string;
		}>;
	};
	Category?: {
		select: {
			name: string;
		} | null;
	};
	Tags?: {
		multi_select: Array<{
			name: string;
		}>;
	};
	Published?: {
		date: {
			start: string;
		} | null;
	};
	Status?: {
		select: {
			name: string;
		} | null;
	};
	Slug?: {
		rich_text: Array<{
			plain_text: string;
		}>;
	};
	Summary?: {
		rich_text: Array<{
			plain_text: string;
		}>;
	};
}
