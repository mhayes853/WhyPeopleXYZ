<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Representations and Optimizations",
    date: "2/6/26",
  };
</script>

<p>
  If we are to program better in the future with Agentic tools, we’ll
  have to understand the notion of process more and more. One of my
  recent more fleshed out writings was a response to one of Alan Kay’s
  call to arms on the notion that “Data Structures being more central to
  programming than algorithms” was a deadly flawed idea. To summarize my
  (and possibly Alan’s) response, both of those things are merely
  defined representations, and really if anything should be optimized,
  it’s the meaning of those representations.
</p>
<p>
  Of course, that answer evades directly addressing the current
  realities of programming in most languages today, and most others I’ve
  asked this question to give the more typical answers. That is along
  the lines of: “Good data structures make the algorithm obvious” or
  “The algorithm itself must use the data structures efficiently”. These
  typical answers are naturally something I disagree with. Picking the
  right data structure doesn’t mean the algorithm will form itself,
  because 2 separate implementations will use the data structure
  differently (with variances in regard to efficiencies). Static bits in
  memory just doesn’t maintain “meaning” well enough to scale.
</p>
<p>
  For the record, I’m not only referring to basic algorithms like simple
  sorts where there’s always a deterministic answer (in terms of
  correctness). Machine learning is also something that one would
  consider an algorithm, but its output is almost always
  non-deterministic. Though truth be told, if we look at raw performance
  in terms of latency, even the simple sort is non-deterministic because
  it will run faster or slower on the CPU for any given run. In such a
  manner, we can say that the more non-determinism, the more chance of
  the meaning varying.
</p>
<p>
  If you wanted to kill someone via sending a package in the mail, which
  option would you pick?
</p>
<ul>
  <li>
    Send them a bomb that explodes in their face as soon as the package
    is opened.
  </li>
  <li>
    Send them the parts that make up a bomb, and hope they assemble it
    themselves.
  </li>
</ul>
<p>
  <em>Don’t ask why I picked this example of all things… It was funny to
    run by a few colleagues.</em>
</p>
<p>
  Obviously, no terrorist is going to pick the second option, but the
  second option is rather what we decide to do today in computing.
</p>
<p>
  When we look at inefficient or incorrect implementations of even
  simple algorithms, we’ll also find that they tend to pick the second
  option, rather than the more direct first. Either the parts take extra
  work to assemble which degrades performance, or the parts are
  assembled incorrectly. So “picking the right data structure”, or
  rather the right meaning of information has profound impacts on
  performance.
</p>
<p>
  Now let’s talk about general human to human communication a bit. Poor
  communication causes incorrectness and inefficiences because either
  the wrong work, or extra work is performed that isn’t necessary.
  Generally, this is caused by poor preservation of “meaning” between
  the communications, so in other words picking the wrong
  representations.
</p>
<p>
  If meaning is the center of programming, as Alan wanted to portray as
  a general slogan in his answer, then certainly meaning encompasses
  data structural representations, but also representations that are
  relative to something. However, If we look at general purpose
  programming languages today, that relativeness (I’m avoiding the term
  relativity thanks to Einstein) is lost to general data structures and
  algorithms.
</p>
<p>
  What do I mean by relativeness? A simple model of this is a DSL, but
  really static DSLs are also quite weak. If something is to be truly
  relative, then it needs to be dynamic.
</p>
<p>
  Take your inner social circle, and for simplicity your English
  speaking inner circle. Even though English is used as the DSL to speak
  with each person, you vary the form of English you speak with each
  separate person. These variances are where relativity is formed, and
  it is formed dynamically as you continue to speak with the person. Of
  course, the reason you form these variances is to optimize the manner
  in which you speak to the other person.
</p>
<p>
  Why do we write pseudocode? In today’s agentic/LLM driven landscape,
  I’m going to expand the term pseudocode to include prompts that are
  intended to generate code.
</p>
<p>
  It turns out that pseudocode is easy to write because we can keep its
  representation quite relative to its goal, rather than to a general
  purpose language. If we didn’t, the general purpose langauge would
  impose its constraints on the pseudocode, causing it to lose meaning
  in the grand scheme of things.
</p>
<p>
  Of course, we also have to understand that the machine itself has its
  own relative representation for executing process, that being machine
  code. However, for us humans its quite hard to derive any sort of
  meaning from machine code, at least in our overall understanding of
  the process it represents. Obviously, this is why we have compilers
  that take languages more relative to us, and translate them downwards.
</p>
<p>
  So really, the optimization has to be relativeness. The more
  relativeness, the easier to preserve the meaning and therefore
  efficiency of process.
</p>
<p>— {metadata.date}</p>
