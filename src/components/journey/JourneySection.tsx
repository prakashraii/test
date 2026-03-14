"use client";

import { journeyCards } from "@/data/journeyCards";
import { JourneyCard } from "./JourneyCard";

/** First card hover content: text top-left, main photo, two wow bubbles (from public/cardimg/onhover) */
function FirstCardHoverContent() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-visible">
      {/* Text block — top left */}
      <p
        className="absolute -right-16 top-12 z-10 max-w-[55%] text-white text-[20px] font-[700] leading-snug"
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        Clarity unlocked—stickers, sips, and skills all in one go!
      </p>
      {/* Wow speech bubble — top left */}
      <img
        src="/cardimg/onhover/wow.png"
        alt=""
        className="absolute -left-9 top-10 z-10 w-25 h-auto object-contain -rotate-[35deg] pointer-events-none"
      />
      {/* Main photo — person with laptop (lower-left / center), high z so it isn't cut when shifted */}
      <img
        src="/cardimg/onhover/1hover.png"
        alt=""
        className="absolute bottom-0 -left-12 z-[100] min-h-[85%] min-w-[320px] w-auto object-contain object-bottom pointer-events-none"
      />
      {/* Wow speech bubble — bottom right */}
      <img
        src="/cardimg/onhover/wow.png"
        alt=""
        className="absolute right-2 bottom-4 z-10 w-25 h-auto object-contain pointer-events-none"
      />
    </div>
  );
}

/** Second card hover slide: text + main image (used for carousel slides) */
function SecondCardHoverContent({
  image,
  text,
  textCenter = false,
  largerImage = false,
}: {
  image: string;
  text: string;
  textCenter?: boolean;
  largerImage?: boolean;
}) {
  const imageClass = largerImage
    ? "absolute bottom-0 left-1/2 -translate-x-1/2 z-[100] min-h-[96%] min-w-[580px] max-w-[100%] w-auto object-contain object-bottom pointer-events-none"
    : "absolute bottom-0 left-1/2 -translate-x-1/2 z-[100] min-h-[90%] min-w-[520px] max-w-[100%] w-auto object-contain object-bottom pointer-events-none";
  return (
    <div className="absolute inset-0 rounded-2xl overflow-visible">
      <p
        className={`absolute left-4 top-4 right-4 z-10 max-w-[75%] text-white ${textCenter ? "max-w-none" : ""}`}
        style={{
          fontFamily: "Nohemi, sans-serif",
          fontWeight: 700,
          fontStyle: "normal",
          fontSize: "20px",
          lineHeight: "120%",
          letterSpacing: 0,
          textAlign: "center",
        }}
      >
        {text}
      </p>
      {/* Main photo (centered, fills lower area) */}
      <img src={image} alt="" className={imageClass} />
    </div>
  );
}

const SECOND_CARD_SLIDES = [
  {
    image: "/cardimg/onhover/2hover.png",
    text: "Focused faces—learning mode: ON!",
    textCenter: false,
    largerImage: false,
  },
  {
    image: "/cardimg/onhover/2.1hover.png",
    text: "Laptops, lessons, and a whole lot of growth!",
    textCenter: true,
    largerImage: true,
  },
];

const ILLUSTRATION_WIDTH = 240;
const ILLUSTRATION_HEIGHT = 420;

/** Small nudge for 1st card illustration – move a bit more left */
const FIRST_CARD_ILLUSTRATION = {
  left: -70,
  top: 20,
};

/** Overrides for 2nd card image (Learn by Doing) – match reference layout */
const SECOND_CARD_ILLUSTRATION = {
  width: 230,
  height: 420,
  top: 10,
  left: 365,
  opacity: 1,
  overflowVisible: true, // leg/shoe extends beyond card right & bottom
  shadow: true, // subtle drop shadow under illustration
};

/** Slightly larger illustration for 3rd card (Get Mentored & Supported) */
const THIRD_CARD_ILLUSTRATION = {
  width: 350,
  height: 460,
  top: 120,
};

export function JourneySection() {
  return (
    <section className="max-w-[1280px] mx-auto overflow-visible">
      <div
        className="mb-1"
        style={{
          width: "453px",
          height: "30px",
          opacity: 1,
        }}
      >
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#374151",
            margin: 0,
          }}
        >
          Your SkillShikshya Journey
        </p>
      </div>
      <div
        className="mb-10"
        style={{
          width: "453px",
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
            color: "var(--green-600, #16a34a)",
            margin: 0,
          }}
        >
          Step <span style={{ color: "#374151" }}>In.</span> Skill <span style={{ color: "#374151" }}>Up.</span> Stand <span style={{ color: "#374151" }}>Out.</span> 🚀
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 place-items-center overflow-visible">
        {journeyCards.map((card, index) => (
          <div
            key={card.id}
            className="relative overflow-visible"
            style={{ zIndex: index < 2 ? 10 : 5 }}
          >
            <JourneyCard
              key={card.id}
              enableHoverCarousel={index === 0 || index === 1}
              hoverContent={index === 0 ? <FirstCardHoverContent /> : undefined}
              carouselSlides={
                index === 1
                  ? SECOND_CARD_SLIDES.map((s) => (
                      <SecondCardHoverContent
                        key={s.image}
                        image={s.image}
                        text={s.text}
                        textCenter={s.textCenter}
                        largerImage={s.largerImage}
                      />
                    ))
                  : undefined
              }
              title={card.title}
              subtitle={card.subtitle}
              bodyText={card.bodyText}
              backgroundColor={card.backgroundColor}
              illustrationPosition={card.illustrationPosition}
              illustration={
                <img
                  src={card.imageSrc}
                  alt=""
                  width={
                    index === 1
                      ? SECOND_CARD_ILLUSTRATION.width
                      : index === 2
                        ? THIRD_CARD_ILLUSTRATION.width
                        : ILLUSTRATION_WIDTH
                  }
                  height={
                    index === 1
                      ? SECOND_CARD_ILLUSTRATION.height
                      : index === 2
                        ? THIRD_CARD_ILLUSTRATION.height
                        : ILLUSTRATION_HEIGHT
                  }
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-contain ${index === 2 ? "object-top" : "object-bottom"}`}
                />
              }
              illustrationOverrides={
                index === 0
                  ? FIRST_CARD_ILLUSTRATION
                  : index === 1
                    ? SECOND_CARD_ILLUSTRATION
                    : index === 2
                      ? THIRD_CARD_ILLUSTRATION
                      : undefined
              }
              titleNudgeLeft={index === 2 ? -30 : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
