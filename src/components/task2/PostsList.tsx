"use client";

import type { Post } from "@/lib/types";

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        >
          <h3 className="font-semibold text-gray-900">{post.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
