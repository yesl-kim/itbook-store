import Search from 'components/search/search'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <h1>트레바리 | 도서 검색 사이트</h1>
      <Search />
    </main>
  )
}
