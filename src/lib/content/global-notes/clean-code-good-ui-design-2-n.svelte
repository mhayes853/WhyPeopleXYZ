<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Clean Code == Good UI Design (2/N)",
    date: "12/1/25",
    anchor: "clean-code-good-ui-design-2-n-",
  };
</script>

<p>
  A colleague asked me to share my thoughts on this Internet of Bugs
  video.
</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8ncQrGuunHY?si=VcPBpfs8uuoFHXiZ" title="YouTube video player" frameborder="0" allow="
    accelerometer;
    autoplay;
    clipboard-write;
    encrypted-media;
    gyroscope;
    picture-in-picture;
    web-share;
  " referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p><strong>The following was my response.</strong></p>
<p>
  There is a lot of valid information in here, especially around the
  fact of not trying to hide all the information for why a particular
  decision was made.
</p>
<p>
  For me, I still treat the idea of “clean code” as a UI design problem,
  in which the code and editor are the UI for editing the system. In
  effect, that means that the editor matters just as much as the code,
  because the editor can choose which parts to show and hide. So in
  practice, a lot of our techniques for organizing code have to be based
  around how the editor shows and hides code.
</p>
<p>
  However, the problem is that our modern editors are quite terrible
  when it comes to larger systems (even with agentic AI). Larger systems
  (including our last project) often contain line counts at least in the
  10s of thousands, but your editor can only show ~50 lines of code on a
  singular screen at any given point in time. In essence, modern editors
  have pinpointed their focus on writing text rather than creating
  systems.
</p>
<p>
  This is why people hate the small function style presented in the
  Clean Code book. It’s solely because widespread editors make reading
  and understanding many small functions incredibly difficult due to the
  context you have to keep in your head that your editor doesn’t
  visualize.
</p>
<p>For example, take this function.</p>
<CodeBlock language="javascript" code={`

async function generateReportFor(user) {
  const isValid = validateUser(user)
  if (!isValid) throw new Error("Invalid user")

  const transactions = await transactionsFor(user)
  const defects = await defectsIn(transactions, user)
  const totalParts = await totalPartsFor(transactions, user)
  return new Report(transactions, defects, totalParts)
}
`} />
<p>
  Many would say this is poorly written because they would have to jump
  from <code>validateUser</code> to <code>transactionsFor</code> to
  <code>defectsIn</code> to <code>totalPartsFor</code> in their editor.
  Yet reading just this high level function shows you the outline of how
  a report is generated better than if all of the step functions were
  inlined.
</p>
<p>
  The problem here is that the individual code from the step functions
  is also very important, yet modern editors will not show it alongside
  the high-level function. Due to this, it’s often considered better
  code to just inline the step functions and create 1 very large
  function instead where all the details can be seen on a single screen.
  This latter part has many of its own problems (eg. creating a tightly
  coupled mess) that often arise as time progresses.
</p>
<p>
  In other words, in many cases we’re really working around poor UI
  design decisions taken by modern code editors, and pretending like the
  code is the problem. The attached images below show other aspects of
  this problem in more detail.
  <img src="/images/global-notes/clean-code-ui-design-2.jpeg" alt="A JavaScript function called `getInterceptionPoint` which takes an argument titled `knobPoint` that does complex math and returns a 2 element array representing an x, y coordinate. The author notes that they would explain the code with a diagram, but because the code is written in a text file, such a diagram cannot be displayed.">
  <img src="/images/global-notes/clean-code-ui-design-1.png" alt="A UI design showing how 3 sliders with no clear labels is essentially the same as calling a function with no argument labels in code.">
</p>
<p>— {metadata.date}</p>
