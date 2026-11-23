<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Call Me Psychotic",
    date: "9/24/26",
  };
</script>

<p>
  I have to confess that I essentially no longer write real code by
  hand anymore, even for the hardest stuff. Is the resulting code
  stylistically worse than had I written it by hand? Yes, but not if
  I’m time constrained while the agent isn’t. Do I care? No, an extra
  class or a few lines of verbosity in each function are not much of a
  concern for me when there are far more important things to be
  thinking about. However, I do tell the agent to simplify the code as
  much as it can because reading it is still important. This doesn’t
  mean I’ve fully stopped handwriting code altogether, but rather that I
  do it for different purposes that I’ll talk about later in this note.
</p>
<p>
  When I do hyper-analyze code, it’s typically not to call the agent
  out on its mistakes, but rather to find if there is room to improve
  the higher-level approach. I can catch code-level mistakes with tests
  and benchmarks, but I can’t as easily do the same for novel
  architecture decisions. Often, the individual lines of code give
  clues as to where the architecture itself is problematic.
</p>
<p>It’s worth noting what learnings happened in the last couple of months here:</p>
<ul>
  <li>
    Agents can run far more iterations/experiments than a human can at
    the code level for performance optimization, debugging, etc.
    <ul>
      <li>
        <strong>Caveat:</strong> They rarely try new approaches from
        scratch on their own, but generally try optimize directly what’s
        in front of them. This causes them to hit a local maximum often,
        and the agent will even try to give up (eg. Saying it’s
        impossible to optimize further) once such a maximum is reached.
      </li>
      <li>
        If the agent says that further improvements are impossible, it
        could be wrong. This is where it’s worth going back to the
        drawing board on the entire approach and coming up with a new
        architecture/process that’s qualitatively different from the
        existing one.
      </li>
    </ul>
  </li>
  <li>
    Agents can write far more tests than a human can in a shorter period
    of time, and can even afford to create new kinds of test suites
    altogether (eg. Computer Use based tests).
    <ul>
      <li>
        <strong>Caveat:</strong> It also introduces a bunch of
        verbose/unnecessary tests if left unchecked, and can often leave
        weak assertions in. Doing test hygeine should be a common
        routine just as you would with production code.
      </li>
    </ul>
  </li>
  <li>
    If code is hard to understand, you can ask agents to make a tool
    that allows you to understand it.
    <ul>
      <li>
        <strong>Caveat:</strong> Doing this well requires solid UI
        design skills, which many programmers have little exposure to.
        By “UI design”, I do not mean aesthetics and button styles,
        but rather how to leverage visuals and interactivity to
        communicate ideas.
      </li>
    </ul>
  </li>
</ul>
<p>
  These alone have made me shift my mindset from: “Can agents write
  reliable code?” to “How can I get agents to write reliable code?”
  There is a certainly learning curve to this, unlike what some people
  think. Sure, it takes little skill to ask a question or demand
  <em>something</em> from someone, but it takes a lot more skill to ask a
  question or demand the <em>right</em> thing from someone. This has been
  a basic communication problem far before agents, and rules out the
  idea that “prompting” is a skilless endeavor!
</p>
<p>
  So where do I still handwrite code, and what about those learning
  programming? For learners, I don’t think this is as special of a case
  that others seem to make it out to be, so let’s start by talking about
  the benefits of handwriting for learning.
</p>
<p>
  Writing code by hand gives one what I like to call “authorship
  understanding” because writing is a dimension of learning (write a
  lot and you’ll know what I mean). Therefore, I still handwrite code
  when learning a new language, library, or framework that I will be
  using with agents heavily, but often these are small one-off
  experiments and not real codebases. (I suppose Leetcode is also an
  exception to this for the time being as I’ve heard that many
  interviews are still largely handwritten DSA. However, I cannot see
  this being a viable interview approach in the long term for many
  reasons that I will not get into here. I think looking at what other
  Engineering professions do for interviews may be a better inspiration
  going forward.)
</p>
<p>
  For newer programmers, handwriting code does make sense as this is the
  time when they need to do most of their learning. However, the idea
  that they must be locked away from agents for multiple years is rather
  silly. In fact, agents will allow them to work on real things much
  sooner, and there’s a lot of learning working in a codebase that’s
  many thousands of lines instead of simple school assignments.
  (Furthermore, they will just use agents anyways, no matter if they
  have the desire to learn something or not. Those with little desire to
  learn will likely use agents as a means to do all of their work for
  them to their detriment, whereas those who want to learn will likely
  use agents to learn faster to their benefit.)
