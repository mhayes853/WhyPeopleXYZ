const isDateText = (text: string) =>
  text.startsWith("—") || text.startsWith("--") || text.startsWith("–");

export const parseDateText = (dateText: string) => {
  const cleaned = dateText.replace(/^[-—–]\s*/, "").trim();
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
