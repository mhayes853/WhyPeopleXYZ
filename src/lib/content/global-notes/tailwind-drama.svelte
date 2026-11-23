<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Tailwind Drama",
    date: "1/10/26",
  };
</script>

<p>
  Tailwind is in trouble, but I wouldn’t normally be writing about this
  because I haven’t had to actively maintain any super serious web
  project before. Well that is unless you count this site as a “super
  serious project” since it is an entire archive of my thoughts and
  recollections after all, and I would like to keep it up for years to
  come.
</p>
<p>
  I don’t use tailwind, or any JS framework for this site for the
  record. In fact, there are no dependencies other than highlight-js for
  code blocks. If I wanted to, I could probably just write my own syntax
  highlighter to get rid of the dependency entirely.
</p>
<p>
  Regardless, recently I’ve found myself actually building a real
  serious web project that will probably need to be maintained for a
  while, though it’s not super big at the moment. At the time of writing
  this, it’s set to ship likely sometime in the next week or two once
  all the human elements are sorted out.
</p>
<p>
  It so happens that on this project, Tailwind was the technology of
  choice for styling. I have to say, I like it more than writing plain
  CSS, but at the end of the day CSS is still the same layout system.
  That being said, using tailwind at least makes it easier to control
  styling from JS at the end of the day which is a huge step up compared
  to needing to write out CSS classes in a separate file (or section of
  a file if your use a framework like Svelte).
</p>
<p>
  Anyways, in case you’ve been living under a rock, the company behind
  Tailwind doesn’t seem to be doing so well. In fact, despite their
  number of users growing considerably, their revenue is down 80%. The
  catalyst seems to be LLMs having their weights particularly tuned to
  Tailwind, which causes a drop in people going to the official site for
  docs, which in turn causes less people to see their
  <a href="https://tailwindcss.com/plus?ref=top">commercial products</a>, which in turn causes less revenue.
</p>
<p>
  As a whole, what does this mean for monetized open source work? If
  LLMs can just be fine-tuned on the best practices of your project,
  then you can’t just sell the expertise. In this day and age, you’ll
  almost certainly have to close off essential points of your project
  such that you can monetize, or you can sell convenience of hosting if
  your project involves hosting something on the internet in some way.
</p>
<p>
  Tailwind unfortunately has none of these, and given the kind of
  project it is I doubt it ever could because it’s really just a CSS
  wrapper at the end of the day. CSS is an open standard, so there’s
  nothing proprietary to lean on and make closed source for
  monetization. Additionally, Tailwind is specifically inlined in
  frontend code, this also means that there’s no deployment costs
  associated with it. The best that could be done was to sell closed
  well-crafted UI components, but LLMs have unfortunately taken that
  business model.
</p>
<p>
  Despite the unfortunate troubles, I don’t think Tailwind as a project
  will die. It seems to be an essential component for many projects, so
  I’m sure there’s some company out there that can’t afford to lose
  Tailwind. The main question is, how much will they be willing to spend
  for it.
</p>
<p>— {metadata.date}</p>
