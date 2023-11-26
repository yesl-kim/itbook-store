'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { useInView } from 'react-intersection-observer'
import BookCard from './book-card'
import { useEffect, useMemo } from 'react'
import { searchBooks } from '@/app/lib/search-books'
import { useSearchParams } from 'next/navigation'

// TODO: 최소한 클릭할 수 있는 ui라는 건 알 수 있게
const Books = () => {
  const params = useSearchParams()
  const query = useMemo(() => params.get('query'), [params])
  if (!query) {
    throw new Error('잘못된 접근, 검색어 입력해주삼')
  }

  const {
    data: { pages: books },
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['books', query],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchBooks(query, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => ({
      pageParams: data.pageParams,
      pages: data.pages.flatMap((page) => page.books),
    }),
  })

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <>
      <ul className="flex flex-wrap gap-[8%]">
        {books.map((book) => (
          <li key={book.isbn13} className="w-[28%] mb-10">
            <BookCard book={book} />
          </li>
        ))}
      </ul>
      <div ref={ref} />
      {isFetchingNextPage && <p className="text-center py-5">불러오는 중...</p>}
    </>
  )
}

export default Books
