import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Meme',
  description: 'A meme creation frame app',
  openGraph: {
    title: 'Create Meme',
    description: 'A meme creation frame app',
    images: [`${process.env.VERCEL_URL || 'http://localhost:3000'}/textyeat.png`],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
