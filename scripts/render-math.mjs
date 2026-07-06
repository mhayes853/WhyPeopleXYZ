// Renders LaTeX math expressions to KaTeX-compatible HTML using latex.js.
//
// Usage:
//   node scripts/render-math.mjs "<latex expression>" ...
//   echo "<latex>" | node scripts/render-math.mjs -
//
// Prints the rendered HTML to stdout (the inner .katex span for inline
// expressions, or the outer .katex-display span for display expressions
// delimited by $$...$$).

import { parse, HtmlGenerator } from "latex.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
globalThis.document = dom.window.document;
globalThis.window = dom.window;

const renderExpression = (latex) => {
  const trimmed = latex.trim();
  const isDisplay = trimmed.startsWith("$$") && trimmed.endsWith("$$");
  const html = new HtmlGenerator({ htmlGeneratorType: "browser" });
  parse(trimmed, { generator: html });
  const fragment = html.domFragment();
  const wrapper = fragment.querySelector(".body") ?? fragment;
  const paragraph = wrapper.querySelector("p");
  if (!paragraph) {
    throw new Error(`No <p> rendered for: ${latex}`);
  }
  if (isDisplay) {
    const display = paragraph.querySelector(".katex-display, .katex");
    if (!display) {
      throw new Error(`No display KaTeX rendered for: ${latex}`);
    }
    return display.outerHTML;
  }
  const katex = paragraph.querySelector(".katex");
  if (!katex) {
    throw new Error(`No inline KaTeX rendered for: ${latex}`);
  }
  return katex.outerHTML;
};

const readStdin = async () => {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
};

const collectArgs = async () => {
  if (process.argv.includes("-")) {
    return [await readStdin()];
  }
  return process.argv.slice(2);
};

const expressions = await collectArgs();
if (expressions.length === 0) {
  console.error("Usage: node scripts/render-math.mjs <latex> [<latex> ...]");
  process.exit(1);
}

for (const expression of expressions) {
  console.log(renderExpression(expression));
}