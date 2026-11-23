/** A link to one of the standalone pages in `./pages`. */
export type HomeCard = {
  /** The page's slug (its file name in `./pages`). */
  slug: string;
  title: string;
  subtitle: string;
};

export type HomeSection = {
  title: string;
  description: string;
  cards: HomeCard[];
};

/** The lists of writings shown on the home page, in display order. */
export const homeSections: HomeSection[] = [
  {
    title: "A Premise",
    description: "Justifying my existence.",
    cards: [
      {
        slug: "root",
        title: "The Root",
        subtitle:
          "A formal declaration of my insanity (AKA my motivations for wanting to write about my work).",
      },
      {
        slug: "personal-laws-of-design",
        title: "Personal Laws of Design",
        subtitle: "Laws I adhere to when designing technological systems.",
      },
      {
        slug: "approach-to-work-ethic",
        title: 'Approach to "Work Ethic"',
        subtitle: "A different view.",
      },
    ],
  },
  {
    title: "Building Products and Tools",
    description:
      "Content related to working directly with current industry technologies and day-to-day work building products that bring value to society. This will be the interesting stuff if you work in the software industry.",
    cards: [
      {
        slug: "swift-stream-parsing",
        title:
          "Swift Stream Parsing, an Incremental Byte-by-Byte Parsing Library",
        subtitle:
          "Incremental parsing written in pure Swift because I needed this for LLMs.",
      },
      {
        slug: "swift-cactus",
        title: "Swift Cactus, an Alternative to Foundation Models",
        subtitle:
          "More model choice, works on any OS version, on any Apple Device.",
      },
      {
        slug: "swift-operation",
        title: "Swift Operation",
        subtitle:
          "A cross-platform library for flexible asynchronous state and operation management in Swift.",
      },
      {
        slug: "monads",
        title: "How to Teach Monads in Programming",
        subtitle: "You don't learn monads by learning monads.",
      },
      {
        slug: "liquid-glass",
        title: "Thoughts on Liquid Glass",
        subtitle:
          "What I think of Apple's new aesthetic in the grand scheme of things.",
      },
    ],
  },
  {
    title: "Swift Bits",
    description: "How I use Swift on a day-to-day basis.",
    cards: [
      {
        slug: "non-sendable-core-sendable-shell",
        title: "Non-Sendable Core, Sendable Shell",
        subtitle:
          "How to push Swift Concurrency to the edge, and make the rest of your code simpler.",
      },
      {
        slug: "protocols-and-possibility",
        title: "Protocols and Possibility",
        subtitle:
          "Protocol size determines possibility, and possibilities are a good thing.",
      },
      {
        slug: "on-package-traits",
        title: "On Swift Package Traits",
        subtitle:
          "What are package traits, and how I used this lesser known SPM feature in swift-uuidv7.",
      },
    ],
  },
  {
    title: "Towards New Mediums",
    description:
      "Explorations on creating new mediums for humans to communicate, distribute, and implement amazing ideas. Exploring why the technologies and mediums we take for granted today (web, social media, apps, etc.) fail at scaling this to global and possible future multi-planetary scales. AKA, my insanity diary.",
    cards: [
      {
        slug: "processes-are-central-to-programming",
        title: "Processes are Central to Programming",
        subtitle: "Why Rob Pike's perspective is flawed.",
      },
      {
        slug: "a-realization-on-low-and-high-level-languages",
        title: "A Realization on Low and High Level Languages",
        subtitle:
          "Low and high level languages are tied to systems, not computer architecture.",
      },
      {
        slug: "command-handlers-dont-scale",
        title: "Command Handlers Don't Scale",
        subtitle:
          "Technology, organizations, and societies need to be collaborative, and not enable their own destruction by refusing to question their own requirements.",
      },
    ],
  },
];
