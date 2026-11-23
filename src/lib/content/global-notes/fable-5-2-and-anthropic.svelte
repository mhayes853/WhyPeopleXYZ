<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Fable 5.2 and Anthropic",
    date: "11/10/26",
  };
</script>

<p>
  Another Fable model just dropped, so I played with it optimizing the
  <a href="https://github.com/mhayes853/swift-stream-parsing/pull/11">new architecture</a>
  of my streaming JSON parser library. After letting it run for 13 hours
  straight (while using subagents), and having it consume half my weekly
  Claude Ultra subscription usage, it was able to produce meaningful
  optimizations to the existing core parser on both the raw and typed
  sides.
</p>
<p>
  Would Opus 5.5 be able to achieve this? Probably, but maybe not to the
  same degree as Fable 5.2.
</p>
<p>
  Let’s say that Fable 5.2 gets any given task correct 99% of the time
  while Opus 5.5 has a 98% correctness rate. If given a scoped task of
  some kind, both Opus and Fable will likely have similar outcomes.
  However, if you give each model 100 tasks, then Fable will have a 2x
  higher correctness rate than Opus.
</p>
<p>
  A “task” itself is just a unit of work, and not directly tied to the
  number of turns in an agent thread. Therefore, a single turn in an
  agent thread could theoretically address multiple tasks at a time. So
  if even a ~30-turn thread covers 100 “tasks”, then the Fable success
  rate will have a noticeable effect.
</p>
<p>
  Another thing to note is that a “task” is often decided upon by the
  agent itself after the initial prompt. The more ambiguous the initial
  prompt, the more “tasks” the model has to determine. Fable is probably
  significantly better than Opus at that, which is once again where the
  main differences will show.
</p>
<p>
  Once again, I think Anthropic has extended their lead, so we’ll see if
  the next Astra release pulls OpenAI back into competition. I only use
  Codex right now to save on Claude usage (6.1 Sol works fine for many
  tasks), but ever since Anthropic removed the 5-hour limit on Ultra, my
  Codex usage has been quite limited.
</p>
<p>— {metadata.date}</p>
