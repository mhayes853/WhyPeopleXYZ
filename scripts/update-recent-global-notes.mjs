import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const INDEX_PATH = path.join(SRC_DIR, "index.html");
const GLOBAL_NOTES_PATH = path.join(SRC_DIR, "global-notes.html");
const GLOBAL_NOTES_COUNT = 3;

const isDateText = (text) =>
  text.startsWith("\u2014") || text.startsWith("--") || text.startsWith("\u2013");

const stripDatePrefix = (dateText) =>
  dateText.replace(/^[-\u2014\u2013]{1,2}\s*/, "").trim();

const parseDateText = (dateText) => {
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

const cleanDateLabel = (dateText) => {
  if (!dateText) {
    return null;
  }
  const cleaned = stripDatePrefix(dateText);
  return cleaned || null;
};

const parseGlobalNotes = (html) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const article = document.querySelector("article");
  if (!article) {
    return [];
  }

  const headings = Array.from(article.querySelectorAll("h2"));
  return headings
    .map((heading) => {
      const container = document.createElement("div");
      let sibling = heading.nextElementSibling;
      while (sibling && sibling.tagName !== "H2") {
        container.appendChild(sibling.cloneNode(true));
        sibling = sibling.nextElementSibling;
      }
      const dateText = findArticleDateText(container);
      const timestamp = dateText ? parseDateText(dateText) : null;
      return {
        id: heading.id,
        title: heading.textContent?.trim() ?? "Untitled",
        dateText,
        timestamp,
      };
    })
    .filter((note) => note.id && note.dateText && note.timestamp !== null)
    .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
};

const buildListMarkup = (notes) =>
  notes
    .map((note) => {
      const labelDate = cleanDateLabel(note.dateText) ?? note.dateText ?? "";
      return [
        `                <a class="global-note-link" href="/global-notes#${note.id}">`,
        `                  <span class="global-note-title">${note.title}</span>`,
        `                  <span class="global-note-date">${labelDate}</span>`,
        "                </a>",
      ].join("\n");
    })
    .join("\n");

const updateRecentGlobalNotes = async () => {
  const html = await readFile(GLOBAL_NOTES_PATH, "utf8");
  const notes = parseGlobalNotes(html).slice(0, GLOBAL_NOTES_COUNT);
  if (notes.length === 0) {
    return;
  }

  const listRegex = /(<div[^>]*class="global-notes-list"[^>]*>)([\s\S]*?)(\s*<\/div>)/;
  const indexHtml = await readFile(INDEX_PATH, "utf8");
  const match = indexHtml.match(listRegex);
  if (!match || match.index === undefined) {
    throw new Error("Failed to locate the recent global notes block.");
  }

  const noteMarkup = buildListMarkup(notes);
  const closingSection = match[3];
  const needsLeadingNewline = !closingSection.startsWith("\n");
  const replacement = `${match[1]}\n${noteMarkup}${
    needsLeadingNewline ? "\n" : ""
  }${closingSection}`;

  const updatedHtml =
    indexHtml.slice(0, match.index) +
    replacement +
    indexHtml.slice(match.index + match[0].length);

  await writeFile(INDEX_PATH, updatedHtml, "utf8");
};

await updateRecentGlobalNotes();
