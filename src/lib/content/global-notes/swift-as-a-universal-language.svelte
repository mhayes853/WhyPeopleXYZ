<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Swift as a Universal Language",
    date: "8/5/26",
  };
</script>

<p>
  C and C++ generally can run on all major platforms and embedded
  devices, and as such I would call them “universal
  languages”, in the context of mainstream languages. For the
  purposes of this note, “universal” will mean “runs
  anywhere important” and compiled. I’m avoiding interpreted
  languages since they often can’t run in the performance
  intensive environments, and they usually delegate those tasks to
  compiled languages.
</p>
<p>
  Despite the universality, C and C++ are quite antiquated, which leaves
  Rust as the more modern alternative with the same universaility. That
  being said, from my experience, Rust’s model tends to work well
  for lower-level systems that need to get things right, but this model
  tends to be more obstructive for higher-level business logic. In
  essence, I’m not a fan of the 3 most “universal”
  languages being limited by design (C), having invisible footguns
  (C++), and being obstructive (Rust). I’ll also be transparent
  and state that I have not tried Zig, Odin, or Jai at the time of
  writing this (though Zig is on the bucket list), but from the looks of
  it each would fall into one of those aforementioned categories.
</p>
<p>
  Do I hate manual memory management or excessive ownership/lifetime
  enforcement? No, but I generally think the amount of usefulness of
  those features is limited outside of low-level/systems programming
  scenarios. It just gets in the way for higher-level scaffolding and
  business logic, which happens to be the majority of code even in
  systems that have a performance intensive hot path.
</p>
<p>
  This brings us to Swift, which is compiled, has optional ownership and
  lifetime semantics, direct interop with C (and C++ to an extent),
  ability to do manual memory management through unsafe pointers, and
  most importantly can actually run outside the Apple ecosystem. In
  particular, even though it does many “hidden allocations”,
  I like that I can opt into the lower-level constructs as needed and am
  not forced to use them by default.
</p>
<p>
  However, there are many problems with Swift outside of the Apple
  ecosystem, like good tooling. Furthermore, much of the package
  ecosystem only works on or is designed for Apple platforms
  specifically, and don’t realize the costs of
  <code>import Foundation</code> (many of my recent notes show that this
  has an adverse effect on binary sizes for WASM). There are also a few
  more issues here like being forced to use <code>@available</code> on
  Apple platforms, as well those APIs not being back-deployable to older
  Apple OS versions. (<code>Mutex</code> being gated to iOS 18+ has made
  me had to write a dedicated cross-platform <code>Lock</code> type so
  many times.) There’s also no SPM support for dynamic libraries
  outside of XCFrameworks, which has been a bit of an issue for me
  recently when trying to depend on ONNX.
</p>
<p>
  That being said, agents can actually make fixing some of these issues
  easier. Generally speaking, it’s become more and more possible
  to port libraries from one language to another, so it should be more
  possible to port libraries from other languages into Swift packages to
  help with the ecosystem problem. Better tooling though is a harder
  one, because while agents can speed up development, good tools are
  hard. Regardless, I think it will be more essential for languages to
  become more agent-friendly in the near future, until we find a way to
  get rid of languages all together perhaps.
</p>
<p>
  My recent notes obviously indicate that I am working on something
  heavily Swift related behind the scenes right now. That will be
  revealed soon, but know that I plan on using Swift for the entire core
  of this upcoming project (other languages are/will also be involved,
  but they will most likely just call into the Swift core), despite it
  being designed to run anywhere from Apple platforms to server-side
  applications to embedded devices. Honestly, this level of
  cross-platform support will probably warrant a dedicated polished
  write-up that would be out of scope for a single note.
</p>
<p>
  Another thing worth mentioning is that languages are more fungible
  these days (see Bun rewrite), and it’s easier to switch the
  primary language of any given project from one to another. If Swift
  doesn’t end up working out in the long run, I have no doubt that
  it will be possible to port to Rust or whatever else.
</p>
<p>— {metadata.date}</p>
