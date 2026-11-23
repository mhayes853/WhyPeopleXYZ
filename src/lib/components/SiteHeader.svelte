<!--
  @component
  The crystal logo (linking home) and the row of navigation links shown at the
  top of every page except the home page.
-->
<script lang="ts">
  import CrystalLogo from "./CrystalLogo.svelte";
  import type { NavLink } from "./nav";

  let { links }: { links: NavLink[] } = $props();
</script>

<a class="flex max-w-full justify-center" href="/" aria-label="Home">
  <CrystalLogo class="drop-shadow-[0_0_2.5rem_rgba(214,65,75,0.8)]" />
</a>
<nav class="mt-3 mb-6 flex items-center justify-center gap-5">
  {#each links as link (link.href)}
    <a
      class="font-semibold text-ink underline decoration-2 underline-offset-4 hover:text-link-hover"
      href={link.href}>{link.label}</a
    >
  {/each}
</nav>
