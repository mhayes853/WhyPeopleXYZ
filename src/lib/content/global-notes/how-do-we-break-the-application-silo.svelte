<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "How do we break the Application Silo?",
    date: "4/9/26",
    anchor: "how-do-we-break-the-application-silo-",
  };
</script>

<p>
  Recently, I wrote about the need for the “next killer effort
  contributed to by everyone”, but the only way that’s going to happen
  is if we stop thinking about software as winner-take-all monoliths.
  For every 1 winner-take-all monolith made by a handful of people, the
  other thousands of players are immediately sent into retirement never
  to compete again. Thus, the monolith is forced to grow bigger in both
  features and complexity as everyone is forced to adopt it.
</p>
<p>
  On one hand, the monolith becomes very capable due to the fact that it
  must grow its featureset to match the expectations of users. On the
  other hand, it’s complexity grows boundlessly, eventually requiring
  armies of engineers, contributors, and now agents just to maintain it
  all. This, alongside the fact that many users have become dependent on
  the monolith, means that progress slows and stagnation begins.
  Perhaps, once the source code leaks this truth is revealed, but
  instead we’ll often pretend like nothing happened because Garry Tan
  just announced that he hit a rate of 100k LOC per day. Just kidding,
  but G-Kernel when? (It would only take 810 days at his actual current
  rate.)
</p>
<p>
  This is why it took LLMs to break the stronghold that traditional IDEs
  had on developers for decades. Throughout that period IDEs were
  stagnant with only minor incremental improvements year-over-year, and
  the cost of creating and distributing a new one was extremely high
  such that no one but the already established players could do it.
  Furthermore, the established players didn’t want to take the risk of
  creating something qualitatively different, so they never did and thus
  stagnation.
</p>
<p>
  The way to defeat this is not to build more monoliths, but rather to
  build smaller and more well round components that can all interact
  with each other. For instance, I’ve been enjoying cmux as of late, but
  I don’t care about its built-in browser and rarely use it. The reason
  for this is because I already use an actual browser (Zen), and I would
  rather use Zen than a bolted on <code>WKWebView</code>. However,
  there’s no way for cmux and Zen to talk to each other, which is why
  cmux added a built-in browser.
</p>
<p>
  So the question then becomes one of what the communication protocol
  looks like rather than one of “breaking the application silo” (that’s
  already been answered). There have been many of these that have been
  proposed or implemented, but all don’t solve the problem directly for
  all sorts of reasons. This is primarily because those solutions
  (Smalltalk, Etoys, etc.) tend to create their own isolated world with
  their own isolated constructs. This is great for purity, especially if
  the intention is to redesign something qualitatively different, but
  unfortunately doesn’t change the current state of things.
</p>
<p>
  To change the current state of things, you’ll need 2 things. One of
  which is a technical problem, but the second and bigger one is a human
  problem.
</p>
<ul>
  <li>
    A variety of transports (HTTP, Websockets, In-Memory, etc.) for the
    “messages”, and constructs for the “objects” (any existing runnable
    OS process or code).
  </li>
  <li>People to universally adopt the protocol.</li>
</ul>
<p>
  The second issue is why systems like Smalltalk haven’t been adopted at
  large, and also exactly why we still have this problem. Monoliths have
  been normalized to the point where very few will ever perceive of an
  alternative. That is, the application silo isn’t seen as a problem in
  the first place, and won’t ever be if we keep building the way we
  currently are.
</p>
<p>
  I have to say that starting a system like this to interop with
  existing applications is inherently starting from a non-idealistic
  point of view. Truthfully, if one wound the clock back enough to the
  80s, it would’ve been more ideal to design today’s systems with this
  view upfront, but I would still say that some progress can be made by
  starting from our current point. That is, it can hopefully become a
  comfortable step from a tricycle to a bicycle.
</p>
<p>— {metadata.date}</p>
