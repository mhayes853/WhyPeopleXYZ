<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Meaning Per Second (2/N)",
    date: "5/21/26",
  };
</script>

<p>
  This
  <a href="https://mikeveerman.github.io/tokenspeed/?rate=76.5&amp;mode=text">site</a>
  shows various token decode speeds visually from an "average" (they all
  differ, but those differences don't matter for this) BPE-style
  tokenizer. Try playing around with the speeds a bit.
</p>
<p>
  What becomes strikingly clear is that at a certain point the
  bottleneck becomes your eyes if you watch the stream visually, and you
  cannot process text being decoded that quickly (also notice that your
  eyes will try to "fill in the gaps" when line breaks for paragraphs
  are decoded). In that sense, the rate of visual streaming should not
  reasonably be the same as the decode speed in application code. So
  when it comes to communicating meaning in a visual throughput context,
  the ratio of meaning to throughput matters much more than the raw
  throughput and raw content separately.
</p>
<p>
  A lot of this can also be foreshadowed as to what an ideal
  representation would be. That is, a representation that conveys visual
  meaning, that can be incrementally expanded and explored in real-time,
  and can be formed reasonably quickly. Throwing LLMs at this problem
  isn't the full answer. Something different is needed, especially for
  edge use cases.
</p>
<p>— {metadata.date}</p>
