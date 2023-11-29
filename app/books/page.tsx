import { Suspense } from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Search from '@/components/search/search'
import BookList from './components/book-list'
import { searchBooks } from '@/app/lib/search-books'

interface Props {
  searchParams?: {
    query?: string
  }
}

const BooksPage = async ({ searchParams }: Props) => {
  const query = searchParams?.query
  // TODO: query가 없으면 (사용자가 임의로 들어온경우 홈을 통해 들어오지 않고 주소창에 주소를 쳐서 들어온 경우)
  // -> 리다이렉트 ✔️
  if (!query) {
    throw new Error('잘못된 접근, redirecting to home...')
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['books'],
    queryFn: () => searchBooks(query, 1),
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
            <BookList />
          </HydrationBoundary>
        </Suspense>
      </main>
    </div>
  )
}

export default BooksPage
