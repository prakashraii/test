"use client";

import { journeyCards } from "@/data/journeyCards";
import { JourneyCard } from "./JourneyCard";

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
    <section className="max-w-[1280px] mx-auto">
      <p className="text-gray-700 text-sm font-medium mb-1">
        Your SkillShikshya Journey
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-10">
        Step In. Skill Up. Stand Out. 🚀
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 place-items-center">
        {journeyCards.map((card, index) => (
          <div
            key={card.id}
            className="relative"
            style={{ zIndex: index < 2 ? 10 : 5 }}
          >
            <JourneyCard
              key={card.id}
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
