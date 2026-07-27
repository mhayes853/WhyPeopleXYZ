import { describe, expect, it } from "vitest";
import {
	buildRss,
	collectItems,
	parseArticleItem,
	parseDateText,
	parseGlobalNotesItems,
} from "./generate-rss.mjs";

const SITE_URL = "https://whypeople.xyz";

describe("parseDateText", () => {
	it("parses dates with an em-dash prefix", () => {
		expect(parseDateText("\u2014 1/2/26")).toBe(new Date(2026, 0, 2).getTime());
	});

	it("parses dates with a double-dash prefix", () => {
		expect(parseDateText("-- 9/26/25")).toBe(new Date(2025, 8, 26).getTime());
	});

	it("parses dates with a time and am/pm", () => {
		expect(parseDateText("\u2014 9/26/25 1:30 pm")).toBe(
			new Date(2025, 8, 26, 13, 30).getTime(),
		);
	});

	it("returns null for unparseable input", () => {
		expect(parseDateText("not a date")).toBeNull();
	});
});

const baseHtml = ({
	dateLine,
	title,
	description,
	url,
	body,
}) => `<!doctype html>
<html lang="en">
  <head>
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
  </head>
  <body>
    <article>
      <h1>${title}</h1>
      <p>Some intro paragraph.</p>
      <p>${body ?? "More body text."}</p>
      <p>${dateLine}</p>
    </article>
  </body>
</html>`;

describe("parseArticleItem", () => {
	it("extracts title, description, link, pubDate, and content", () => {
		const html = baseHtml({
			title: "Sample Article",
			description: "A sample article.",
			url: "/sample-article",
			dateLine: "\u2014 6/29/25",
			body: "<strong>body</strong> with markup.",
		});

		const item = parseArticleItem({
			html,
			filePath: "./sample-article",
		});

		expect(item).not.toBeNull();
		expect(item.title).toBe("Sample Article");
		expect(item.description).toBe("A sample article.");
		expect(item.link).toBe(`${SITE_URL}/sample-article`);
		expect(item.timestamp).toBe(new Date(2025, 5, 29).getTime());
		expect(item.pubDate).toBe(new Date(2025, 5, 29).toUTCString());
		expect(item.contentHtml).toContain("<strong>body</strong>");
		// The trailing date paragraph should be stripped from content.
		expect(item.contentHtml).not.toContain("6/29/25");
	});

	it("returns null when the article is missing", () => {
		const html = `<!doctype html><html><body><p>${"\u2014 1/1/26"}</p></body></html>`;
		expect(parseArticleItem({ html, filePath: "./x" })).toBeNull();
	});

	it("returns null when no date line is present", () => {
		const html = `<!doctype html><html><body><article><p>Body only.</p></article></body></html>`;
		expect(parseArticleItem({ html, filePath: "./x" })).toBeNull();
	});

	it("returns null when the date is unparseable", () => {
		const html = `<!doctype html><html><body><article><p>\u2014 not-a-date</p></article></body></html>`;
		expect(parseArticleItem({ html, filePath: "./x" })).toBeNull();
	});

	it("prefers og:url over the file path for the link", () => {
		const html = baseHtml({
			title: "Title",
			description: "Desc",
			url: "/canonical-path",
			dateLine: "\u2014 1/1/26",
		});
		const item = parseArticleItem({ html, filePath: "./file-name" });
		expect(item.link).toBe(`${SITE_URL}/canonical-path`);
	});
});

