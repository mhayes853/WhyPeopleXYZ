<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "“Product Dev” vs “Code Purist”",
    date: "12/28/25",
    anchor: "-product-dev-vs-code-purist-",
  };
</script>

<p>
  I’ve seen a split of these 2 personalities come up recently as a
  result of agentic coding gaining more adoption. Though, it seems to me
  that one must identify with one of these camps, and vehemently disavow
  the other one.
</p>
<p>
  From the “product dev” perspective, they were tortured by 2 AM
  debugging sessions, and is finally getting their freedom from those
  elitist code purists. Likewise, the code purist perspective revels in
  those debugging sessions, and now has their life energy sucked from
  them been by those god damn LLMs.
</p>
<p>
  One of the interesting things is that the “product dev” would’ve had
  their way a long time ago if in the 80s we looked at the 70s more
  critically. Smalltalk programs were incredibly tiny not because
  Smalltalk programmers were geniuses, or because software was simpler.
  The programs were incredibly tiny because programming wasn’t limited
  to the act of writing abstract textual symbols, but rather the entire
  GUI was the programming environment. Today’s level of AI
  sophistication wasn’t ever needed for this overall effect.
</p>
<p>
  The code purist also has a point, and I don’t see the act of manually
  writing code disappearing for at least a decent amount of time. Really
  complex programs, especially ones that require performance sensitive
  optimizations will probably need a significant amount of manual labor
  due to the required precision of the code. Also, I find that designing
  APIs in library code is still more effective to do by hand rather than
  through an LLM (though often the LLM can be used to write tests and
  implement the API if you know what you’re doing). Some changes are
  also quicker to do by hand as well depending on your choice of editor
  and how much time you’ve dedicated to mastering your editor’s motions.
</p>
<p>
  In other words, I think it’s worth noting a term for “precise coding”.
  The more human involvement in your development process, the more
  precision one gains over the symbolic representation of the system.
</p>
<p>
  Though, for most serious programs, the bottleneck is almost never the
  precise code, but rather the overall systems design and architecture.
  Before writing out code as a set of symbols in our editor, there’s
  often a longer period of rumination within one’s head about the system
  itself which takes up most of the time. This judgement is quite
  difficult for an LLM to do well, because it only knows
  well-established patterns whereas serious systems are often trying to
  define their industry in some novel/not well-established manner.
</p>
<p>
  Reminder that at the end of the day, what we call LLMs are really just
  incredible at detecting patterns and correlations. You wouldn’t get
  very far if you had to discover novel ideas just by noticing patterns
  in your head because there’s often a necessary intuitive reasoning
  step that you must perform in your head to come at a novel judgement.
</p>
<p>
  So which camp do I identify with on a fulfillment level, “product dev”
  or “code purist”?
</p>
<p>
  As a self-proclaimed “fledgling systems designer”, I would have to say
  both. To me there’s no room for compromise on either of these camps if
  one wants to build robust systems. Code is often the dominant symbolic
  representation of the system’s runtime, which needs to be maintained
  over time. I also very much care about the societal effect of the
  system, which would be more along the “product dev” lines of thinking.
</p>
<p>
  On a fulfillment note, the former bit is why I pay attention to code
  quality even when “moving fast”, and the latter bit is why I enjoy
  design and many of these higher level writings for instance. My entire
  world perspective is a giant relation graph of both those camps, and
  much more.
</p>
<p>— {metadata.date}</p>
