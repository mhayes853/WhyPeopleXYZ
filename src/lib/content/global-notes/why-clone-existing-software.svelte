<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Why Clone Existing Software?",
    date: "10/14/26",
  };
</script>

<p>
  I see that Adobe has been cloned, and that the Microsoft Office suite
  is next, apparently. Many of these programs were designed for humans
  to use because such humans couldn’t make their own tools. This led to
  them being massive and bloated.
</p>
<p>
  While any kind of cloning is an interesting technical feat for agents
  (provided the clone works properly), I think it’s more ideal to think
  about making software that’s qualitatively different from the Adobe,
  Microsoft, and Google productivity/creativity suites. Today, we just
  have new tools (agents) available that allow non-technical people to
  create their own software, even if it’s at the expense of other things
  (understanding).
</p>
<p>
  A friend recently asked me about managing data in Excel and presenting
  it to others in PowerPoint. I asked why he didn’t consider using an
  agent to do what he needed to instead, since he had few restrictions.
  Later he used Codex to write scripts that interacted with the data and
  it worked; he didn’t even have to touch either Excel or PowerPoint!
</p>
<p>
  The Office suite has traditionally been used as a UI to produce
  insights that matter towards an organizational goal of some kind, and
  not necessarily because using Excel itself was valuable. Agents allow
  one to make such presentations through software itself, which means
  adding interactivity, custom formatting, etc. In this regard, I
  actually see UI design as an important communication skill going
  forward. By “UI design”, I don’t mean aesthetically pleasing buttons,
  but rather presenting communications as an interactive user interface
  just as one would a PowerPoint presentation, perhaps with some nice
  aesthetics to make it not so boring. Such a UI is best designed when
  the UI designer knows the information well, as that is generally
  required for communicating it.
</p>
<p>
  I’ve always thought the same of design tools like Figma and Sketch
  before agents. At the time, I would often just create UIs directly in
  a declarative UI framework like SwiftUI/React Native, and present them
  to people in real time. Since the UI was running directly on a
  simulator in those sessions, seeing different results on actual data
  was just a matter of changing component props right then and there in
  a dedicated preview environment. (This also required me to write UI
  components in a manner that decoupled the business logic from the UI,
  which I still recommend today.)
</p>
<p>
  This was “doing UI design”, but with tools that were more suited to
  my workflow rather than the industry standard at the time. I simply
  did not need Figma, as I found it more tedious to first design in
  Figma, only to then have to translate the design into code directly.
</p>
<p>
  Many of the past UIs for common tools like Office were focused on
  getting things done, agents are no different in this regard, and are a
  more universal form of such tools. Increased visibility for
  understanding is perhaps one of the largest UI gaps in most tools,
  including ones that use agents, for the time being. I think such
  visibility needs to be programmable as well, just because it can now.
</p>
<p>— {metadata.date}</p>
