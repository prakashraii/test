export type IllustrationPosition = "left" | "right";

export interface JourneyCardItem {
  id: string;
  title: string;
  subtitle: string;
  bodyText: string;
  backgroundColor: string;
  illustrationPosition: IllustrationPosition;
  illustrationKey: string;
  /** Path under public, e.g. /cardimg/first.png */
  imageSrc: string;
}

export const journeyCards: JourneyCardItem[] = [
  {
    id: "clarity",
    title: "Start with Clarity",
    subtitle: "Step into a better learning path.",
    bodyText:
      "Overwhelmed by too many learning options? SkillShikshya provides a clear, curated roadmap from the start. Whether you're a beginner or upskilling, we have a path tailored to your growth.",
    backgroundColor: "#F45B5B",
    illustrationPosition: "left",
    illustrationKey: "clarity",
    imageSrc: "/cardimg/first.png",
  },
  {
    id: "doing",
    title: "Learn by Doing",
    subtitle: "Practical skills, real projects.",
    bodyText:
      "Theory is great, but action is better. At SkillShikshya, you learn by doing. Hands-on projects and real-world scenarios help you build, break, and create—leading to true mastery.",
    backgroundColor: "#5492A0",
    illustrationPosition: "right",
    illustrationKey: "doing",
    imageSrc: "/cardimg/second.png",
  },
  {
    id: "mentored",
    title: "Get Mentored & Supported",
    subtitle: "You're not learning alone.",
    bodyText:
      "Stuck or need feedback? SkillShikshya's community of mentors and learners has your back with live support, interactive discussions, and expert insights. You're never on your own.",
    backgroundColor: "#6C64A8",
    illustrationPosition: "left",
    illustrationKey: "mentored",
    imageSrc: "/cardimg/third.png",
  },
  {
    id: "achieve",
    title: "Achieve & Showcase",
    subtitle: "Build your portfolio, get job-ready.",
    bodyText:
      "Your journey ends with achievement. Each completed project builds a portfolio showcasing your skills and job readiness, bringing you closer to that dream job, promotion, or your own venture.",
    backgroundColor: "#A88964",
    illustrationPosition: "right",
    illustrationKey: "achieve",
    imageSrc: "/cardimg/fourth.png",
  },
];
