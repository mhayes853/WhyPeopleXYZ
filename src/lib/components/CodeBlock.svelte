<!--
  @component
  A syntax highlighted code block with a copy button.

  Highlighting happens while the page is rendered, so the prerendered HTML
  already contains the highlighted code.

  ```svelte
  <CodeBlock language="swift" code={`
  let x = 1
  `} />
  ```

  A single leading newline and trailing whitespace are trimmed from `code`, so
  the snippet can start on the line after the opening backtick. Pass `wrap` to
  wrap long lines instead of scrolling horizontally. Inside the
  template literal, escape backslashes, backticks and `${` as `\\`, `` \` ``
  and `\${`.
-->
<script lang="ts">
  import { highlight } from "../highlight";
  import copyIcon from "../assets/copy.svg?raw";
  import checkIcon from "../assets/checkmark.svg?raw";

  const COPY_RESET_DELAY_MS = 1400;

  let {
    code,
    language,
    wrap = false,
  }: {
    code: string;
    /** A highlight.js language name. Detected automatically when omitted. */
    language?: string;
    /** Wrap long lines instead of scrolling horizontally. */
    wrap?: boolean;
  } = $props();

  const source = $derived(code.replace(/^\r?\n/, "").replace(/\s+$/, ""));
  const highlighted = $derived(highlight(source, language));

  let copied = $state(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      return;
    }
    copied = true;
    setTimeout(() => (copied = false), COPY_RESET_DELAY_MS);
  };
</script>

<div class="code-block-shell">
  <pre class:code-wrap={wrap}><code class={["hljs", language && `language-${language}`]}
      >{@html highlighted}</code
    ></pre>
  <button
    type="button"
    class="code-copy-button"
    class:is-copied={copied}
    aria-label="Copy code"
    onclick={copy}
  >
    <span class="code-copy-icon" aria-hidden="true"
      >{@html copied ? checkIcon : copyIcon}</span
    >
  </button>
</div>
