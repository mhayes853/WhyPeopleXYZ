<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "The Need for a Simple Conceptual Model for ML/AI",
    date: "7/6/26",
  };
</script>

<p>
  Don Norman's idea of conceptual models is quite important for
  designing any tool used by humans, and
  <em>The Design of Everyday Things</em> shows many examples of getting
  such models wrong for even simple objects (especially doors if you
  read the book). That being said, ML/AI and many of the
  sciences/engineering projects offend this idea quite a lot, because
  they are complex to the point where lots of pre-requisite knowledge is
  required if you look at them purely symbolically.
</p>
<p>In ML, we can state a very simple conceptual model could be:</p>
<CodeBlock code={`
x -> f(x) -> y

Where:
x = Some input
f = Some model
y = Predicted output from f
`} />
<p>
  For those with a mathematical background this makes intuitive sense,
  but for those who despise math (ie. most of the population), this is
  complete gibberish. However, even for those with a mathematical
  background, there's still the question of: What does
  <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi></mrow><annotation encoding="application/x-tex">f</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
            height: 0.8888799999999999em;
            vertical-align: -0.19444em;
          "></span><span style="margin-right: 0.10764em" class="mord mathnormal">f</span></span></span></span>
  look like exactly? Of course, there is some outer observable behavior
  we can sample statistically, but the uncertainty of this forces us to
  use statistics. Still, at least those with a mathematical background
  are able to reason with uncertainty provided by a model.
</p>
<p>
  What about everyone else however? Who don't have the ability to think
  this way, and who must vote on policies in this area? First, they get
  media headlines, which have clear ulterior motives alongside often
  being written by those who are also in the same boat. Secondly,
  without a conceptual model of ML, all they can rely on is guessing its
  tradjectory superstitiously. Talk to any non-technical person about
  AI, you'll nearly always run into the "replacing all the jobs" topic,
  and nowadays you may hear their opinion about all the datacenters.
  Thirdly, their point of view of AI is that it's exactly what ChatGPT
  is, which is a limited point of view of the entire field.
</p>
<p>
  There's another class of people who write code professionally, but run
  as soon as they see a math formula. Many of these people will be
  working on agentic systems in the future, so some level of
  understanding is essential. While these people are generally far
  better off than the average joe, experience shows that many also don't
  get far past the brief
  <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>y</mi><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">y = f(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.625em; vertical-align: -0.19444em"></span><span style="margin-right: 0.03588em" class="mord mathnormal">y</span><span class="mspace" style="margin-right: 0.2777777777777778em"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2777777777777778em"></span></span><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em"></span><span style="margin-right: 0.10764em" class="mord mathnormal">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>
  conceptual model I presented at the beginning. (eg. Many Claude
  Code/Codex users don't know how KV caching works, even though it's
  directly relavent to token costs. Perhaps they will take note of this
  when the subsidization isn't as generous!) Over time, the standard
  "technical interview curriculum" may screen for basic regurgitation of
  how LLMs work under the hood, but regurgitation isn't understanding.
</p>
<p>
  As a result, fear is the most justifiable reaction for many. There is
  no way for them to reason about uncertainty, and what their told isn't
  exactly encouraging either. They need an
  <a href="https://worrydream.com/refs/Kay_2005_-_Enlightened_Imagination_for_Citizens.html">enlightened imagination</a>, which starts from a good set of conceptual models on an individual
  level. The larger scale effort for "achieving this in everyone"
  requires much more, and is outside the scope of this note, but
  universal basic literacy shows that such a thing can likely be done.
</p>
<p>
  So what does a good conceptual model look like? This is something I'm
  still trying to figure out and finalize, but I can at least share
  something that has thus far worked quite well for myself. The model
  I've thus far converged on is to think of a model as an
  <em>"executive process of knowledge"</em>. That is, with each
  operation, layer, representation, etc. what semantic "meaning" does it
  convey?
</p>
<p>
  For example, full-attention is
  <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><msup><mi>n</mi><mn>2</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n^2)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1.064108em; vertical-align: -0.25em"></span><span style="margin-right: 0.02778em" class="mord mathnormal">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141079999999999em"><span class="" style="top: -3.063em; margin-right: 0.05em"><span class="pstrut" style="height: 2.7em"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>
  , which makes it scale poorly when the context grows linearly, but it
  turns out that not every token needs to attend to every other token in
  the context. Imagine a book, it's unlikely that a random paragraph
  from chapter 6 is directly relevant to a random paragraph in chapter
  2, but the words within the paragraph of chapter 6 are highly
  correlated with each other. We can use this intuition to begin to see
  how we may optimize attention/context/KV caching to support things
  like longer context windows, resource constrained environments, etc.
</p>
<p>
  Now a layman wouldn't understand any of the ML or CS specifc terms
  that I mentioned in the last paragraph, but they have a much better
  chance of understanding this sentence.
</p>
<blockquote>
  <p>
    Imagine a book, it's unlikely that a random paragraph from chapter 6
    is directly relevant to a random paragraph in chapter 2, but the
    words within the paragraph of chapter 6 are highly correlated with
    each other.
  </p>
</blockquote>
<p>
  Is this a gross simplification on many different levels? Absolutely,
  but it does show the beginnings of how one may "reconstruct" the
  complexity to a more learnable form. This idea of reconstructing can
  be applied all the way down to the implementation details of
  techniques that segment the context, KV cache, etc. That is, for each
  concept in the implementation, there is a way of reconstructing its
  ideas in a form understandable for a given individual. This is already
  what practitioners/researchers are already doing, even if
  unconsiously.
</p>
<p>
  Another issue I see is the prevelance of ML frameworks and libraries
  that hide much of the complexity. (ie. Violating Butler Lampson's
  "don't hide power" principle.) For instance, Apple's FoundationModels
  framework hides many of the details of the underlying language model,
  and further is only designed for multi-modal (text-only pre-Apple-OS
  27 versions) LLMs, but otherwise has an intuitive API. Hiding the
  complexity in this way presents 2 problems for uninformed users.
</p>
<ul>
  <li>
    One doesn't realize they have more control than they think over a
    model.
  </li>
  <li>
    One begins to think that all models take the same shape as whatever
    a framework allows.
  </li>
</ul>
<p>
  To conclude, this note has one primary point:
  <em>universal ignorance isn’t bliss for a foundational technology</em>.
</p>
<p>— {metadata.date}</p>
