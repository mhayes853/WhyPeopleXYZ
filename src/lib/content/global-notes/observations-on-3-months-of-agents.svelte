<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Observations on 3 Months of Agents",
    date: "4/1/26",
  };
</script>

<p>
  It’s been about 3 months since I started seriously using agents in my
  workflow, so it’s time to share some thoughts.
</p>
<ul>
  <li>
    OpenCode using GPT 5.4 as my primary model. Occasionally MiniMax to
    see the progress of open weight things, and for smaller tasks.
  </li>
  <li>
    3-4 agents in parallel seems to be the sweet spot for productivity
    for a focused session.
  </li>
  <li>
    I’ve been able to build internal tools for various needs faster than
    ever before.
  </li>
  <li>I read the code.</li>
  <li>
    I still like handwriting code, just not boilerplate or glue as much.
    <ul>
      <li>
        The parts that feel more artistic are the parts that I still opt
        to handwrite.
      </li>
      <li>
        For lower-level things, agent code often isn’t good enough on
        it’s own, though it may get something started.
      </li>
      <li>
        Neither do I think my handwriting skills have atrophied. Writing
        more glue and boilerplate code does not keep your skills sharp,
        but rather taking on actually challenging things does.
      </li>
      <li>
        I still think handwriting will be around for the next few years,
        but eventually I do believe it will be completely suceeded by
        future tools in the distant future.
      </li>
    </ul>
  </li>
  <li>
    Agents tend to optimize for microbenchmarks.
    <ul>
      <li>
        If you tell the agent that a function is performance sensitive,
        it will try everything in it’s power to optimize the one
        function without considering the surrounding environment
        (especially hardware characteristics).
      </li>
      <li>
        Eg. Introducing a 4kb lookup table for a calculation that runs
        once in a logit sampling kernel.
      </li>
    </ul>
  </li>
  <li>
    Agents make ~3-4 subtle mistakes per 1000 lines of code.
    <ul>
      <li>
        You will need a review system in place for this reason. Codex
        code reviews seem to catch some of these mistakes, but I haven’t
        yet tried a dedicated code review tool like Greptile or Code
        Rabbit (Copilot review doesn’t seem to give useful suggestions
        on PRs that I’ve seen from various open source projects).
      </li>
    </ul>
  </li>
  <li>
    Mostly writing Swift and TypeScript (professionally + free time),
    however a bit of C++ (free time) and Go (internal tool) has also
    been written as of late.
    <ul>
      <li>
        Swift tends to be the biggest struggle (especially for MiniMax).
      </li>
    </ul>
  </li>
  <li>
    I don’t feel like I’ve lost too much identity or meaning, primarily
    because architectural design was always a fun part (and now it gets
    more focus).
    <ul>
      <li>
        As stated before, I still like handwriting artisinal code, but
        boilerplate and glue are not artisnal code.
      </li>
      <li>
        I also work with a small creative team, and like my environment.
        If I were in a soul-sucking enterprise where being able to write
        code was the last level of any work satisfaction I had, then
        maybe I would be quite depressed.
      </li>
    </ul>
  </li>
  <li>PRs have gotten larger.</li>
  <li>
    Team discussions have shifted away from specific codebase details to
    more design/business related topics.
  </li>
  <li>
    Constant refactors are necessary, because agents love large and
    verbose functions.
    <ul>
      <li>
        This has always been a thing, but now you must remain on top of
        it earlier in a project life-cycle.
      </li>
      <li>
        Agents tend to write more verbose code (eg. for-loops instead of
        using more concise collection transforms or other monadic
        behaviors), and you can often condense their output if you
        rewrote by hand.
      </li>
    </ul>
  </li>
  <li>
    I find myself branching out into more areas of software.
    <ul>
      <li>
        Mobile is one of the categories that more and more vibe-coders
        are entering. I have nothing inherently against vibe-coders
        provided their motivations are for the greater good, and I’m
        happy with the fact that more people have the chance to create
        something.
      </li>
      <li>
        However, if a vibe-coder can do much of what I was previously
        doing, then I would rather do something that requires more
        expertise. This has caused me to seek out contributing to
        lower-level projects like inference engines.
      </li>
      <li>
        That being said, I will still be working on apps in the future,
        but the nature of them will inherently involve more technical
        complexity as a result. In one sense, this can help with
        building standout features. On the other, it can make me lose
        sight of what I’m actually creating, so care will need to be
        taken.
      </li>
      <li>
        From a larger-scale business angle, I’m also not sure that just
        a mobile prescence will be enough going forward since the cost
        of building mobile apps is lower to the point where anyone can
        do it.
      </li>
      <li>
        This branching sort-of started early last year when I began
        working on libraries instead of apps in my free time. In fact, I
        would say that a good library is harder to get right than many
        apps.
      </li>
    </ul>
  </li>
  <li>
    Trust from the marketplace is definitely at an all time low.
    <ul>
      <li>
        Take Reddit for instance, where a few years ago posting an ad
        for a good app in relevant subreddits was generally seen as
        something valuable.
      </li>
      <li>
        Since the cost of building is now much lower, many people are
        spamming ads for their vibe-coded app on various subreddits,
        which has caused lots of backlash (especially given the lower
        regards to quality).
      </li>
      <li>
        This makes it more strenuous to engage with communities, because
        now there’s more upfront time cost needed to build proper trust.
      </li>
    </ul>
  </li>
  <li>
    Ralph Loops are an interesting technique for boring stuff.
    <ul>
      <li>
        They’ve also been a good way to get something started. Whereby
        after an initial version is built, you go back to a more engaged
        development process.
      </li>
    </ul>
  </li>
  <li>
    Less third-party tools are necessary because it’s not as time
    consuming to build stuff in-house now.
    <ul>
      <li>
        If a library or service doesn’t handle something of sufficient
        complexity or standard functionallity (eg. hosting
        infrastructure, databases, inference, standardized algorithms,
        frameworks, etc.), then I find that it’s now viable to build an
        in-house version of said service or library.
      </li>
      <li>
        This mostly applies to libraries that mostly simplified syntax
        (eg. react-hook-form)
      </li>
    </ul>
  </li>
  <li>
    Velocity increases 10x when I’m not thinking about design or the
    details of what is being generated.
    <ul>
      <li>
        When I do care, it drops massively. In general, caring about
        details will drop velocity because it’s more work than not
        caring. This is not exclusive to agentic coding.
      </li>
      <li>
        I’m also not interested in a LOC generated per day contest.
        Anyone can easily hit 10k per day by not caring deeply about the
        intimate details (see
        <a href="https://x.com/Gregorein/status/2038953944475472316">this</a>).
      </li>
      <li>
        Furthermore, the ability to increase production without a
        similar ability to increase visibility and understanding has
        historically created many second order problems. (eg. Injuries +
        health problems + work conditions caused by the Loom requiring
        labor laws to prevent further harm during the industrial
        revolution.)
      </li>
    </ul>
  </li>
  <li>
    Thinking and understanding is more important than ever.
    <ul>
      <li>
        This is a new black box, a new layer of abstraction, and thus a
        new generation of people who have no idea how things actually
        work will awaken.
      </li>
      <li>Everyone is now yet another step removed from something.</li>
      <li>
        Part of that something was bad, and thus it’s good that we’re
        removed from it.
      </li>
      <li>
        However, part of that something was necessary, and now that
        we’re removed from it the meaning is lost.
      </li>
    </ul>
  </li>
</ul>
<p>
  In essence, we have a new tool that increases productivity. Yet, like
  other such production tools that came before it, it does very little
  to boost understanding of what is being produced. Therefore, the
  understanding part is largely an exercise left to the wielder that can
  easily be, and is often deliberately, ignored.
</p>
<p>— {metadata.date}</p>
