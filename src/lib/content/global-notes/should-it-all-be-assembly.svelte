<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Should it all be Assembly?",
    date: "9/25/26",
  };
</script>

<p>
  If humans aren’t writing and reading as much code anymore, surely we
  can just write everything in assembly, and it will therefore be the
  most performant and compact it could possibly be. Yet, assembly
  languages were also designed for humans in the first place, so I think
  something else would be more ideal here for agents.
</p>
<p>
  One of the biggest problems here seems to be what information and
  inferences can be derived from attention. Generally, assembly
  languages are about expressing pure machine instructions, and not
  about describing systems. With this in mind, a lot of work will likely
  be needed to gather and train transformers to write these kinds of
  systems from a general level. Not to mention that the same verification
  mechanisms that exist in many compiled languages today are not present
  in pure assembler. Running the program and measuring the output will
  be the only way to know if something works generally.
</p>
<p>
  Another thing to consider is that assembly languages are architecture
  specific, so an agent would have to write and maintain separate
  implementations for each CPU architecture in the system. This has
  massive implications on token costs, and overall volume of information
  to maintain. WASM is a standard around this, but is WASM really the
  best target here?
</p>
<p>
  That being said, the idea of using a more compact/bare-metal language
  for the implementation side of software seems plausible. I think
  generally, it can be viable for common algorithms/stable infrastructure
  to use assembly, while the rest of the system uses a slightly higher
  level agent-centric language that adopts more of a “write once,
  compile anywhere” philosophy. Also, I think a dynamic standard,
  perhaps a more agent-suitable kind of WASM that’s self-hosted (ie.
  Implemented in itself), could work here as well (eg. Squeak Smalltalk
  was self-hosted and runs bit-equivalent on 22 platforms).
</p>
<p>
  Lastly, we have the understanding problem. Surely, it wouldn’t be
  viable for humans to understand every line of assembly, as most can’t
  read assembly. That being said, only time can tell here with regards to
  how much of the actual implementation will need to be read by humans
  in the future. I will make no predictions on that front.
</p>
<p>
  In summary, I don’t think it would be ideal to make agents write
  entirely in existing assembly languages. I think a language more
  descriptive for agents that’s closer to bare metal than Rust would be
  more ideal. In other words, it would be a “most of the performance of
  raw assembly for agents” kind of language perhaps with a way to ship it
  and run it dynamically. This language can then call routines written in
  assembly for common algorithms and other code that doesn’t need to
  change much.
</p>
<p><strong>Update (9/27/26)</strong></p>
<p>
  I mostly wrote this because of DHH’s recent work on
  <a href="https://github.com/omacom/ttfx">ttfx</a> and his subsequent
  claims of having agents “drill all the way down to the bare metal”
  (ie. They will eventually write assembly or microcode even). His
  initial x86_64 assembly
  <a href="https://github.com/omacom/ttfx/pull/35">implementation</a>
  seems to have achieved a ~10x speedup over the original Rust version;
  however, a subsequent
  <a href="https://github.com/omacom/ttfx/pull/47">PR</a> managed to
  gain slightly more performance by porting back to pure Rust using a
  different approach. DHH merged this and subsequently removed the
  assembly implementation.
</p>
<p>
  I also ran a
  <a href="https://github.com/mhayes853/swift-uuidv7/tree/t3code/add-arm-neon-uuid-assembly/Sources/UUIDV7Assembly">brief experiment</a> using Opus 5.5 on XHigh on my
  <a href="https://github.com/mhayes853/swift-uuidv7">swift-uuidv7</a>
  library, where I asked the model to write assembly versions for ARM
  NEON and x86 (via AVX2) for encoding UUIDs to strings, decoding UUIDs
  from strings, and random UUID generation. For encoding and decoding,
  this led to massive speedups over the existing Swift implementations
  (24x for decode, 12x for encode on ARM, with similar numbers for x86),
  but for UUID generation the performance was actually better with a
  more optimized Swift version.
