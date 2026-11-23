<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "How does Code Survive Agents?",
    date: "10/3/26",
  };
</script>

<p>
  What I mean by this is how code itself scales to being a reliable
  medium written by agents, not whether or not we use traditional
  programming languages instead of machine code as a future medium.
  There’s currently a large shift towards type-safe and memory-safe
  programming languages, particularly Rust (though I think Swift is an
  underrated target for this purpose), and agents have been prescribed
  as a way to do Rust migrations easily. (See Bun, Google, Microsoft,
  etc.)
</p>
<p>
  In general, I would say that such memory-safe guarantees are an
  incremental step up from using languages like C, C++, and even
  garbage-collected languages like Java. However, I think there’s very
  much of a focus on “preventing wrong” rather than “correcting wrong
  when it happens” in these languages, although agents still introduce
  quite a few bugs even in memory-safe languages. A static analysis
  system for both types and memory has no concept of a dynamic and
  changing world, and such changes are the biggest vector of future
  bugs.
</p>
<p>
  When agents write code, I don’t perceive the biggest threat to be an
  end-user bug <em>per se</em>, but rather an unintentional mistake from
  an agent modifying the code from within. This principle also goes for
  humans, where the most damaging threat to a codebase is not external,
  but rather the unintentional attack of human programmer error from the
  inside. Agents scale this possibility, and even make it harder for
  human eyes to detect their errors. (It is simply not possible for a
  human to review thousands of lines of agent code per day with
  sufficient insight. They will fatigue, or focus only on specific
  sections they happen to be most comfortable with.)
</p>
<p>
  Another aspect that’s hard to verify is architecture, and for the
  obvious reason that one cannot simply look into the future. As of now,
  the only real counter to this is to explicitly design for resilience,
  which often means designing in an evolutionary style, or designing in
  a manner that enables starting from scratch easily. Agents may make
  the latter approach more doable from a timing and cost standpoint, but
  this gain in speed does not inherently prevent the risks associated
  with rewriting.
</p>
<p>
  So when we decide to use agents, we are accepting the possibility of
  dealing with an enormous amount of potential bugs in a short period of
  time. It’s worth noting that human programmers also have these same
  error-prone tendencies, but rather that the speed of agentic
  development makes this fact more visible.
</p>
<p>
  So far, the response to this has been more verification mechanisms,
  like more and different kinds of tests, static analysis, formal
  proofs(?), etc. However, more verification also means more
  infrastructure needed to run the verifications (eg. Increased CI spend
  and time). These can catch mistakes, but they don’t fix them (sounds
  kind of like the discovery of error-correcting codes perhaps), and the
  bigger issue is whether or not the eventual fixes from future changes
  cause more bugs that don’t have an associated verification mechanism.
</p>
<p>
  This is all to say that I think we’re still using very primitive tools
  for a kind of scaling they weren’t designed for. The means of software
  production may have been more democratized, but not so much (possibly
  less by default) the means of its safety and understanding. I think
  truly solving this means finding the next order of magnitude for
  software itself, rather than just creating better models. Though
  better models certainly help, this is more about how the fundamentals
  of software itself have remained mostly constant for decades, so I
  think those will need to evolve somehow. For instance, what does it
  mean for a programming language to be more than just similar to
  existing ones, but with syntactical and memory model differences?
  (Essentially all programming languages boil down to being roughly the
  same with some differences in technical aspects. Therefore, a
  theoretically “evolved programming language” would have to have a
  completely different way of producing code in it. Code produced in
  this language would likely not look anything like today’s languages,
  and it doesn’t have to be purely textual either.)
</p>
<p>
  I think I will have to keep reiterating this point, which is that
  agents do not remove the engineering bar, but rather increase it
  massively.
</p>
<p>— {metadata.date}</p>
