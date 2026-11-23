<!--
  @component
  The crystal, photo and rotating blobs at the top of the home page. Clicking
  the photo opens a small explanatory dialog.
-->
<script lang="ts">
  // Resized from a 2316x3088 photo for 2x and 3x screens; it's displayed in
  // a 300px box.
  import humanImage600Avif from "../../assets/human_image-600.avif";
  import humanImage900Avif from "../../assets/human_image-900.avif";
  import humanImage900Jpg from "../../assets/human_image-900.jpg";
  import CrystalLogo from "../CrystalLogo.svelte";

  let dialog: HTMLDialogElement;

  const open = () => dialog.showModal();
  const close = () => dialog.close();
</script>

<div class="relative mb-8 flex flex-col items-center pb-32 max-[720px]:pb-24">
  <div
    class="relative z-4 -mb-[100px] flex items-center justify-center gap-8 max-[720px]:-mb-[60px] max-[720px]:flex-col"
  >
    <div class="flex max-w-full -rotate-5 justify-center">
      <CrystalLogo class="drop-shadow-[0_0_2.5rem_rgba(214,65,75,0.8)]" />
    </div>
    <div class="size-[300px] rotate-7">
      <button
        type="button"
        class="block size-full cursor-pointer rounded-2xl border-0 bg-transparent p-0"
        aria-haspopup="dialog"
        onclick={open}
      >
        <picture class="block size-full">
          <source
            type="image/avif"
            srcset="{humanImage600Avif} 600w, {humanImage900Avif} 900w"
            sizes="300px"
          />
          <img
            class="block size-full rounded-2xl object-cover"
            src={humanImage900Jpg}
            width="220"
            height="220"
            alt="Human silhouette in red"
            fetchpriority="high"
          />
        </picture>
      </button>
    </div>
  </div>
  <div class="blob purple-blob animate-rotate-blob-slow" aria-hidden="true"></div>
  <div class="blob red-blob animate-rotate-blob" aria-hidden="true"></div>
  <dialog
    bind:this={dialog}
    class="fixed inset-0 z-20 m-auto box-border hidden w-[min(90vw,360px)] max-w-[calc(100%-2rem)] items-center justify-center rounded-3xl border-none bg-white/98 px-5 py-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop:bg-black/35 backdrop:backdrop-blur-[14px] open:flex open:animate-modal-enter"
    onclick={(event) => {
      if (event.target === dialog) close();
    }}
  >
    <div class="flex flex-col gap-4">
      <p>
        I heard you're supposed to put a real photo here to make it seem like
        you're "professional". I'm not so sure what that means, so I'll make it
        a fun little game instead!
      </p>
      <b>This was the placeholder here before I decided to add the above text...</b>
      <p>"The hero believes in rotating blobs and is currently unavailable."</p>
      <button
        class="cursor-pointer rounded-full border-none bg-accent/12 px-6 py-2 text-[0.95rem] text-accent transition-colors duration-150 hover:bg-accent/25"
        type="button"
        onclick={close}>Close</button
      >
    </div>
  </dialog>
</div>

<style>
  .blob {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    pointer-events: none;
  }

  .red-blob {
    bottom: -20px;
    width: min(90vw, 500px);
    height: 240px;
    background:
      radial-gradient(
        circle at 40% 30%,
        rgba(214, 65, 75, 0.95),
        rgba(214, 65, 75, 0.7),
        rgba(214, 65, 75, 0.35)
      ),
      radial-gradient(circle at 60% 60%, rgba(255, 95, 115, 0.85), transparent 70%);
    border-radius: 50% 45% 70% 65%;
    filter: blur(45px) saturate(1.3);
    opacity: 0.45;
    z-index: 2;
  }

  .purple-blob {
    bottom: -40px;
    width: min(70vw, 420px);
    height: 200px;
    background:
      radial-gradient(
        circle at 60% 40%,
        rgba(132, 76, 252, 0.65),
        rgba(122, 54, 226, 0.35),
        rgba(122, 54, 226, 0)
      ),
      radial-gradient(circle at 35% 60%, rgba(96, 18, 160, 0.6), transparent 55%);
    border-radius: 55% 45% 65% 60%;
    filter: blur(45px) saturate(1.25);
    opacity: 0.375;
    z-index: 1;
  }
</style>
