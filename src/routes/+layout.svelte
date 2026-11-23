<script lang="ts">
  import "../app.css";
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<div
  class="mx-auto box-border flex w-full max-w-[720px] min-w-0 flex-col justify-start overflow-x-clip p-8 text-center"
>
  {@render children()}
</div>
