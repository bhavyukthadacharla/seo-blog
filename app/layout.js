import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'My Blog',
    template: '%s | My Blog',
  },
  description: 'A blog built with Next.js and Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <header className="border-b px-6 py-4">
          <a href="/" className="text-xl font-bold">My Blog</a>
        </header>
        <main>{children}</main>
        <footer className="border-t px-6 py-4 text-center text-sm text-gray-500 mt-10">
          © 2026 Bhavyuktha's Blog. All rights reserved.
        </footer>
      </body>
    </html>
  )
}