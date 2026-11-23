<!--
  @component
  An inline reference to a footnote, rendered as `[^n]`.

  Pair with a `<FootnoteDef n={n}>` that holds the footnote's text.
-->
<script lang="ts">
  let { n }: { n: number } = $props();
</script>

<a href="#footnote-def-{n}" id="footnote-ref-{n}" class="footnote-ref">[^{n}]</a>
