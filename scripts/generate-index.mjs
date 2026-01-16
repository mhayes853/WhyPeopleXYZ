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

const extractArticleDateFromHtml = (html) => {
  const dom = new JSDOM(html);
  const article = dom.window.document.querySelector("article");
  if (!article) {
    return null;
  }
  return findArticleDateText(article);
};

const buildArticlePath = (href) => {
  const url = new URL(href, "https://example.com");
  let pathName = url.pathname;
  if (!pathName.endsWith(".html")) {
    pathName = pathName.replace(/\/$/, "");
    pathName = `${pathName}.html`;
  }
  return pathName.replace(/^\/+/, "");
};

const parseGlobalNotes = (html) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const article = doc.querySelector("article");
  if (!article) {
    return [];
  }

  const headings = Array.from(article.querySelectorAll("h2"));
  return headings
    .map((heading) => {
      const container = doc.createElement("div");
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

const updateCards = async (doc) => {
  const cards = Array.from(doc.querySelectorAll("a.card"));
  await Promise.all(
    cards.map(async (card) => {
      const title = card.querySelector("h3");
      if (!title) {
        return;
      }

      title.classList.add("card-title");

      let header = card.querySelector(".card-header");
      if (!header) {
        header = doc.createElement("div");
        header.className = "card-header";
        card.prepend(header);
      }

      if (title.parentElement !== header) {
        header.appendChild(title);
      }

      const subtitle = card.querySelector("p");
      if (subtitle) {
        subtitle.classList.add("card-subtitle");
      }

      const href = card.getAttribute("href");
      let date = header.querySelector(".card-date");
      if (!href || href.includes("global-notes")) {
        date?.remove();
        return;
      }

      const articlePath = buildArticlePath(href);
      const absolutePath = path.join(SRC_DIR, articlePath);
      let html = null;
      try {
        html = await readFile(absolutePath, "utf8");
      } catch {
        html = null;
      }

      if (!html) {
        date?.remove();
        return;
      }

      const dateText = extractArticleDateFromHtml(html);
      const labelDate = cleanDateLabel(dateText);
      if (labelDate) {
        if (!date) {
          date = doc.createElement("span");
          date.className = "card-date";
          header.appendChild(date);
        }
        date.textContent = labelDate;
      } else {
        date?.remove();
      }
    }),
  );
};

const updateGlobalNotes = async (doc) => {
  const list = doc.querySelector(".global-notes-list");
  if (!list) {
    return;
  }

  let html = null;
  try {
    html = await readFile(GLOBAL_NOTES_PATH, "utf8");
  } catch {
    html = null;
  }

  if (!html) {
    return;
  }

  const notes = parseGlobalNotes(html).slice(0, GLOBAL_NOTES_COUNT);
  if (notes.length === 0) {
    return;
  }

  list.innerHTML = "";
  notes.forEach((note) => {
    const link = doc.createElement("a");
    link.className = "global-note-link";
    link.href = `/global-notes#${note.id}`;

    const title = doc.createElement("span");
    title.className = "global-note-title";
    title.textContent = note.title;

    const date = doc.createElement("span");
    date.className = "global-note-date";
    const labelDate = cleanDateLabel(note.dateText);
    date.textContent = labelDate || note.dateText || "";

    link.appendChild(title);
    link.appendChild(date);
    list.appendChild(link);
  });
};

const main = async () => {
  const html = await readFile(INDEX_PATH, "utf8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  await updateCards(doc);
  await updateGlobalNotes(doc);

  await writeFile(INDEX_PATH, dom.serialize(), "utf8");
};

main();
