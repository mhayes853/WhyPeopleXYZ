import "./code.css";
import "./article.css";
import initCodeBlocks from "./code";
import { estimateReadingTime } from "./article-read-time";

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
