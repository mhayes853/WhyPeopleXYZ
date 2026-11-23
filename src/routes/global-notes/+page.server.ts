import { estimateReadingTime } from "#lib/reading-time.ts";
import { getGlobalNotes, toNoteSummary } from "#lib/server/content.ts";
import { htmlToText } from "#lib/server/html.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const notes = getGlobalNotes();
  const text = notes.map((note) => `${note.title} ${htmlToText(note.html)}`);
  return {
    notes: notes.map(toNoteSummary),
    totalReadingMinutes: estimateReadingTime(text.join(" ")),
  };
};
