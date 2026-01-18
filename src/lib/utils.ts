import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * [NEW] ISO 문자열 날짜를 읽기 쉬운 형식으로 포맷합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 'YYYY년 MM월 DD일' 형식의 날짜 문자열
 */
export function formatDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'yyyy년 MM월 dd일')
}

/**
 * [NEW] 문자열을 URL 친화적인 슬러그로 변환합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 * @param text - 슬러그로 변환할 원본 문자열
 * @returns URL 친화적인 슬러그 문자열
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/[^\w-]+/g, '') // 비단어 문자를 제거
    .replace(/--+/g, '-') // 여러 개의 하이픈을 하나로
}

/**
 * [NEW] 주어진 텍스트의 예상 독서 시간을 계산합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 * @param text - 독서 시간을 계산할 텍스트
 * @param wordsPerMinute - 분당 평균 독서 단어 수 (기본값: 200)
 * @returns 예상 독서 시간 (분)
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  const words = text.split(/\s+/).filter(Boolean).length // 공백으로 나누고 빈 문자열 제거
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}
