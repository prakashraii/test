"use client";

import Link from "next/link";
import type { User } from "@/lib/types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{user.email}</p>
      <p className="text-sm text-gray-500 mt-1">{user.company.name}</p>
      <Link
        href={`/task2/users/${user.id}`}
        className="inline-block mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        View Posts
      </Link>
    </article>
  );
}
