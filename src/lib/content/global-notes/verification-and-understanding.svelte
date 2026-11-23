<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Verification and Understanding",
    date: "8/26/26",
  };
</script>

<p>
  <a href="https://pauldix.com/the-end-of-programming">This</a> has been
  an article floating around today, which demonstrates some interesting
  ideas, but I generally think the “needs” here are larger
  for better software.
</p>
<p>
  Any reliable system generally needs verification mechanisms to ensure
  changes can be deployed in an orderly manner. This has always been a
  thing ever since before agents took over much of programming, and
  it’s often been a thing that was missing from most software
  systems. The amount of production codebases without any formal test
  suite is astonishing. Even codebases with a test suite often suffer
  from quality issues, or not having enough acceptance or tests that
  truly exhaust real-world use of the software. Often the primary reason
  for omitting tests is usually something related to time or costs, but
  another is not being able to understand the system itself at a big
  enough picture.
</p>
<p>
  However, with agents, I think the cost and timing reasons for missing
  verification mechanisms are largely irrelevant, and downright
  dangerous if still used as justification. Generally speaking, once a
  software project crosses 10,000 LOC, it generally needs some sort of
  structure, including tests, to proceed smoothly. (This is not a
  universal rule, as some projects take a deliberate structure to be as
  compact and minimal as possible.) With agents, one can trivially hit
  the 10,000 LOC mark, which means that even most greenfield and hacked
  together projects will need structure. Yes, this implies that the need
  for good engineering is actually greater than it ever has been, and
  that I think the era of writing shitty code to get an MVP out the door
  is largely not going to work.
</p>
<p>
  However, verification mechanisms aren’t the only thing we need
  to do better engineering. We also need <em>understanding</em>, or else
  we lose leverage over the agents and our ability to design
  verification mechanisms in the first place. For the record, I think
  the understanding problem is a much harder problem to solve over
  verification, and has always plagued software for the longest time
  regardless of agents. This is to say that we seem to have the tools to
  create better verification systems, but not so much for understanding
  systems directly.
</p>
<p>
  Modern OSs contain on the order of 100 million lines of code, and I
  can only imagine that becoming 1 trillion lines with agents. It was
  <em>already</em> hard to understand and vet all of that code even
  before agents, and I would argue that our verification/understanding
  mechanisms were nowhere near where they needed to be to understand it
  (Remember the Crowd Strike incident?).
</p>
<p>
  Even many simple iOS and Android apps were on the order of 50,000
  lines of code, but many production systems are far greater than that.
  Your editor generally only displays 50 lines of code on a single
  screen (depends on the size of your font and display), yet
  you’re forced to understand an entire system through reading
  lines of code through it. This is like me telling you how the human
  body works by explaining groups of 50 cells at a time, when there are
  trillions in your body. You would rightfully think that’s
  ridiculous when explained that way!
</p>
<p>
  This is to say that I think the way we have been forced to read code
  in the past and present has <em>never</em> been good enough for
  achieveing the levels of systems understanding that are necessary, and
  agents have really highlighted this. If an agent can generate
  thousands of lines of code per day, how do you understand it? PR
  reviews have not usually been a good mechanism for understanding code
  written by others in the past (see the problem of institutional
  understanding crumbling when the original programmer of a critical
  component leaves the company). Therefore, if reviewing code from
  agents is just like reviewing PRs from colleagues, then just
  “reading the code” is not enough. We need something
  qualitatively different. (Though, without something qualitatively
  different, the best one can do today is reading the code.)
</p>
<p>
  The next question is what that looks like. Other engineering and
  scientific disciplines have CAD and SIM tools to create models and
  simulations for that understanding. Yet, our editor and terminals have
  been the primary tools for us, and agentic tools are more akin to an
  “editor” replacement. Needless to say, we have the means
  to “do”, but not “see” without appropriate CAD
  and SIM tools.
</p>
<p>
  So what do those tools look like then? I think the answer here is much
  harder, and I’m not so sure. What I can say, is that I think I
  will need them myself, so I will likely try to make ones for my
  various needs (especially around
  <a href="https://github.com/mhayes853/swift-stream-parsing/pull/11">this</a>). So part of the answer is probably, “it depends on the
  project”, but that doesn’t provide a framework for
  <em>how</em> to build such a tool in the first place.
</p>
<p>
  The good news is that if hyper personalized tools are needed for
  understanding, agents can make their creation much cheaper.
</p>
<p>— {metadata.date}</p>
