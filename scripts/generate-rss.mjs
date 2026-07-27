import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const DIST_DIR = path.join(ROOT, "dist");
const OUTPUT_PATH = path.join(DIST_DIR, "rss.xml");
const SITE_URL = "https://whypeople.xyz";

const CHANNEL = {
	title: "Matthew Hayes",
	description:
		"Writings about software, systems, and mediums by Matthew Hayes.",
	language: "en-us",
};

// ---------------------------------------------------------------------------
// Date parsing helpers (kept in sync with src/shared-assets/article-date.ts
// and the other scripts in this directory).
// ---------------------------------------------------------------------------

const isDateText = (text) =>
	text.startsWith("\u2014") ||
	text.startsWith("--") ||
	text.startsWith("\u2013");

const stripDatePrefix = (dateText) =>
	dateText.replace(/^[-\u2014\u2013]{1,2}\s*/, "").trim();

export const parseDateText = (dateText) => {
	const cleaned = stripDatePrefix(dateText);
	const match = cleaned.match(
		/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?$/i,
	);
	if (!match) {
		return null;
	}

	const month = Number.parseInt(match[1], 10) - 1;
	const day = Number.parseInt(match[2], 10);
	let year = Number.parseInt(match[3], 10);
	if (year < 100) {
		year += 2000;
	}
	let hour = match[4] ? Number.parseInt(match[4], 10) : 0;
	const minute = match[5] ? Number.parseInt(match[5], 10) : 0;
	const meridiem = match[6]?.toLowerCase();
	if (meridiem === "pm" && hour < 12) {
		hour += 12;
	}
	if (meridiem === "am" && hour === 12) {
		hour = 0;
	}

	const date = new Date(year, month, day, hour, minute);
	if (Number.isNaN(date.getTime())) {
		return null;
	}
	return date.getTime();
};

const findArticleDateText = (container) => {
	const children = Array.from(container.children);
	for (let i = children.length - 1; i >= 0; i -= 1) {
		const element = children[i];
		if (element.tagName === "BR") {
			continue;
		}
		if (element.tagName === "P") {
			const text = element.textContent?.trim();
			if (text && isDateText(text)) {
				return text;
			}
		}
	}
	return null;
};

const findFirstDateTextInChildren = (container) => {
	const children = Array.from(container.children);
	for (const element of children) {
		if (element.tagName === "P") {
			const text = element.textContent?.trim();
			if (text && isDateText(text)) {
				return text;
			}
		}
	}
	return null;
};

// ---------------------------------------------------------------------------
// XML escaping / formatting helpers.
// ---------------------------------------------------------------------------

const escapeXml = (value) =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

const escapeAttribute = (value) => escapeXml(value);

const toRfc822 = (timestamp) => new Date(timestamp).toUTCString();

const collapseWhitespace = (value) =>
	String(value ?? "")
		.replace(/\s+/g, " ")
		.trim();

const trimTrailingFootnotes = (clone) => {
	const children = Array.from(clone.children);
	for (let i = children.length - 1; i >= 0; i -= 1) {
		const element = children[i];
		if (element.tagName === "BR") {
			continue;
		}
		if (
			element.tagName === "P" &&
			isDateText(element.textContent?.trim() ?? "")
		) {
			element.remove();
			continue;
		}
		break;
	}
};

// ---------------------------------------------------------------------------
// HTML parsing helpers.
// ---------------------------------------------------------------------------

const metaContent = (doc, attr, key) => {
	const value = doc
		.querySelector(`meta[${attr}="${key}"]`)
		?.getAttribute("content");
	return value ? collapseWhitespace(value) : null;
};

const absoluteUrl = (path) => {
	if (!path) {
		return null;
	}
	if (/^https?:\/\//i.test(path)) {
		return path;
	}
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return `${SITE_URL}${normalized}`;
};

const slugifyForNote = (heading) => {
	const text = collapseWhitespace(heading.textContent ?? "");
	return text;
};

// ---------------------------------------------------------------------------
// Article parsing.
// ---------------------------------------------------------------------------

