"use client";

import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border)]">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link
          href="/"
          className="text-5xl font-black text-[var(--accent)] tracking-tight"
        >
          My Blog
        </Link>

        {/* NAVIGATION */}

        <div className="flex items-center gap-6 text-sm md:text-base font-medium">

          <Link
            href="/"
            className="hover:text-[var(--primary)] transition"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="hover:text-[var(--primary)] transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="hover:text-[var(--primary)] transition"
          >
            Sign Up
          </Link>

          <Link
  href="/admin"
  className="hover:text-[var(--primary)] transition"
>
  Admin
</Link>

        </div>

      </div>

    </nav>
  );
}