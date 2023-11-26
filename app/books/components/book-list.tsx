'use client'

import Link from 'next/link'
import Image from 'next/image'
import BookCard from './book-card'

interface Props {
  list: BooksItem[]
}

// TODO: 최소한 클릭할 수 있는 ui라는 건 알 수 있게
const PATH = 'books'
const BookList = ({ list }: Props) => (
  <ul className="flex flex-wrap gap-[8%]">
    {list.map((book) => (
      <li key={book.isbn13} className="w-[28%] mb-10">
        <BookCard book={book} />
      </li>
    ))}
  </ul>
)

export default BookList
