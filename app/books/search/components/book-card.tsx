import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

import { routes } from 'constants/routes'

interface Props {
  book: BooksItem
}

const BookCard = ({ book: { isbn13, title, subtitle, url, image } }: Props) => {
  const { ref, inView } = useInView({ threshold: 0.1 })
  return (
    <Link href={`${routes.book}/${isbn13}`}>
      <div ref={ref} className="h-[400px] flex flex-col bg-yellow-50 gap-5">
        {inView && (
          <>
            <div className="h-[60%] relative">
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
            </div>{' '}
          </>
        )}
      </div>
    </Link>
  )
}

export default BookCard
