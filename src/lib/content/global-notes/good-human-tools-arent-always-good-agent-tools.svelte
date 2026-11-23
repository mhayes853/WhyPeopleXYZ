<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Good Human Tools Aren’t Always Good Agent Tools",
    date: "11/9/26",
  };
</script>

<p>
  One of the most common ways I’ve seen people treat agents is as
  “virtual coworkers” or some other virtual substitute for humans. For
  many tasks, this dynamic is real, but I wouldn’t call it the right
  optimization target. I think the best tools for agents replace human
  effort as a secondary consequence of agents simply being able to do
  things that humans cannot.
</p>
<p>
  For example, even the largest companies with the best engineers
  probably wouldn’t rewrite
  <a href="https://github.com/pingdotgg/ts-rust">TypeScript in Rust</a>,
  but <a href="https://x.com/theo">some guy</a> with 7 Claude Ultra
  subs (at the time of writing this lol) did it for a small team. In
  this case, agents simply did something that no human team outside of
  the TypeScript core team itself could feasibly do on their own.
</p>
<p>
  The other major category confusion here has to do with context windows
  and transformers, which most people don’t have much real understanding
  of. Attention itself is a mechanism that is designed to essentially
  find as many correlations between tokens as possible, which are then
  solidified as facts by an MLP layer (nonlinearity) in the transformer.
  If a human can hold 7–10 things in their working memory at a time, an
  LLM can hold at least 100x more.
</p>
<p>
  The difference is that many of the “working items” in the context
  window of an LLM are rather minuscule compared to the “working items”
  that humans deal with. In essence, think about a model that must
  generate an image by explicitly crafting every single pixel. This is
  actually a scaling issue with LLMs, which is why researchers like Yann
  LeCun have proposed that things like world models are necessary to
  reach human-level intelligence. LeCun uses the example that an average
  teenager can learn to drive in ~20 hours while today’s state-of-the-art
  models aren’t at level 5 FSD yet.
</p>
<p>
  For example, I’ll often hear that if humans cannot contribute to a
  codebase due to code quality issues, then agents cannot either. While
  code quality is certainly important, this statement misunderstands
  transformers. Sure, agents may struggle a bit more when dealing with
  poorly written or tangled code, but they absolutely <em>can</em> make
  sense of it and contribute to it. Simply put, understanding bad or
  tangled code requires having many things in your head at once, and
  agents can hold far more things than humans.
</p>
<p>
  I also treat library/framework/API design in the same vein. A framework
  that provides a nice API to humans may not be the best API for agents,
  as agents often need more tools to validate their work. In fact, I
  wouldn’t mind shipping a more verbose API for a framework today if it
  provides appropriate backpressure to agents. Just look at
  <a href="https://effect.website/">Effect</a> and tell me if you would
  want to write that kind of code by hand. (This is also why DHH is a
  fan of Rust all of a sudden. I agree that Rust is annoying for humans
  to write, but this is not a major concern when agents are writing the
  code.)
</p>
<p>
  In essence, I wouldn’t be thinking directly about how we work as
  humans and how to replicate that with agents. Rather, I would think
  about what kinds of work agents can do that humans cannot. Human
  replacement would be merely a secondary effect of the fact that agents
  are uniquely capable of performing various tasks.
</p>
<p>— {metadata.date}</p>
