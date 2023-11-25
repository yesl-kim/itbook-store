import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '트레바리 | 도서 검색 사이트',
  description: '트레바리 사전과제',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="max-w-5xl m-auto py-12 min-h-screen">{children}</div>
      </body>
    </html>
  )
}
