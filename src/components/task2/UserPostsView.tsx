"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchPostsByUserId } from "@/lib/api";
import { PostsList } from "./PostsList";
import { AddPostForm } from "./AddPostForm";

const LOCAL_POSTS_KEY_PREFIX = "posts_user_";

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
  const {
    data: apiPosts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUserId(userId),
  });

  const apiIsLoading = isLoading;
  const localPosts = useMemo(
    () => getLocalPosts(userId),
    [userId, localPostsVersion]
  );
  const allPosts = useMemo(() => {
    const local = localPosts.map((p) => ({
      id: p.id,
      userId: p.userId,
      title: p.title,
      body: p.body,
    }));
    return [...local, ...apiPosts];
  }, [apiPosts, localPosts]);

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
        <PostsList posts={allPosts} />
      </section>
    </div>
  );
}
