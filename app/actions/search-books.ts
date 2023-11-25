'use server'

const HOST = 'https://api.itbook.store/1.0'

const includesByIsbn = (books: BooksItem[], isbn: string) =>
  books.some(({ isbn13 }) => isbn13 === isbn)

// a - b
const difference = (a: BooksItem[], b: BooksItem[]) =>
  a.filter(({ isbn13 }) => !includesByIsbn(b, isbn13))

const getBooks = async (query: string, page = 1): Promise<BooksResponse> => {
  const res = await fetch(`${HOST}/search/${query}/${page}`)
  if (!res.ok) {
    // TODO: error handling
    throw new Error(res.statusText)
  }
  return res.json()
}

// TODO: 리팩토링
export const searchBooks = async (
  includedKeywords: string[],
  nonIncludedKeyword?: string
) => {
  const includedBooks = includedKeywords.map((k) => getBooks(k))

  // 맞긴 하지만
  // nonIncludedKeyword가 있을 때 includedKeywords가 하나일 거라는 걸 믿고 잇어
  if (nonIncludedKeyword) {
    const nonIncluded = await getBooks(nonIncludedKeyword)
    const books = (await Promise.all(includedBooks)).flatMap(({ books }) =>
      difference(books, nonIncluded.books)
    )
    return books
  } else {
    const res = await Promise.all(includedBooks)
    const books = (await Promise.all(includedBooks)).reduce(
      (acc, { books }) => difference(acc, books).concat(books),
      [] as BooksItem[]
    )
    return books
  }
}
