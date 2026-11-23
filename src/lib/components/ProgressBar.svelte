<!--
  @component
  A thin bar pinned to the top of the viewport that fills as the page is
  scrolled.
-->
<script lang="ts">
  let progress = $state(0);

  const update = () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const maxScroll = scrollHeight - clientHeight;
    progress =
      maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / maxScroll));
  };

  $effect(update);
</script>

<svelte:window onscroll={update} onresize={update} />

<div
  class="pointer-events-none fixed top-0 left-0 z-999 h-[5px] w-full bg-black/8"
  aria-hidden="true"
>
  <div
    class="h-full w-full origin-left bg-accent transition-transform duration-[120ms] ease-linear"
    style:transform="scaleX({progress})"
  ></div>
</div>