describe("parseGlobalNotesItems", () => {
	const globalHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta property="og:title" content="Global Notes" />
    <meta property="og:description" content="Recent global notes." />
    <meta property="og:url" content="/global-notes" />
  </head>
  <body>
    <article>
      <h1>Global Notes</h1>
      <h2 id="first-note">First Note</h2>
      <p>Body of first note.</p>
      <p>\u2014 7/26/26</p>
      <h2 id="second-note">Second Note</h2>
      <p>Body of second note.</p>
      <p>\u2014 7/25/26</p>
      <h2 id="undated">Undated Note</h2>
      <p>This one has no date line.</p>
    </article>
  </body>
</html>`;

	it("creates one item per dated h2 section", () => {
		const items = parseGlobalNotesItems({ html: globalHtml });
		expect(items).toHaveLength(2);
		expect(items.map((item) => item.title)).toEqual([
			"First Note — Global Notes",
			"Second Note — Global Notes",
		]);
	});

	it("uses the heading id as the link anchor", () => {
		const items = parseGlobalNotesItems({ html: globalHtml });
		expect(items[0].link).toBe(`${SITE_URL}/global-notes#first-note`);
		expect(items[1].link).toBe(`${SITE_URL}/global-notes#second-note`);
	});

	it("skips h2 sections with no date", () => {
		const items = parseGlobalNotesItems({ html: globalHtml });
		expect(
			items.find((item) => item.link.endsWith("#undated")),
		).toBeUndefined();
	});

	it("strips the trailing date line from the content body", () => {
		const items = parseGlobalNotesItems({ html: globalHtml });
		expect(items[0].contentHtml).not.toContain("7/26/26");
		expect(items[0].contentHtml).toContain("Body of first note.");
	});
});

describe("buildRss", () => {
	const sampleItem = (overrides = {}) => ({
		title: "Item",
		link: `${SITE_URL}/item`,
		description: "Item description.",
		pubDate: new Date(2025, 0, 1).toUTCString(),
		timestamp: new Date(2025, 0, 1).getTime(),
		contentHtml: "<p>Body.</p>",
		...overrides,
	});

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
		const newerPos = xml.indexOf(`${SITE_URL}/newer`);
		const olderPos = xml.indexOf(`${SITE_URL}/older`);
		expect(newerPos).toBeGreaterThan(-1);
		expect(olderPos).toBeGreaterThan(-1);
		expect(newerPos).toBeLessThan(olderPos);
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
			sampleItem({
				timestamp: new Date(2024, 0, 1).getTime(),
				pubDate: new Date(2024, 0, 1).toUTCString(),
			}),
			sampleItem({
				timestamp: new Date(2026, 5, 15).getTime(),
				pubDate: new Date(2026, 5, 15).toUTCString(),
			}),
		]);
		expect(xml).toContain(
			`<lastBuildDate>${new Date(2026, 5, 15).toUTCString()}</lastBuildDate>`,
		);
	});

	it("omits the item description element when empty", () => {
		const xml = buildRss([sampleItem({ description: "" })]);
		const itemMatch = xml.match(/<item>[\s\S]*<\/item>/);
		expect(itemMatch).not.toBeNull();
		expect(itemMatch?.[0]).not.toContain("<description>");
		// The channel description must still be present.
		expect(xml).toContain("<description>");
	});
});

describe("collectItems (integration with on-disk articles)", () => {
	it("returns at least one item for each real dated article", async () => {
		const items = await collectItems();
		expect(items.length).toBeGreaterThan(0);
		const links = items.map((item) => item.link);
		expect(links).toContain(`${SITE_URL}/monads`);
		expect(links).toContain(`${SITE_URL}/root`);
		// Every item should have a parseable link, title, and pubDate.
		for (const item of items) {
			expect(item.link.startsWith(SITE_URL)).toBe(true);
			expect(item.title.length).toBeGreaterThan(0);
			expect(Number.isNaN(new Date(item.pubDate).getTime())).toBe(false);
		}
	});

	it("emits one item per dated global-note heading", async () => {
		const items = await collectItems();
		const noteLinks = items.filter((item) =>
			item.link.startsWith(`${SITE_URL}/global-notes#`),
		);
		expect(noteLinks.length).toBeGreaterThan(5);
	});

	it("returns at least one global-notes item with a future link anchor", async () => {
		const items = await collectItems();
		const noteItems = items.filter((item) =>
			item.link.startsWith(`${SITE_URL}/global-notes#`),
		);
		expect(noteItems.length).toBeGreaterThan(0);
		for (const item of noteItems) {
			expect(item.link).toMatch(/#.+$/);
		}
	});
});
