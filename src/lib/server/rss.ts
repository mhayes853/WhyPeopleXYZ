import { JSDOM } from "jsdom";
import { isDateText } from "../dates";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../site";
import { getAllPageSummaries, getGlobalNotes } from "./content";

export type RssItem = {
  title: string;
  link: string;
  /** Defaults to `link`. */
  guid?: string;
  description: string;
  timestamp: number;
  contentHtml: string;
};

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toRfc822 = (timestamp: number) => new Date(timestamp).toUTCString();

/**
 * Prepares rendered page HTML for inclusion in the feed: keeps only the
 * `<article>` (when present), drops interactive chrome and the trailing date
 * line, and makes site-relative URLs absolute.
 */
export const prepareFeedContent = (html: string) => {
  const document = new JSDOM(`<body>${html}</body>`).window.document;
  const root = document.querySelector("article") ?? document.body;

  for (const element of root.querySelectorAll(
    ".article-reading-time, .code-copy-button",
  )) {
    element.remove();
  }

  // Drop the trailing date line (and any line breaks around it).
  for (let element = root.lastElementChild; element; ) {
    const previous = element.previousElementSibling;
    if (element.tagName === "BR") {
      element.remove();
    } else if (
      element.tagName === "P" &&
      isDateText(element.textContent?.trim() ?? "")
    ) {
      element.remove();
    } else {
      break;
    }
    element = previous;
  }

  for (const element of root.querySelectorAll("[src], [href]")) {
    for (const attribute of ["src", "href"]) {
      const value = element.getAttribute(attribute);
      if (value?.startsWith("/") && !value.startsWith("//")) {
        element.setAttribute(attribute, `${SITE_URL}${value}`);
      }
    }
  }

  return root.innerHTML.trim();
};

const buildItem = (item: RssItem) =>
  [
    "    <item>",
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${escapeXml(item.link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(item.guid ?? item.link)}</guid>`,
    `      <pubDate>${escapeXml(toRfc822(item.timestamp))}</pubDate>`,
    item.description
      ? `      <description>${escapeXml(item.description)}</description>`
      : null,
    `      <content:encoded><![CDATA[${item.contentHtml.replaceAll("]]>", "]]]]><![CDATA[>")}]]></content:encoded>`,
    "    </item>",
  ]
    .filter(Boolean)
    .join("\n");

export const buildRss = (items: RssItem[]) => {
  const sorted = [...items].sort((a, b) => b.timestamp - a.timestamp);
  const lastBuild = toRfc822(sorted[0]?.timestamp ?? Date.now());

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "  <channel>",
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${escapeXml(`${SITE_URL}/`)}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>en-us</language>",
    `    <atom:link href="${escapeXml(`${SITE_URL}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${escapeXml(lastBuild)}</lastBuildDate>`,
    ...sorted.map(buildItem),
    "  </channel>",
    "</rss>",
  ].join("\n");
};

/** Every dated page and global note on the site, as feed items. */
export const collectRssItems = (): RssItem[] => {
  const pages = getAllPageSummaries().flatMap((page): RssItem[] =>
    page.timestamp === null
      ? []
      : [
          {
            title: page.module.metadata.title,
            link: `${SITE_URL}/${page.slug}`,
            description: page.module.metadata.description,
            timestamp: page.timestamp,
            contentHtml: prepareFeedContent(page.html),
          },
        ],
  );

  const notes = getGlobalNotes().map(
    (note): RssItem => ({
      title: `${note.title} — Global Notes`,
      link: `${SITE_URL}/global-notes/${note.slug}`,
      // Notes used to only live on the single `/global-notes` page, so keep
      // their original ids to avoid feed readers showing them as new again.
      guid: `${SITE_URL}/global-notes#${note.anchor}`,
      description: note.excerpt,
      timestamp: note.timestamp,
      contentHtml: prepareFeedContent(note.html),
    }),
  );

  return [...pages, ...notes];
};
