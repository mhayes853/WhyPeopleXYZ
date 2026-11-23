<!--
  @component
  A link to a piece of writing on the home page.
-->
<script lang="ts">
  let {
    href,
    title,
    subtitle,
    date,
  }: { href: string; title: string; subtitle: string; date?: string | null } =
    $props();
</script>

<a
  class="flex w-full flex-col gap-[0.2em] bg-transparent px-[0.6em] py-[0.4em] text-ink transition-[color,background-color,box-shadow] duration-200 hover:rounded-[10px] hover:bg-black/5 hover:text-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
  {href}
>
  <div class="flex w-full items-baseline gap-[1em]">
    <h3 class="m-0 text-black underline decoration-2 underline-offset-4">
      {title}
    </h3>
    {#if date}
      <span class="ml-auto whitespace-nowrap opacity-60">{date}</span>
    {/if}
  </div>
  <p class="m-0 text-[0.9em] text-ink">{subtitle}</p>
</a>
