'use client'

import { Inter } from 'next/font/google'

import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: ComponentWithChildren) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <div className="max-w-5xl m-auto py-12 min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
