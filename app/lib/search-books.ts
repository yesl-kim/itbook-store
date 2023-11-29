import { parseKeyword } from './parser'

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
    throw new Error(res.statusText)
  }
  return res.json()
}

// TODO: nextPage 계산 다시
export const searchBooks = async (query: string, page = 1) => {
  const { includeKeywords, nonIncludeKeywords } = parseKeyword(query)
  const included = await Promise.all(
    includeKeywords.map((k) => getBooks(k, page))
  )
  const includedBooks = union(included)

  if (nonIncludeKeywords.length === 0) {
    return {
      nextPage: includedBooks.length > 0 ? page + 1 : null,
      books: includedBooks,
    }
  }

  const nonIncluded = await Promise.all(
    nonIncludeKeywords.map((k) => getBooks(k, page))
  )
  const nonIncludedBooks = union(nonIncluded)

  const books = includedBooks.filter(
    ({ isbn13 }) => !includesByIsbn(nonIncludedBooks, isbn13)
  )
  return {
    nextPage: page + 1,
    books,
  }
}
