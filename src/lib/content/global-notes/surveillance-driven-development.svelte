<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "“Surveillance Driven Development”",
    date: "11/22/25",
    anchor: "-surveillance-driven-development-",
  };
</script>

<p>
  <img src="/images/global-notes/surveillance-driven-development-1.jpeg" alt="As a thought experiment, try replacing the word data with surveillance, and observe if common phrases still sound so good [93]. How about this: 'In our surveillance-driven organization we collect real-time surveillance streams and store them in our surveillance warehouse. Our surveillance scientists use advanced analytics and surveillance processing in order to derive new insights.'">
  This is one of the problems of the web and mass centralization. By its
  very design, all remote data is centralized, and this design often
  encourages such surveillance like behavior.
</p>
<p>
  If anything, reading
  <em>Designing Data Intensive Applications</em> (source of the quote)
  has taught me that large centralized distributed systems that make
  high-stakes decisions for people are terrible ideas. From the
  technical standpoint, often the best state a large system can be in is
  “eventually consistent”. That is, a state in which not all necessary
  information (much of which is completely invisible to the end-user) is
  guaranteed to be present to make a proper decision at any given
  moment.
</p>
<p>
  This isn’t even mentioning the fact that as system designers we are
  often making systemic decisions in contexts that don’t reflect the
  actual context in which the system operates in.
</p>
<p>
  My take on this is that data and decision making power are best kept
  by the individual, and not the organization. Rather, it should be the
  job of the organization to enhance the decision making power of the
  individual (eg. Public education teaches us to read, and reading helps
  us make better decisions).
</p>
<p>
  This is particularly why I’m interested in heavy client-side based
  software solutions in today’s landscape (eg. Native mobile apps, local
  LLMs) rather than remote/web based solutions. I try to limit the
  server side component as much as possible on small/solo projects.
  Often I find that it isn’t necessary to create a dedicated backend in
  the first place for many useful products outside of proxying requests
  to third parties.
</p>
<p>
  Of course, long term I’m much more interested in tomorrow’s landscape,
  which ideally will embrace the idea of individual creative freedom far
  more than its predecessors. That is, I would rather we treat the
  masses as capable creators rather than “the audience”. The web and
  subsequent AI-driven culture fails horrifically at this.
</p>
<p>— {metadata.date}</p>
