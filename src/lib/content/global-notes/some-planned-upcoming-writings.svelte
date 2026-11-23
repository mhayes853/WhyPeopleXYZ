<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Some Planned Upcoming Writings",
    date: "12/12/25",
  };
</script>

<p>
  With tentative titles, organized by the sections you see on my home
  page.
</p>
<p>* = In Progress</p>
<p><strong>New Mediums</strong></p>
<ul>
  <li>
    Locality of Decisions*
    <ul>
      <li>
        Goes over the disasters of one-size-fits-all decision making,
        and what we need to do to move away from this paradignm.
      </li>
    </ul>
  </li>
  <li>
    Redesigning Code Editors, A Conceptual Overview
    <ul>
      <li>
        I’ve written quite a few notes on why I believe modern code
        editors are quite bad at building systems, but great at writing
        text. Though, I’ve yet to show any concrete examples of what a
        “better editor” looks like (Hint: Agentic coding in its
        widespread form isn’t the solution).
      </li>
    </ul>
  </li>
  <li>
    Flying around the Aspects of Abstraction
    <ul>
      <li>
        An alternative POV to Bret Victor’s
        <a href="https://worrydream.com/LadderOfAbstraction/">Up and Down the Ladder of Abstraction</a>.
      </li>
    </ul>
  </li>
  <li>
    Mutual Ink, Creative Software and The Collaborative Interface*
    <ul>
      <li>
        Depending on how things go, I may merge the stuff on code
        editors into this piece. Mutual Ink is an app that I’m currently
        working on in my free time that attempts to make LLMs (and
        particularly local ones) be seen as tools that can help us think
        better rather than take the thinking from us.
      </li>
    </ul>
  </li>
</ul>
<p><strong>Building Products and Tools</strong></p>
<ul>
  <li>
    How I used the Physical World to Enhance App Design
    <ul>
      <li>
        Goes over an experience I had recently in developing Mutual Ink
        in which I laid out a grid of objects on my bed to design a
        fault-tolerant and iCloud syncable navigation system.
      </li>
    </ul>
  </li>
  <li>
    The Agent Framework, Why Cactus is Better than FoundationModels*
    <ul>
      <li>
        I’ve already shipped low level Swift bindings to work with LLMs
        powered by the Cactus inference engine. The engine itself is
        very fast, efficient, optimized specifically for ARM, and
        supports many different models.
      </li>
      <li>
        However, FoundationModels, though less technically impressive,
        has an API that’s much easier to use, and thus will likely see
        more adoption despite its flaws.
      </li>
      <li>
        This later point is why I’m currently developing an agent
        framework for Cactus in my free time. The TLDR is that the
        vision is “SwiftUI for dynamic inference and processes”. That
        is, creating a traditional multi-step agent workflow is at the
        same level of difficulty as creating a SwiftUI view.
      </li>
    </ul>
  </li>
</ul>
<p>— {metadata.date}</p>
