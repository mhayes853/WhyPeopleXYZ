import "../shared-assets/article";
import {
  extractArticleDateFromHtml,
  findArticleDateText,
  parseDateText,
} from "../shared-assets/article-date";
import "./index.css";

const GLOBAL_NOTES_COUNT = 3;

const buildArticlePath = (href: string) => {
  const url = new URL(href, window.location.origin);
  let path = url.pathname;
  if (!path.endsWith(".html")) {
    path = path.replace(/\/$/, "");
    path = `${path}.html`;
  }
  return path;
};

const enhanceCards = () => {
  const cards = Array.from(document.querySelectorAll<HTMLAnchorElement>(".card"));
  cards.forEach((card) => {
    if (card.querySelector(".card-header")) {
      return;
    }

    const title = card.querySelector<HTMLHeadingElement>("h3");
    if (!title) {
      return;
    }

    title.classList.add("card-title");

    const header = document.createElement("div");
    header.className = "card-header";

    const date = document.createElement("span");
    date.className = "card-date";

    header.appendChild(title);
    header.appendChild(date);
    card.prepend(header);

    const subtitle = card.querySelector<HTMLParagraphElement>("p");
    if (subtitle) {
      subtitle.classList.add("card-subtitle");
    }

    const href = card.getAttribute("href");
    if (!href || href.includes("global-notes")) {
      date.remove();
      return;
    }

    const path = buildArticlePath(href);
    fetch(path, { cache: "force-cache" })
      .then((response) => (response.ok ? response.text() : null))
      .then((html) => {
        if (!html) {
          date.remove();
          return;
        }
        const dateText = extractArticleDateFromHtml(html);
        if (dateText) {
          date.textContent = dateText;
        } else {
          date.remove();
        }
      })
      .catch(() => {
        date.remove();
      });
  });
};

const parseGlobalNotes = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const article = doc.querySelector("article");
  if (!article) {
    return [];
  }

  const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2"));
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

const enhanceGlobalNotes = () => {
  const list = document.querySelector<HTMLDivElement>(".global-notes-list");
  if (!list) {
    return;
  }

  fetch("/global-notes.html", { cache: "force-cache" })
    .then((response) => (response.ok ? response.text() : null))
    .then((html) => {
      if (!html) {
        return;
      }
      const notes = parseGlobalNotes(html).slice(0, GLOBAL_NOTES_COUNT);
      if (notes.length === 0) {
        return;
      }
      const fragment = document.createDocumentFragment();
      notes.forEach((note) => {
        const link = document.createElement("a");
        link.className = "global-note-link";
        link.href = `/global-notes#${note.id}`;

        const title = document.createElement("span");
        title.className = "global-note-title";
        title.textContent = note.title;

        const date = document.createElement("span");
        date.className = "global-note-date";
        date.textContent = note.dateText ?? "";

        link.appendChild(title);
        link.appendChild(date);
        fragment.appendChild(link);
      });
      list.innerHTML = "";
      list.appendChild(fragment);
    })
    .catch(() => {});
};

const initIndex = () => {
  enhanceCards();
  enhanceGlobalNotes();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initIndex);
} else {
  initIndex();
}
