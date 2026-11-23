<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "I Like Pi",
    date: "7/7/26",
  };
</script>

<p>
  I've been using
  <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>π</mi></mrow><annotation encoding="application/x-tex">\pi</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.43056em; vertical-align: 0em"></span><span style="margin-right: 0.03588em" class="mord mathnormal">π</span></span></span></span>
  for the last few days, I like it much better than opencode so far. I
  also think it captures some of the ideas that I think are needed
  (simple by default, highly extensible by end-users, etc.).
</p>
<p>One question is how can we do this on a larger scale?</p>
<p>— {metadata.date}</p>
