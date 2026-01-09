import hljs from "highlight.js";
import copyIconRaw from "./copy.svg?raw";
import checkIconRaw from "./checkmark.svg?raw";

const COPY_RESET_DELAY_MS = 1400;
const DESKTOP_ICON_SIZE_PX = 22;
const MOBILE_ICON_SIZE_PX = 26;

const getIconSize = (): number =>
  window.matchMedia("(max-width: 720px)").matches ? MOBILE_ICON_SIZE_PX : DESKTOP_ICON_SIZE_PX;

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text) {
    return false;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
};

const renderIcon = (container: HTMLElement, svgMarkup: string): void => {
  const template = document.createElement("template");
  template.innerHTML = svgMarkup.trim();
  const svg = template.content.querySelector("svg");
  if (!svg) {
    return;
  }

  const size = `${getIconSize()}px`;
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.style.minWidth = size;
  svg.style.minHeight = size;

  container.innerHTML = "";
  container.appendChild(svg);
};

const attachCopyButton = (codeBlock: HTMLElement): void => {
  const pre = codeBlock.parentElement;
  if (!pre) {
    return;
  }

  if (pre.querySelector(".code-copy-button")) {
    return;
  }

  pre.classList.remove("code-block");
  pre.style.position = "relative";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy-button";
  button.setAttribute("aria-label", "Copy code");

  const icon = document.createElement("span");
  icon.className = "code-copy-icon";
  icon.setAttribute("aria-hidden", "true");
  renderIcon(icon, copyIconRaw);
  button.appendChild(icon);

  button.addEventListener("click", async () => {
    const copied = await copyToClipboard(codeBlock.textContent ?? "");
    if (!copied) {
      return;
    }

    renderIcon(icon, checkIconRaw);
    button.classList.add("is-copied");

    window.setTimeout(() => {
      renderIcon(icon, copyIconRaw);
      button.classList.remove("is-copied");
    }, COPY_RESET_DELAY_MS);
  });

  pre.appendChild(button);
};

const initCodeBlocks = (): void => {
  hljs.highlightAll();

  const codeBlocks = document.querySelectorAll<HTMLElement>("pre > code");
  codeBlocks.forEach(attachCopyButton);
};

export default initCodeBlocks;
