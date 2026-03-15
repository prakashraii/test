"use client";

import Link from "next/link";
import type { User } from "@/lib/types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/20 dark:border-gray-600/40 bg-white dark:bg-gray-800/90 p-6 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 transition-all duration-300 ease-out">
      <div className="absolute inset-0 bg-gradient-to-br from-[#A88964]/5 to-transparent dark:from-[#A88964]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate text-lg">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
            {user.email}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/60 px-2.5 py-1">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate max-w-[140px]">
              {user.company.name}
            </span>
          </div>
        </div>
        <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#A88964]/15 dark:bg-[#A88964]/25 flex items-center justify-center text-[#A88964] dark:text-[#c9a87a] font-bold text-lg shadow-inner transition-transform duration-300 group-hover:scale-105">
          {user.name.charAt(0)}
        </span>
      </div>
      <Link
        href={`/task2/users/${user.id}`}
        className="relative mt-5 inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-[#A88964] hover:bg-[#8f7354] dark:bg-[#A88964] dark:hover:bg-[#8f7354] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        View Posts
        <span className="group-hover:translate-x-0.5 transition-transform inline-block" aria-hidden>→</span>
      </Link>
    </article>
  );
}
