<script lang="ts">
  import PageHead from "#lib/components/PageHead.svelte";
  import ProgressBar from "#lib/components/ProgressBar.svelte";
  import SiteHeader from "#lib/components/SiteHeader.svelte";
  import { navLinks } from "#lib/components/nav.ts";
  import { setReadingMinutes } from "#lib/reading-time-context.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  setReadingMinutes(() => data.readingMinutes);
</script>

<PageHead
  title={data.metadata.title}
  description={data.metadata.description}
  path="/{data.slug}"
/>

{#if data.metadata.progressBar !== false}
  <ProgressBar />
{/if}

<SiteHeader links={navLinks(data.metadata.nav)} />

<data.content />
