type Book = {
  title: string
  subtitle: string
  authors: string
  publisher: string
  pages: string
  rating: string
  desc: string
  image: string
  price: string
}

type BooksItem = {
  title: string
  subtitle: string
  isbn13: string
  price: string
  image: string
  url: string
}

type BooksResponse = {
  total: string
  page: string
  books: BooksItem[]
}
