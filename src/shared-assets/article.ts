import "./code.css";
import "./article.css";
import initCodeBlocks from "./code";
import { estimateReadingTime } from "./article-read-time";

const initFootnotes = () => {
  const article = document.querySelector("article");
  if (!article) return;

  const refRegex = /\[\^(\d+)\]/g;
  const footnoteDefStartRegex = /^\s*\[\^(\d+)\]:/;

  const processTextNodes = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      refRegex.lastIndex = 0;
      if (refRegex.test(text)) {
        const wrapper = document.createElement("span");
        refRegex.lastIndex = 0;
        wrapper.innerHTML = text.replace(refRegex, (_, num) => {
          const id = `footnote-ref-${num}`;
          return `<a href="#footnote-def-${num}" id="${id}" class="footnote-ref">[^${num}]</a>`;
        });
        node.parentNode?.replaceChild(wrapper, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      if (
        el.tagName === "A" ||
        el.tagName === "CODE" ||
        el.tagName === "PRE" ||
        (el.tagName === "P" && footnoteDefStartRegex.test(el.textContent || ""))
      ) {
        return;
      }

      Array.from(el.childNodes).forEach(processTextNodes);
    }
  };

  processTextNodes(article);

  const defParagraphs = Array.from(article.querySelectorAll("p"));
  defParagraphs.forEach((p) => {
    const text = p.textContent || "";
    const match = text.match(footnoteDefStartRegex);
    if (!match) return;

    const num = match[1];
    const content = p.innerHTML.replace(/^\s*\[\^\d+\]:\s*/, "");
    p.innerHTML = `<span class="footnote-def" id="footnote-def-${num}"><a href="#footnote-ref-${num}" class="footnote-num">${num}.</a> ${content}</span>`;
  });
};

const initHeroModal = () => {
  const modal = document.getElementById("hero-modal") as HTMLDialogElement | null;
  const trigger = document.querySelector<HTMLImageElement>(
    ".human-image-wrapper img"
  );
  const closeButton = modal?.querySelector<HTMLButtonElement>(".hero-modal-close");

  if (!modal || !trigger) {
    return;
  }

  const setOpen = (open: boolean) => {
    if (open && !modal.open) {
      modal.showModal();
    } else if (!open && modal.open) {
      modal.close();
    }
    modal.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const closeHandler = () => setOpen(false);
  const keyHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  trigger.addEventListener("click", () => setOpen(true));
  trigger.addEventListener("keydown", keyHandler);
  closeButton?.addEventListener("click", closeHandler);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHandler();
    }
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeHandler();
    }
  });
};

const updateArticleReadingTime = () => {
  const readingElement =
    document.querySelector<HTMLParagraphElement>(".article-reading-time");
  if (!readingElement) {
    return;
  }

  const article =
    readingElement.closest("article") ?? document.querySelector("article");
  if (!article) {
    return;
  }

  const rawText = article.textContent ?? "";
  const minutes = estimateReadingTime(rawText);
  const fallback = `${minutes} Minutes to Read`;
  const content = readingElement.textContent ?? fallback;
  const replaced = content.replace("--", minutes.toString());

  readingElement.textContent = replaced === content ? fallback : replaced;
};

initCodeBlocks();
updateArticleReadingTime();
initHeroModal();
initFootnotes();
