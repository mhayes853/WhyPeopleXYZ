const WORDS_PER_MINUTE = 200;

const countWords = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

/**
 * Estimates the number of minutes it will take to read the provided text.
 * Returns 0 when the text has no readable words, otherwise rounds up to at least 1.
 */
export const estimateReadingTime = (text: string): number => {
  if (!text) {
    return 0;
  }

  const words = countWords(text);
  if (words === 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};
