<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Swift Operation 1.0 Ideas",
    date: "11/3/26",
  };
</script>

<p>
  It’s been a little over a year since I released
  <a href="https://github.com/mhayes853/swift-operation">swift-operation</a>,
  which was born out of my missing a state manager like TanStack Query.
  It has seen some use in various small projects since then. There has
  also been a fairly steady stream of updates for a side project, such
  as adding macros and after-the-fact transforms. The most recent
  update was in September.
</p>
<p>
  When I released v0.1.0 last year, the library felt feature-complete
  for my use cases because I had spent the prior six months iterating
  on it with real-world usage. As a result, I didn’t see a pressing
  need to add many features immediately. That being said, writing code
  last year was very different from how we do things today with agents,
  so I’ve spent the last few weeks pondering what a new major version
  would look like.
</p>
<p>
  First, today’s swift-operation was primarily designed for human
  ergonomics while surfacing important architectural concerns around
  async work to those humans. However, this isn’t the right
  optimization target in a world where agents are writing more and more
  code.
</p>
<p>
  Such ergonomics can help agents to some extent, but it’s less costly
  these days to create in-house frameworks for similar purposes. That
  being said, there are technically complex concerns the framework
  manages that are useful to encapsulate for agents (e.g., state
  management and built-in modifiers). A v1 would focus more on those
  than on finding the best state management API.
</p>
<p>
  Second, the library needs more battle-testing and dedicated support
  for larger apps (~500k+ LOC), which will once again become more
  common with agents. The API shape would need to fit those use cases
  better while retaining its existing flexibility.
</p>
<p>
  With those points in mind, here are some initial plans for what a v1
  might look like. None of this is concrete or finalized; this is the
  general direction I’d like to see the library evolve in.
</p>
<h3>Better Cross-Platform Support</h3>
<p>
  The library already runs on all Swift platforms except for Embedded
  Swift. Embedded support would be a priority for v1, along with
  removing many <code>import Foundation</code> statements from the
  core. Importing full Foundation on non-Apple platforms can add ~40 MB
  to a release binary thanks to ICU, which is unacceptable for
  environments like Android and WASM, where overall app size matters.
</p>
<p>
  There would also be better defaults for non-Apple platforms,
  especially around store cache memory pressure and network
  observability.
</p>
<h3>No Dependencies</h3>
<p>
  Today, using the library to its fullest means unconditionally
  depending on Swift Sharing, Swift Dependencies, Issue Reporting,
  Identified Collections, and any further transitive dependencies from
  those packages. These dependencies are quite stable and reliable,
  but they aren’t strictly necessary and often aren’t built with
  fully cross-platform Swift in mind (e.g., Issue Reporting
  unconditionally imports Foundation).
</p>
<p>
  It’s quite possible to write <code>@SharedOperation</code> without
  Swift Sharing, and <code>OperationContext</code> could likely serve
  as a DI mechanism in place of Swift Dependencies. Issue Reporting and
  Identified Collections could probably also be removed with some work
  on the library’s core types.
</p>
<p>
  Any further dependencies that are required or desirable as
  integrations could be placed behind package traits. This would
  probably be the case for Swift Dependencies and Swift Sharing.
</p>
<h3>Async Graph-Based Runtime</h3>
<p>
  This would be the biggest change, since it shifts the framework’s
  entire execution model. I should explain what it means and why the
  graph would be more expressive.
</p>
<p>
  Today, a function marked as <code>@OperationRequest</code>,
  <code>@QueryRequest</code>, etc. can be described as a fancy function
  that can be automatically blessed with state management and
  composable behavior. The operation itself is simply an
  <a href="https://github.com/mhayes853/swift-operation/blob/e9cc7a595959a271dc4a3512c97a82918b4b9781/Sources/OperationCore/OperationRunner.swift#L77">awaited</a>
  async function call.
</p>
<p>
  While this model is simple, it isn’t expressive enough to let the
  library handle certain features that would be ideal built-ins.
  Instead, those features have to be built on top of the library core,
  which makes their implementations too opinionated to ship as direct
  library APIs. The
  <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CaseStudies/CaseStudies/03-Debouncing.swift">debouncing case study</a>
  is a good example, as is handling dependent operations. Both features
  should be built-ins, but the current operation runtime cannot express
  them in an unopinionated manner.
