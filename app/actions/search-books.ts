'use server'

const HOST = 'https://api.itbook.store/1.0'

const includesByIsbn = (books: BooksItem[], isbn: string) =>
  books.some(({ isbn13 }) => isbn13 === isbn)

// a - b
const difference = (a: BooksItem[], b: BooksItem[]) =>
  a.filter(({ isbn13 }) => !includesByIsbn(b, isbn13))

// (a - b) + b
const union = (arr: BooksResponse[]) =>
  arr.reduce(
    (acc, { books }) => difference(acc, books).concat(books),
    [] as BooksItem[]
  )

const getBooks = async (query: string, page = 1): Promise<BooksResponse> => {
  const res = await fetch(`${HOST}/search/${query}/${page}`)
  if (!res.ok) {
    // TODO: error handling
    throw new Error(res.statusText)
  }
  return res.json()
}

export const searchBooks = async (
  includedKeywords: string[],
  nonIncludedKeyword?: string[],
  page = 1
) => {
  const included = await Promise.all(
    includedKeywords.map((k) => getBooks(k, page))
  )
  const includedBooks = union(included)

  if (!nonIncludedKeyword || nonIncludedKeyword.length === 0) {
    return includedBooks
  }

  const nonIncluded = await Promise.all(
    nonIncludedKeyword.map((k) => getBooks(k, page))
  )
  const nonIncludedBooks = union(nonIncluded)

  return includedBooks.filter(
    ({ isbn13 }) => !includesByIsbn(nonIncludedBooks, isbn13)
  )
}
