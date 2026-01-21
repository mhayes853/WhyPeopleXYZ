import "./code.css";
import "./article.css";
import initCodeBlocks from "./code";
import { estimateReadingTime } from "./article-read-time";

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
