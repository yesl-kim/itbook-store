import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="text-center">
      <h2>앗, 해당 도서를 찾을 수 없습니다!</h2>
      <p>
        <Link href="/books">도서 전체 목록</Link>보기
      </p>
    </div>
  )
}
