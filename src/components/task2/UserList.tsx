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
      <div className="py-8 text-center text-gray-600">Loading users...</div>
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
    <div className="space-y-6">
      <SearchBar value={search} onChange={setSearch} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No users match your search.</p>
      )}
    </div>
  );
}
