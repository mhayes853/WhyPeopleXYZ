<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Handwriting",
    date: "1/12/26",
  };
</script>

<p>
  With agentic coding seeming to gain more adoption, one has to ask what
  will happen to the act of handwriting code, because seemingly LLMs are
  generating more and more code. Anecdotally, I can atest to seeing a
  large increase in LLM generated code in my work, but others seem to
  report even larger swaths of code (up to 90% or even 100%!) being
  written by LLMs.
</p>
<p>
  Of course, one naturally has to still be responsible for the code at
  the end of the day, no matter how it was written. Therefore, you can’t
  just vibe code (ie. Not ever reading the code) your way through a
  project if you want it to be taken seriously from an engineering
  standpoint.
</p>
<p>
  Though I’ve seen an almost complete rejection of handwritten code from
  a lot of agentic coders in recent times. Almost to the point where
  it’s become a social sign of weakness if you decide to write any sort
  of functionallity by hand rather than using an LLM. It’s true that
  with enough context/prompt engineering, you can get the LLM to output
  anything that you want. Though, for some tasks, such as performance
  intensive code where every line counts, it would probably just be
  faster to write code by hand. Of course, I expect LLMs to be able to
  cover more of these cases in the comming months with minimal
  intervention, so the fact that handwriting is faster may only be a
  temporary thing.
</p>
<p>
  That brings me to my controversial take, which is that I’m not in
  favor of the “absolutely everything has to be written by an LLM
  mindset” because it undermines the value of handwriting. Why do we
  write things in general?
</p>
<p>
  It’s to <em>understand</em> things better, because writing is a form
  of tinkering. Tinkering is what allows us to explore a tangible
  concept from many different aspects, and by its own necessity it
  requires failing over and over again. In traditional writing, you’ll
  often make mistakes, be forced to press backspace, and try again. Each
  backspace an re-attempt is a new attempt with more knowledge than the
  previous attempt.
</p>
<p>
  See Paul Graham write one of his essays in
  <a href="https://byronm.com/13sentences.html">real time</a> to see
  what I mean. If you play the animation, you’ll see the entire title of
  the essay change from “startups in ten sentences” to “Startups in 13
  Sentences” as he writes it! In the process of writing by hand, he
  found 3 additional important points to make dedicated sentences.
</p>
<p>
  In a world with massive amounts of code being generated, such
  understanding becomes even more essential because now each system has
  far more moving parts. If you just review the LLM generated code and
  move on, you lose an entire dimension of learning, and ultimately your
  skills to work at a deeper level will atrophy. Actually writing bits
  of code by hand, even if most of the work is done by an LLM, will
  still help quite a bit in that understanding because you’ll be
  tinkering with the code.
</p>
<p>
  Now from a cost benefits perspective, there’s definitely a tradeoff.
  If you spend to much time tinkering, you risk moving too slow. If you
  spend no time at all tinkering, the lack of understanding may in fact
  slow you down in the long term. Will the models reach a point where
  looking at handwritten code is no longer necessary, probably. However,
  I still think we’re ways away from that, and even today people still
  look at and read assembly code for all sorts of various reasons.
  That’s why Godbolt exists.
</p>
<p>— {metadata.date}</p>
