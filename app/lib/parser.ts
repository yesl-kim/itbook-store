const OR = '|'
const NOT = '-'

export const parseKeyword = (str: string) => {
  const include: string[] = []
  const nonInclude: string[] = []
  const parsed = {
    [OR]: include,
    [NOT]: nonInclude,
  }

  let keyword = ''
  let group = include
  for (const char of str) {
    if (!(char in parsed)) {
      keyword += char
      continue
    }
    group.push(keyword)
    keyword = ''
    group = parsed[char] // FIXME
  }
  group.push(keyword)

  const total = include.length + nonInclude.length

  console.log(parsed)
  return { includeKeywords: include, nonIncludeKeywords: nonInclude, total }
}
