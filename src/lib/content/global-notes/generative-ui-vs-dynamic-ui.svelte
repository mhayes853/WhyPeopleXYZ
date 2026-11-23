<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Generative UI vs Dynamic UI",
    date: "9/21/26",
  };
</script>

<p>
  With models like Jev being unleashed on the world, it seems more
  people are beginning to see that AI is far more than just LLMs and
  VLMs. Though one interesting thing about Jev is that I’ve seen demos
  of it being used for Generative UI. If you look at many of my past
  notes, “dynanicism” is a common theme, and you may have even seen
  the term “dynamic UI” in there. (This is a term I’ve mostly spoken to
  others rather than written about.)
</p>
<p>
  Though Generative UI looks dynamic on the surface, I don’t think it’s
  what I would call a fully dynamic UI. For starters, the typical way in
  which most Generative UI SDKs work (eg. Tambo, JSON Render) is that
  they use a catalog of schema objects using a schema library like Zod,
  which represent the props of a UI component. The model then generates
  arguments to one or more of the schema objects in the catalog using
  structured outputs. The client-side SDK then pairs each schema to a
  component in a UI framework (React, Svelte, SwiftUI, etc.), and
  subsequently renders it using the model output.
</p>
<p>
  Jev is fine for this process (though it’s implemented differently
  since Jev isn’t an LLM) because this is essentially a classification
  and extraction problem, in which the user prompt is mapped to a set
  of UI components from a fixed catalog. Given the real-time component
  of making a good UI, Jev’s speed is a huge benefit here. However, it
  suffers from being served over the network, which isn’t ideal for
  availability. (It’s also worth noting that
  <a href="https://github.com/cactus-compute/needle">Needle</a> is a
  tiny edge model that handles extraction and tool calling, and could
  also be used for this purpose although I haven’t tried this. It
  actually has been compared to Jev even though it’s architecture seems
  quite different.)
</p>
<p>
  However, UIs are more than just visuals, but are rather forms of
  communication. For example, the UI of this note is a wall of text that
  you are reading for some reason. Walls of text are fine for
  communicating some ideas, but are a poor choice for others. (This is a
  bit hypocritical for me to be saying, but perhaps we tend rely on pure
  writing too much.) So a model that generates any UI can’t just think
  categorically or linguistically, but rather geometrically. A catalog
  of UI components simply isn’t enough here. (Furthermore, I would
  argue that its the wrong primitive since UIs are made through a
  “creative-expressive process”, and most creative expression does not
  come from merely combining catalog items together.)
</p>
<p>
  Ok, so now what does that entail about a “dynamic UI” then? The way I
  see it is that “Generative UI” is more about the act of generating a
  UI in a context somehow, whereas dynamic UI is about the entire
  question of what it means for a UI to always be dynamically changing.
  That is, what it means that not every user has the same experience,
  but rather the one that makes the most sense for them.
</p>
<p>
  Of course, you may say that this is just part of the
  “personalization” trend that’s been a thing with agents. Sure, but how
  far does such “personalization” extend? Does it mean literally
  changing every aspect of the UI, including its primary forms of
  interaction, for each and every user across time? Or does it mean just
  serving personalized content on a UI that was explicitly designed by
  a UI designer on the product team? I’m mainly referring to one of
  these possibilities with the term “dynamic UI”, and I’ll leave it to
  you to guess which one.
</p>
<p>
  I find that it’s quite difficult to explain this topic because
  understanding it requires expanding your horizons on what a “UI” is
  in the first place. For example, most people wouldn’t consider me
  writing <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span style="margin-right: 0.02778em;" class="mord mathnormal">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> in latex as a UI, yet it’s how we present mathematics
  visually.
</p>
<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">E = mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span style="margin-right: 0.05764em;" class="mord mathnormal">E</span><span class="mspace" style="margin-right: 0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height: 0.8141079999999999em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141079999999999em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></p>
<p>
  Why name the output variable <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi></mrow><annotation encoding="application/x-tex">E</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span style="margin-right: 0.05764em;" class="mord mathnormal">E</span></span></span></span> for energy? Why do we use
  <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>a</mi><mtext>superscript</mtext></msup></mrow><annotation encoding="application/x-tex">a^\text&#123;superscript&#125;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.830502em; vertical-align: 0em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.830502em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord text mtight"><span class="mord mtight">superscript</span></span></span></span></span></span></span></span></span></span></span></span> for exponents? Why do we write out <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.8141079999999999em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141079999999999em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span>
  instead of writing “mass times the speed of light times the speed of
  light”, <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>m</mi><mo>∗</mo><mi>c</mi><mo>∗</mo><mi>c</mi></mrow><annotation encoding="application/x-tex">m * c * c</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.46528em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mspace" style="margin-right: 0.2222222222222222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right: 0.2222222222222222em;"></span></span><span class="base"><span class="strut" style="height: 0.46528em; vertical-align: 0em;"></span><span class="mord mathnormal">c</span><span class="mspace" style="margin-right: 0.2222222222222222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right: 0.2222222222222222em;"></span></span><span class="base"><span class="strut" style="height: 0.43056em; vertical-align: 0em;"></span><span class="mord mathnormal">c</span></span></span></span>, or even <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>m</mi><mo>∗</mo><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">m * c^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.46528em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mspace" style="margin-right: 0.2222222222222222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right: 0.2222222222222222em;"></span></span><span class="base"><span class="strut" style="height: 0.8141079999999999em; vertical-align: 0em;"></span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141079999999999em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span>? Why use an <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>=</mo></mrow><annotation encoding="application/x-tex">=</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.36687em; vertical-align: 0em;"></span><span class="mrel">=</span></span></span></span> sign? Etc.
</p>
<p>
  However, a bigger question to ask is why a textual medium? Why not
  show <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">E = mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span style="margin-right: 0.05764em;" class="mord mathnormal">E</span><span class="mspace" style="margin-right: 0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height: 0.8141079999999999em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141079999999999em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span> visually or interactively? Who would learn best from a
  textual medium vs a visual one? If textual, which form of the many
  possibilities above would it be presented? If visual, do we use a graph
  or scenario-based imagery? If interactive, do we use a 2D or 3D
  simulation, and how much interactivity do we allow for?
</p>
<p>
  I suspect from a teaching standpoint that this depends heavily on the
  individual learner, and what they are actually trying to learn as well
  as how they learn. So a real “dynamic UI” needs to be able to
  “personalize” down to that granular level, at least when just showing
  <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">E = mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span style="margin-right: 0.05764em;" class="mord mathnormal">E</span><span class="mspace" style="margin-right: 0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height: 0.8141079999999999em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141079999999999em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span>. This doesn’t even account for all the other decisions that
  must be made such as the surrounding curiculum, how the learner
  applies it, etc. That also needs to be personalized.
</p>
<p>
  In this sense, dynamic UI requires creativity, expressiveness,
  adaptability, communication, geometry, some level of artistic ability,
  an understanding of the user’s context/environment, and an
  understanding of human psychology. I think we can all tell that this
  is much more than a classification problem.
</p>
<p>— {metadata.date}</p>
