const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
};

/** Decodes the HTML entities that commonly show up in rendered content. */
export const decodeEntities = (text: string) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });

/** Removes comments, scripts, styles and tags, leaving readable text. */
export const htmlToText = (html: string) =>
  decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
      // Block-level boundaries separate words; inline tags (such as the
      // spans added by syntax highlighting) don't.
      .replace(/<\/?(p|div|li|ul|ol|h[1-6]|pre|br|blockquote|section|article|tr|td|th|img)\b[^>]*>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();

/** Shortens text to at most `length` characters, breaking on a word. */
export const excerpt = (text: string, length = 200) => {
  if (text.length <= length) {
    return text;
  }
  const cut = text.slice(0, length);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, "")}…`;
};
