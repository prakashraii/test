"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const CARD_WIDTH = 592;
const CARD_HEIGHT = 341;
const CARD_RADIUS = 30;
const IMG_WIDTH = 290;
const IMG_HEIGHT = 380;
const IMG_TOP = 38;
const IMG_OFFSET = 49;

export interface IllustrationOverrides {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  opacity?: number;
  /** Allow illustration to extend beyond card (pop-out effect) */
  overflowVisible?: boolean;
  /** Subtle drop shadow under the illustration */
  shadow?: boolean;
}

export interface JourneyCardProps {
  title: string;
  subtitle: string;
  bodyText: string;
  backgroundColor: string;
  illustrationPosition: "left" | "right";
  illustration: ReactNode;
  /** Optional overrides for the illustration wrapper and image (e.g. for 2nd card) */
  illustrationOverrides?: IllustrationOverrides;
  /** Optional nudge (px) to move the title row left (e.g. -16 for "Get Mentored & Supported") */
  titleNudgeLeft?: number;
}

export function JourneyCard({
  title,
  subtitle,
  bodyText,
  backgroundColor,
  illustrationPosition,
  illustration,
  illustrationOverrides,
  titleNudgeLeft,
}: JourneyCardProps) {
  const isLeft = illustrationPosition === "left";
  const imgW = illustrationOverrides?.width ?? IMG_WIDTH;
  const imgH = illustrationOverrides?.height ?? IMG_HEIGHT;
  const imgTop = illustrationOverrides?.top ?? IMG_TOP;
  const hasPositionOverrides =
    illustrationOverrides?.left !== undefined ||
    illustrationOverrides?.right !== undefined;
  const overflowVisible = illustrationOverrides?.overflowVisible ?? false;
  const hasShadow = illustrationOverrides?.shadow ?? false;

  return (
    <article
      className="relative overflow-visible rounded-[30px] flex"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: CARD_RADIUS,
        backgroundColor,
        opacity: 1,
      }}
    >
      <div className="relative flex w-full h-full overflow-visible rounded-[30px]">
        {/* Illustration wrapper: absolute, extends outside card */}
        <div
          className="absolute overflow-visible flex items-end shrink-0 bg-transparent z-20"
          style={{
            width: imgW,
            height: imgH,
            top: imgTop,
            opacity: illustrationOverrides?.opacity ?? 1,
            ...(hasShadow && {
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12))",
            }),
            ...(hasPositionOverrides
              ? {
                  ...(illustrationOverrides?.left !== undefined && {
                    left: illustrationOverrides.left,
                  }),
                  ...(illustrationOverrides?.right !== undefined && {
                    right: illustrationOverrides.right,
                  }),
                  ...(illustrationOverrides?.left !== undefined &&
                    illustrationOverrides?.right === undefined && {
                      right: "auto",
                    }),
                  ...(illustrationOverrides?.right !== undefined &&
                    illustrationOverrides?.left === undefined && {
                      left: "auto",
                    }),
                }
              : isLeft
                ? { left: -IMG_OFFSET }
                : { right: -IMG_OFFSET, left: "auto" }),
          }}
        >
          <motion.div
            className={`w-full h-full bg-transparent ${overflowVisible ? "overflow-visible" : "overflow-hidden rounded-b-[8px]"}`}
            style={{
              width: imgW,
              height: imgH,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            {illustration}
          </motion.div>
        </div>

        {/* Text block: typography position and size — 1st/3rd left: 206px, 2nd/4th left: 35px */}
        <div
          className="flex flex-col justify-center z-10 absolute"
          style={{
            width: 351,
            height: 225,
            top: 58,
            left: isLeft ? 206 : 35,
            opacity: 1,
            gap: 12,
          }}
        >
          <h3
            className="text-white font-bold text-[32px] leading-tight whitespace-nowrap"
            style={
              titleNudgeLeft !== undefined
                ? { marginLeft: titleNudgeLeft }
                : undefined
            }
          >
            {title}
          </h3>
          <p className="text-white text-[24px] opacity-95 whitespace-nowrap">
            {subtitle}
          </p>

          <p
            className="text-white opacity-90"
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: 18,
              lineHeight: "100%",
              letterSpacing: 0,
              textAlign: isLeft ? "right" : "left",
            }}
          >
            {bodyText}
          </p>
        </div>
      </div>
    </article>
  );
}
