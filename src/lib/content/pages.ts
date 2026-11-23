import type { Component } from "svelte";
import type { NavLinkName } from "../components/nav";

/**
 * Metadata exported from each page component in `./pages` via
 * `<script module>`. The page is served at `/<file name>`.
 */
export type PageMetadata = {
  /** Used for the `<title>` and social cards. */
  title: string;
  /** Used for the description meta tags and the RSS feed. */
  description: string;
  /** Links shown under the logo at the top of the page. */
  nav: NavLinkName[];
  /** Whether to show the scroll progress bar. Defaults to `true`. */
  progressBar?: boolean;
};

export type PageModule = { default: Component; metadata: PageMetadata };

const PREFIX = "./pages/";

const loaders = Object.fromEntries(
  Object.entries(import.meta.glob<PageModule>("./pages/*.svelte")).map(
    ([path, load]) => [path.slice(PREFIX.length, -".svelte".length), load],
  ),
);

/** The slugs of every standalone page (e.g. "about", "monads"). */
export const pageSlugs = Object.keys(loaders).sort();

/** Lazily loads the component and metadata for a page. */
export const loadPage = (slug: string): Promise<PageModule> | undefined =>
  loaders[slug]?.();
