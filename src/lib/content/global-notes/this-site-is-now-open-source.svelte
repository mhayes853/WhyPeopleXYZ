<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "This Site Is Now Open Source",
    date: "11/24/26",
  };
</script>

<p>
  So I finally did
  <a href="https://github.com/mhayes853/WhyPeopleXYZ">it</a>, and had an
  agent migrate us to SvelteKit and Tailwind as well.
</p>
<p>
  In the past, I would be wary of using dependencies for something like
  this since migrating would be time consuming (it’s all been vanilla
  until yesterday). However, agents make migrations trivial now, so I’ll
  just use whatever I want.
</p>
<p>
  Also, all of these global notes were originally dogpiled into 1 ~10k
  line HTML file. Suffice to say, I wasn’t editing that by hand, as I
  would just have an agent (usually Luna or Haiku) translate the markdown
  into HTML. The markdown is written externally using Bear, but I’m open
  to making my own writing app in the future (I just want to make it
  really good, and haven’t fully converged on an ideal workflow yet). My
  manual workflow remains in the SvelteKit version, but now it just
  creates a dedicated Svelte component per note. A dedicated Svelte
  component allows me to add interactivity, which wouldn’t be possible if
  I went with a more traditional markdown to HTML server pipeline.
</p>
<p>
  That being said, I will be doing a massive design overhaul this holiday
  week, so stay tuned for that!
</p>
<p>— {metadata.date}</p>
