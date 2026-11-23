import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import diff from "highlight.js/lib/languages/diff";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import x86asm from "highlight.js/lib/languages/x86asm";
import xml from "highlight.js/lib/languages/xml";

const LANGUAGES = {
  bash,
  c,
  cpp,
  css,
  diff,
  java,
  javascript,
  json,
  kotlin,
  plaintext,
  python,
  rust,
  swift,
  typescript,
  x86asm,
  xml,
};

for (const [name, language] of Object.entries(LANGUAGES)) {
  hljs.registerLanguage(name, language);
}
hljs.registerAliases(["json5"], { languageName: "json" });
hljs.registerAliases(["x86"], { languageName: "x86asm" });

/**
 * Highlights a snippet of code to HTML. When no language is given (or the
 * language isn't registered), the language is detected automatically.
 */
export const highlight = (code: string, language?: string) => {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  }
  return hljs.highlightAuto(code).value;
};
