<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "What I use Various Models For",
    date: "8/29/26",
  };
</script>

<p>
  Some people asked about this today, so I thought I would share this
  simple note with everyone. I often run models mostly on medium or high
  reasoning, with an occassional xhigh for more difficult tasks.
  Usually, I find dimishing quality returns beyond high compared to the
  usage costs.
</p>
<p>
  <strong>GPT 5.6 Sol</strong> - Used for most day-to-day code that
  needs to be written, and that isn’t extremely special or
  UI-design related in any way. I find it’s also good at finding
  bugs, and doesn’t try to surface every tiny thing under the sun
  (unlike Opus 5). This is my go-to model for most tasks.
</p>
<p>
  <strong>Fable 5</strong> - Used for the hardest tasks, this is
  certainly the best model for coding. However, it eats the most usage
  by far, especially when used on high reasoning. This is my go-to model
  for starting any new complex feature, architectural work, or difficult
  endeavor.
</p>
<p>
  <strong>Opus 5</strong> - The secondary model for most day-to-day code
  that needs to be written to help balance out Codex usage, except it
  handles UI-design, performance optimizations, and low-level concerns
  better than Sol. It’s also my go-to model for vibe-coded UI
  prototypes because it doesn’t eat nearly as much usage as Fable.
  I don’t like talking to this model though, and prefer Sol where
  possible.
</p>
<p>
  <strong>Sonnet 5</strong> - Good for chatting with on claude.ai since
  Opus speaks in intolerable ways, and I would like to conserve Fable
  usage for actual coding tasks. (Most chats are very simple tasks
  compared to code, so Fable isn’t really needed there anyways.) I
  also use it to fix simple issues, especially for putting in a loop to
  fix simple CI usage without using much of my 5 hour window usage.
  However, I wouldn’t use this model if it wasn’t subsidized
  by my Claude Subscription.
</p>
<p>
  <strong>GPT 5.6 Terra</strong> - This is a weaker Sol, and honestly
  I’ve had weird behavior from it. It can handle many coding
  tasks, but it’s only really useful if I need to conserve Codex
  usage for some reason.
</p>
<p>
  <strong>GPT 5.6 Luna</strong> - I use this mainly for simple analysis
  tasks, solving merge conflicts, fixing simple bugs, simple
  discussions, or incredibly simple features. It uses basically no usage
  at all, in fact I actually “fall behind” my usage pace
  when using it heavily. If you use CodexBar, this means the “X%
  in reserve/deficit” actually gains percentage instead of losing
  percentage on the weekly usage meter.
</p>
<p>
  In the past, I’ve also used open weight models (MiniMax M3) for
  the same kinds of tasks that I today hand to Sonnet and Luna, but I
  hold no subscriptions to those labs for the moment. However, this may
  change depending on how the compute crisis affects subsidization.
</p>
<p>— {metadata.date}</p>
