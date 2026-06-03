import "./globals.css";

export const metadata = {
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description: "A modern SEO blog platform built with Next.js and Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>

        <footer className="border-t border-[var(--border)] px-6 py-6 text-center text-sm opacity-70 mt-10">
          © 2026 Bhavyuktha's Blog • Built with Next.js & Supabase
        </footer>
      </body>
    </html>
  );
}