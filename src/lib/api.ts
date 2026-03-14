import type { User } from "./types";
import type { Post } from "./types";

const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchPostsByUserId(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}
