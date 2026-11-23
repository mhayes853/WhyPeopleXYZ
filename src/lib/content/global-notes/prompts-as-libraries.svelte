<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Prompts as Libraries",
    date: "1/27/26",
  };
</script>

<p>
  One other point I didn’t address in the “Future of Libraries” is the
  idea that prompts or specs themselves can be shared instead of source
  code. In fact, this has already been explored in practice (see
  <a href="https://www.dbreunig.com/2026/01/08/a-software-library-with-no-code.html">whenwords</a>).
</p>
<p>
  I think this idea highlights a problem with spec driven development
  and “plan mode” in agents, even though at the moment both of those
  things are a part of my workflow. The idea that the representation of
  the specification is different from the representation of the system
  itself is not something I’m a fan of.
</p>
<p>
  The problem with existing specifications and plans is that they are
  weak representations that can easily be misinterpreted by the model
  that carries them out. This is the same case for data transfer across
  the network as well, 2 clients will not always interpret the same JSON
  blob in the same manner, which can be quite problematic in some
  scenarios.
</p>
<p>
  Now, is the inherent idea of using plain English and/or markdown a bad
  idea for a unified representation? Not by default (unless we want to
  talk about whether or not Markdown is the right UI for something like
  this in the first place), but the key thing is that the plan itself
  should be an executable specification. That is, for any system the
  interprets and implements the spec should get a result consistent with
  its environment.
</p>
<p>
  Of course, there will need to be a representation of the spec
  somewhere that is more execution friendly, but that is an
  optimization. It is no different of an optimization as compiling a
  higher level language into machine code. Regardless, any good
  representation should ensure that the primary meaning of the
  information is kept (eg. A machine code binary keeps the same runtime
  meaning as the HLL source code).
</p>
<p>
  So in terms of sharing prompts instead of libraries, we have to ask
  what it means to share systemic meaning. Right now, sharing the source
  code preserves the intended runtime meaning, which may not always be
  the case for sharing a spec (which is more akin to sharing a JSON blob
  than a binary). Once again, reliability is a concern here.
</p>
<p>
  Though if the meaning needs to be slightly different in a specific
  context, the source code format may not be as necessary. Depending on
  the meaning variance, and what meaning is trying to be replicated,
  perhaps sharing a prompt is more suitable. However, I would suspect
  that the prompt would need to be altered to suit that new meaning.
</p>
<p>— {metadata.date}</p>
