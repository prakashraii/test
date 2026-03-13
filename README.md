# SkillShikshya Journey — Task 1

Next.js + TypeScript + Tailwind implementation of the "Your SkillShikshya Journey" section from the Figma design.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

- **`src/components/journey/JourneyCard.tsx`** — Reusable card (592×341px, 30px radius, hover 500ms ease-out; illustration 257.39×338.59px at top 22px, left/right -49px with dual box-shadow).
- **`src/components/journey/JourneySection.tsx`** — Section heading + 2×2 grid of cards (no pagination).
- **`src/components/journey/IllustrationPlaceholder.tsx`** — Placeholder for card illustrations. Replace with Figma-exported SVG/PNG or pass `illustration={<img src="..." />}` per card in `JourneySection`.
- **`src/data/journeyCards.ts`** — Card content and theme (colors, illustration position).

## Illustrations

Illustrations are placeholders. To use final assets: export from Figma (SVG/PNG), put under `public/illustrations/`, and in `JourneySection` pass e.g. `<Image src="/illustrations/clarity.png" width={257.39} height={338.59} alt="" />` as the `illustration` prop for each card.
# test
