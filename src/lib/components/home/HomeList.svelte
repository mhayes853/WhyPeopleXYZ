<!--
  @component
  A titled list on the home page.
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    description,
    children,
  }: { title: string; description?: string; children: Snippet } = $props();
</script>

<section class="flex w-full flex-col items-start text-left">
  <div class="w-full">
    <h2>{title}</h2>
    {#if description}
      <p class="mt-[0.5em]">{description}</p>
    {/if}
  </div>
  <div class="flex w-full flex-col justify-start gap-y-[0.8em]">
    {@render children()}
  </div>
</section>
