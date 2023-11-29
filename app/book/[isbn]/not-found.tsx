import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="text-center">
      <h2>앗, 해당 도서를 찾을 수 없습니다!</h2>
      <p>
        다른 도서를 검색해보시겠습니까?{' '}
        <Link href="/" className="text-blue-600 underline">
          검색하러가기
        </Link>
      </p>
    </div>
  )
}
