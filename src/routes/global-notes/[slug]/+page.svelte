<script lang="ts">
  import PageHead from "#lib/components/PageHead.svelte";
  import ProgressBar from "#lib/components/ProgressBar.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import SiteHeader from "#lib/components/SiteHeader.svelte";
  import { navLinks } from "#lib/components/nav.ts";
  import { setReadingMinutes } from "#lib/reading-time-context.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  setReadingMinutes(() => data.note.readingMinutes);
</script>

<PageHead
  title="{data.note.title} — Global Notes"
  description={data.note.excerpt}
  path="/global-notes/{data.note.slug}"
/>

<ProgressBar />

<SiteHeader links={navLinks(["home", "globalNotes", "now"])} />

<article>
  <h1 class="title">{data.note.title}</h1>
  <ReadingTime />
  <data.content />
</article>

{#if data.newer || data.older}
  <nav
    class="mt-12 flex items-start justify-between gap-6 text-left"
    aria-label="More global notes"
  >
    {#each [{ label: "Newer", note: data.newer }, { label: "Older", note: data.older }] as link (link.label)}
      {#if link.note}
        <a
          class={[
            "group flex max-w-[45%] flex-col gap-1 text-ink hover:text-ink",
            link.label === "Older" && "ml-auto text-right",
          ]}
          href="/global-notes/{link.note.slug}"
        >
          <span
            class="text-[0.8em] font-semibold tracking-[0.02em] uppercase opacity-55"
            >{link.label}</span
          >
          <span
            class="underline decoration-1 underline-offset-3 group-hover:decoration-2"
            >{link.note.title}</span
          >
        </a>
      {/if}
    {/each}
  </nav>
{/if}