</p>
<p>
  The original Swift code for encoding and decoding wasn’t very well
  optimized, so I also had Opus briefly write an optimal Swift version,
  and it decided that a SWAR approach was better than SIMD due to how
  the <code>SIMD</code> types apparently lower to assembly in Swift. The
  SIMD-based assembly versions were still about ~1.5x faster on decode
  and ~1.2x faster on encode for both architectures.
</p>
<p>
  For myself, I only briefly looked at the resulting code for
  curiosity’s sake, and didn’t try to guide the model too much or give
  it any specific optimizations to try. I suspect making the experimental
  branch production-ready would require more work involving more direct
  guidance.
</p>
<p>
  That being said, it’s cool that there’s a black-box way of making the
  average code faster, I guess, as it’s just a prompt away seemingly.
  With that in mind, there are some considerations from this experiment,
  and with what happened on ttfx:
</p>
<ul>
  <li>
    The compiler is probably smarter than agents in many cases for now.
    <ul>
      <li>
        This depends on the language and the problem, but I think the
        assembly approach seems to benefit most if you’re working on
        something that can be SIMD-accelerated or where you have proof
        that the compiler isn’t being smart.
      </li>
    </ul>
  </li>
  <li>
    Trying to write a more portable optimization in your language first
    before resorting to assembly is certainly wiser.
    <ul>
      <li>
        Both cases we’ve talked about seemingly started from
        suboptimal Rust/Swift rather than from optimized code that was
        approaching its theoretical maximum performance.
      </li>
    </ul>
  </li>
  <li>
    Even a well-optimized assembly implementation will likely only yield
    marginal gains over an optimal implementation in a higher-level
    language.
    <ul>
      <li>
        I would consider this for maintainability at the moment, since
        resorting to assembly means a portability loss.
      </li>
      <li>
        This is also partially what I mean by “it can be viable for
        common algorithms/stable infrastructure to use assembly” while
        more traditional application code sticks with higher-level
        languages. The former kind of code rarely changes, is typically
        easy to verify, and is typically deterministic. Therefore, the
        quantity of platform-/architecture-specific implementations
        doesn’t matter as much.
      </li>
    </ul>
  </li>
</ul>
<p>
  It’s worth expanding on the portability point and mentioning that a
  lot of optimized algorithms written in higher-level languages are also
  non-portable, except that it’s easier to abstract over non-portability
  in higher-level languages. In this sense, I can see assembly being a
  route for non-portable code if and only if the compiler isn’t smarter
  than the agents and yourself. Getting the agents over that bar will
  seem to take some work, but I wouldn’t be surprised if it happened.
</p>
<p>
  After the “intelligence bar” is cleared here, I would suspect the
  next major limitation would be economic factors before “everything in
  assembly” is viable, given the need to have a separate implementation
  of the system for each supported architecture.
</p>
<p>
  Debatably, the last bar is the human understanding bar, which, to be
  honest, I don’t think will be a primary consideration, as I’m sure
  looking at assembly is probably not the most productive activity (or
  even a possible activity) for the vast majority of people. So, what I
  mean here is “how humans will know and interact with the emergent
  properties” of the underlying implementation. This is where I see “a
  new kind of code” becoming a thing, and that kind of code is not
  limited to a textual language.
</p>
<p><strong>Update (9/28/26)</strong></p>
<p>
  I asked Opus 5.5 to rewrite the assembly versions of my UUID
  algorithms in pure C. The throughput actually came out slightly
  better (~1-2%) with the C version on ARM NEON, while remaining
  virtually the same on x86 with AVX2. From my inquiries, Opus 5.5
  concluded that the inlining behavior from the Swift build system was
  simply “nicer to C” than assembly.
</p>
<p>
  So, seemingly, there still seem to be ways to go here, at least in
  terms of being smarter than the compiler.
</p>
<p>— {metadata.date}</p>
