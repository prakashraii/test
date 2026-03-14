import type { ReactNode } from "react";

export interface HotCardItem {
  id: string;
  label: string;
  count: number;
  description: string;
  /** Optional React nodes (e.g. icons) for expanded card */
  icons?: ReactNode[];
  /** Optional link URL for "View all" in expanded card */
  link?: string;
}

export const hotCards: HotCardItem[] = [
  {
    id: "all",
    label: "All Courses",
    count: 23,
    description: "courses you're powering through right now.",
  },
  {
    id: "upcoming",
    label: "Upcoming Courses",
    count: 5,
    description: "exciting new courses waiting to boost your skills.",
  },
  {
    id: "ongoing",
    label: "Ongoing Courses",
    count: 10,
    description: "currently happening—don't miss out on the action!",
  },
];
