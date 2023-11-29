import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { searchBooks } from 'lib/search-books'
import BookList from './components/book-list'
import Loading from './loading'

interface Props {
  searchParams?: {
    query?: string
  }
}

const BooksPage = async ({ searchParams }: Props) => {
  const query = searchParams?.query
  if (!query) {
    redirect('/')
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['books', query],
    queryFn: ({ pageParam }) => searchBooks(query, pageParam),
    initialPageParam: 1,
  })

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookList query={query} />
      </HydrationBoundary>
    </Suspense>
  )
}

export default BooksPage
