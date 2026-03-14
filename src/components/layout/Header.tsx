"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          SkillShikshya
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/task1"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Task 1 (Journey)
          </Link>
          <Link
            href="/task2"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Task 2 (What&apos;s Hot)
          </Link>
        </div>
      </nav>
    </header>
  );
}
