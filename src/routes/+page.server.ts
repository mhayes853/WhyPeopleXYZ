import { homeSections } from "#lib/content/home.ts";
import { getGlobalNotes, getPageSummary } from "#lib/server/content.ts";
import type { PageServerLoad } from "./$types";

const RECENT_GLOBAL_NOTES_COUNT = 3;

export const load: PageServerLoad = () => ({
  sections: homeSections.map((section) => ({
    ...section,
    cards: section.cards.map((card) => {
      const page = getPageSummary(card.slug);
      if (!page) {
        throw new Error(`The home page links to a missing page: ${card.slug}`);
      }
      return { ...card, date: page.date };
    }),
  })),
  recentGlobalNotes: getGlobalNotes()
    .slice(0, RECENT_GLOBAL_NOTES_COUNT)
    .map(({ slug, title, date }) => ({ slug, title, date })),
});
