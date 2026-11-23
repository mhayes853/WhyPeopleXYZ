<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Language Fungibility",
    date: "5/15/26",
  };
</script>

<p>
  Programming languages are becoming more like components of the system
  these days rather than the life-blood of a system. Further, my
  previous note goes over how to learn them with great efficiency, and
  addresses many of the common arguments against giving new learners
  access to agents.
</p>
<p>
  Given that Bun was recently ported from Zig to Rust in a matter of
  weeks, it's more clear now than ever that language choice is becoming
  much less of a decision that locks the life-blood of your project. My
  experience also shows this, where I've been able to write a module in
  one language, and then tell an agent to create a version of the module
  in another. So far, this kind of transpilation hasn't failed me, and
  if it can work on something performance sensitive like Bun, then it
  can work for traditional libraries as well.
</p>
<p>
  I've also had it work for other things like adding new formats to my
  <a href="https://github.com/mhayes853/swift-stream-parsing">stream parsing library</a>
  where I had an agent derive the YAML parser by looking at the
  implementation of the JSON parser. It turns out, the mechanics of
  parsing were very similar minus the obvious syntax differences between
  YAML and JSON. In fact, earlier agent attempts would even transpile
  the YAML to JSON, and then call the JSON parser!
</p>
<p>
  That being said, this transpilation technique only works if you've
  figured out the architecture and design quirks of your system. I
  wouldn't pair a transpilation task with re-architecting using an
  agent. This is a setup for a lot of pain.
</p>
<p>
  Something I would like to see however is what would happen if you
  asked the agent to translate Bun's new Rust port back into Zig?
  Intuition tells me that this is likely a lossy compression algorithm,
  and that the original Zig code would be better of the the transpiled
  Zig code. However, there's no way to definitively prove that case.
</p>
<p>
  <em>This note, without mentioning anyone in particular, may or may not
    be addressed at a certain group of individuals who have claimed that
    they will rewrite their project in Rust, but have not yet done so.
    It is an exercise left to the reader to determine that group of
    individuals, and to motivate them to do so.</em>
</p>
<p>— {metadata.date}</p>
