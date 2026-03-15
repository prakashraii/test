"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hotCards } from "@/data/hotCards";
import Image from "next/image";

const bgColors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500"];
const COURSE_ICONS = [
  "/course/icons/react.png",
  "/course/icons/like.png",
  "/course/icons/vewjs.png",
  "/course/icons/copy.png",
] as const;
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

export default function AnimatedCards() {
  const [activeCard, setActiveCard] = useState<string>(hotCards[0].id);
  const [prevCard, setPrevCard] = useState<string | null>(null);

  return (
    <div className="flex w-full md:h-[461px] gap-4">
      {hotCards.map((card, index) => {
        const isActive = activeCard === card.id;

        return (
          <motion.div
            key={card.id}
            layout
            onClick={() => {
              if (activeCard !== card.id) {
                setPrevCard(activeCard);
                setActiveCard(card.id);
              }
            }}
            initial={false}
            animate={{
              flex: isActive ? 2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className={`relative rounded-3xl cursor-pointer group`}
            style={{
              backgroundColor: "var(--Secondary-Secondary500, #C33241)",
              boxShadow: "inset 0 -1px 0 rgba(147, 112, 219, 0.15)",
            }}
          >
            {!isActive && (
              <div
                className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full flex flex-col items-center gap-0.5 -mb-5 ml-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none"
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
            )}
            {/* Internal clipping wrapper */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {/* 1. Base Layer (Expanded State) */}
              <div className="absolute inset-0 p-6">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`expanded-${card.id}`}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            delayChildren: 0.4,
                          },
                        },
                      }}
                      className="absolute inset-0 p-6 flex flex-col justify-end"
                    >
                      {/* View all Courses — fixed position */}
                      <motion.a
                        href={card.link ?? "#"}
                        variants={{
                          hidden: { opacity: 0, x: 8 },
                          show: { opacity: 1, x: 0 },
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

                          const prevIndex = prevCard
                            ? hotCards.findIndex((c) => c.id === prevCard)
                            : -1;

                          let initialX = 100; // Increased offset
                          if (index === 0) {
                            initialX = 100; // From Card 2 (right)
                          } else if (index === 2) {
                            initialX = -100; // From Card 2 (left)
                          } else if (index === 1) {
                            // Card 2
                            if (prevIndex === 0)
                              initialX = -100; // From Card 1 (left)
                            else if (prevIndex === 2)
                              initialX = 100; // From Card 3 (right)
                            else initialX = 100; // Default
                          }

                          return (
                            <motion.div
                              key={`${card.id}-icon-${i}`}
                              custom={initialX}
                              variants={{
                                hidden: (x: number) => ({
                                  opacity: 0,
                                  x: x,
                                  y: -8,
                                }),
                                show: {
                                  opacity: 1,
                                  x: 0,
                                  y: 0,
                                  transition: {
                                    duration: 0.3,
                                  },
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
                          width: 520,
                          height: 138,
                          top: 298,
                          opacity: 1,
                          gap: 24,
                        }}
                      >
                        <div
                          className="flex items-end flex-shrink-0"
                          style={{
                            transform: "translateY(40px)",
                            transformOrigin: "bottom left",
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{
                              opacity: 1,
                              x: 0,
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
                            {String(card.count).padStart(2, "0")}
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -12 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: 0.5, duration: 0.3 },
                          }}
                          className="flex flex-col shrink-0 min-w-0"
                          style={{
                            width: 296,
                            height: 98,
                            opacity: 1,
                            gap: 4,
                            marginTop: -24,
                            paddingRight: 20,
                          }}
                        >
                          <p
                            className="text-white shrink-0 flex items-center justify-start whitespace-nowrap w-full"
                            style={{
                              height: 40,
                              opacity: 1,
                              fontFamily: "Outfit, sans-serif",
                              fontWeight: 700,
                              fontStyle: "normal",
                              fontSize: 32,
                              lineHeight: "100%",
                              letterSpacing: "0%",
                              textAlign: "left",
                            }}
                          >
                            {card.label}
                          </p>
                          {card.description && (
                            <p
                              className="shrink-0 flex items-center w-full max-w-full"
                              style={{
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
                              {card.description}
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
                          left: 220,
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
              </div>

              {/* 2. Overlay Layer (Shrunk State) - This is what "closes" */}
              <motion.div
                className="absolute overflow-hidden text-[#C33241] inset-0  z-10 px-6 flex flex-col justify-end"
                initial={false}
                style={{
                  backgroundColor: "var(--Secondary-Secondary50, #F9EBEC)",
                }}
                animate={{
                  clipPath: isActive
                    ? "circle(0% at 0% 100%)"
                    : "circle(150% at 80% 30%)",
                }}
                transition={{
                  duration: 1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="flex flex-col gap-10">
                  {/* <motion.div
                  className="flex flex-col gap-2"
                  style={{
                    transformOrigin: "bottom center",
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    // width: "max-content",
                  }}
                  animate={{
                    rotate: isActive ? 180 : 0,
                  }}
                  transition={{
                    duration: 2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <h4 className=" font-bold text-xl uppercase tracking-wider">
                    Trying Hard
                  </h4>
                  <p className="text-sm">{card.description}</p>
                </motion.div> */}
                  {/* Rotated title + description — vertical, start from bottom-0 */}
                  <motion.div
                    animate={{
                      rotate: isActive ? 30 : 0,
                    }}
                    transition={{
                      duration: 3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    style={{ transformOrigin: "bottom left" }}
                    className="flex-1 min-h-0 max-h-[220px] flex items-end justify-center overflow-hidden"
                  >
                    <div
                      className="flex flex-col gap-2"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textOrientation: "mixed",
                      }}
                    >
                      <>
                        {(() => {
                          const parts = card.label.split(" ");
                          const firstLine = parts.slice(0, -1).join(" ");
                          const secondLine = parts[parts.length - 1];
                          const titleStyle = {
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 700,
                            fontStyle: "normal" as const,
                            fontSize: "32px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#C52F47",
                          };
                          if (parts.length === 1) {
                            return (
                              <span
                                className="whitespace-nowrap"
                                style={titleStyle}
                              >
                                {card.label}
                              </span>
                            );
                          }
                          return (
                            <>
                              <span
                                className="whitespace-nowrap"
                                style={titleStyle}
                              >
                                {firstLine}
                              </span>
                              <span
                                className="whitespace-nowrap"
                                style={titleStyle}
                              >
                                {secondLine}
                              </span>
                            </>
                          );
                        })()}
                      </>
                      {card.description && (
                        <span
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "18px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#C52F47",
                            maxWidth: "10rem",
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {card.description}
                        </span>
                      )}
                    </div>
                  </motion.div>
                  {/* <span className=" font-bold text-5xl">{card.count}+</span> */}
                  {/* Large number bottom — "05+" with superscript "+" */}
                  <div
                    className="flex items-end justify-center"
                    style={{
                      width: "220px",
                      height: "160px",
                      opacity: 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Nohemi, sans-serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize: "150px",
                        lineHeight: "120%",
                        letterSpacing: "0%",
                        textAlign: "center",
                        color: "#C52F47",
                      }}
                    >
                      {String(card.count).padStart(2, "0")}
                      <sup
                        style={{
                          fontFamily: "Nohemi, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.4em",
                          verticalAlign: "super",
                          lineHeight: 0,
                          color: "#C52F47",
                          position: "relative",
                          left: "-10px",
                          top: "-40px",
                        }}
                      >
                        +
                      </sup>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
