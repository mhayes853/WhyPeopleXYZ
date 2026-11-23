<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "What Value do Frameworks Have?",
    date: "9/29/26",
  };
</script>

<p>
  If you’ve been following DHH recently, you may describe his recent
  behavior as “going off the rails”. Jokes aside, it’s certainly been
  entertaining to watch him recently, regardless of how you perceive
  him. Though you may perceive him positively or negatively, it’s
  certainly true that in a talk at a Rails conference, he was very
  enthusiastic about migrating to Rust from Rails. I’m not here to
  comment on that migration specifically, as I know nothing about Rails,
  and have only written a little bit of Rust. Rather, I’m considering
  what kinds of abstractions make sense with agents that may or may not
  have been desirable for humans.
</p>
<p>
  Libraries and frameworks have traditionally been designed for humans,
  but obviously these design priorities are misaligned if humans don’t
  write much code anymore. In particular, many common frameworks, like
  React or SwiftUI, were mostly designed to handle code organization
  around reactive UI applications. Building reactive UIs without such
  frameworks meant writing code to handle things like bindings to views,
  state management, re-rendering, etc. Writing such code imperatively
  (eg. Vanilla JS, UIKit) is not necessarily hard, but rather tedious
  and error-prone for a human, which is why the reactive frameworks
  abstracted that away.
</p>
<p>
  However, if code can be cheaply written by agents, then perhaps the
  better solution is to just instill the patterns of such frameworks
  directly into the models then. World models could be the best at
  adopting this in fact. I suspect that DHH may believe this if he was
  willing to migrate off his own framework. Though, I suppose this kind
  of thinking doesn’t account for the formal verification mechanisms
  that would need to be added to a codebase that a framework like React
  gives you by default. (ie. The framework API inherently prevents you
  from “not updating the UI” when a stateful value changes.)
</p>
<p>
  So if it’s simply more economical and performant for an agent to write
  the UI in imperative code, or for an agent to write its own REST system
  directly on top of HTTP, then what value do libraries and frameworks
  actually provide? If you look at DHH’s $10 rewrite of Campfire in
  Rust, you’ll still
  <a href="https://github.com/basecamp/once-campfire-rust/blob/main/Cargo.toml">see</a> quite a lot of third-party crates being used, including Axum as the
  primary HTTP framework! In fact, many of these crates, like the
  <code>tempfile</code> crate, are actually quite small. I’m sure an agent
  could generate that code to a working degree if asked and iterated
  upon, yet it seemingly still chose a dependency instead.
</p>
<p>
  As a thought experiment, let’s assume that agents can write direct
  assembly optimally. That is, they actually become smarter than the
  various Rust/C compilers, which they seemingly are not currently. Do
  you really think we won’t need reusable software? Sure, it may be
  written in the form of a static archive or shared object, but the
  reason we isolate components in the first place is so that they can
  solve a general problem very well. Biology does this already, and it
  scales to trillions of cells in a single system. In that sense, such
  design principles don’t go away even if traditional programming
  languages aren’t used.
</p>
<p>
  I do think the bar for what makes a good library or framework today is
  a bit different. Generally, it seems to now be more about what kind of
  technical/domain complexity it encapsulates more so than guiding
  humans to write proper code. Though the guidance aspect and API design
  are important and cannot be ignored, they’re also not enough value to
  justify its existence alone. Otherwise, an agent can simply generate a
  more tailored version for a specific system.
</p>
<p>
  An example of technical complexity would be something like SQLite,
  cryptography, standard algorithms that need every ounce of
  performance, etc. An example of domain complexity would be things like
  dates and time zones (Whatever happened on November 18th, 1883 at
  12:00 PM in the US and Canada is my arch nemesis, and you have no idea
  what kind of BS this damn date has brought upon my pitiful existence.),
  common standards (eg. HTTP clients, <code>DLTensor</code> for ML inference
  engines, etc.), or dealing with tedious things that are constantly
  changing externally (eg. Payment processors or other things that may
  or may not involve human bureaucracy of some kind).
</p>
<p>
  Whether or not these systems are shipped as SDKs in today’s
  languages, APIs over the network, or as static binaries and shared
  objects is just an optimization for the underlying execution/build
  environment. Likewise, the presence of agents writing machine code
  does not mean that “programming is solved”, but rather that the means
  of doing it are different and often targeted at solving larger-scale
  problems. This is one of many reasons why I believe the engineering
  bar is going to be much, much <em>higher</em> tomorrow than it is today.
</p>
<p>— {metadata.date}</p>
