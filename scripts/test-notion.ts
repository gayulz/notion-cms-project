/**
 * Notion API 연결 테스트 스크립트
 * @author gayul.kim
 * @since 2026-01-17
 */

import dotenv from "dotenv";
import { getPosts } from "../src/lib/notion";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

async function testNotionConnection() {
	console.log("🔍 Notion API 연결 테스트 시작...\n");

	try {
		// 환경 변수 확인
		console.log("✅ 환경 변수 확인:");
		console.log(
			`  - NOTION_API_KEY: ${process.env.NOTION_API_KEY ? "설정됨" : "❌ 설정되지 않음"}`
		);
		console.log(
			`  - NOTION_DATABASE_ID: ${process.env.NOTION_DATABASE_ID ? "설정됨" : "❌ 설정되지 않음"}`
		);
		console.log();

		// 블로그 글 목록 가져오기
		console.log("📚 발행된 블로그 글 목록 가져오기...");
		const posts = await getPosts();

		console.log(`\n✅ 성공! 총 ${posts.length}개의 글을 찾았습니다.\n`);

		// 글 목록 출력
		if (posts.length > 0) {
			console.log("📝 글 목록:");
			posts.forEach((post, index) => {
				console.log(`\n${index + 1}. ${post.title}`);
				console.log(`   - ID: ${post.id}`);
				console.log(`   - 카테고리: ${post.category}`);
				console.log(`   - 태그: ${post.tags.join(", ") || "없음"}`);
				console.log(`   - 발행일: ${post.published}`);
				console.log(`   - 슬러그: ${post.slug}`);
				console.log(`   - 요약: ${post.summary || "없음"}`);
			});
		} else {
			console.log(
				'⚠️  발행된 글이 없습니다. Notion 데이터베이스에서 Status를 "발행됨"으로 설정하세요.'
			);
		}

		console.log("\n✅ Notion API 연결 테스트 완료!\n");
	} catch (error) {
		console.error("\n❌ 오류 발생:");
		if (error instanceof Error) {
			console.error(`  - 메시지: ${error.message}`);
			console.error(`  - 스택: ${error.stack}`);
		} else {
			console.error(error);
		}
		console.log("\n💡 문제 해결 방법:");
		console.log("  1. .env.local 파일이 존재하는지 확인");
		console.log("  2. NOTION_API_KEY가 올바른지 확인");
		console.log("  3. NOTION_DATABASE_ID가 올바른지 확인");
		console.log(
			"  4. Notion Integration이 데이터베이스에 연결되어 있는지 확인"
		);
		console.log("  5. 인터넷 연결 상태 확인\n");
		process.exit(1);
	}
}

// 스크립트 실행
testNotionConnection();
