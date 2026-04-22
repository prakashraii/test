"use client";

import { hotCards } from "@/data/hotCards";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import AnimatedCards from "./AnimatedCards";

/** Hover overlay for collapsed card: "Click me!" + hand-drawn arrow (Figma specs) */
const CLICK_ME_STYLE = {
  width: 64,
  height: 20,
  fontFamily: "Outfit, sans-serif",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "100%",
  letterSpacing: "0%",
  color: "var(--Base-Base-Black, #2B2B2B)",
  opacity: 1,
} as const;

const ARROW_IMG_STYLE = {
  width: 49.99999924622946,
  height: 49.99999924622946,
  angle: -3.56,
} as const;

/** Course icons for the expanded card (order: React, Like/Analytics, Vue.js, Design) */
const COURSE_ICONS = [
  "/course/icons/react.png",
  "/course/icons/like.png",
  "/course/icons/vewjs.png",
  "/course/icons/copy.png",
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function HotSection() {
  const [activeId, setActiveId] = useState<string>(hotCards[0].id);

  return (
    <section
      id="hot-courses"
      className="max-w-[1216px] mx-auto px-4 md:px-8 mb-4 py-12 scroll-mt-24"
    >
      <div
        className="mb-2"
        style={{
          width: "484px",
          height: "30px",
          opacity: 1,
        }}
      >
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#414141",
            margin: 0,
          }}
        >
          Explore our classes and master trending skills!
        </p>
      </div>
      <div
        className="mb-10"
        style={{
          width: "528px",
          height: "38px",
          opacity: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "Nohemi, sans-serif",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "32px",
            lineHeight: "120%",
            letterSpacing: "0%",
            color: "#2B2B2B",
            margin: 0,
          }}
        >
          Dive Into{" "}
          <span style={{ color: "var(--emerald-500, #10b981)" }}>
            What&apos;s Hot Right Now!
          </span>{" "}
          🔥
        </h2>
      </div>

      <AnimatedCards />
    </section>
  );
}
