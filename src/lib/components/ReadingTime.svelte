<!--
  @component
  Displays "N Minutes to Read" for the page it's rendered in. The value is
  computed at build time from the page's text and provided via context.
-->
<script lang="ts">
  import { getReadingMinutes } from "../reading-time-context";

  const minutes = $derived(getReadingMinutes());
</script>

<p class="article-reading-time">
  {minutes ?? "--"} {minutes === 1 ? "Minute" : "Minutes"} to Read
</p>
