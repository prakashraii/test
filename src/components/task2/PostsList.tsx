"use client";

import type { Post } from "@/lib/types";

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <ul className="space-y-4">
      {posts.map((post, index) => (
        <li
          key={post.id}
          className="group relative rounded-2xl border border-gray-200/80 dark:border-gray-600/50 bg-white dark:bg-gray-800/80 p-5 shadow-md hover:shadow-lg hover:border-[#A88964]/20 dark:hover:border-[#A88964]/30 transition-all duration-300"
        >
          <div className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#A88964]/15 dark:bg-[#A88964]/25 flex items-center justify-center text-[#A88964] dark:text-[#c9a87a] font-bold text-sm">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed line-clamp-4">
                {post.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
