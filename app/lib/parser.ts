export const parseKeyword = (keyword: string): string[] => {
  const seperatorRegex = /[\|\-]/
  return keyword.split(seperatorRegex)
}
