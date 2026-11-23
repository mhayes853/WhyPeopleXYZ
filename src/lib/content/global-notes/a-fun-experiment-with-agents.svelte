<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "A Fun Experiment with Agents",
    date: "8/24/26",
  };
</script>

<p>
  As a result of something edge-inference-related that I’m working
  on, I’ve decided to do some rearchitecting of my Swift Stream
  Parsing library that I initially released in January. For context, its
  design goal was to provide convenient parsing interface for
  incremental parsing (ie. Being able to extract a value from incomplete
  JSON), which is necessary when streaming structured output from LLMs.
</p>
<p>
  The interface was convenient to use, but very slow. In fact, it only
  seems to traffic ~2-3 MB/s on an M1 Pro chip, which is pitifully slow
  compared to modern SAX parsers that reach 100s of MB/s or even &gt;1
  GB/s for a similar chip. Despite that, the library was still 2x faster
  than completing the incomplete JSON into a full JSON string, and then
  parsing the full completed string (which is the approach
  PartialJSONDecoder takes).
</p>
<p>
  That being said, why was the library so slow? The primary bottleneck
  was the KeyPath based architecture that it took. Normally, Key Paths
  can be optimized as simpler pointer offset lookups at compile time.
  However, when you add computed property transformations, and a damn
  trie to track nesting depth, I’ll leave it to you to guess if
  those optimizations still apply (hint: not even close). Furthermore,
  the parsing logic itself was branchy, processed one byte at a time,
  and had all sorts of other existentials and closure indirection mixed
  in. Needless to say, it was very slow and I wanted to do something
  about it, but just never had the time.
</p>
<p>
  That was until I experimented with throwing Opus 5 at it a couple of
  weeks ago (I think this model is a bit over-hated personally) just to
  see what would happen. The result, I got
  <a href="https://github.com/mhayes853/swift-stream-parsing/pull/11">addicted</a>, and am now using Opus, Fable, and occasionally Sol to hill climb
  this parser into trafficking gigabytes per second in (mostly) pure
  Swift. I’ll eventually have a full detailed technical write-up
  once everything is done. Suffice to say it will be much longer than
  one of these notes.
</p>
<p>
  Regardless of performance optimizations, there are 2 broader takeaways
  from agents that I would like to bring up:
</p>
<ul>
  <li>
    I would never have had the time to work on this if I had to do
    everything by hand, and I can work on other projects in parallel.
  </li>
  <li>
    Agents can write optimized code if you know how to direct them.
  </li>
</ul>
<p>
  There are more broad takeaways that I can write about, such as how we
  can now focus more time into engineering (which has always been
  lacking in software compared to other fields) instead of just code
  writing. However, that’s a rabbit hole that would take much
  longer to write about because there are negatives too. That piece
  would largely be about overcoming those negatives instead of
  dismissing agents altogether because of them.
</p>
<p>— {metadata.date}</p>
