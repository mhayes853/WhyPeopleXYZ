<!--
  @component
  A collapsible global note on the `/global-notes` page. The heading toggles
  the note open and closed, and the title links to the note's own page.
-->
<script lang="ts">
  import type { Component } from "svelte";

  let {
    slug,
    anchor,
    title,
    date,
    content: Content,
    expanded = $bindable(false),
  }: {
    slug: string;
    anchor: string;
    title: string;
    date: string;
    content: Component;
    expanded?: boolean;
  } = $props();
</script>

<section class="group/note m-0 max-[720px]:mb-5" data-expanded={expanded}>
  <h2
    id={anchor}
    class="mb-[0.4rem] flex items-center gap-2 max-[720px]:text-[0.95em]"
  >
    <button
      type="button"
      class="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/8 p-0 text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/45 max-[720px]:min-h-10 max-[720px]:min-w-10"
      aria-label="Toggle note"
      aria-expanded={expanded}
      onclick={() => (expanded = !expanded)}
    >
      <svg
        class="block size-[18px] origin-center -rotate-90 fill-current transition-transform duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[expanded=true]/note:rotate-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        aria-hidden="true"
        focusable="false"
        ><path
          d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
        /></svg
      >
    </button>
    <a
      class="inline-flex items-center gap-2 text-inherit [font-weight:inherit] decoration-2 underline-offset-4 hover:text-inherit hover:underline"
      href="/global-notes/{slug}">{title}</a
    >
    <span
      class="ml-auto text-[0.85em] whitespace-nowrap text-black/65 opacity-60 transition-opacity duration-[220ms] group-data-[expanded=true]/note:text-accent group-data-[expanded=true]/note:opacity-100 max-[720px]:group-data-[expanded=false]/note:text-[0.75em] max-[720px]:group-data-[expanded=false]/note:opacity-55"
      >{date}</span
    >
  </h2>
  <div class="m-0" hidden={!expanded}>
    <Content />
    <br />
  </div>
</section>
