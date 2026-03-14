"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const CARD_WIDTH = 592;
const CARD_HEIGHT = 341;
const CARD_RADIUS = 30;
const IMG_WIDTH = 290;
const IMG_HEIGHT = 380;
const IMG_TOP = 38;
const IMG_OFFSET = 49;

/** Radius of the left/right middle cutouts on hover (inward semicircle — larger = stronger “scooped” look) */
const CUTOUT_RADIUS = 55;
const CUTOUT_CENTER_Y = CARD_HEIGHT / 2;

/** Inset from left/right edges — shifts cutouts and carousel inward so they sit inside the card */
const HOVER_SIDE_INSET = 30;

/** Corner radius for the hover card shape (subtle 8–12px as in reference) */
const HOVER_CORNER_RADIUS = 16;

/** Radius at the lower meet points (where sides meet the bottom of the semicircle) */
const CUTOUT_FILLET_RADIUS = 16;

/** Radius at the upper meet points (where sides meet the top of the semicircle) — larger for smoother transition */
const CUTOUT_UPPER_FILLET_RADIUS = 12;

/** SVG path for hover shape: corner radius, cutouts with fillets where sides meet semicircles. */
const CARD_CLIP_PATH = [
  `M ${HOVER_CORNER_RADIUS} 0`,
  `L ${CARD_WIDTH - HOVER_CORNER_RADIUS} 0`,
  `A ${HOVER_CORNER_RADIUS} ${HOVER_CORNER_RADIUS} 0 0 1 ${CARD_WIDTH} ${HOVER_CORNER_RADIUS}`,
  `L ${CARD_WIDTH} ${CUTOUT_CENTER_Y - CUTOUT_RADIUS - CUTOUT_UPPER_FILLET_RADIUS}`,
  `A ${CUTOUT_UPPER_FILLET_RADIUS} ${CUTOUT_UPPER_FILLET_RADIUS} 0 0 1 ${CARD_WIDTH - CUTOUT_UPPER_FILLET_RADIUS} ${CUTOUT_CENTER_Y - CUTOUT_RADIUS}`,
  `L ${CARD_WIDTH - HOVER_SIDE_INSET} ${CUTOUT_CENTER_Y - CUTOUT_RADIUS}`,
  `A ${CUTOUT_RADIUS} ${CUTOUT_RADIUS} 0 0 0 ${CARD_WIDTH - HOVER_SIDE_INSET} ${CUTOUT_CENTER_Y + CUTOUT_RADIUS}`,
  `L ${CARD_WIDTH - CUTOUT_FILLET_RADIUS} ${CUTOUT_CENTER_Y + CUTOUT_RADIUS}`,
  `A ${CUTOUT_FILLET_RADIUS} ${CUTOUT_FILLET_RADIUS} 0 0 1 ${CARD_WIDTH} ${CUTOUT_CENTER_Y + CUTOUT_RADIUS + CUTOUT_FILLET_RADIUS}`,
  `L ${CARD_WIDTH} ${CARD_HEIGHT - HOVER_CORNER_RADIUS}`,
  `A ${HOVER_CORNER_RADIUS} ${HOVER_CORNER_RADIUS} 0 0 1 ${CARD_WIDTH - HOVER_CORNER_RADIUS} ${CARD_HEIGHT}`,
  `L ${HOVER_CORNER_RADIUS} ${CARD_HEIGHT}`,
  `A ${HOVER_CORNER_RADIUS} ${HOVER_CORNER_RADIUS} 0 0 1 0 ${CARD_HEIGHT - HOVER_CORNER_RADIUS}`,
  `L 0 ${CUTOUT_CENTER_Y + CUTOUT_RADIUS + CUTOUT_FILLET_RADIUS}`,
  `A ${CUTOUT_FILLET_RADIUS} ${CUTOUT_FILLET_RADIUS} 0 0 1 ${CUTOUT_FILLET_RADIUS} ${CUTOUT_CENTER_Y + CUTOUT_RADIUS}`,
  `L ${HOVER_SIDE_INSET} ${CUTOUT_CENTER_Y + CUTOUT_RADIUS}`,
  `A ${CUTOUT_RADIUS} ${CUTOUT_RADIUS} 0 0 0 ${HOVER_SIDE_INSET} ${CUTOUT_CENTER_Y - CUTOUT_RADIUS}`,
  `L ${CUTOUT_UPPER_FILLET_RADIUS} ${CUTOUT_CENTER_Y - CUTOUT_RADIUS}`,
  `A ${CUTOUT_UPPER_FILLET_RADIUS} ${CUTOUT_UPPER_FILLET_RADIUS} 0 0 1 0 ${CUTOUT_CENTER_Y - CUTOUT_RADIUS - CUTOUT_UPPER_FILLET_RADIUS}`,
  `L 0 ${HOVER_CORNER_RADIUS}`,
  `A ${HOVER_CORNER_RADIUS} ${HOVER_CORNER_RADIUS} 0 0 1 ${HOVER_CORNER_RADIUS} 0`,
  "Z",
].join(" ");

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
  /** When true, card shows hover layout: cutout shape, carousel area, nav buttons; illustration hides on hover */
  enableHoverCarousel?: boolean;
  /** Custom content to show inside the hover carousel area (e.g. images + text per card) */
  hoverContent?: ReactNode;
  /** Multiple slides for carousel; nav buttons switch between them. Takes precedence over hoverContent when provided. */
  carouselSlides?: ReactNode[];
}

