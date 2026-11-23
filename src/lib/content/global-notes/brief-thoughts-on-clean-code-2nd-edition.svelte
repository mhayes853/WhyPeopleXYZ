<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Brief Thoughts on Clean Code 2nd Edition",
    date: "1/8/26",
  };
</script>

<p>
  I read the first edition a few years ago while in school, and while at
  the time I dogmatically adopted those practices, I eventually found a
  less dogmatic style for myself that was certainly shaped by those
  principles. Largely, the first edition had been beaten to death by
  others, so as a result the 2nd edition included a lot of “damage
  control”. Though I think this damage control ultimately brought more
  perspectives into the book which was nice.
</p>
<p>
  Perhaps a longer more in-depth review is subject to a dedicated
  writing of mine at some point, so instead I want to make my main
  premise clear on this matter.
</p>
<p>
  The way we write code is shaped by our tools, and primarily our
  editors. Given the scale of massively terrible codebases in the wild,
  this isn’t a massive skill issue, but rather one of giving chainsaws
  to an army of monkeys. The real job is to understand and move
  efficiently and deliberately in complex systems, and if our tools
  aren’t helping with that then how do we expect things to improve?
</p>
<p>
  Our primary tool for editing code has been fundamentally the same for
  decades, yet the systems we’ve produced have massively scaled in
  required (not accidental) complexity. Today’s editors are only great
  for writing text, not understanding and working with complex systems.
</p>
<p>
  The smaller function style is in theory quite a nice idea, because
  small functions tend to describe the overall process far better than
  inlined code. However, we also need to see the details and relate it
  to the higher-level process without being forced to jump around
  everywhere. No editor on the planet lets you see both views at once on
  the same screen, and instead the authoring programmer has to decide
  which one to show you by writing the code in that style.
</p>
<p>
  The beginning of the chapter on comments also points this out to an
  extent.
</p>
<p>
  <em>”Comments are, at best, a necessary evil. If our programming
    languages were expressive enough, or if you and i had the talent to
    subtly wield those languages to express our intent, we would not
    need comments very muchperhaps not at all.</em>
</p>
<p>
  <em>The proper use of comments is to compensate for our failure to
    express ourselves in code. Note that I used the word failure. I
    meant it. Comments are always failures of either our languages or
    our abilities.”</em>
</p>
<p>
  If after 5 decades, we still haven’t yet found a universally
  satisfiable way to express ourselves in the languages and tools we
  use, what do you think the problem is?
</p>
<p>— {metadata.date}</p>
