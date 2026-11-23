<script module lang="ts">
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "About",
    description: "",
    nav: ["home", "now"],
    progressBar: false,
  };
</script>

<article>
  <h1 id="about" class="title">About</h1>

  <ReadingTime />

  <p>Hello there.</p>
  <p>
    I could write a professional bio here about how I’m someone that is
    passionate about software engineering and building products, but I
    suspect there’s very little unique value in writing the same thing
    that everyone else says. Yes, I’m passionate about those things, but
    I’m also fanatical about true systems and the way people think as a
    whole.
  </p>
  <p>
    Ever more important than ever is true systems design, which is not
    ingrained in the majority of the population. For one, we lack
    universal understanding in all of the following areas that societal
    policies are based on: Science, Engineering, Abstraction, Aesthetics,
    and Tinkering. People with those 5 traits tend to be the ones that can
    drive a system forward, and it’s quite a shame that such few people
    have all of those traits. Instead, most policy decisions are made with
    very surface level thinking, and we get bureaucracy because no one
    actually knows what’s going on.
  </p>
  <p>
    Literacy, like the above 5 traits, was once considered an arcane field
    that very few people could understand and operate in. In the US,
    nearly 90% of the population can read at least a little bit, which is
    what makes the modern economy and democracy possible in the first
    place. Could you imagine the behavior of a democracy full of
    illiterate participants? Now expand the term literacy to include the 5
    traits, and ask yourself the same question.
  </p>
  <p>
    My work covers 4 separate domains that are (ideally) backed by those 5
    traits. I don't know how to classify it yet, so this is the best I can
    do for now.
  </p>
  <ul>
    <li>Conceptual Frameworks (Relativenes, Philosophy, etc.)</li>
    <li>
      Engineering (Machine Learning, Software, Architecture, Indexing, CS,
      etc.)
    </li>
    <li>Mediums (UI Design, Creations, Media, Interactivity, etc.)</li>
    <li>
      Formation of Culture (Impact of Mediums, Cultivating Learners,
      Cultivating Meaning, etc.)
    </li>
  </ul>
  <p>
    Some of this work is represented in writing, some in code, some in
    pictures, and much of it in my head. This site contains most of the
    written representations of course.
  </p>
  <p>
    Some people that I’m influenced by. (This list will likely grow over
    time.)
  </p>
  <ul>
    <li>Alan Kay</li>
    <li>Douglas Engelbart</li>
    <li>Bret Victor</li>
    <li>Don Norman</li>
    <li>Seymour Papert</li>
    <li>Richard Hamming</li>
    <li>John Holt</li>
  </ul>
  <p>
    <em>This page will not be updated very frequently. If you want a
      synopsis of my current circumstances, see
      <a href="/now">now</a>.</em>
  </p>
</article>
