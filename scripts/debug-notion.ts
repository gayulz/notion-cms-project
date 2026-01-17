/**
 * Notion API 디버깅 스크립트 - 모든 데이터 확인
 * @author gayul.kim
 * @since 2026-01-17
 */

import dotenv from "dotenv";
import { Client } from "@notionhq/client";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

async function debugNotionData() {
	console.log("🔍 Notion 데이터 디버깅 시작...\n");

	try {
		const NOTION_API_KEY = process.env.NOTION_API_KEY;
		const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

		if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
			throw new Error("환경 변수가 설정되지 않았습니다.");
		}

		const notion = new Client({ auth: NOTION_API_KEY });

		// 필터 없이 모든 글 가져오기
		console.log("📚 모든 글 가져오기 (필터 없음)...\n");
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
		});

		console.log(`✅ 총 ${response.results.length}개의 페이지를 찾았습니다.\n`);

		if (response.results.length > 0) {
			response.results.forEach((page: any, index) => {
				console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
				console.log(`📄 페이지 ${index + 1}`);
				console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
				console.log(`ID: ${page.id}`);
				console.log(`\n속성 (Properties):`);

				// 모든 속성 출력
				Object.entries(page.properties).forEach(([key, value]: [string, any]) => {
					console.log(`\n  [${key}]:`);
					console.log(`    타입: ${value.type}`);

					// 타입별로 값 출력
					if (value.type === "title" && value.title.length > 0) {
						console.log(`    값: "${value.title[0].plain_text}"`);
					} else if (value.type === "select" && value.select) {
						console.log(`    값: "${value.select.name}"`);
					} else if (value.type === "multi_select") {
						const tags = value.multi_select.map((t: any) => t.name).join(", ");
						console.log(`    값: [${tags}]`);
					} else if (value.type === "date" && value.date) {
						console.log(`    값: ${value.date.start}`);
					} else if (value.type === "rich_text" && value.rich_text.length > 0) {
						console.log(`    값: "${value.rich_text[0].plain_text}"`);
					} else {
						console.log(`    값: (비어있음 또는 지원하지 않는 타입)`);
					}
				});
			});
		} else {
			console.log("⚠️  데이터베이스에 페이지가 없습니다.");
			console.log("\n💡 Notion에서 다음을 확인하세요:");
			console.log("  1. '+ 새 페이지' 버튼으로 글을 추가했는지");
			console.log("  2. Integration이 올바른 데이터베이스에 연결되었는지");
		}

		console.log("\n\n✅ 디버깅 완료!\n");
	} catch (error) {
		console.error("\n❌ 오류 발생:");
		if (error instanceof Error) {
			console.error(`  - 메시지: ${error.message}`);
			console.error(`  - 스택: ${error.stack}`);
		} else {
			console.error(error);
		}
		process.exit(1);
	}
}

// 스크립트 실행
debugNotionData();