</p>
<p>
  The simple model also leads to awkward behavior for some modifiers.
  Retries are a good example: the most recent release contains a
  <a href="https://github.com/mhayes853/swift-operation/pull/29">PR</a>
  that lets users control conflicting retries. Without conflict
  resolution, retry modifiers would stack exponentially, which would
  be unexpected.
</p>
<p>
  An execution graph, on the other hand, would be a programmatic data
  structure resembling a program that runs an operation (you may hear
  this idea called an IR, or intermediate representation). In essence,
  operations would be like “compiled instructions” from a
  programming language that can be manipulated at runtime. Operation
  modifiers would also be able to modify the IR directly.
</p>
<p>A good version of such a graph would allow syntax like this:</p>
<CodeBlock language="swift" code={`
// An operation that runs every 2 days until some date deadline
//
// The runtime could handle this by scheduling a cron job, or through other means
let operation = someWork()
  .retry(3)
  .runEvery(.days(2), until: .someDeadline)

// Debounce someWork every 300 milliseconds
let operation = someWork().debounce(.milliseconds(300))

// someOtherWork depends on someWork
let operation = someWork().pipeResult { result in
  someOtherWork(result)
    .retry(10)
}
`} />
<p>
  As we can see, we can write declarative operations that run on any
  timescale we want, as well as operations with inherently stateful
  behaviors like debouncing.
</p>
<p>
  Another possibility would be serializing the operation graph and
  sending it to a different host to execute. This would require a lot
  of security work, so probably shouldn’t be expected in v1. However,
  you can look at Flight from React Server Components for an idea of
  what this might look like.
</p>
<p>
  If you’re familiar with Effect from the TypeScript world, a hugely
  popular framework for agents, these ideas will probably sound
  familiar.
</p>
<h3>Typed Contexts</h3>
<p>
  <code>OperationContext</code> acts as a generic DI container for
  operations today. The example apps also recommend using
  swift-dependencies alongside it, however, which makes the role of
  the context a bit confusing. I think this confusion primarily stems
  from <code>OperationContext</code> not being a good enough API and
  needing improvement.
</p>
<p>
  Ideally, operation contexts should be the only DI mechanism needed
  when building apps with the library. That’s the case with Effect
  from the TypeScript world, so it would make sense here too.
</p>
<h3>Analytics, Observability, and Agentic Workflows</h3>
<p>
  The repo’s current demo app has a built-in debug screen that appears
  when shaking the device. It contains all the operation runs from each
  app launch, along with their results. That’s right: every single
  operation in the demo app can be analyzed and observed in fine detail
  on a dedicated screen, including failed attempts.
</p>
<p>
  However, the demo app builds its own infrastructure to make this
  happen. While it is possible, it requires explicitly designing such
  tools. Implementing the same analytics modifiers in your app today
  isn’t hard with agents; the challenge is designing and scoping such
  tools for effective use in larger contexts. Building your own
  analytics is easy, but making it useful is hard.
</p>
<p>
  I think the library should have a native solution for analytics and
  observability that can be extended at the code level. This would
  encourage good patterns by default while still letting people build
  their own tools from a solid baseline.
</p>
<p>
  MCPs and other agent-friendly ways of consuming analytics would also
  be possible. This would be ideal because it would let you run agent
  workflows that analyze operation results at a fine-grained level and
  perform work based on those results.
</p>
<h3>Conclusion</h3>
<p>
  In essence, the library’s optimization target will almost certainly
  shift to agents in its next major release. This will mean less focus
  on being a good state manager, which I think was already achieved in
  the initial release, and more emphasis on a powerful, flexible
  operation runtime and tooling for agents.
</p>
<p>
  The next goal would be making the library capable of reliably
  powering larger-scale apps, which is especially necessary because
  agents can produce non-trivially sized apps on their own these days.
</p>
<p>
  The library’s existing flexibility and design philosophy will of
  course remain intact, though the API shape will almost certainly be
  different.
</p>
<p>— {metadata.date}</p>
