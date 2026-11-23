import { describe, expect, it } from "vitest";
import { findDateLineInHtml, hasTimeOfDay, parseDateText } from "./dates";

describe("findDateLineInHtml", () => {
  it("finds the last date line even if text follows it", () => {
    const html = `
      <article>
        <h1>Title</h1>
        <p>Intro</p>
        <p>— 1/2/26</p>
        <p>Postscript</p>
      </article>
    `;
    expect(findDateLineInHtml(html)).toBe("— 1/2/26");
  });

  it("finds the last date line at the end of the article", () => {
    const html = `<article><p>Body</p><p>-- 9/26/25</p></article>`;
    expect(findDateLineInHtml(html)).toBe("-- 9/26/25");
  });

  it("returns null when no date line exists", () => {
    const html = `<article><p>Body</p><p>-- Footer</p></article>`;
    expect(findDateLineInHtml(html)).toBeNull();
  });
});

describe("parseDateText", () => {
  it("parses dates with an em dash prefix", () => {
    expect(parseDateText("— 1/2/26")).toBe(new Date(2026, 0, 2).getTime());
  });

  it("parses dates without a prefix and with a 4 digit year", () => {
    expect(parseDateText("6/14/2025")).toBe(new Date(2025, 5, 14).getTime());
  });

  it("parses dates with a time and am/pm", () => {
    expect(parseDateText("-- 9/26/25 1:30 pm")).toBe(
      new Date(2025, 8, 26, 13, 30).getTime(),
    );
  });

  it("parses dates with a time and no minutes", () => {
    expect(parseDateText("– 9/26/25 5 pm")).toBe(
      new Date(2025, 8, 26, 17, 0).getTime(),
    );
  });

  it("parses dates with a parenthesized time", () => {
    expect(parseDateText("— 2/26/26 (4:26 AM)")).toBe(
      new Date(2026, 1, 26, 4, 26).getTime(),
    );
    expect(hasTimeOfDay("2/26/26 (4:26 AM)")).toBe(true);
    expect(hasTimeOfDay("2/26/26")).toBe(false);
  });

  it("returns null for invalid input", () => {
    expect(parseDateText("not a date")).toBeNull();
  });
});
