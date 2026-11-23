<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Performant Code and Agents",
    date: "1/22/26",
  };
</script>

<p>
  Of all kinds of code that I’ve tried to get agents to write,
  performant code is by far the hardest. It’s easy to get it to spit out
  code for a parser or for some cool canvas effects in a web
  application, however if you don’t know how those things behave with
  heavy workloads it’s going to be quite rough.
</p>
<p>
  I’ve also seen it suggest false paths with respect to performance
  optimizations as well. For instance, in Swift Stream Parsing, the
  primary bottleneck is key path indirection in writing to a value on
  every single new byte, and the amount of branching from byte-by-byte
  parsing. This massively slows things down, and due to the specific
  nature of the library is completely unavoidable. That’s why I don’t
  recommend it as a replacement for <code>JSONDecoder</code> and
  <code>Codable</code>, but rather for very specific scenarios such as
  parsing structured output from an LLM.
</p>
<p>
  Yet the LLM will still try to come up with proposed speedups, possibly
  for the sake of making one feel competent. (eg. It came up with an
  approach that would cache a stack of appended key paths instead of
  recreating the path from scratch on every new value detected. It turns
  out that didn’t help all that much because the stack is often
  obliterated and recreated when entering/exiting objects and arrays.)
</p>
<p>
  Engineering knowledge is now more important than ever it seems,
  especially when dealing with a confident sounding LLM. Let’s not
  forget that.
</p>
<p>— {metadata.date}</p>
