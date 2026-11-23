import { error } from "@sveltejs/kit";
import { loadPage } from "#lib/content/pages.ts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, data }) => {
  const page = await loadPage(params.page);
  if (!page) {
    error(404);
  }
  return {
    ...data,
    slug: params.page,
    metadata: page.metadata,
    content: page.default,
  };
};
