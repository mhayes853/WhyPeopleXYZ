import type { Component } from "svelte";

/**
 * Metadata exported from each global note component in `./global-notes` via
 * `<script module>`. The note is served at `/global-notes/<file name>`.
 */
export type GlobalNoteMetadata = {
  title: string;
  /**
   * The date the note was written, as displayed on the site, e.g. "11/16/26"
   * or "2/26/26 (4:26 AM)". Notes are ordered newest first by this date.
   */
  date: string;
  /**
   * The id of the note's heading on the `/global-notes` page. Defaults to the
   * file name. Only set for older notes whose anchor predates their file name,
   * so that existing `/global-notes#<anchor>` links keep working.
   */
  anchor?: string;
};

export type GlobalNoteModule = {
  default: Component;
  metadata: GlobalNoteMetadata;
};

/** A note's metadata along with values derived at build time. */
export type GlobalNoteSummary = GlobalNoteMetadata & {
  slug: string;
  anchor: string;
  timestamp: number;
  readingMinutes: number;
  excerpt: string;
};

const PREFIX = "./global-notes/";

export const slugFromPath = (path: string) =>
  path.slice(path.lastIndexOf("/") + 1, -".svelte".length);

const loaders = Object.fromEntries(
  Object.entries(import.meta.glob<GlobalNoteModule>("./global-notes/*.svelte")).map(
    ([path, load]) => [path.slice(PREFIX.length, -".svelte".length), load],
  ),
);

/** The slugs of every global note, in no particular order. */
export const globalNoteSlugs = Object.keys(loaders);

/** Lazily loads the component and metadata for a single note. */
export const loadGlobalNote = (
  slug: string,
): Promise<GlobalNoteModule> | undefined => loaders[slug]?.();
