<script lang="ts">
  import emailIconDark from "#lib/assets/email-icon-dark.svg";
  import emailIconLight from "#lib/assets/email-icon-light.svg";
  import githubMark from "#lib/assets/github-mark.svg";
  import githubMarkWhite from "#lib/assets/github-mark-white.svg";
  import rssIconDark from "#lib/assets/rss-icon-dark.svg";
  import rssIconLight from "#lib/assets/rss-icon-light.svg";
  import PageHead from "#lib/components/PageHead.svelte";
  import ArticleCard from "#lib/components/home/ArticleCard.svelte";
  import ContactLink from "#lib/components/home/ContactLink.svelte";
  import HeroVisual from "#lib/components/home/HeroVisual.svelte";
  import HomeList from "#lib/components/home/HomeList.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<PageHead
  title="Matthew Hayes, unverified human"
  description="By trade, I build apps and developer tools for iOS and Android, but my true motives lie further. Wouldn't it be fun for you to deduce those yourself?"
  path="/"
/>

<HeroVisual />

<h1 class="mt-8">Matthew Hayes</h1>
<h3>Writings about software, systems, and mediums.</h3>
<p>
  See <a href="/about">about</a> for more information about me, and
  <a href="/now">now</a> to see what I'm up to right now.
</p>
<p>
  Writings displayed prominently on this page come infrequently. For more
  frequent and borderline insane stuff, see
  <a href="/global-notes">global notes</a>.
</p>

<div class="flex w-[min(calc(100%-2em),600px)] flex-col items-start gap-y-16">
  {#each data.sections as section (section.title)}
    <HomeList title={section.title} description={section.description}>
      {#each section.cards as card (card.slug)}
        <ArticleCard
          href="/{card.slug}"
          title={card.title}
          subtitle={card.subtitle}
          date={card.date}
        />
      {/each}
    </HomeList>
  {/each}

  <HomeList
    title="Informal Stuffs"
    description="Loose things and thoughts I haven't formalized elsewhere."
  >
    <ArticleCard
      href="/global-notes"
      title="Global Notes"
      subtitle="Ideas in my head that I don't have time to formally write about, and that are not easily expressible on social media."
    />
    {#if data.recentGlobalNotes.length > 0}
      <div class="mt-[0.2em] flex flex-col gap-[0.35em] pl-[0.6em]">
        <p
          class="m-0 text-[0.8em] font-semibold tracking-[0.02em] uppercase opacity-55"
        >
          Recent Global Notes
        </p>
        <div class="flex flex-col gap-4">
          {#each data.recentGlobalNotes as note (note.slug)}
            <a
              class="group flex items-baseline justify-between gap-[1em] text-ink hover:text-link-hover"
              href="/global-notes/{note.slug}"
            >
              <span
                class="underline decoration-1 underline-offset-3 group-hover:decoration-2"
                >{note.title}</span
              >
              <span class="text-[0.85em] whitespace-nowrap opacity-60"
                >{note.date}</span
              >
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </HomeList>

  <HomeList
    title="Contact Info"
    description="Important links if you want to contact me."
  >
    <ContactLink
      href="https://github.com/mhayes853"
      label="mhayes853"
      alt="Github"
      lightIcon={githubMark}
      darkIcon={githubMarkWhite}
    />
    <ContactLink
      href="mailto:matthewha853@gmail.com"
      label="matthewha853@gmail.com"
      alt="Email"
      lightIcon={emailIconLight}
      darkIcon={emailIconDark}
    />
  </HomeList>

  <HomeList title="Subscribe">
    <ContactLink
      href="/rss.xml"
      label="RSS Feed"
      alt="RSS"
      lightIcon={rssIconLight}
      darkIcon={rssIconDark}
    />
  </HomeList>
</div>
