<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Notes on Vibe Coding for Software Engineers",
    date: "12/8/25",
  };
</script>

<p>
  Most people using vibe coding tools like Lovable or Bolt are not
  software engineers, but rather more ordinary people with ideas (there
  just aren’t 10s of millions of software engineers in the world that
  would all willingly use those tools lol). I’m not addressing those
  people with these notes, but rather us who aspire to or write more
  critical software systems.
</p>
<p>
  First and foremost, the biggest problem currently with these tools for
  those trying to build systems as that the tools aren’t designed to
  augment thinking but rather automate creation. From a systems
  understanding standpoint, this can be disastrous, and as such it’s
  hard to use these tools directly for systems understanding purposes.
  This is quite a let down, and is something that I hope to address
  through future work.
</p>
<p>
  However, that doesn’t mean these tools are absolutely useless, and
  surely they do make one “more productive” if used correctly. By “more
  productive”, I don’t necessarily mean just a faster shipping pace, but
  rather a combination of speed and enhanced output (ie. Less “breaking
  things” while keeping the “moving fast” part). The enhanced output
  part is what we need to focus on, and is what can make us stand out
  compared to just those who focus on speed.
</p>
<p>
  The key thing to note is that right now the tools have been primarily
  focused on code generation, but for most technical work that’s maybe
  ~10%-20% of the entire battle. A lot more work is needed to
  “understand and design processes” in a specified environment which
  includes, but is not solely limited to the programming languages used
  in the system.
</p>
<p>
  Of course, if you repeatedly implement the same or highly similar
  simple technical designs (eg. Simple CRUD operations, UI components,
  etc.) over and over again for different features or systems, this
  repetition is ripe for automation with AI. Even such, you still need
  to spend time understanding exactly what was generated to avoid
  problems down the line.
</p>
<p>
  In 2024 (before the term “vibe coding” was coined) I spent the later
  part of 6-8 weeks building and refining an internal tool for test
  automation in Rust. A lot of this time was spent implementing a custom
  DSL, implementing a code generation pipeline, and building a custom UI
  framework for Slack due to the large amount of views the tool needed.
  These are tasks that are more novel, and tend not to be suited to
  today’s AI tools.
</p>
<p>
  However, another large chunk of time was spent writing more typical
  database queries, network calls, and the individual Slack UI
  components themselves. These are quite repetitive and simple tasks,
  and I imagine a rewrite with today’s AI tools could have saved a lot
  of time on this part.
</p>
<p>
  So in my experience, most CRUD operations and pure UI views can be
  quite automateable depending on the circumstances. On a personal note,
  it seems that I would have more fulfillment working on systems that
  are more than just CRUD and UI views in that case. For instance, most
  library code I write tends to have more novel traits and requires more
  precision, so I’ve found AI tools to be way less useful there.
</p>
<p>
  Though another set of cases that I’ve found vibe coding to be useful
  relates to one-off tools, prototypes, and scripts that accomplish a
  single simple task (one tool
  <a href="https://spiketime-compute-engine.lovable.app/">example</a>
  that’s visible) that supports the development of the larger system.
  Instead of spending potentially hours building an entire UI for an
  incredibly simple tool, it’s much easier to just ask Lovable to do the
  job for me so that I can get on with doing the more interesting design
  work.
</p>
<p>
  Though overall, for more difficult systems the bottleneck usually
  isn’t the code, but rather the design or human element. In cases like
  these, I do think the culture tends to exaggerate how positively
  impactful AI is.
</p>
<p>— {metadata.date}</p>
