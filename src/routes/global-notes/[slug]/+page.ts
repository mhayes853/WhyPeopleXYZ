import { error } from "@sveltejs/kit";
import { loadGlobalNote } from "#lib/content/global-notes.ts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, data }) => {
  const note = await loadGlobalNote(params.slug);
  if (!note) {
    error(404);
  }
  return { ...data, content: note.default };
};
