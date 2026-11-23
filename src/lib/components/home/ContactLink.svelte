<!--
  @component
  An icon and label linking to a contact method, with separate icons for light
  and dark color schemes.
-->
<script lang="ts">
  let {
    href,
    label,
    alt,
    lightIcon,
    darkIcon,
  }: {
    href: string;
    label: string;
    alt: string;
    lightIcon: string;
    darkIcon: string;
  } = $props();
</script>

<a class="flex flex-row items-center gap-x-[1em]" {href}>
  <picture>
    <source srcset={darkIcon} media="(prefers-color-scheme: dark)" />
    <source srcset={lightIcon} media="(prefers-color-scheme: light)" />
    <img width="28" height="28" src={lightIcon} {alt} />
  </picture>
  <p>{label}</p>
</a>
