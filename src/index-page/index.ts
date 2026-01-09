import "../shared-assets/article";
import { extractArticleDateFromHtml } from "../shared-assets/article-date";
import "./index.css";

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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enhanceCards);
} else {
  enhanceCards();
}