const HOVER_CLIP_ID = "journey-card-hover-clip";

export function JourneyCard({
  title,
  subtitle,
  bodyText,
  backgroundColor,
  illustrationPosition,
  illustration,
  illustrationOverrides,
  titleNudgeLeft,
  enableHoverCarousel = false,
  hoverContent,
  carouselSlides,
}: JourneyCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  /** When true, cutout clip-path is applied; delayed on hover so slide starts before clip */
  const [clipActive, setClipActive] = useState(false);
  /** Distance from card left edge to viewport left — used so content slides to/from screen edge */
  const [distanceToLeftEdge, setDistanceToLeftEdge] = useState(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableHoverCarousel) return;
    if (isHovered) {
      const t = setTimeout(() => setClipActive(true), 120);
      return () => clearTimeout(t);
    }
    setClipActive(false);
  }, [isHovered, enableHoverCarousel]);
  const hasCarousel = (carouselSlides?.length ?? 0) > 1;
  const effectiveHoverContent =
    carouselSlides?.length != null && carouselSlides.length > 0
      ? carouselSlides[slideIndex]
      : hoverContent;

  const isLeft = illustrationPosition === "left";
  const imgW = illustrationOverrides?.width ?? IMG_WIDTH;
  const imgH = illustrationOverrides?.height ?? IMG_HEIGHT;
  const imgTop = illustrationOverrides?.top ?? IMG_TOP;
  const hasPositionOverrides =
    illustrationOverrides?.left !== undefined ||
    illustrationOverrides?.right !== undefined;
  const overflowVisible = illustrationOverrides?.overflowVisible ?? false;
  const hasShadow = illustrationOverrides?.shadow ?? false;

  /** When true, card content slides left on hover and hoverContent appears; content slides back from left on unhover */
  const useSlideHover = enableHoverCarousel && effectiveHoverContent != null;

  /** When hovered, slide content fully off the left so it disappears (not just to viewport edge). */
  const slideOffset = distanceToLeftEdge + CARD_WIDTH;

  const cardContent = (
    <>
      <motion.div
        className="relative flex w-full h-full overflow-visible rounded-[30px]"
        style={useSlideHover ? { zIndex: 20 } : undefined}
        animate={{
          x: useSlideHover && isHovered ? -slideOffset : 0,
        }}
        transition={{ type: "tween", duration: 0.65, ease: "easeInOut" }}
      >
        {/* Dim background that moves with the content (card color, dimmed) */}
        {useSlideHover && (
          <div
            className="absolute inset-0 rounded-[30px] pointer-events-none"
            style={{
              backgroundColor,
              opacity: 0.85,
              zIndex: 0,
            }}
            aria-hidden
          />
        )}
        {/* Illustration wrapper: absolute, extends outside card — hidden on hover when carousel enabled (or slides away with content) */}
        <div
          className={`absolute overflow-visible flex items-end shrink-0 bg-transparent z-20 ${!useSlideHover && enableHoverCarousel ? "transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none" : ""}`}
          style={{
            width: imgW,
            height: imgH,
            top: imgTop,
            ...(!enableHoverCarousel && {
              opacity: illustrationOverrides?.opacity ?? 1,
            }),
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
            animate={{
              y: useSlideHover && isHovered ? 0 : [0, -10, 0],
            }}
            transition={
              useSlideHover && isHovered
                ? { duration: 0.25, ease: "easeOut" }
                : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }
          >
            {illustration}
          </motion.div>
        </div>

        {/* Carousel area (placeholder when no hover/carousel content; content with overflow is rendered outside article) */}
        {enableHoverCarousel && effectiveHoverContent == null && (
          <div
            className="absolute inset-0 z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 flex items-center justify-center"
            aria-hidden
          >
            <div
              className="w-full h-full flex items-center justify-center relative overflow-visible"
              style={{
                marginLeft: HOVER_SIDE_INSET + CUTOUT_RADIUS,
                marginRight: HOVER_SIDE_INSET + CUTOUT_RADIUS,
              }}
            >
              <div className="w-full h-full min-h-0 rounded-lg border border-white/30 border-dashed" />
            </div>
          </div>
        )}

        {/* Text block: typography — sits behind hover overlay when carousel enabled; with slide hover it moves off with content */}
        <div
          className={`flex flex-col justify-center absolute ${useSlideHover ? "z-[5]" : enableHoverCarousel ? "z-[5] transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none" : "z-10"}`}
          style={{
            width: 351,
            height: 225,
            top: 58,
            left: isLeft ? 206 : 35,
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
      </motion.div>
    </>
  );

  const wrapperClassName = enableHoverCarousel ? "group" : "";
  const cardStyle: React.CSSProperties = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    backgroundColor,
    opacity: 1,
    ...(enableHoverCarousel && {
      transition: "clip-path 0.3s ease",
      ...(clipActive && { clipPath: `url(#${HOVER_CLIP_ID})` }),
    }),
  };

  return (
    <div
      ref={cardWrapperRef}
      className={`relative overflow-visible ${wrapperClassName}`}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      onMouseEnter={() => {
        if (useSlideHover && cardWrapperRef.current) {
          setDistanceToLeftEdge(cardWrapperRef.current.getBoundingClientRect().left);
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG defs for hover clip path (only when hover carousel is enabled) */}
      {enableHoverCarousel && (
        <svg width={0} height={0} aria-hidden className="absolute">
          <defs>
            <clipPath id={HOVER_CLIP_ID} clipPathUnits="userSpaceOnUse">
              <path d={CARD_CLIP_PATH} />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Nav buttons in cutouts — only when enableHoverCarousel, visible on hover; when carouselSlides, they switch slides */}
      {enableHoverCarousel && (
        <>
          <button
            type="button"
            className="absolute z-30 w-14 h-14 rounded-full bg-white/90 shadow-lg border border-gray-300 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 text-gray-900"
            style={{
              left: HOVER_SIDE_INSET,
              top: CUTOUT_CENTER_Y,
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Previous"
            onClick={
              hasCarousel
                ? () =>
                    setSlideIndex((i) =>
                      (i - 1 + carouselSlides!.length) % carouselSlides!.length
                    )
                : undefined
            }
          >
            <Icon
              icon="basil:arrow-left-outline"
              width={32}
              height={32}
              color="black"
              fontWeight={700}
              aria-hidden
            />
          </button>
          <button
            type="button"
            className="absolute z-30 w-14 h-14 rounded-full bg-white/90 shadow-lg border border-gray-300 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 text-gray-900"
            style={{
              left: CARD_WIDTH - HOVER_SIDE_INSET,
              top: CUTOUT_CENTER_Y,
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Next"
            onClick={
              hasCarousel
                ? () =>
                    setSlideIndex((i) => (i + 1) % carouselSlides!.length)
                : undefined
            }
          >
            <Icon
              icon="basil:arrow-right-outline"
              width={28}
              height={28}
              aria-hidden
            />
          </button>
        </>
      )}

      <article
        className="relative overflow-visible rounded-[30px] flex journey-card-article"
        style={cardStyle}
      >
        {cardContent}
      </article>

      {/* Hover content outside article so img can overflow card without being clipped by clip-path; appears in place (no slide) when useSlideHover */}
      {enableHoverCarousel && effectiveHoverContent != null && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center overflow-visible ${useSlideHover && isHovered ? "pointer-events-auto z-[25]" : "pointer-events-none z-10"}`}
          aria-hidden
          style={{
            marginLeft: HOVER_SIDE_INSET + CUTOUT_RADIUS,
            marginRight: HOVER_SIDE_INSET + CUTOUT_RADIUS,
          }}
          initial={false}
          animate={{
            opacity: useSlideHover ? (isHovered ? 1 : 0) : 0,
          }}
          transition={
            useSlideHover
              ? isHovered
                ? { duration: 0.4, delay: 0.3, ease: "easeOut" }
                : { duration: 0.25, delay: 0, ease: "easeIn" }
              : { duration: 0.2 }
          }
        >
          <div className="w-full h-full relative overflow-visible">
            {effectiveHoverContent}
          </div>
        </motion.div>
      )}

    </div>
  );
}
