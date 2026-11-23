<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Meaning Per Second",
    date: "3/5/26",
  };
</script>

<p>
  When it comes to LLMs, we like to think of the idea of tokens per
  second almost as a measure of quality in many cases. I suppose this is
  similar to the focus on frames per second for graphics contexts.
  Though, I think what I’m noting here applies a more to the LLM case
  than it does the graphics case, it is applicable to the graphics case.
</p>
<p>
  One interesting Alan Kay (or perhaps Xerox PARC) observation with
  regards to performance is the idea that the bar is the speed of the
  human nervous system. That is, as long as the human nervous system
  doesn’t notice delay, then all is well and good. For graphical
  contexts like those worked on at PARC, this makes a lot of sense.
  However, LLMs are also often paired with graphical contexts, and thus
  the human nervous system becomes the bar for speed yet again.
</p>
<p>
  First, there are generally 2 kinds of speed metrics that we need to
  worry about for inference, prefill and decode. Prefill relates to
  forwarding tokens and building up the KV-cache, whereas decoding uses
  the KV-cache to generate output tokens. Generally speaking, decode is
  the more interesting measurement when we think about tokens per
  second, and especially so in the context of user interfaces.
  Prefilling can be hidden in the background for many applications, of
  which such background work can be used to significantly reduce latency
  to the first decoded token.
</p>
<p>
  Secondly, we need to establish a base rate of speed for the human
  nervous system. Movies use 24 FPS as a baseline, but modern
  interactive user interfaces use 60-120 FPS. That being said, a
  user-interface is often still useable even if it dips slightly below
  that range, as long as the nervous system still perceives the
  interactivity as motion. If we use 60 FPS as a base rate, that leaves
  us about ~16.67ms between each frame.
</p>
<p>
  Third, we need to consider what it means for a model to emit a token,
  and for a frame to be drawn to the screen. Each token or frame is
  generally used to build up a larger communication of some kind, such
  as the words of an essay or the strokes of a drawing. Of course, the
  most important substantial transfer in any communication is
  <em>meaning</em>. Without being able to convey the meaning of
  something, communications become misunderstood.
</p>
<p>
  What this all means is that we have ~16.67ms to emit meaning in any
  given scenario. Translate that into 60 TPS, and we’ll see that such a
  speed is already relatively common for LLMs today. Therefore, we
  already have the means of beating the nervous system from a raw
  throughput perspective.
</p>
<p>
  However, let’s take a moment to note the difference in output between
  graphics and LLMs. LLMs generally emit text, where as graphics emit
  pictures. This creates another bottleneck for LLMs, because human
  minds absorb meaning from pictures much faster than words. Today’s
  diffusion models are of course obviously not up to that level of
  speed, and it’s likely they won’t be for another few iterations of
  Moore’s Law (Perhaps one can buy their way into the future here
  similarly to Xerox PARC).
</p>
<p>
  Therefore, if we want to communicate in pictures today using an LLM,
  our best approach from an engineering standpoint is to translate the
  output tokens into pictures. However, once we start thinking in terms
  of pictures, we stop thinking in terms of TPS, but rather a rate of
  meaning per token. That is, how much can a token translate to the
  right picture? Further, we only have ~16.67ms to do so as a base rate.
</p>
<p>
  So we can see that changing the medium of communication itself brings
  us different design and necessary throughput constraints. Pictures as
  a medium have a higher throughput than words for certain kinds of
  meaning, but words often win when it comes to precise formal meaning.
  Regardless, if the point of all of this is optimization, then perhaps
  “meaning per second” should be the optimization slogan.
</p>
<p>— {metadata.date}</p>
