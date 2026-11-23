import { error } from "@sveltejs/kit";
import { pageSlugs } from "#lib/content/pages.ts";
import { getPageSummary } from "#lib/server/content.ts";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () => pageSlugs.map((page) => ({ page }));

export const load: PageServerLoad = ({ params }) => {
  const page = getPageSummary(params.page);
  if (!page) {
    error(404);
  }
  return { readingMinutes: page.readingMinutes };
};
