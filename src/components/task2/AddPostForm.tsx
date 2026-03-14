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
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Add new post</h2>
      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="post-body" className="block text-sm font-medium text-gray-700 mb-1">
          Body
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Add post
      </button>
    </form>
  );
}
