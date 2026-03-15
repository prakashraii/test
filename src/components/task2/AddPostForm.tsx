"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

type FormData = z.infer<typeof schema>;

const LOCAL_POSTS_KEY_PREFIX = "posts_user_";

export function AddPostForm({
  userId,
  onAdded,
}: {
  userId: number;
  onAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ title, body });
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormData;
        if (!fieldErrors[path]) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const key = `${LOCAL_POSTS_KEY_PREFIX}${userId}`;
    const existing: Array<{ id: string; userId: number; title: string; body: string }> = (() => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    })();
    const newPost = {
      id: `local-${Date.now()}`,
      userId,
      title: result.data.title,
      body: result.data.body,
    };
    existing.push(newPost);
    localStorage.setItem(key, JSON.stringify(existing));
    setTitle("");
    setBody("");
    onAdded();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/25 dark:border-gray-600/50 bg-white/95 dark:bg-gray-800/80 p-6 md:p-8 shadow-lg space-y-5"
    >
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-600/50">
        <span className="flex w-10 h-10 rounded-xl bg-[#A88964]/15 dark:bg-[#A88964]/25 items-center justify-center">
          <svg className="w-5 h-5 text-[#A88964] dark:text-[#c9a87a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add new post</h2>
      </div>
      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600/50 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A88964]/40 focus:border-[#A88964]/50 transition-all shadow-sm"
        />
        {errors.title && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <span aria-hidden>•</span> {errors.title}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="post-body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Body
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600/50 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A88964]/40 focus:border-[#A88964]/50 transition-all shadow-sm resize-y min-h-[100px]"
        />
        {errors.body && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <span aria-hidden>•</span> {errors.body}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#A88964] hover:bg-[#8f7354] dark:bg-[#A88964] dark:hover:bg-[#8f7354] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        Add post
      </button>
    </form>
  );
}
