<script lang="ts">
  import { onMount, tick } from "svelte";
  import PageHead from "#lib/components/PageHead.svelte";
  import SiteHeader from "#lib/components/SiteHeader.svelte";
  import GlobalNoteSection from "#lib/components/global-notes/GlobalNoteSection.svelte";
  import { navLinks } from "#lib/components/nav.ts";
  import { allGlobalNotes } from "#lib/content/all-global-notes.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const expandOnly = (slug: string | undefined) =>
    Object.fromEntries(data.notes.map((note) => [note.slug, note.slug === slug]));

  // Only the newest note starts out expanded, unless the URL points at
  // another note via its anchor (e.g. `/global-notes#some-note`).
  // svelte-ignore state_referenced_locally
  let expanded: Record<string, boolean> = $state(expandOnly(data.notes[0]?.slug));

  const expandFromHash = async () => {
    const anchor = decodeURIComponent(location.hash.replace(/^#/, ""));
    const note = data.notes.find((note) => note.anchor === anchor);
    if (!note) {
      return;
    }
    expanded = expandOnly(note.slug);
    await tick();
    document.getElementById(anchor)?.scrollIntoView();
  };

  onMount(() => {
    expandFromHash();
  });
</script>

<svelte:window onhashchange={expandFromHash} />

<PageHead
  title="Global Notes"
  description="Ideas in my head that I don't have time to formally write about, and that are not easily expressible on social media."
  path="/global-notes"
/>

<SiteHeader links={navLinks(["home", "now"])} />

<article>
  <h1 id="global-notes" class="title">Global Notes</h1>
  <p class="article-reading-time">
    Total Reading Time for all Notes: {data.totalReadingMinutes} Minutes
  </p>
  <p>
    I have lots of ideas as all INTPs seemingly do, but not enough time to write
    about them formally. In that case, this serves as my insanity diary for
    things that would borderline diagnose me with insanity or alternatively
    being a conspiracy theorist.
  </p>
  <p>
    You'll find my notes in here to be quite idealistic, philosophical, and
    probably think they are crazy. That's because I'm unfortunately not a normal
    sane person, and the evidence for that is in these writings.
  </p>
  <p>
    Nevertheless, my thoughts evolve over time. Thus, what appears in one note
    may not represent what I think later on in a later note (these are "notes",
    not a final draft after all). Therefore, you'll be able to see my slow
    descent into becoming further detached from reality. Enjoy!
  </p>
  <p class="mt-0 mb-6 text-[0.9em] text-black/65">
    Subscribe via
    <a class="font-semibold" href="/rss.xml">RSS</a>.
  </p>
  <br />
  {#each data.notes as note (note.slug)}
    <GlobalNoteSection
      slug={note.slug}
      anchor={note.anchor}
      title={note.title}
      date={note.date}
      content={allGlobalNotes[note.slug].default}
      bind:expanded={expanded[note.slug]}
    />
  {/each}
</article>
