'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import BookList from './book-list'
import useSearchBooks from '../lib/useSearchBooks'

const LoadMore = () => {
  const { loading, data: books, fetchMore } = useSearchBooks()

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView) {
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
