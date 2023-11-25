import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Props {
  params: {
    isbn: string
  }
}

async function getBook(isbn: string): Promise<Book> {
  const res = await fetch(`https://api.itbook.store/1.0/books/${isbn}`)

  if (!res.ok) {
    if (res.status.toString().startsWith('4')) {
      notFound()
    }
    throw new Error(res.statusText)
  }

  return res.json()
}

const BookPage = async ({ params: { isbn } }: Props) => {
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
    <main>
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

export default BookPage
