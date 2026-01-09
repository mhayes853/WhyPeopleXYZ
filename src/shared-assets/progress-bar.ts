const GLOBAL_NOTES_PATHS = ["/global-notes.html", "/global-notes/"];

const isGlobalNotesPage = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const pathname = window.location.pathname;
  return GLOBAL_NOTES_PATHS.some((path) => pathname.includes(path));
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const createProgressBar = () => {
  const bar = document.createElement("div");
  bar.className = "progress-bar";

  const fill = document.createElement("div");
  fill.className = "progress-bar-fill";

  bar.appendChild(fill);
  document.body.prepend(bar);

  return fill;
};

const getScrollProgress = () => {
  const { scrollHeight, clientHeight } = document.documentElement;
  const maxScroll = scrollHeight - clientHeight;

  if (maxScroll <= 0) {
    return 0;
  }

  return window.scrollY / maxScroll;
};

const updateFill = (fill: HTMLDivElement) => {
  const progress = clamp01(getScrollProgress());
  fill.style.transform = `scaleX(${progress})`;
};

const initProgressBar = () => {
  if (isGlobalNotesPage()) {
    return null;
  }

  if (document.querySelector(".progress-bar")) {
    return null;
  }

  const fill = createProgressBar();
  updateFill(fill);

  const controller = new AbortController();
  const options = { passive: true, signal: controller.signal };
  const handler = () => updateFill(fill);

  window.addEventListener("scroll", handler, options);
  window.addEventListener("resize", handler, options);

  return controller;
};

export default initProgressBar;
