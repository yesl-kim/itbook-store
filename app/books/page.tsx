import { Suspense } from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Search from 'components/search/search'
import BookList from './components/book-list'
import { searchBooks } from '@/app/lib/search-books'
import { redirect } from 'next/navigation'

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
    <div>
      <header className="mb-10">
        <Search />
      </header>
      <main>
        <Suspense fallback={<div className="h-[100px] bg-blue-600 w-full" />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <BookList query={query} />
          </HydrationBoundary>
        </Suspense>
      </main>
    </div>
  )
}

export default BooksPage
