import { error } from "@sveltejs/kit";
import { globalNoteSlugs } from "#lib/content/global-notes.ts";
import { getGlobalNotes, toNoteSummary } from "#lib/server/content.ts";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () =>
  globalNoteSlugs.map((slug) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
  const notes = getGlobalNotes();
  const index = notes.findIndex((note) => note.slug === params.slug);
  if (index === -1) {
    error(404);
  }
  const link = (i: number) =>
    notes[i] ? { slug: notes[i].slug, title: notes[i].title } : null;
  return {
    note: toNoteSummary(notes[index]),
    newer: link(index - 1),
    older: link(index + 1),
  };
};
