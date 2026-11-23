<!--
  @component
  The `<title>`, Open Graph and Twitter card tags for a page.
-->
<script lang="ts">
  import { SITE_IMAGE } from "../site";

  let {
    title,
    description,
    path,
  }: { title: string; description: string; path: string } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={SITE_IMAGE} />
  <meta property="og:url" content={path} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={SITE_IMAGE} />
  <meta name="twitter:url" content={path} />
</svelte:head>
