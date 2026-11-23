<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Agentic Coding Initial Thoughts",
    date: "12/19/25",
  };
</script>

<p>
  Having played around with the Codex CLI for a week now, it’s quite
  safe to assume that adopting AI code generation tools will more or
  less be required in the future, so resisting is probably not something
  that’s viable in the long term. Generally speaking, getting AI to
  generate good code still requires that you know how to implement
  things yourself, because you will need to dictate your implementation
  strategy to the agent somehow.
</p>
<p>
  Some people say that the job of a software engineer will shift more to
  that of a product manager. This is not the vibe I’m getting so far
  when adopting these tools, and I certainly don’t want it to become
  reality either. In order to get good results with AI generated code,
  I’ve still had to dictate precisely how the agent should implement a
  set of functionallity down to the APIs it should invoke and files it
  should edit.
</p>
<p>
  Overall, I’ve found myself doing a lot more writing on how to
  implement something, rather than going back and forth constantly on
  the next line of code that I’m typing. This is where the productivity
  increase comes from. Instead of tediously writing every individual
  line of code, you’ll instead write a paragraph or 2 detailing the
  implementation in plain english. (eg. Instead of implementing a
  depth-first-traversal by hand, I’ll just tell the agent to do a
  depth-first-traversal.)
</p>
<p>
  The resulting code is usually acceptable on the first generation for
  most things, but often I’ll make small manual tweaks regardless for
  future proofing scenarios.
</p>
<p>
  I’ll now detail my general playbook for implementing a simple feature.
</p>
<ol>
  <li>
    We start with getting the agent to generate tests for a specifc API
    or functionallity. I detail exactly what tests to write in plain
    english, and explicitly tell the model to not implement the
    functionallity for any of the tests. We do not move on to step 2
    until a solid set of tests have been created.
  </li>
  <li>
    We’ll move onto the implementation of the feature. In doing this,
    I’m very explicit in the sense that I tell the agent how to
    implement the feature as I would normally do it in code. The key
    difference is that I’m handing away the typing part to the agent.
  </li>
</ol>
<p>
  In both steps, I generally will make small manual edits to the
  generated code, so I don’t think manual coding is dead atm. Think of
  writing a for-loop when coding manually, you’ll write the code for a
  single iteration, and the for-loop will execute it N times. The agent
  is generall a for-loop for code generation, you may handwrite an
  explicit example, and the agent will be able to figure out the N
  stylistic variants you need.
</p>
<p>
  If anything, you’ll need to be a lot better at writing code now more
  than ever. Your tastes, styles, and mannerisms now matter a lot more,
  because you’ll more or less be instructing the agent on how to mass
  produce them.
</p>
<p>
  I now want to take a moment to address the culture around agentic
  coding, of which I believe is quite depressing and is more so a
  problem than any of the existing tools.
</p>
<p>
  There seems to be 2 camps of thought, an anti-agent camp, and a total
  vibe-coding camp. The anti-agent camp will tend to uncritically look
  at how other developers use AI, and will simply just state that all
  AI-generated code is bad. The vibe-coding camp tends to believe that
  all developers will be out of a job in the near future, and that
  you’ll be “left behind” if you refuse to adopt these tools.
</p>
<p>
  Sooner or later, adoption of these tools will probably become a
  requirement, and one that pure vibe-coders will actually not find as
  useful to them as they think. In fact, pure vibe-coders are probably
  in a worse overall state (assuming they don’t lean on a prior domain
  of critical thought), and I believe one of 3 scenarios will happen.
  All 3 end with pure vibe coders losing out to people who are dedicated
  to their craft.
</p>
<ol>
  <li>
    Vibe coding in its current form becomes economically unsustainable,
    and thus the cost of doing things the pure vibe-coding way shoots
    way through the roof.
  </li>
  <li>
    Vibe coding becomes ubiquitous. In order for your product to stand
    out from the competition, you’ll be forced to go beyond the
    capabilities of pure vibe-coding and into serious development.
  </li>
  <li>
    More Software Engineers and technically inclined people begin
    adopting these tools in droves and use their knowledge and
    experience to produce far better outputs than vibe coders.
  </li>
</ol>
<p>
  I think scenarios 2 and 3 are more likely to happen, but elements of
  scenario 1 could arise depending on the economics of the bubble.
  Though also take note that all 3 scenarios do require general adoption
  of these tools, and that more or less everyone will have to use them
  at some point. (Though, I don't think we'll be at the "left behind"
  stage for some time.)
</p>
<p>
  In other words, those who can think critically with these tools will
  do far better than those who were early adopters, but otherwise lack
  critical thinking ability. Even though the uncritical people may be
  ahead for some time, history shows that things eventually stabilize.
</p>
<p>
  Now my real thoughts on what critical thinking culture the tools
  create is a far more important question, and far more important
  problem IMO. This is where we’re currently struggling, and the long
  term effects can be disastrous if not managed correctly.
</p>
<p>— {metadata.date}</p>
