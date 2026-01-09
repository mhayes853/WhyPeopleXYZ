import { describe, expect, it } from "vitest";
import { extractArticleDateFromHtml } from "./article-date";

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
