import "../shared-assets/article";
import { findArticleDateText } from "../shared-assets/article-date";
import chevronRaw from "../shared-assets/chevron.svg?raw";

const STYLE_ID = "global-notes-collapsible-style";

const injectStyles = () => {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .note-section {
      margin: 0;
    }

    .note-heading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
    }

    .note-title {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .note-date {
      margin-left: auto;
      font-size: 0.85em;
      opacity: 1;
      color: rgba(0, 0, 0, 0.65);
      transition: opacity 220ms ease;
      white-space: nowrap;
    }

    .note-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.08);
      color: inherit;
      cursor: pointer;
      padding: 0;
    }

    .note-toggle:focus-visible {
      outline: 2px solid rgba(0, 0, 0, 0.45);
      outline-offset: 2px;
    }

    .note-toggle svg {
      width: 18px;
      height: 18px;
      display: block;
      transition: transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: center;
    }

    .note-toggle[aria-expanded="false"] svg {
      transform: rotate(-90deg);
    }

    .note-toggle[aria-expanded="true"] svg {
      transform: rotate(0deg);
    }

    .note-body {
      margin: 0;
    }

    .note-collapsed .note-body {
      display: none;
    }

    .note-collapsed .note-date {
      opacity: 0.6;
    }

    @media (max-width: 720px) {
      .note-section {
        margin-bottom: 1.25rem;
      }

      .note-toggle {
        min-width: 40px;
        min-height: 40px;
      }

      .note-heading {
        font-size: 0.95em;
      }

      .note-section.note-collapsed .note-date {
        font-size: 0.75em;
        opacity: 0.55;
      }
    }
  `;
  document.head.appendChild(style);
};

const parseSvg = (markup: string) => {
  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  const svg = template.content.querySelector("svg");
  if (!svg) {
    return null;
  }
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  return svg;
};

const getTargetHeadingId = () => {
  const hash = window.location.hash.trim();
  if (!hash) {
    return null;
  }
  return decodeURIComponent(hash.replace(/^#/, ""));
};

const buildSections = (article: HTMLElement) => {
  const headings = Array.from(
    article.querySelectorAll<HTMLHeadingElement>("h2"),
  );
  return headings.map((heading) => {
    const section = document.createElement("section");
    section.className = "note-section";

    heading.parentElement?.insertBefore(section, heading);
    section.appendChild(heading);
    heading.classList.add("note-heading");

    const body = document.createElement("div");
    body.className = "note-body";

    let sibling = section.nextSibling;
    while (
      sibling &&
      !(sibling instanceof HTMLHeadingElement && sibling.tagName === "H2")
    ) {
      const nextSibling = sibling.nextSibling;
      body.appendChild(sibling);
      sibling = nextSibling;
    }

    section.appendChild(body);
    const dateText = findArticleDateText(body);
    return { section, heading, body, dateText };
  });
};

const addToggleButton = (
  heading: HTMLHeadingElement,
  dateText: string | null,
) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "note-toggle";
  button.setAttribute("aria-label", "Toggle note");

  const svg = parseSvg(chevronRaw);
  if (svg) {
    button.appendChild(svg);
  }

  const label = document.createElement("span");
  label.className = "note-title";
  while (heading.firstChild) {
    label.appendChild(heading.firstChild);
  }

  const date = document.createElement("span");
  date.className = "note-date";
  if (dateText) {
    date.textContent = dateText;
  }

  heading.appendChild(button);
  heading.appendChild(label);
  heading.appendChild(date);

  return button;
};

const setCollapsed = (
  section: HTMLElement,
  button: HTMLButtonElement,
  collapsed: boolean,
) => {
  section.classList.toggle("note-collapsed", collapsed);
  button.setAttribute("aria-expanded", collapsed ? "false" : "true");
};

const initGlobalNotes = () => {
  const article = document.querySelector("article");
  if (!article) {
    return;
  }

  injectStyles();
  const sections = buildSections(article);
  if (sections.length === 0) {
    return;
  }

  const targetId = getTargetHeadingId();
  let target = targetId
    ? sections.find(({ heading }) => heading.id === targetId)
    : sections[0];

  if (!target) {
    target = sections[0];
  }

  sections.forEach(({ section, heading, dateText }) => {
    const button = addToggleButton(heading, dateText);
    const collapsed = !target || heading !== target.heading;
    setCollapsed(section, button, collapsed);

    button.addEventListener("click", () => {
      const isCollapsed = section.classList.contains("note-collapsed");
      setCollapsed(section, button, !isCollapsed);
    });
  });
};

initGlobalNotes();
