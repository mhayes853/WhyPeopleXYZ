<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "I Actually Tried A Ralph Loop",
    date: "3/5/26",
  };
</script>

<p>
  After 2 months of seriously using agents, I finally felt comfortable
  trying a HIL version of Ralph on a recent internal tool to do some
  marketing analysis for my company’s
  <a href="https://stresyx.com/">pivot</a>. Also, I needed a test drive
  for my latest and quite big release of swift-cactus 2.0. (I’ll write
  something formal about this another time, CFG support in the main
  engine is still needed to get it where it needs to be…)
</p>
<p>
  Additionally, a model I’ve been playing around with quite a lot
  recently is Minimax M2.5. A TLDR for why I like it is that it’s not
  trying to be a cheap Codex or Opus like GLM and Kimi, and I wanted
  something that wasn’t Codex for certain tasks. Regardless, this was
  the model I decided to use for the sake of doing so.
</p>
<p>
  The tool itself was a straightforward CLI to fetch some posts from
  various data sources (Reddit primarily), and feed the content into
  LFM2-8b-a1b running locally via the cactus engine to produce
  suggestions and a report regarding the validity of a user defined
  hypothesis. Additionally, qwen3-embed-0.6b was also used as an
  embedding model for both vector indexing and aiding with
  categorization for posts. I also used this chance to play with
  <a href="https://github.com/christopherkarani/Wax">Wax</a>, a
  single-file vector database written in pure Swift, and was the primary
  persistence mechanism of choice. Also if it wasn’t obvious, Swift was
  used as the programming language.
</p>
<p>
  Overall, the task was completed with about ~4-5 hours of HIL ralphing,
  though improvements can certainly still be made to the experience of
  the tool itself. Therefore, the experiment was certainly a success
  from the standpoint of being able to produce something that is
  functional.
</p>
<p>
  My overall idea itself was to start in one session by creating a plan
  and detailed implementation specification document with the agent.
  This specification was one large markdown file because I wasn’t trying
  to build something incredibly complicated. Then, I ran another agent
  session which broke down that implementation spec into 17 distinct
  tasks listed in another document. Each task included, a title, a
  description, completion criteria, and a list of tasks it depended on.
  Since we are doing Ralph, the agent got to pick the order of task
  completion. (It went mostly sequential with a slight exception towards
  the later tasks where it actually backtracked for a bit.)
</p>
<p>
  Of course, my thoughts on general software development techniques are
  generally mixed, and Ralph is no exception to this rule. Generally
  speaking, over dogmatic focus on patterns instead of systems is how
  you get complexity, so we have to keep that in mind at the end of the
  day. Nevertheless, here’s a somewhat comprehensive list that reflects
  my experience.
</p>
<ul>
  <li>
    The code quality was absolutely terrible.
    <ul>
      <li>
        Before listing individual cases here, I should mention that this
        is a tool that will be thrown away in a few weeks time, so the
        quality isn’t that important.
      </li>
      <li><code>@unchecked Sendable</code> everywhere.</li>
      <li>
        Loading the model weights from scratch every time embeddings or
        inference was needed, instead of keeping the weights in memory.
      </li>
      <li>
        Weird Java-like patterns that don’t make sense in Swift.
        <ul>
          <li>Getter/Setter methods was common for some reason.</li>
        </ul>
      </li>
      <li>
        Writing tests for obvious things, like compiler-synthesized
        Codable conformances.
      </li>
      <li>
        Not using actors properly, and preferring NSLock when an actor
        would make things simpler.
        <ul>
          <li>
            In one case, it tried to use a serial dispatch queues within
            the actor itself to serialize work. Even worse, it would use
            <code>queue.async</code>, and await values via
            <code>withUnsafeContinuation</code>. I’m not making this up…
          </li>
        </ul>
      </li>
      <li>
        Coupling generic logic with domain logic.
        <ul>
          <li>
            In one case, it wrote a cosine similarity method that was
            private in a class. Generally speaking, I always try to
            extract such generic methods into a reusable place even if
            they are only used once.
          </li>
        </ul>
      </li>
      <li>Etc.</li>
    </ul>
  </li>
  <li>
    It did a decent job separating interface from implementation via
    protocols.
    <ul>
      <li>
        That is, it was able to create mocks of things for testing which
        was nice.
      </li>
      <li>
        While it did create protocols, it often named/coupled the
        protocol requirements to the implementation itself which isn’t
        ideal.
      </li>
    </ul>
  </li>
  <li>
    It completed the work in a very short period of time.
    <ul>
      <li>
        ~8k LOC in 4-5 hours of work isn’t bad, the same amount of code
        would’ve taken me at least a solid week of dedicated effort.
      </li>
    </ul>
  </li>
  <li>
    It did a decent job of implementing the isolated and mundane things.
    <ul>
      <li>Reddit API Client</li>
      <li>Wax memory wrapper</li>
      <li>Cactus embedding provider for Wax</li>
      <li>Domain model types/simple structs</li>
      <li>Persistence</li>
      <li>Configuration reading</li>
      <li>Etc.</li>
    </ul>
  </li>
  <li>
    It did a terrible job of implementing the main tool loop.
    <ul>
      <li>
        For some reason, it would avoid actually writing the part where
        the LLM was called in the main loop of the tool.
      </li>
      <li>
        Additionally, it avoided integrating in all of the isolated
        modules in the code base, preferring to use mocks in the
        production code.
      </li>
      <li>
        Suffice to say, I had to break HIL Ralph and take over manually
        via normal agentic coding to get it to actually build the main
        loop of the tool.
      </li>
    </ul>
  </li>
</ul>
<p>What did we learn here?</p>
<p>
  For one, I could probably be a better spec writer, and use Codex
  instead of Minimax. Also, I’m sure with more practice the overall
  output will become better regardless of the model choice. What I did
  certainly find was that many trivial modules can easily be ralphed
  with very little effort, however the fun parts of building are where
  breaking out of the loop seems to be a better idea.
</p>
<p>
  Ralph gives more control to the agent than you. In normal agentic
  coding, you can generally get the agent to write decent code if you
  direct it well. (Though it will still often miss critical performance
  details, and make ~2-3 small mistakes per 1000 lines). However, the
  quality seems to go way down when you hand full control to the agent.
  This is ok if you limit its crappy output to a series of well-defined
  interfaces in your spec, so make sure you nail your higher level
  design decisions.
</p>
<p>
  Overall, I once again think of this as a technique that’s great in the
  sense of graphic design to art. That is, it can get stuff done like a
  graphic designer, but it lacks the ability to produce incredible art.
</p>
<p>— {metadata.date}</p>