export const parseArticleItem = ({ html, filePath }) => {
	const dom = new JSDOM(html);
	const doc = dom.window.document;
	const article = doc.querySelector("article");
	if (!article) {
		return null;
	}

	const dateText = findArticleDateText(article);
	if (!dateText) {
		return null;
	}
	const timestamp = parseDateText(dateText);
	if (timestamp === null) {
		return null;
	}

	const pathName = filePath.replace(/\.html$/, "").replace(/^\.\//, "");
	const urlPath = `/${pathName}`;

	const title =
		metaContent(doc, "property", "og:title") ??
		collapseWhitespace(doc.querySelector("title")?.textContent ?? "");
	const description =
		metaContent(doc, "property", "og:description") ??
		metaContent(doc, "name", "twitter:description") ??
		"";
	const ogUrl = metaContent(doc, "property", "og:url");
	const linkPath = ogUrl ? ogUrl.split("#")[0] : urlPath;

	const clone = article.cloneNode(true);
	trimTrailingFootnotes(clone);

	return {
		title: collapseWhitespace(title),
		link: absoluteUrl(linkPath),
		description: collapseWhitespace(description),
		pubDate: toRfc822(timestamp),
		timestamp,
		contentHtml: clone.innerHTML.trim(),
	};
};

export const parseGlobalNotesItems = ({ html }) => {
	const dom = new JSDOM(html);
	const doc = dom.window.document;
	const article = doc.querySelector("article");
	if (!article) {
		return [];
	}

	const globalTitle =
		metaContent(doc, "property", "og:title") ??
		collapseWhitespace(doc.querySelector("title")?.textContent ?? "") ??
		"Global Notes";
	const globalDescription =
		metaContent(doc, "property", "og:description") ?? "";
	const globalLink = absoluteUrl("/global-notes");

	const headings = Array.from(article.querySelectorAll("h2[id]"));
	const items = [];
	for (const heading of headings) {
		const container = doc.createElement("div");
		let sibling = heading.nextElementSibling;
		while (sibling && sibling.tagName !== "H2") {
			container.appendChild(sibling.cloneNode(true));
			sibling = sibling.nextElementSibling;
		}
		const dateText = findFirstDateTextInChildren(container);
		if (!dateText) {
			continue;
		}
		const timestamp = parseDateText(dateText);
		if (timestamp === null) {
			continue;
		}

		const clone = container.cloneNode(true);
		trimTrailingFootnotes(clone);

		items.push({
			title: `${collapseWhitespace(heading.textContent ?? "")} — ${globalTitle}`,
			link: `${globalLink}#${heading.id}`,
			description: globalDescription,
			pubDate: toRfc822(timestamp),
			timestamp,
			contentHtml: clone.innerHTML.trim(),
		});
	}
	return items;
};

// ---------------------------------------------------------------------------
// RSS XML generation.
// ---------------------------------------------------------------------------

const buildItem = (item) => {
	const guid = escapeAttribute(item.link);
	const link = escapeAttribute(item.link);
	const title = escapeXml(item.title);
	const description = escapeXml(item.description);
	const pubDate = escapeXml(item.pubDate);
	const content = item.contentHtml ?? "";

	return [
		"    <item>",
		`      <title>${title}</title>`,
		`      <link>${link}</link>`,
		`      <guid isPermaLink="true">${guid}</guid>`,
		`      <pubDate>${pubDate}</pubDate>`,
		description ? `      <description>${description}</description>` : null,
		`      <content:encoded><![CDATA[${content}]]></content:encoded>`,
		"    </item>",
	]
		.filter(Boolean)
		.join("\n");
};

export const buildRss = (items) => {
	const sorted = [...items].sort((a, b) => b.timestamp - a.timestamp);
	const lastBuild =
		sorted.length > 0 ? sorted[0].pubDate : toRfc822(Date.now());
	const selfLink = `${SITE_URL}/rss.xml`;

	const channel = [
		`    <title>${escapeXml(CHANNEL.title)}</title>`,
		`    <link>${escapeAttribute(`${SITE_URL}/`)}</link>`,
		`    <description>${escapeXml(CHANNEL.description)}</description>`,
		`    <language>${escapeXml(CHANNEL.language)}</language>`,
		`    <atom:link href="${escapeAttribute(selfLink)}" rel="self" type="application/rss+xml" />`,
		`    <lastBuildDate>${escapeXml(lastBuild)}</lastBuildDate>`,
	].join("\n");

	const body = sorted.map(buildItem).join("\n");
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
		"  <channel>",
		channel,
		body ? `\n${body}\n` : "",
		"  </channel>",
		"</rss>",
	]
		.filter(Boolean)
		.join("\n");
};

// ---------------------------------------------------------------------------
// File discovery.
// ---------------------------------------------------------------------------

const isArticleFile = (fileName) =>
	fileName.endsWith(".html") && !fileName.startsWith("index.");

const discoverArticlePaths = async () => {
	const { readdir } = await import("node:fs/promises");
	const entries = await readdir(SRC_DIR, { withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile() && isArticleFile(entry.name))
		.map((entry) => entry.name)
		.sort();
};

// ---------------------------------------------------------------------------
// Main entry point.
// ---------------------------------------------------------------------------

export const collectItems = async () => {
	const fileNames = await discoverArticlePaths();
	const items = [];
	for (const fileName of fileNames) {
		const filePath = path.join(SRC_DIR, fileName);
		const html = await readFile(filePath, "utf8");

		if (fileName === "global-notes.html") {
			items.push(...parseGlobalNotesItems({ html }));
			continue;
		}

		const item = parseArticleItem({
			html,
			filePath: `./${fileName.replace(/\.html$/, "")}`,
		});
		if (item) {
			items.push(item);
		}
	}
	return items;
};

export const generateRssXml = async () => buildRss(await collectItems());

const main = async () => {
	const xml = await generateRssXml();
	await writeFile(OUTPUT_PATH, xml, "utf8");
};

const isDirectRun =
	process.argv[1] !== undefined &&
	import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
	await main();
}
