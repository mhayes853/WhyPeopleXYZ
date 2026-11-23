import type { Component } from "svelte";
import { render } from "svelte/server";
import { allGlobalNotes } from "../content/all-global-notes";
import type { GlobalNoteSummary } from "../content/global-notes";
import type { PageModule } from "../content/pages";
import { findDateLineInHtml, hasTimeOfDay, parseDateText } from "../dates";
import { estimateReadingTime } from "../reading-time";
import { excerpt, htmlToText } from "./html";

const DAY_MS = 24 * 60 * 60 * 1000;

const pageModules = Object.fromEntries(
  Object.entries(
    import.meta.glob<PageModule>("../content/pages/*.svelte", { eager: true }),
  ).map(([path, module]) => [
    path.slice(path.lastIndexOf("/") + 1, -".svelte".length),
    module,
  ]),
);

/** Renders a content component to HTML, without hydration markers. */
export const renderToHtml = (component: Component) =>
  render(component).body.replace(/<!--[\s\S]*?-->/g, "");

export type PageSummary = {
  slug: string;
  module: PageModule;
  html: string;
  readingMinutes: number;
  /** The page's date line without its dash, e.g. "6/7/2025". */
  date: string | null;
  timestamp: number | null;
};

const pageCache = new Map<string, PageSummary>();

export const getPageSummary = (slug: string): PageSummary | undefined => {
  const module = pageModules[slug];
  if (!module) {
    return undefined;
  }
  const cached = pageCache.get(slug);
  if (cached) {
    return cached;
  }
  const html = renderToHtml(module.default);
  const dateLine = findDateLineInHtml(html);
  const summary: PageSummary = {
    slug,
    module,
    html,
    readingMinutes: estimateReadingTime(htmlToText(html)),
    date: dateLine?.replace(/^[-—–]{1,2}\s*/, "") ?? null,
    timestamp: dateLine ? parseDateText(dateLine) : null,
  };
  pageCache.set(slug, summary);
  return summary;
};

export const getAllPageSummaries = () =>
  Object.keys(pageModules)
    .sort()
    .map((slug) => getPageSummary(slug)!);

/**
 * The sort key for a note. Notes without a time of day sort as if they were
 * written at the end of that day, matching the order notes were originally
 * listed in.
 */
const noteSortTimestamp = (date: string) => {
  const timestamp = parseDateText(date);
  if (timestamp === null) {
    throw new Error(`Unparseable global note date: "${date}"`);
  }
  return hasTimeOfDay(date) ? timestamp : timestamp + DAY_MS - 1;
};

let notesCache: (GlobalNoteSummary & { html: string })[] | undefined;

/** Every global note, newest first, with its rendered HTML. */
export const getGlobalNotes = () => {
  notesCache ??= Object.entries(allGlobalNotes)
    .map(([slug, module]) => {
      const html = renderToHtml(module.default);
      const text = htmlToText(html);
      return {
        ...module.metadata,
        slug,
        anchor: module.metadata.anchor ?? slug,
        timestamp: parseDateText(module.metadata.date)!,
        sortTimestamp: noteSortTimestamp(module.metadata.date),
        readingMinutes: estimateReadingTime(text),
        excerpt: excerpt(text),
        html,
      };
    })
    .sort(
      (a, b) => b.sortTimestamp - a.sortTimestamp || a.slug.localeCompare(b.slug),
    )
    .map(({ sortTimestamp: _, ...note }) => note);
  return notesCache;
};

/** Strips the rendered HTML from a note so it can be sent to the client. */
export const toNoteSummary = ({
  html: _,
  ...summary
}: GlobalNoteSummary & { html: string }): GlobalNoteSummary => summary;
