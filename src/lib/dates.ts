const DATE_PREFIX = /^[-—–]{1,2}\s*/;

const DATE_PATTERN =
  /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\s+\(?(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\)?)?$/i;

/** Whether a line of text looks like a date line (e.g. "— 1/2/26"). */
export const isDateText = (text: string) =>
  text.startsWith("—") || text.startsWith("--") || text.startsWith("–");

/** Removes the leading dash from a date line, e.g. "— 1/2/26" -> "1/2/26". */
export const stripDatePrefix = (dateText: string) =>
  dateText.replace(DATE_PREFIX, "").trim();

/**
 * Parses a date as written on the site into a timestamp.
 *
 * Accepts an optional dash prefix, 2 or 4 digit years, and an optional time
 * that may be wrapped in parentheses, e.g. "— 2/26/26 (4:26 AM)".
 */
export const parseDateText = (dateText: string): number | null => {
  const match = stripDatePrefix(dateText).match(DATE_PATTERN);
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

/** Whether a date string includes an explicit time of day. */
export const hasTimeOfDay = (dateText: string) => {
  const match = stripDatePrefix(dateText).match(DATE_PATTERN);
  return Boolean(match?.[4]);
};

const decodeBasicEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&amp;/g, "&");

/**
 * Finds the last date line (a paragraph such as `<p>— 1/2/26</p>`) in a chunk
 * of rendered HTML. Returns the raw text of the line, including its dash.
 */
export const findDateLineInHtml = (html: string): string | null => {
  let result: string | null = null;
  for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const text = decodeBasicEntities(
      match[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
    );
    if (isDateText(text) && parseDateText(text) !== null) {
      result = text;
    }
  }
  return result;
};
