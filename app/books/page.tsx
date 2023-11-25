import { Suspense } from 'react'
import Search from 'components/search/search'
import BookList from './components/book-list'
import { parseKeyword } from '../lib/parser'
import { searchBooks } from '@/app/actions/search-books'

interface Props {
  searchParams?: {
    query?: string
  }
}

const BooksPage = async ({ searchParams }: Props) => {
  const query = searchParams?.query
  // TODO: query가 없으면 (사용자가 임의로 들어온경우 홈을 통해 들어오지 않고 주소창에 주소를 쳐서 들어온 경우)
  // -> 리다이렉트 ✔️
  // 일단 | 연산인경우
  if (!query) {
    throw new Error('잘못된 접근, redirecting to home...')
  }

  // TODO: 이건 또 어떻게 구분하냐
  const includeeKeywords = parseKeyword(query)
  console.log('includeeKeywords: ', includeeKeywords)
  const books = await searchBooks(includeeKeywords)

  return (
    <div>
      <header className="mb-10">
        <Search />
      </header>
      <main>
        <Suspense fallback={<div>loading</div>}>
          <BookList list={books} />
        </Suspense>
      </main>
    </div>
  )
}

export default BooksPage
