<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "The Necessary Bar",
    date: "10/6/26",
  };
</script>

<p>
  This is perhaps a psychotic take, but in due time it would be quite
  disastrous for humans and agents to be writing code in the same manner
  as they are today. Therefore, this note is not necessarily about
  who’s better between humans and agents when it comes to writing code,
  but rather to think about the established bar for where code needs to
  be, regardless of what writes it. Generally speaking, both humans and
  agents use the same programming languages, compilers, static analyzers,
  etc. and are therefore prone to many of the same mistakes. Furthermore,
  even if agents start writing machine code directly, and today’s
  programming languages die as a result, I still think the ideas in this
  note would be relevant.
</p>
<p>
  If three 9s (ie. 99.9%) of uptime are considered to be the gold
  standard for a backend service, then I think we should aspire to have
  the same amount of “correctness” for produced code as a (distant
  future) default. I should also clarify that this does not mean three
  9s of correctness at <em>write-time</em> because <em>runtime</em> is much
  more dynamic and dangerous than write-time, and correct code at
  write-time is often not correct at runtime. For example, a typical test
  suite can measure a snapshot of correctness at a given moment, but
  usually not for continuous usage over a long period of time such as
  months or years. This latter kind of test usually requires simulating
  a real environment, such as controlling the current date through a
  mock, which may not fully reflect production.
</p>
<p>So we have some design considerations for achieving the bar of three 9s:</p>
<ul>
  <li>
    Code, at the time it is written, will likely be wrong somewhere,
    regardless of who writes it.
    <ul>
      <li>
        I do think agents will win out over humans in due time in terms
        of quality and not just productivity, and perhaps they already
        are in many areas. However, as stated earlier, I think the real
        problems are the dynamics between write-time and runtime, and
        not the skill of the programmers/agents. Relying on avoiding
        programmer/agent “skill issues” is akin to relying on
        <a href="https://squareallworthy.tumblr.com/post/163790039847/everyone-will-not-just">“everyone will just”</a>.
      </li>
      <li>
        I don’t know of a single human or agent who can write a
        1,000,000 LOC project with a 99.9% correctness rate in today’s
        programming languages. This would mean that only 1,000 of those
        1m lines can be error-prone, which is quite hard to imagine with
        today’s tooling.
      </li>
    </ul>
  </li>
  <li>
    Static analysis, formal correctness, or snapshot verification
    mechanisms (eg. Unit tests) are not enough.
    <ul>
      <li>
        These tools can certainly be useful as feedback mechanisms for
        both humans and agents, but alone they are currently not getting
        us near the 99.9% correctness bar.
      </li>
      <li>
        On the topic of formal correctness, this can certainly be a
        powerful tool for things that are both small, stable, and
        especially reliable. A library for cryptographic algorithms is a
        great example of this. However, there are currently scaling
        issues with either having to maintain a massive proof alongside
        a massive program, or a language that is forced to model
        everything explicitly.
      </li>
    </ul>
  </li>
</ul>
<p>
  The shift in mindset here is not “How to ensure code is not buggy”
  as this does not scale at present, but rather “How do we correct
  buggy code before it becomes a problem”. In a similar vein, one
  cannot design the internet on the presumption that a node will always
  be available, and that it interprets data in the way the sender
  intends. TCP was designed around those constraints, for instance, so
  in a sense we’re sort of looking for a “TCP of code itself”. (Another
  analogy is perhaps error-correcting codes. Though, I think the “TCP of
  code” problem seems to be harder than its analogies.)
</p>
<p>
  More precisely, this is a shift from a static to a dynamic point of
  view. If agents are able to “generate applications on the fly” as
  normal consumer behavior in the future, then we have no choice but to
  accept a dynamic point of view. In essence, this implies that
  “something has to be there to fix things” when necessary.
</p>
<p>
  For simple, personal, vibe-coded, client-only apps, a simple automated
  agent prompt to quickly fix something may be all that’s necessary, and
  I suspect that may become more popular in the near term. However, what
  about distributed or more mission-critical cases? In those cases,
  perhaps the biggest cause of bugs is code changes from within breaking
  an untested edge case. Furthermore, any fix usually has to go through
  some centralized filter (the company) and all of its processes for
  merging code. In my opinion, this is too slow and possibly error-prone
  (eg. Depending on human review) a process for getting to our 99.9% bar.
  Somehow, like TCP and error-correcting codes, we will need to be able
  to trust our “TCP of code” mechanism autonomously.
</p>
<p>
  Can such a “TCP of code” be achieved perhaps? I think so, and I also
  think it’s more or less necessary for the scale of software that agents
  will produce. This will be an explosion in the amount of code and
  software created, and likely a world with <em>exponentially</em> more
  software that can be created by many more people than before. This is
  generally incredible, especially the “many more people” part of that
  phrase, but it also means that the scaling problems of our existing
  methods will be orders of magnitude higher than today. By “scaling”, I
  mean whether or not such methods can produce reliable software at a
  given scale of software production. Our existing methods are already
  struggling with today’s scale (see GitHub), so it’s no doubt that
  we’ll need much better ones for tomorrow’s.
</p>
<p>
  To put it into perspective, the web wouldn’t even be viable for mass
  consumer usage if it weren’t for TCP, as it would be too flaky to do
  business on. (The web still does have design flaws that make its
  underlying network flakiness more revealing, unfortunately, but TCP is
  the thing that makes it “reliable enough” to do business on.)
  Similarly, if a bug appeared in a personal vibe-coded app written by a
  “non-computer person”, would they even be aware of the fact that they
  have to prompt an agent to fix it? Even if they did (unlikely), would
  they be able to go beyond “Hey Claude, you need to fix this”? An
  autonomous design is the only sensible solution here, and whether or
  not it’s backed by agents or something else is besides the point.
</p>
<p>
  In essence, I think agents will need to be the catalyst that forces
  the fundamentals of software itself to evolve from their decades-long
  stagnation (since the 80s), otherwise some of the negative effects
  could turn disastrous.
</p>
<p>— {metadata.date}</p>
