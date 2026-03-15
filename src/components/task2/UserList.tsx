"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { fetchUsers } from "@/lib/api";
import { UserCard } from "./UserCard";
import { SearchBar } from "./SearchBar";
import { useTask2Store } from "@/store/task2Store";
import type { User } from "@/lib/types";

interface UserListProps {
  initialUsers?: User[];
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-12 max-w-md rounded-xl bg-white/20 dark:bg-gray-700/40 animate-pulse" />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <li key={i} className="rounded-2xl border border-white/20 dark:border-gray-600/40 bg-white/80 dark:bg-gray-800/60 p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-600 animate-pulse" />
                <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-700 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-700 animate-pulse mt-3" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-600 animate-pulse" />
            </div>
            <div className="mt-5 h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-600 animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UserList({ initialUsers }: UserListProps) {
  const [search, setSearch] = useState("");
  const { users: storeUsers, setUsers } = useTask2Store();
  const {
    data: fetchedUsers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialData: initialUsers,
  });

  useEffect(() => {
    if (initialUsers?.length) setUsers(initialUsers);
  }, [initialUsers, setUsers]);

  useEffect(() => {
    if (fetchedUsers.length) setUsers(fetchedUsers);
  }, [fetchedUsers, setUsers]);

  const users = storeUsers.length ? storeUsers : fetchedUsers;
  const apiIsLoading = isLoading && !initialUsers?.length;
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) =>
      [u.name, u.email].some((field) =>
        field.toLowerCase().includes(term)
      )
    );
  }, [users, search]);

  if (apiIsLoading) {
    return (
      <div className="py-8">
        <LoadingSkeleton />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200/80 dark:border-red-800/50 bg-red-50/95 dark:bg-red-950/40 p-8 text-center shadow-lg">
        <div className="inline-flex w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-700 dark:text-red-300 font-medium">
          Something went wrong
          {error instanceof Error && ` — ${error.message}`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar value={search} onChange={setSearch} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/25 dark:border-gray-600/50 bg-white/90 dark:bg-gray-800/60 py-14 px-6 text-center shadow-lg">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-700/80 items-center justify-center mb-4">
            <svg className="w-7 h-7 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">No users match your search.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try a different name or email.</p>
        </div>
      )}
    </div>
  );
}
