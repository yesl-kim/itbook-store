'use client'

import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import BookList from './book-list'
import { useSearchParams } from 'next/navigation'
import { parseKeyword } from '@/app/lib/parser'
import { searchBooks } from '@/app/actions/search-books'

const LoadMore = () => {
  const { ref, inView } = useInView()
  const [loadedPage, setPage] = useState(1)
  const [books, setBooks] = useState<BooksItem[]>([])
  const params = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const fetchMore = useCallback(async () => {
    if (done) {
      return
    }

    try {
      setLoading(true)

      const nextPage = loadedPage + 1
      const query = params.get('query')
      // FIXME 🤔
      if (!query) {
        return
      }

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
    } finally {
      setLoading(false)
    }
  }, [loadedPage, params, done])

  useEffect(() => {
    console.log(inView)
    if (inView) {
      console.log('fetch more!')
      fetchMore()
    }
  }, [inView, fetchMore])
  return (
    <>
      <BookList list={books} />
      <div ref={ref}>
        {loading && <p className="text-center">불러오는 중...</p>}
      </div>
    </>
  )
}

export default LoadMore
