<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Is One Shotting a Good Idea?",
    date: "2/1/26",
    anchor: "is-one-shotting-a-good-idea-",
  };
</script>

<p>
  If you’ve been using agents for a decent amount of time now, you’re
  likely familiar with a work flow that involves creating and iterating
  on some sort of detailed plan with the agent, and then delegating the
  implementation to the agent. Often, if the plan is well written
  enough, the agent can one-shot the implementation, meaning that no
  follow-up prompts are necessary.
</p>
<p>
  For lots of things, this is great, however I’m concerned about how
  much this impacts overall systems understanding. If you have an agent
  one-shot a major feature in a serious project, even if it works, is
  that really a good idea for long term maintenance?
</p>
<p>
  Of course, for throw-away prototypes or one-off vibe-coded things,
  this isn’t really much of an issue. My concerns are more related to
  dealing with larger and more complex systems that can’t simply be
  vibe-coded with a taking on a huge liability risk.
</p>
<p>
  Now, anyone who’s worked in an engineering team in the past has to
  constantly interact with and review code they did not write. Often,
  you will have to make edits to code that you didn’t write, so most
  code needs generally would need to be written in a manner that allowed
  anyone to jump in and figure out what was going on.
</p>
<p>
  This is far more important with agents. In fact, I’m now starting to
  lean towards having agents write Uncle Bob style small functions
  because it’s easier to understand the higher level ideas in the code
  from a quick glance. Since the output stream from the agent goes by
  quickly, this glanceability is incredibly vital, but is also
  incredibly helpful if you need to dive in manually.
</p>
<p>
  However, if you’ve read any of my “Clean Code is Good UI Design”
  notes, you’ll know that part of the reason others dislike the small
  functions style is because of the notion of jumping back and forth
  between different functions in their editor. In today’s world with
  agents, there’s simply so much more code that is being produced, and
  the existing CLI tools are far more limited than most editors when it
  comes to reading code. It’s a complete downgrade in visibility which
  is not at all ideal.
</p>
<p>
  If you have an agent one-shot a complex feature, how much do you
  understand about the internals of the generated feature? This isn’t
  necessarily related to how much of the code do you understand, but
  rather how much of the architecture you understand. Given the way the
  existing CLI tools are designed (ie. Showing text linearly from top to
  bottom instead of relationally side-by-side), it’s quite easy to gloss
  over a seemingly competent plan, tell the agent to implement it, and
  go about your day once it finishes.
</p>
<p>
  However, if you implement the feature by using the same plan-execute
  flow on smaller parts of the feature, it may take longer and more
  tokens to generate because you’ll need more iterations. However, the
  result will likely be a better systems understanding of the feature
  because going through each step required you to make conscious
  decisions. Again, this doesn’t even mean reading the code necessarily,
  but more so having a say in the overall architecture.
</p>
<p>
  Generally speaking, I think this is largely a UI problem caused by the
  fact that existing agentic tools are focused on a top down view of
  text where one reads the text linearly from top to bottom. Yet, the
  hardest parts of systems design are seeing how different components
  relate to each other, and how one change affects other parts of the
  system. I don’t think the top-down text design approach is the right
  way to communicate this complexity. We need something more like Xanadu
  with visual elements.
</p>
<p>
  Right now, newer tools are focused either on agent swarms or kanban
  boards. To be clear, I haven’t tried these dedicated tools at the time
  of writing this because I just use multiple terminal windows to run
  multiple agents in parallel, but from a first glance they seem to take
  the typical “command center” design approach instead of an
  exploration/learning curve approach. I jokingly said to a colleague
  recently that maybe the best UI for agentic development was Clash of
  Clans, at least there you can see the entire system (ie. your base)
  and edit it visually.
</p>
<p>
  <strong>Update:</strong> The day after writing this, OpenAI dropped
  <a href="https://openai.com/index/introducing-the-codex-app/">this</a>, and literally used the term “Command Center for Agents” in their
  marketing. The biggest problems right now in my opinion are not
  productivity problems related to running multiple agents in parallel
  (I can do that with multiple terminal windows), but rather
  productivity problems that stem from a lack of
  <em>understanding</em> the systems we create. The more understanding
  we have, the easier it will be to manage multiple agents in parallel
  because we’ll understand how to do the parallelization.
</p>
<p>— {metadata.date}</p>
