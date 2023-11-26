'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { useInView } from 'react-intersection-observer'
import BookCard from './book-card'
import { useEffect, useMemo } from 'react'
import { searchBooks } from '@/app/lib/search-books'
import { useSearchParams } from 'next/navigation'
import { parseKeyword } from '@/app/lib/parser'

// TODO: 최소한 클릭할 수 있는 ui라는 건 알 수 있게
const Books = () => {
  const params = useSearchParams()
  const query = useMemo(() => params.get('query'), [params])
  if (!query) {
    throw new Error('잘못된 접근, 검색어 입력해주삼')
  }

  const { includeKeywords, nonIncludeKeywords } = useMemo(
    () => parseKeyword(query),
    [query]
  )

  const { data, isFetching, isLoading } = useSuspenseQuery({
    queryKey: ['books'],
    queryFn: () => searchBooks(includeKeywords, nonIncludeKeywords),
  })

  const { ref, inView } = useInView()
  // useEffect(() => {
  //   if (inView) {
  //     fetchMore()
  //   }
  // }, [inView, fetchMore])

  console.log(isFetching, isLoading)

  return (
    <>
      <ul className="flex flex-wrap gap-[8%]">
        {data.map((book) => (
          <li key={book.isbn13} className="w-[28%] mb-10">
            <BookCard book={book} />
          </li>
        ))}
      </ul>
      {/* <div ref={ref}>
        {(isFetching || isLoading) && (
          <p className="text-center bg-red-600">불러오는 중...</p>
        )}
      </div> */}
    </>
  )
}

export default Books
