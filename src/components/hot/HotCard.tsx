"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { HotCardItem } from "@/data/hotCards";

const SECONDARY_COLOR = "var(--Secondary-Secondary500, #C33241)";
/** Match reference: small card background and text */
const SMALL_CARD_BG = "rgb(249, 240, 240)";
const SMALL_CARD_TEXT = "rgb(187, 36, 45)";

const FEATURED_ICONS = [
  { icon: "simple-icons:react", label: "React" },
  { icon: "mdi:chart-line", label: "Analytics" },
  { icon: "simple-icons:vuedotjs", label: "Vue.js" },
  { icon: "mdi:palette-outline", label: "Design" },
];

interface HotCardProps {
  item: HotCardItem;
  isFeatured: boolean;
  onSelect: () => void;
}

export function HotCard({ item, isFeatured, onSelect }: HotCardProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onSelect();
    const t = setTimeout(() => setClicked(false), 600);
    return () => clearTimeout(t);
  };

  const upcomingTransition = {
    duration: 1,
    ease: [0.7, -0.4, 0.4, 1.4] as const,
  };
  const hoverSpring = {
    type: "spring" as const,
    mass: 1,
    stiffness: 100,
    damping: 15,
  };

  return (
    <motion.div
      layout
      onClick={handleClick}
      className="relative cursor-pointer overflow-hidden rounded-[32px] h-full w-full flex"
      initial={false}
      animate={{
        scale: clicked ? 1.03 : 1,
        transition: isFeatured
          ? upcomingTransition
          : { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileHover={{ scale: 1.02 }}
      transition={hoverSpring}
      whileTap={{ scale: 0.98 }}
      style={{
        backgroundColor: isFeatured ? SECONDARY_COLOR : SMALL_CARD_BG,
      }}
    >
      {isFeatured ? (
        <>
          <div className="absolute top-4 right-4 z-10 text-white/95 text-sm font-medium flex items-center gap-1">
            View all Courses
            <Icon icon="mdi:arrow-right" className="w-4 h-4" />
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 z-10">
            {FEATURED_ICONS.map(({ icon, label }) => (
              <div
                key={icon}
                className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
                title={label}
              >
                <Icon icon={icon} className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-6 left-6 flex flex-col">
            <span className="text-white text-4xl md:text-5xl font-bold leading-none">
              {String(item.count).padStart(2, "0")}
              <sup className="text-xl font-semibold ml-0.5">+</sup>
            </span>
            <span className="text-white font-bold mt-1">{item.label}</span>
            <span className="text-white/90 text-sm mt-0.5">
              {item.description}
            </span>
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap font-bold text-sm"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              color: SMALL_CARD_TEXT,
            }}
          >
            {item.label}
          </div>
          <div className="flex-1 pl-14 pr-6 py-6 flex flex-col justify-end">
            <span
              className="text-sm font-normal"
              style={{ color: SMALL_CARD_TEXT }}
            >
              {item.description}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span
                className="text-4xl font-bold"
                style={{ color: SMALL_CARD_TEXT }}
              >
                {String(item.count).padStart(2, "0")}
              </span>
              <sup
                className="font-semibold text-lg"
                style={{ color: SMALL_CARD_TEXT }}
              >
                +
              </sup>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
