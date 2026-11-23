<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "On Controversial Technologies",
    date: "10/24/26",
  };
</script>

<p>
  Agents are certainly a controversial technology, to say the least,
  given the range of opinions about them. Some of the criticism stems
  from skepticism about their abilities, and some from moral concerns.
  I don’t think agents are unique in this regard, and I’m sure textile
  workers in the 18th and 19th centuries had similar concerns about the
  various looms.
</p>
<p>
  One thing I can say with some confidence is that technologies
  generally gain adoption because they produce some desirable result
  (usually money). This means that a technology has to provide
  economic value in order to be widely adopted; otherwise, adopting it
  would be a waste of time and money.
</p>
<p>
  Stemming from that, most of the moral concerns I encounter are not
  tied to any particular technology, but rather to its implications for
  workers within economic systems. In essence, much of this kind of
  criticism can be described as category confusion. (The Luddites’ main
  focus of protest wasn’t necessarily the existence of machines, but
  rather the economic and working conditions that stemmed from them.)
  Nevertheless, it would be unwise to deny that there are systemic
  problems with how progress affects individuals financially, but this
  note is not the place to express those concerns.
</p>
<p>
  With that in mind, studying various histories shows that the bigger
  problems with technological progress stem from being unable to see
  the whole picture when adopting a technology at scale. For example,
  the commercialization of the personal computer in the 1980s missed
  many ideas from the 1970s, the web missed many of Engelbart’s ideas,
  Java missed many ideas from object-oriented programming, and so on.
</p>
<p>
  Agents are no different. Much of the focus has been on scaling LLMs
  without considering the broader picture (e.g., see why people were
  surprised by
  <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">Jev</a> and why it is often misunderstood, and also see
  <a href="https://openreview.net/pdf?id=BZ5a1r-kVsf">World Models</a>),
  while visibility and understanding are also being undermined (e.g.,
  code review is becoming difficult). The bad part isn’t adopting the
  personal computer, the web, Java, or agents, but rather the question
  of which ideas remain <em>unadopted</em> afterward.
</p>
<p>
  These unadopted ideas are one of my primary reasons for writing in
  the first place. In fact, these notes often resurface unadopted ideas
  in a way that makes sense for the modern world, while also exploring
  what novel ideas might exist in the future.
</p>
<p>
  Another theme in these notes is the focus on an “environment”
  rather than any one particular technology, because technologies are
  often designed to fit into a particular environment. For example,
  one could label someone as the “inventor of the mouse” while not
  realizing that the mouse was just the gateway to a rich, distributed,
  collaborative environment. In case you’re wondering, the mouse was
  fully adopted, while only a fraction of that “rich, distributed,
  collaborative environment” was.
</p>
<p>
  Were many ideas left unadopted because they wouldn’t provide economic
  value? Not necessarily. Many unadopted ideas appear much later in a
  similar but distinct form, and do produce value and garner adoption.
  Rather, I think those ideas aren’t necessary for achieving
  profitability at the time their sibling ideas are adopted, so they
  are never adopted as a result. Even then, it’s hard to tell whether
  their sibling ideas would also fall into the same camp if the
  economic players (founders, customers, investors) were different, as
  I assume adoption largely comes down to what inspires them most.
</p>
<p>
  This leaves us with the skepticism that agents are viable for
  day-to-day work. Generally, such skepticism is good, but it shouldn’t
  necessarily mean avoiding adoption completely. In fact, what has
  happened with other past technologies is that skepticism gets
  converted into new practices and engineering requirements that make
  the new paradigm safer.
</p>
<p>
  For instance, it’s hard to review and understand the changes agents
  make when they produce so much code. As a result, code review will
  need to transform somehow. This will probably require techniques for
  increasing visibility into agents and for automating the parts of
  code review that don’t scale (e.g., nitpicks, “There’s an existing
  API for this,” “Simplify this,” and so on) and that humans
  previously had to handle.
</p>
<p>
  Once again, this is not unique to agents, but rather a trait of any
  paradigm shift. It’s natural to be skeptical of a new paradigm simply
  because many of its ideas have not yet been discovered. Skepticism is
  often what drives the discovery of those ideas, and thus I see my
  skepticism from a more opportunistic standpoint. Any skepticism I
  have is a chance to shape the new paradigm.
</p>
<p>— {metadata.date}</p>
