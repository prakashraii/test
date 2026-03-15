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
      <div className="py-16 text-center">
        <div className="inline-block w-10 h-10 border-2 border-white/40 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-white/90">Loading posts...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200/80 dark:border-red-800/50 bg-red-50/95 dark:bg-red-950/40 p-8 text-center shadow-lg">
        <p className="text-red-700 dark:text-red-300 font-medium">
          Something went wrong
          {error instanceof Error && ` — ${error.message}`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/task2"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/95 hover:text-white transition-colors rounded-lg py-2 pr-3 pl-2 -ml-2 hover:bg-white/10"
      >
        <span className="flex w-8 h-8 rounded-lg bg-white/15 items-center justify-center" aria-hidden>←</span>
        Back to users
      </Link>
      <AddPostForm userId={userId} onAdded={() => setLocalPostsVersion((v) => v + 1)} />
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-white/80" />
          Posts
        </h2>
        <PostsList posts={paginatedPosts} />
        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-4 py-2.5 text-sm font-semibold rounded-xl text-[#A88964] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/95 active:scale-[0.98] transition-all shadow-md"
            >
              Previous
            </button>
            <span className="text-sm text-white/95 font-medium px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-4 py-2.5 text-sm font-semibold rounded-xl text-[#A88964] bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/95 active:scale-[0.98] transition-all shadow-md"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
