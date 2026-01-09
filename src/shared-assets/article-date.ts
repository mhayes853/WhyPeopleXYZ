const isDateText = (text: string) =>
  text.startsWith("—") || text.startsWith("--") || text.startsWith("–");

export const findArticleDateText = (container: Element) => {
  const children = Array.from(container.children);
  let lastDate: string | null = null;
  for (let i = children.length - 1; i >= 0; i -= 1) {
    const element = children[i];
    if (element.tagName === "BR") {
      continue;
    }
    if (element.tagName === "P") {
      const text = element.textContent?.trim();
      if (text && isDateText(text)) {
        lastDate = text;
      }
    }
  }
  return lastDate;
};

export const extractArticleDateFromHtml = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const article = doc.querySelector("article");
  if (!article) {
    return null;
  }
  return findArticleDateText(article);
};
