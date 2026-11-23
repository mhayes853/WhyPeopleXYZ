<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Updated Model Usages",
    date: "9/27/26",
  };
</script>

<p>
  It’s been a month since I last revealed how I was using each model.
  Some new big ones have dropped ever since, so it’s time to update the
  list.
</p>
<p>
  <strong>Fable 5.1</strong> - The hardest tasks, and also long-running
  tasks that require a lot of subagents. A great example of the former
  is discussing a new performant architecture that supersedes the
  existing one that’s being used in a project. The latter is useful for
  “Analyze the repo, fix trivial issues, simplify the code, surface more
  complex problems for discussion, etc.” requests where Fable acts as
  an orchestrator for Opus subagents. Also, when starting new UI work, I
  usually use Fable for the first pass.
</p>
<p>
  <strong>GPT-6 Astra</strong> - I mostly use this for long-running,
  difficult iOS-specific work, computer use stuff, difficult API design,
  and for long-running tasks that require a lot of subagents. I actually
  find Astra better than Fable at “systems-level” kinds of tasks (eg.
  Architecture), but it loses to Fable on UI, coding, and performance
  work. It also has a tendency to introduce weird markdown files that I
  didn’t ask for.
</p>
<p>
  <strong>Opus 5.5</strong> - My go-to model for most tasks right now,
  especially UI-related things. I actually defended Opus 5 during its
  time, so I will just say that Opus 5.5 is much better.
</p>
<p>
  <strong>GPT 6 Sol</strong> - My go-to model for most iOS-related work
  right now, as it’s kind of like the Opus 5.5 of that. Other than that,
  I find Opus 5.5 usually performs better than it elsewhere. That being
  said, it’s still a useful model, especially when I’m hitting the usage
  limits for Claude.
</p>
<p>
  <strong>GPT 6 Luna</strong> - Simple analysis tasks, fixing typos,
  doing stuff in terminals, etc. This is my go-to model for light work
  that usually isn’t code-related.
</p>
<p>
  <strong>Sonnet 5</strong> - I’m not actively using this model right
  now. However, before Opus 5.5 I briefly experimented with using it as a
  “compactor” model for stale sessions on larger models, especially for
  Fable. This would prevent me from resuming a stale session with 300k+
  tokens using Fable, and thus would save some usage without a noticeable
  quality loss. I now use Opus 5.5 for this kind of task, but perhaps
  Sonnet 5.5 will be more useful in this capacity, or for workflows that
  require many dozens of subagents instead of just 1-5.
</p>
<p>
  All in all, I think Anthropic made quite the comeback here. That being
  said, I don’t worship models, and I think pretty much every model on
  this list can at least handle trivial issues on their own.
</p>
<p>— {metadata.date}</p>
