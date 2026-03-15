"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { fetchPostsByUserId } from "@/lib/api";
import { PostsList } from "./PostsList";
import { AddPostForm } from "./AddPostForm";
import { useTask2Store } from "@/store/task2Store";
import type { Post } from "@/lib/types";

const LOCAL_POSTS_KEY_PREFIX = "posts_user_";
const POSTS_PAGE_SIZE = 10;

function getLocalPosts(userId: number): Array<{ id: string; userId: number; title: string; body: string }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${LOCAL_POSTS_KEY_PREFIX}${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function UserPostsView({ userId }: { userId: number }) {
  const [localPostsVersion, setLocalPostsVersion] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { getPostsForUser, setPostsForUser } = useTask2Store();
  const {
    data: apiPosts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUserId(userId),
  });

  useEffect(() => {
    if (apiPosts.length) setPostsForUser(userId, apiPosts);
  }, [userId, apiPosts, setPostsForUser]);

  const apiIsLoading = isLoading;
  const localPosts = useMemo(
    () => getLocalPosts(userId),
    [userId, localPostsVersion]
  );
  const storePosts = getPostsForUser(userId);
  const allPosts = useMemo(() => {
    const local = localPosts.map((p) => ({
      id: p.id,
      userId: p.userId,
      title: p.title,
      body: p.body,
    })) as Post[];
    const fromApi = storePosts.length ? storePosts : apiPosts;
    return [...local, ...fromApi];
  }, [apiPosts, localPosts, storePosts]);

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PAGE_SIZE));
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PAGE_SIZE;
    return allPosts.slice(start, start + POSTS_PAGE_SIZE);
  }, [allPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userId]);

  if (apiIsLoading) {
    return (
      <div className="py-8 text-center text-gray-600">Loading posts...</div>
    );
  }
  if (isError) {
    return (
      <div className="py-8 text-center text-red-600">
        Something went wrong
        {error instanceof Error && ` — ${error.message}`}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/task2"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to users
        </Link>
      </div>
      <AddPostForm userId={userId} onAdded={() => setLocalPostsVersion((v) => v + 1)} />
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts</h2>
        <PostsList posts={paginatedPosts} />
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1 text-sm font-medium text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:underline"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 text-sm font-medium text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:underline"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
