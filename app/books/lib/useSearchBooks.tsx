import { searchBooks } from '@/app/actions/search-books'
import { parseKeyword } from '@/app/lib/parser'
import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const useSearchBooks = () => {
  const params = useSearchParams()

  const [loadedPage, setPage] = useState(1)
  const [books, setBooks] = useState<BooksItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<undefined | any>(undefined)
  const [done, setDone] = useState(false)

  const fetchMore = useCallback(async () => {
    if (done) return

    const query = params.get('query')
    if (!query) return

    try {
      setLoading(true)

      const nextPage = loadedPage + 1
      const { includeKeywords, nonIncludeKeywords } = parseKeyword(query)
      const books = await searchBooks(
        includeKeywords,
        nonIncludeKeywords,
        nextPage
      )

      if (books.length === 0) {
        setDone(true)
        return
      }

      setBooks((prev) => prev.concat(books))
      setPage(nextPage)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [loadedPage, params, done])

  return { data: books, loading, error, fetchMore }
}

export default useSearchBooks
