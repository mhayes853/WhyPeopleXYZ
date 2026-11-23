<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "LLMs and Creatives",
    date: "1/17/26",
  };
</script>

<p>
  To add on to my never ending writings about LLMs and systems design,
  we’ll now address actual creative work. To define creative work, I’ll
  consider it as any body of work that inherently produces novelty. To
  this extent, art, writing, music, etc. are all included.
</p>
<p>
  As I’ve stated previously, the point of creation isn’t to have a model
  generate a bunch of variants, and then have a human pick the best one.
  Whilst a model can generate creative work far faster than a human can
  create it, at the end of the day LLMs are really just incredible
  statistical pattern matchers based on a limited context window.
</p>
<p>
  Good creative work often doesn’t follow statistics, and is rather an
  output of intuition. The intuition is required for novelty, because
  statistics by its own nature must use what already exists.
</p>
<p>
  My primary role in the economy is to build software, and to those ends
  the code is required to be written in a certain way to produce a
  quality system. Robust software often requires measuring statistics in
  some form, whether that’s through tests, infrastructure costs,
  performance benchmarks, analytics, or whatever else. Improving these
  things is often an optimization problem, which is a perfect problem
  shape for pattern detection algorithms like LLMs. Generally, this
  doesn’t take the meaningful work out of creating software, because the
  actual hard creative work typically happens in one’s head long before
  that sit at their desk.
</p>
<p>
  Similarly, the role of airline pilots is to transport passengers or
  cargo from one destination to another. For each destination and the
  environment around it, there is an optimal flight path that one can
  take. This is an optimization problem for which autopilot is the
  current solution.
</p>
<p>
  However, art, music, and writing are absolutely
  <em>not</em> optimization problems, and trying to make them
  optimization problems is an absolutely terrible idea. The point of
  pure creative output is to express ideas, often in an open-ended form,
  and to communicate to other humans. Without that, we lose out on so
  much, including learning novelty required to design more robust
  systems.
</p>
<p>
  Does that mean LLMs are an entirely bad idea in creative fields? No,
  but they need to be working to enhance creative output rather than
  taking away the process entirely. The solution to this clearly lies
  with the design of LLM-based tools.
</p>
<p>
  LLMs have an inherently large corpus of knowledge, and are more
  available than other colleagues to review existing work for example.
  As such, they can offer realtime feedback by picking up on queues from
  watching humans create. In pair programming for instance, the partner
  watching can pick up and learn from just seeing the driving partner
  type code without any additional communication.
</p>
<p>
  Right now, LLMs almost entirely accept specifically crafted
  textual/file-based prompts as inputs. Often, these prompts are entered
  into a tiny text box on a window somewhere off to the side of the
  actual creative work. Therefore, by nature, one has to stop doing any
  sort of creative work in order to engage with the LLM. This in turn,
  takes one out of the creative flow, and as a result is likely to
  produce a worse overall outcome.
</p>
<p>
  In other words, we need more forms of inputs! If you keep the input
  mechanism to entering text and dragging files into a tiny text box,
  almost certainly people will be upset that the fun is being taken out
  of the creative work.
</p>
<p>— {metadata.date}</p>
