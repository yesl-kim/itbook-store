import { Book } from '@/app/lib/definitions'
import Image from 'next/image'

interface Props {
  params: {
    isbn: string
  }
}

async function getBook(isbn: string): Promise<Book> {
  // isbn이 없으면
  const res = await fetch(`https://api.itbook.store/1.0/books/${isbn}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Book({ params: { isbn } }: Props) {
  const {
    title,
    subtitle,
    authors,
    publisher,
    pages,
    rating,
    desc,
    image,
    price,
  } = await getBook(isbn)
  return (
    <main className="max-w-5xl m-auto py-12">
      <h1 className="text-center">{title}</h1>
      <div className="relative h-[300px]">
        <Image
          alt={`도서 "${title}"의 이미지`}
          src={image}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th>subtitle</th>
            <td>{subtitle}</td>
          </tr>
          <tr>
            <th>author</th>
            <td>{authors}</td>
          </tr>
          <tr>
            <th>publisher</th>
            <td>{publisher}</td>
          </tr>
          <tr>
            <th>pages</th>
            <td>{pages}</td>
          </tr>
          <tr>
            <th>rating</th>
            <td>{rating}</td>
          </tr>
          <tr>
            <th>price</th>
            <td>{price}</td>
          </tr>
          <tr>
            <th className="align-top">description</th>
            <td>{desc}</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
