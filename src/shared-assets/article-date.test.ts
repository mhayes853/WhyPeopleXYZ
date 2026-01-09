import { describe, expect, it } from "vitest";
import { extractArticleDateFromHtml, parseDateText } from "./article-date";

describe("extractArticleDateFromHtml", () => {
  it("finds the last date line even if text follows it", () => {
    const html = `
      <article>
        <h1>Title</h1>
        <p>Intro</p>
        <p>— 1/2/26</p>
        <p>Postscript</p>
      </article>
    `;
    expect(extractArticleDateFromHtml(html)).toBe("— 1/2/26");
  });

  it("finds the last date line at the end of the article", () => {
    const html = `
      <article>
        <p>Body</p>
        <p>-- 9/26/25</p>
      </article>
    `;
    expect(extractArticleDateFromHtml(html)).toBe("-- 9/26/25");
  });

  it("returns null when no date line exists", () => {
    const html = `
      <article>
        <p>Body</p>
        <p>Footer</p>
      </article>
    `;
    expect(extractArticleDateFromHtml(html)).toBeNull();
  });
});

describe("parseDateText", () => {
  it("parses dates with an em dash prefix", () => {
    expect(parseDateText("— 1/2/26")).toBe(
      new Date(2026, 0, 2, 0, 0).getTime(),
    );
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

  it("returns null for invalid input", () => {
    expect(parseDateText("not a date")).toBeNull();
  });
});
