import { create } from "zustand";
import type { User } from "@/lib/types";
import type { Post } from "@/lib/types";

interface Task2State {
  users: User[];
  postsByUserId: Record<number, Post[]>;
  setUsers: (users: User[]) => void;
  setPostsForUser: (userId: number, posts: Post[]) => void;
  getPostsForUser: (userId: number) => Post[];
}

export const useTask2Store = create<Task2State>((set, get) => ({
  users: [],
  postsByUserId: {},
  setUsers: (users) => set({ users }),
  setPostsForUser: (userId, posts) =>
    set((state) => ({
      postsByUserId: { ...state.postsByUserId, [userId]: posts },
    })),
  getPostsForUser: (userId) => get().postsByUserId[userId] ?? [],
}));
