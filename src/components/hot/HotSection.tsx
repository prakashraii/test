"use client";

import { hotCards } from "@/data/hotCards";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
      id="task2"
      className="max-w-[1216px] mx-auto px-4 md:px-8 py-12 scroll-mt-24"
    >
      <p className="text-center text-gray-500 text-sm mb-2">
        Note: Click the cards to view the animation
      </p>
      <p className="text-gray-700 text-base mb-1">
        Explore our classes and master trending skills!
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
        Dive Into{" "}
        <span className="text-emerald-500">What&apos;s Hot Right Now!</span> 🔥
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row gap-4 md:gap-6 md:h-[461px]"
      >
        {hotCards.map((item) => {
          const isFeatured = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              variants={cardVariants}
              transition={{
                layout: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                opacity: { type: "spring", stiffness: 300, damping: 28 },
                y: { type: "spring", stiffness: 300, damping: 28 },
              }}
              className={`relative rounded-2xl cursor-pointer flex-shrink-0
                h-[320px] md:h-full group
                ${isFeatured ? "md:w-[592px] overflow-hidden" : "md:w-[260px] overflow-visible"}
              `}
              style={{
                backgroundColor: isFeatured
                  ? "var(--Secondary-Secondary500, #C33241)"
                  : "var(--secondary-light)",
              }}
              onClick={() => setActiveId(item.id)}
            >
              {/* ── COLLAPSED (inactive) layout ── */}
              <AnimatePresence mode="wait">
                {!isFeatured && (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.3, duration: 0.25 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-0 flex flex-col justify-between p-6"
                  >
                    {/* Hover overlay: "Click me!" + hand-drawn arrow — positioned a little above the card */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full flex flex-col items-center gap-0.5 -mb-5 ml-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none"
                      aria-hidden
                    >
                      <span
                        className="flex items-center justify-center rounded shrink-0"
                        style={{
                          width: CLICK_ME_STYLE.width,
                          height: CLICK_ME_STYLE.height,
                          fontFamily: CLICK_ME_STYLE.fontFamily,
                          fontWeight: CLICK_ME_STYLE.fontWeight,
                          fontSize: CLICK_ME_STYLE.fontSize,
                          lineHeight: CLICK_ME_STYLE.lineHeight,
                          letterSpacing: CLICK_ME_STYLE.letterSpacing,
                          color: CLICK_ME_STYLE.color,
                        }}
                      >
                        Click me!
                      </span>
                      <Image
                        src="/course/Hand-drawn shapes.png"
                        alt=""
                        width={ARROW_IMG_STYLE.width}
                        height={ARROW_IMG_STYLE.height}
                        className="shrink-0 object-contain"
                        style={{
                          width: ARROW_IMG_STYLE.width,
                          height: ARROW_IMG_STYLE.height,
                          transform: `rotate(${ARROW_IMG_STYLE.angle}deg)`,
                          opacity: 1,
                        }}
                      />
                    </div>
                    {/* Rotated title + description */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      <div
                        className="flex flex-col items-center gap-1"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          className="font-bold text-lg leading-tight"
                          style={{
                            color: "var(--Secondary-Secondary500, #C33241)",
                          }}
                        >
                          {item.label}
                        </span>
                        {item.description && (
                          <span
                            className="text-xs mt-1"
                            style={{
                              color: "var(--Secondary-Secondary500, #C33241)",
                              opacity: 0.7,
                            }}
                          >
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Large number bottom */}
                    <div className="flex items-end">
                      <span
                        className="font-black leading-none"
                        style={{
                          fontSize: "clamp(3rem, 5vw, 5rem)",
                          color: "var(--Secondary-Secondary500, #C33241)",
                        }}
                      >
                        {item.count}
                      </span>
                      <span
                        className="font-black text-3xl mb-2 ml-0.5"
                        style={{
                          color: "var(--Secondary-Secondary500, #C33241)",
                        }}
                      >
                        +
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── EXPANDED (active/featured) layout ── */}
              <AnimatePresence mode="wait">
                {isFeatured && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.35, duration: 0.3 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-0 flex flex-col justify-between rounded-2xl overflow-hidden"
                  >
                    {/* View all Courses — fixed position */}
                    <motion.a
                      href={item.link ?? "#"}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.5, duration: 0.25 },
                      }}
                      className="absolute flex items-center gap-2 text-white font-medium no-underline whitespace-nowrap group"
                      style={{
                        width: 161,
                        height: 23,
                        top: 40,
                        left: 393,
                        opacity: 1,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View all Courses
                      <span className="inline-block text-xl transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </motion.a>

                    {/* Icon container — centered, reduced gap */}
                    <div
                      className="absolute flex items-center justify-center gap-4 overflow-visible"
                      style={{
                        top: 96,
                        left: "50%",
                        transform: "translateX(-50%)",
                        minHeight: 93.36,
                        opacity: 1,
                      }}
                    >
                      {COURSE_ICONS.map((src, i) => {
                        const iconStyle =
                          i === 0
                            ? {
                                width: 90,
                                height: 90,
                                transform: "rotate(16.67deg)",
                              }
                            : i === 1
                              ? {
                                  width: 132,
                                  height: 132,
                                  transform: "rotate(-7.22deg)",
                                }
                              : i === 2
                                ? {
                                    width: 118,
                                    height: 146,
                                    transform: "rotate(8.97deg)",
                                  }
                                : {
                                    width: 90,
                                    height: 90,
                                    transform: "rotate(-12.61deg)",
                                  };
                        return (
                          <motion.div
                            key={src}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: 0.45 + i * 0.07,
                                duration: 0.3,
                              },
                            }}
                            className="relative flex items-center justify-center shrink-0"
                            style={{
                              width: `${iconStyle.width}px`,
                              height: `${iconStyle.height}px`,
                              transform: iconStyle.transform,
                              opacity: 1,
                            }}
                          >
                            <Image
                              src={src}
                              alt=""
                              width={iconStyle.width}
                              height={iconStyle.height}
                              className="object-contain"
                              style={{
                                width: `${iconStyle.width}px`,
                                height: `${iconStyle.height}px`,
                              }}
                            />
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Bottom row: 23+ course container — fixed position/size */}
                    <div
                      className="absolute flex items-end"
                      style={{
                        width: 442,
                        height: 138,
                        top: 298,
                        left: 75,
                        opacity: 1,
                        gap: 24,
                      }}
                    >
                      <div
                        className="flex items-end flex-shrink-0"
                        style={{ transform: "translateY(40px)" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.38,
                              duration: 0.35,
                              ease: "easeOut",
                            },
                          }}
                          className="flex items-end justify-center shrink-0"
                          style={{
                            width: 200,
                            height: 138,
                            paddingTop: 28,
                            boxSizing: "border-box",
                            opacity: 1,
                            fontFamily: "Nohemi, sans-serif",
                            fontWeight: 700,
                            fontStyle: "normal",
                            fontSize: 150,
                            lineHeight: "120%",
                            letterSpacing: "0%",
                            textAlign: "center",
                            color: "var(--Secondary-Secondary50, #F9EBEC)",
                          }}
                        >
                          {item.count}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.5, duration: 0.3 },
                        }}
                        className="flex flex-col shrink-0"
                        style={{
                          width: 218,
                          height: 98,
                          opacity: 1,
                          gap: 4,
                          marginTop: -24,
                        }}
                      >
                        <p
                          className="text-white shrink-0 flex items-center justify-center"
                          style={{
                            width: 164,
                            height: 40,
                            opacity: 1,
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 700,
                            fontStyle: "normal",
                            fontSize: 32,
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            textAlign: "center",
                          }}
                        >
                          {item.label}
                        </p>
                        {item.description && (
                          <p
                            className="shrink-0 flex items-center"
                            style={{
                              width: 218,
                              height: 46,
                              opacity: 1,
                              fontFamily: "Outfit, sans-serif",
                              fontWeight: 400,
                              fontStyle: "normal",
                              fontSize: 18,
                              lineHeight: "100%",
                              letterSpacing: "0%",
                              color: "var(--Secondary-Secondary50, #F9EBEC)",
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* "+" — fixed position/size */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.48, duration: 0.25 },
                      }}
                      className="absolute flex items-center justify-center"
                      style={{
                        width: 34,
                        height: 77,
                        top: 282,
                        left: 265,
                        opacity: 1,
                        fontFamily: "Nohemi, sans-serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize: 64,
                        lineHeight: "120%",
                        letterSpacing: "0%",
                        textAlign: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      +
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
