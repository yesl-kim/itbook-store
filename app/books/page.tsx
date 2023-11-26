import { Suspense } from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Search from 'components/search/search'
import BookList from './components/book-list'
import { parseKeyword } from '../lib/parser'
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
  const { includeKeywords, nonIncludeKeywords } = parseKeyword(query)

  await queryClient.prefetchQuery({
    queryKey: ['books'],
    queryFn: () => searchBooks(includeKeywords, nonIncludeKeywords),
  })

  return (
    <div>
      <header className="mb-10">
        <Search />
      </header>
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div className="h-[100px] bg-blue-600 w-full" />}>
            <BookList />
          </Suspense>
        </HydrationBoundary>
      </main>
    </div>
  )
}

export default BooksPage
