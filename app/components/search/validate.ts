import { parseKeyword } from 'lib/parser'

/**
 * @param input 검색어
 * @returns 에러 메세지
 */
export const validateMaxKeywords = (input: string): string | true => {
  const { total } = parseKeyword(input)
  if (total > 2) {
    return '키워드는 최대 2개까지만 검색할 수 있습니다'
  }
  return true
}
