'use client'

import { useEffect } from 'react'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { searchBooks } from 'lib/search-books'
import BookCard from './book-card'

interface Props {
  query: string
}

// TODO: 최소한 클릭할 수 있는 ui라는 건 알 수 있게
const Books = ({ query }: Props) => {
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

  if (books.length === 0) {
    return (
      <p className="text-center">
        &quot;{query}&quot; 에 해당하는 도서 결과를 찾을 수 없습니다.
      </p>
    )
  }

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
