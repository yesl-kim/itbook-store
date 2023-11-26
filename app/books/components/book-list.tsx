'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Props {
  list: BooksItem[]
}

// TODO: 최소한 클릭할 수 있는 ui라는 건 알 수 있게
const PATH = 'books'
const BookList = ({ list }: Props) => (
  <ul className="flex flex-wrap gap-[8%]">
    {list.map(({ title, subtitle, image, url, isbn13 }) => (
      <li key={isbn13} className="w-[28%] mb-10">
        <Link href={`${PATH}/${isbn13}`}>
          <div className="w-full h-[240px] relative mb-5">
            <Image
              alt={`도서 "${title}"의 이미지`}
              src={image}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              style={{
                objectFit: 'cover',
              }}
              priority
            />
          </div>
          <div>
            <h2>{title}</h2>
            <div>
              <p>
                <span>subtitle: </span>
                {subtitle}
              </p>
              <p>
                <span>url: </span>
                {url}
              </p>
            </div>
          </div>
        </Link>
      </li>
    ))}
  </ul>
)

export default BookList
