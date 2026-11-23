import { describe, expect, it } from "vitest";
import { SITE_URL } from "../site";
import {
  buildRss,
  collectRssItems,
  prepareFeedContent,
  type RssItem,
} from "./rss";

const sampleItem = (overrides: Partial<RssItem> = {}): RssItem => ({
  title: "Item",
  link: `${SITE_URL}/item`,
  description: "Item description.",
  timestamp: new Date(2025, 0, 1).getTime(),
  contentHtml: "<p>Body.</p>",
  ...overrides,
});

describe("prepareFeedContent", () => {
  it("keeps only the article and drops the reading time and copy buttons", () => {
    const html = `
      <a href="/">Logo</a>
      <article>
        <h1>Title</h1>
        <p class="article-reading-time">3 Minutes to Read</p>
        <div class="code-block-shell"><pre><code>let x = 1</code></pre><button class="code-copy-button"></button></div>
        <p><strong>body</strong> with markup.</p>
      </article>`;
    const content = prepareFeedContent(html);
    expect(content.startsWith("<h1>Title</h1>")).toBe(true);
    expect(content).toContain("<strong>body</strong>");
    expect(content).toContain("let x = 1");
    expect(content).not.toContain("Logo");
    expect(content).not.toContain("Minutes to Read");
    expect(content).not.toContain("code-copy-button");
  });

  it("strips the trailing date line but keeps dates followed by more text", () => {
    expect(prepareFeedContent("<p>Body.</p><p>— 6/29/25</p><br>")).toBe(
      "<p>Body.</p>",
    );
    expect(prepareFeedContent("<p>— 6/29/25</p><p>PS.</p>")).toBe(
      "<p>— 6/29/25</p><p>PS.</p>",
    );
  });

  it("makes site-relative URLs absolute", () => {
    const content = prepareFeedContent(
      '<p><img src="/images/a.png"><a href="/about">About</a><a href="https://x.com">X</a></p>',
    );
    expect(content).toContain(`src="${SITE_URL}/images/a.png"`);
    expect(content).toContain(`href="${SITE_URL}/about"`);
    expect(content).toContain('href="https://x.com"');
  });
});

describe("buildRss", () => {
  it("produces valid RSS 2.0 with namespaces", () => {
    const xml = buildRss([sampleItem()]);
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    expect(xml).toContain(
      'xmlns:content="http://purl.org/rss/1.0/modules/content/"',
    );
    expect(xml).toContain('<atom:link href="https://whypeople.xyz/rss.xml"');
  });

  it("sorts items newest-first", () => {
    const xml = buildRss([
      sampleItem({
        link: `${SITE_URL}/older`,
        timestamp: new Date(2024, 0, 1).getTime(),
      }),
      sampleItem({
        link: `${SITE_URL}/newer`,
        timestamp: new Date(2026, 0, 1).getTime(),
      }),
    ]);
    expect(xml.indexOf(`${SITE_URL}/newer`)).toBeLessThan(
      xml.indexOf(`${SITE_URL}/older`),
    );
  });

  it("uses the guid when given, and the link otherwise", () => {
    const xml = buildRss([
      sampleItem({ link: `${SITE_URL}/a`, guid: `${SITE_URL}/old#a` }),
    ]);
    expect(xml).toContain(
      `<guid isPermaLink="true">${SITE_URL}/old#a</guid>`,
    );
    expect(buildRss([sampleItem()])).toContain(
      `<guid isPermaLink="true">${SITE_URL}/item</guid>`,
    );
  });

  it("escapes XML special characters in titles and descriptions", () => {
    const xml = buildRss([
      sampleItem({
        title: "Tom & Jerry <script>",
        description: 'Quotes "are" tricky & <tags>',
      }),
    ]);
    expect(xml).toContain("<title>Tom &amp; Jerry &lt;script&gt;</title>");
    expect(xml).toContain(
      "<description>Quotes &quot;are&quot; tricky &amp; &lt;tags&gt;</description>",
    );
  });

  it("wraps content:encoded in CDATA", () => {
    const xml = buildRss([
      sampleItem({ contentHtml: "<p>raw <strong>html</strong></p>" }),
    ]);
    expect(xml).toContain(
      "<content:encoded><![CDATA[<p>raw <strong>html</strong></p>]]></content:encoded>",
    );
  });

  it("uses the most recent pubDate as lastBuildDate", () => {
    const xml = buildRss([
      sampleItem({ timestamp: new Date(2024, 0, 1).getTime() }),
      sampleItem({ timestamp: new Date(2026, 5, 15).getTime() }),
    ]);
    expect(xml).toContain(
      `<lastBuildDate>${new Date(2026, 5, 15).toUTCString()}</lastBuildDate>`,
    );
  });

  it("omits the item description element when empty", () => {
    const xml = buildRss([sampleItem({ description: "" })]);
    const item = xml.match(/<item>[\s\S]*<\/item>/)?.[0];
    expect(item).toBeDefined();
    expect(item).not.toContain("<description>");
    expect(xml).toContain("<description>");
  });
});

describe("collectRssItems (integration with the site's content)", () => {
  const items = collectRssItems();

  it("includes every dated page", () => {
    const links = items.map((item) => item.link);
    expect(links).toContain(`${SITE_URL}/monads`);
    expect(links).toContain(`${SITE_URL}/root`);
    expect(links).not.toContain(`${SITE_URL}/about`);
    for (const item of items) {
      expect(item.link.startsWith(SITE_URL)).toBe(true);
      expect(item.title.length).toBeGreaterThan(0);
      expect(Number.isNaN(item.timestamp)).toBe(false);
    }
  });

  it("includes one item per global note, keeping the original guid", () => {
    const notes = items.filter((item) =>
      item.link.startsWith(`${SITE_URL}/global-notes/`),
    );
    expect(notes.length).toBeGreaterThan(100);
    const note = notes.find((item) => item.link.endsWith("/the-permanent-underclass"));
    expect(note?.guid).toBe(`${SITE_URL}/global-notes#-the-permanent-underclass-`);
    expect(note?.title).toBe("“The Permanent Underclass” — Global Notes");
  });
});
