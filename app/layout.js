import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'My Blog',
    template: '%s | My Blog',
  },
  description: 'A blog built with Next.js and Supabase',
  openGraph: {
    siteName: "Bhavyuktha's Blog",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <header className="border-b px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold">My Blog</a>
          <nav className="flex gap-4">
            <a href="/" className="text-sm hover:underline">Home</a>
            <a href="/admin/login" className="text-sm hover:underline">Admin</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t px-6 py-4 text-center text-sm text-gray-500 mt-10">
          © 2026 Bhavyuktha&apos;s Blog. All rights reserved.
        </footer>
      </body>
    </html>
  )
}