</p>
<p>
  In college, I had to handwrite codebases that were large enough to
  warrant needing to understand good architecture, Clean Code, etc.
  However, even then I could only get to ~20-30k lines at most on my
  own, and it would often take months to get to that point since all the
  code had to be handwritten. It is now trivial to get to that point with
  agents, and as a result a newer programmer will be forced to learn
  good design principles much earlier than before. (Most school
  assignments typically top out at ~1000 lines of “toy code”, which
  just isn’t nearly enough to build the intuition for real systems.)
</p>
<p>
  With this in mind, the only questions are about what comes next. I
  think there are a few things that are clear:
</p>
<ul>
  <li>
    Massively more production means an order of magnitude increase in
    complexity.
    <ul>
      <li>More components == More emergent properties == More complexity.</li>
    </ul>
  </li>
  <li>
    We cannot know the true societal impacts until agents are more
    mainstream in the general public.
    <ul>
      <li>See my dedicated note on this topic.</li>
    </ul>
  </li>
  <li>
    Software is now suitable as a better kind of power point
    presentation.
    <ul>
      <li>
        Non-technical people can actually use tools like Codex now to
        present live-running prototypes when only engineers previously
        could. Of course, these prototypes are often long ways from
        shippable, but this allows a whole new class of people to
        contribute meaningfully. I see such prototypes as akin to slide
        decks and traditional presentations today.
      </li>
    </ul>
  </li>
</ul>
<p>
  What I really think this means is that the bar for engineering itself
  is much <em>higher</em> now than it previously was. This is because we
  have more software, and especially more software that is
  <em>non-deterministic</em>. The lesson from the HuggingFace attack
  shouldn’t be that the models are going to cause the apocalypse and
  that we should all fear our safety, but rather that we have to find
  better engineering practices to mitigate such attacks in the first
  place! Agents, at the end of the day, can be described as
  non-deterministic software that so happens to largely run on a GPU
  cluster. (There are already many other kinds of software that fit this
  same pattern, though not to the same degree!) Therefore, they aren’t
  immune from being handled by real Software Engineering practices,
  especially ones that are designed to handle non-determinism.
</p>
<p>
  The engineering complexity itself may not come from writing code by
  hand anymore, but it almost certainly will be coming from a bigger
  picture systems standpoint. So far, our new tools and conventions seem
  to have not fully adapted to this reality, and I think this will become
  apparent over the coming months. My “Creating Understanding” series
  will go into this area, but even then I still think there’s a long way
  to go.
</p>
<p>
  I want to end this long note by addressing why I think much skepticism
  is still going around. Saying something along the lines of “adapt or
  die” psychologically will cause skeptics to become further skeptics,
  so we need to look at the 2 root causes of skepticism which I think
  are:
</p>
<ul>
  <li>Reduction of quality to increase shipping speed.</li>
  <li>The enjoyment of the craft fading away.</li>
</ul>
<p>
  To the first point, when many skeptics hear about how agents are
  “changing the landscape”, they immediately pair that with the first
  point. There certainly are many instances where development has become
  a game of “fire the slop cannon”, but things don’t have to be this
  way. When you can easily create more code, you can also create stronger
  tests, experiment with better technical implementations, add “the
  little things” to a product that would’ve been a pure waste of time
  before, etc. Furthermore, you can emulate the “many eyes on the code
  at all times” effect that was previously only limited to the largets
  projects and companies. We now have the tools to do better engineering
  in a more economically viable way, we just have to use them.
</p>
<p>
  To the second point, it’s more of a personal question, so I cannot
  make much of an argument there. However, what I can say is that the
  code I do handwrite today is much more cherishable than it was last
  year. This is because real systems tend to have many “messy” (I
  don’t like this term…) parts, and having to handwrite code in such
  cases was sometimes off-putting. Today, when I handwrite code, I can
  focus on elegance, trying things, learning, and most importantly just
  having fun.
</p>
<p>
  I will say one more thing on the second point however. When I first
  tried agents towards the end of last year, I was briefly afraid that I
  wouldn’t enjoy using them. That turned out not to be the case, and
  actually this year has been one of the most fun years I’ve had in a
  while. So really, it turns out that one can enjoy both handwriting and
  agentic coding at the same time.
</p>
<p>— {metadata.date}</p>
