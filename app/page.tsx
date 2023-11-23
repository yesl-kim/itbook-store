import Search from './ui/Search/Search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>트레바리 | 도서 검색 사이트</h1>
      <Search />
    </main>
  )
}
