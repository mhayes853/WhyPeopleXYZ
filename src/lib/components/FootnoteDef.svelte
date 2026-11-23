<!--
  @component
  The definition of a footnote referenced with `<FootnoteRef n={n} />`.
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let { n, children }: { n: number; children: Snippet } = $props();
</script>

<p>
  <span class="footnote-def" id="footnote-def-{n}"
    ><a href="#footnote-ref-{n}" class="footnote-num">{n}.</a>
    {@render children()}</span
  >
</p>
