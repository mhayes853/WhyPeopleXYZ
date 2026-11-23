<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "Swift Operation",
    description: "A cross-platform library for flexible asynchronous state and operation management in Swift.",
    nav: ["home", "about", "now"],
  };
</script>

<article>
  <h1 id="swift-operation" class="title">Swift Operation</h1>
  <ReadingTime />

  <p>
    Data fetching is flakey, yet most software we use needs to do it. In
    general, flakiness complicates software, because something can only be
    flakey if it comes from the physical-world. That is to say, fetching
    data is hard.
  </p>
  <p>
    However, when I say it’s hard, I don’t mean the code to actually fetch
    data itself. Generally, that part is pretty easy, and you can spin up
    an HTTP request to any server with just a few lines of Swift code.
    <code>Codable</code> and <code>JSONDecoder</code> handle most cases of
    decoding data from a server, and they do so pretty well. Additionally,
    many Apple Frameworks that also involve data fetching also tend to be
    relatively simple function calls if we’re just talking about fetching
    the data itself.
  </p>
  <p>
    Yet we know as developers that number of things that can go wrong when
    dealing with a function that has both <code>async</code> and
    <code>throws</code> in its signature. Loading states, error alerts,
    retries, caching, cancellation, deduplication, exponential backoff,
    delays, network connection status, keeping data consistent between
    screens and much more that is annoying to deal with.
  </p>
  <p>
    I’ve lost count of how many times I’ve written the same kind of code
    that: Sets a state variable to indicate loading, fetches data, if
    failed sets an error state variable, otherwise sets the data state
    variable to indicate that loading is done. The cherry on top is when
    you also have to display an alert when the data fetching fails. All of
    this is also not considering caching, yielding intermediate values
    whilst fetching from the source of truth (ie. Your backend), and much
    more.
  </p>
  <p>
    Over these past few months, I’ve spent a lot of effort developing a
    toolkit that I’ve used across various projects to make dealing with
    asynchronous operations and data fetching much more manageable, so you
    can move on after writing the simple data fetching code. Today, I’m
    finally putting a formal release tag behind these tools, so that you
    can use them in your (smaller) apps. For the record, that also
    includes apps on Linux, WASM, Windows, and Android.
  </p>
  <p>
    <strong>The resulting library is named
      <a href="https://github.com/mhayes853/swift-operation">￼<code>swift-operation</code>￼</a>.</strong>
  </p>
  <p>
    This article will mainly be about its development, and the various
    techniques I’ve employed when using and designing the library. I won’t
    focus too much on how to use the library in this article. The GitHub
    repo, documentation, and many demo apps present in the repo should do
    a sufficient job in providing many examples of how to use the library.
  </p>
  <br>
  <h2 id="origins">Origins</h2>
  <p>
    This project started out from my experience working with react-native
    in a startup for the past 1.5 years where we heavily relied on
    <a href="https://tanstack.com/query/latest/docs/framework/react/overview">Tanstack Query</a>. When writing Swift apps in my spare time, I missed the ability to
    have something that managed async state intuitively, which spawned the
    desire for this project. My initial goal was just to port Tanstack
    Query over to Swift, and integrate it with
    <a href="https://github.com/pointfreeco/swift-sharing">￼<code>swift-sharing</code>￼</a>, an already popular state management library used in many apps
    (including every app that uses modern TCA). In fact, the original name
    of the library was Swift Query, but of course that name was stolen…
  </p>
  <p>
    I was able to get this simple port version of the library up and
    running in quite a short period of time, but naturally I of course
    felt the need to continuously refine things as I kept trying it in
    different scenarios. This led to months of iteration as the library
    needed to find a distinct identity from Tanstack Query given that
    Swift is a very different language compared to TypeScript.
  </p>
  <p>
    Tanstack Query advertises itself as an “Asynchronous State Manager”.
    Swift Operation also has such state management built in, and even has
    an integration with Sharing through the
    <code>@SharedOperation</code> property wrapper. However, the resulting
    library I’ve built serves a more general purpose. Swift Operation aims
    to make asynchronous work as whole easier to manage, of which
    “asynchronous state management” would be a subset of that
    functionality. I like to call Swift Operation, an asynchronous
    operation manager because it uses a SwiftUI modifier approach to
    constructing operations.
  </p>
  <CodeBlock language="swift" code={`

struct User: Sendable {
  let id: Int
  let name: String
}

extension User {
  static func query(for id: Int) -> some QueryRequest<User?, any Error> {
    // We've configured fetching our user with retries, deduplication,
    // stale-when-revalidate, and automatic refetching when the network
    // connection flips from offline to online with just a few lines of 
    // code.
    Query(id: id)
      .retry(limit: 3)
      .deduplicated()
      .stale(after: 60 * 5)
      .rerunOnChange(of: .connected(to: NWPathMonitorObserver.startingShared()))
  }

  struct Query: QueryRequest, Hashable {
    let id: Int

    func fetch(
      isolation: isolated (any Actor)?
      in context: OperationContext,
      with continuation: OperationContinuation<User?, any Error>
    ) async throws -> User? {
      // Fetch the user...
    }
  }
}
`} />
  <p>
    For TypeScript apps, Tanstack Query is generally only used inside your
    UI layer, and its API heavily skews itself towards that particular use
    case. Swift Operation provides tools to use the library both within
    your UI and data layers. For example, there are many instances where
    the library is used for
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CanIClimb/CanIClimbKit/Sources/CanIClimbKit/LocationCore/UserLocationTool.swift">tool calling</a>
    via conforming to the <code>Tool</code> protocol conformances from
    Apple’s new FoundationModels framework.
  </p>
  <p>
    I suppose if you want to correlate Swift Operation with libraries from
    the TypeScript world, it’s largely a combination of both Tanstack
    Query and <a href="https://effect.website/">Effect</a>. Though so far,
    the library is more optimized for the Tanstack Query case.
  </p>
  <br>
  <h2 id="design-philosophy-learning-curve">
    Design Philosophy &amp; Learning Curve
  </h2>
  <p>
    Swift Operation is a complicated library, and intentionally so. I
    would wager that it is more complicated than Tanstack Query if you
    were to try and understand every detail of it.
  </p>
  <p>
    That being said, it is also quite simple in the sense that it’s built
    entirely around the notion of calling an async function. I suppose the
    complexity is really just case of “different” rather than “seriously
    complicated” (I think of TCA’s complexity in the same way for the
    record). Once you get over the learning curve, I think the end result
    will be a net win in simplicity considering what the library does for
    you.
  </p>
  <p>This large learning curve derives from 3 things:</p>
  <ol>
    <li>
      The library is incredibly flexible whilst also providing as much
      type-safety as possible.
    </li>
    <li>
      It surfaces advanced concepts of Swift Concurrency (eg.
      <code>isolated</code> parameters) right in your face.
    </li>
    <li>
      Data fetching is hard and complex with many edge cases that the
      library wants you to be aware of.
    </li>
  </ol>
  <p>
    Though the good news is that the most common use case (ie. Just making
    and using a <code>QueryRequest</code> that fetches some data in your
    UI.) is not that hard, and can be done incredibly “swiftly”. This most
    common use case should get you through ~80% of scenarios, and the rest
    of the library can be progressively learned.
  </p>
  <p>
    You’ll likely end up with more lines of code in your app after
    adopting the library. Ignoring the fact that many of those added lines
    won’t contain much substance (ie. Struct/Function declarations), the
    library also wants to surface edge cases that you probably weren’t
    thinking about before, so it’s only natural that you will end up
    writing code to handle those additional cases. Of course, over time
    the ideal for the library should be to get rid of many of those added
    lines that have little substance.
  </p>
  <br>
  <h2 id="comparison-to-tanstack-query">Comparison to Tanstack Query</h2>
  <p>
    One of the things Tanstack Query could’ve improved on was what the
    notion of a “query” was. In fact, I named the library Swift Operation
    because queries are a subset of a general operation that runs some
    workflow and returns a result. Mutations and paginated requests (ie.
    The equivalent of Infinite Queries from Tanstack Query), are also
    subsets of operations. In Tanstack Query, mutations and queries are
    separate concepts, but in Swift Operation they share much of the same
    core since they both derive from base operations.
  </p>
  <h3 id="customizing-operations">Customizing Operations</h3>
  <p>Take a common usage of <code>useQuery</code> from Tanstack Query.</p>
  <CodeBlock language="typescript" code={`

const FIVE_MINUTES = 5000 * 60

const usePost = (postId: number) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => await fetchPost(postId),
    retry: 3,
    staleTime: FIVE_MINUTES
  })
}
`} />
  <p>
    The problem is that we customize everything through a bag of
    configuration properties! This bag of properties is solely maintained
    by Tanstack Query, and adding a new property to this bag requires the
    approval of the maintainers. In essence, this makes adding custom
    higher order behavior to your queries nigh-impossible.
  </p>
  <p>Compare this to how queries are customized in Swift Operation.</p>
  <CodeBlock language="swift" code={`

struct PostQuery: QueryRequest {
  let postId: Int

  // ...
}

let fiveMinutes = TimeInterval(60 * 5)

let query = PostQuery(postId: 10)
  .retry(limit: 3)
  .stale(after: fiveMinutes)
`} />
  <p>
    The customization very much feels like customizing a SwiftUI view with
    a bunch of view modifiers. In fact, you can create your own modifiers
    with the <code>OperationModifier</code> protocol. Let’s look at how
    you can create a modifier to add artificial delay to any operation,
    whether or not that’s a mutation, query, or paginated request.
  </p>
  <CodeBlock language="swift" code={`

import Dependencies
import Operation

extension OperationRequest {
  public func previewDelay(
    shouldDisable: Bool = false,
    _ delay: Duration? = nil
  ) -> ModifiedOperation<Self, _PreviewDelayModifier<Self>> {
    self.modifier(_PreviewDelayModifier(shouldDisable: shouldDisable, delay: delay))
  }
}

public struct _PreviewDelayModifier<Operation: OperationRequest>: OperationModifier, Sendable {
  let shouldDisable: Bool
  let delay: Duration?

  public func setup(context: inout OperationContext, using query: Operation) {
    context[DisablePreviewDelayKey.self] = self.shouldDisable
    query.setup(context: &context)
  }

  public func run(
    isolation: isolated (any Actor)?,
    in context: OperationContext,
    using query: Operation,
    with continuation: OperationContinuation<Operation.Value, Operation.Failure>
  ) async throws(Operation.Failure) -> Operation.Value {
    @Dependency(\\.context) var mode
    guard mode == .preview && !context[DisablePreviewDelayKey.self] else {
      return try await query.run(isolation: isolation, in: context, with: continuation)
    }
    if let delay {
      try? await Task.sleep(for: delay)
    } else {
      try? await Task.sleep(for: .seconds(Double.random(in: 0.1...3)))
    }
    return try await query.run(isolation: isolation, in: context, with: continuation)
  }
}

private enum DisablePreviewDelayKey: OperationContext.Key {
  static let defaultValue = false
}
`} />
  <p>
    This modifier is used in the
    <a href="https://github.com/mhayes853/swift-operation/tree/main/Examples/CanIClimb">demo app</a>
    that ships with the library to add fake random delay to every single
    operation. This allows me to preview the experience that an actual
    user with a flakey internet connection would have, whilst still
    mocking fake results for the UI.
  </p>
  <p>
    Another
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CanIClimb/CanIClimbKit/Sources/CanIClimbKit/OperationDevToolsCore/OperationAnalysis.swift">modifier</a>
    is used to also power dev tools that analyze the run time of every
    single operation in the app.
  </p>
  <img class="dev-tools-image" src="/images/swift-operation/dev-tools-1.jpeg" alt="Dev tools showing the results of many operations displayed on a single scrollable list.">
  <p>
    To handle automatically displaying alerts when an operation succeeds
    or fails, I also created another
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CanIClimb/CanIClimbKit/Sources/CanIClimbKit/SharedHelpers/AlertStateQuery.swift">modifier</a>
    that utilizes <code>AlertState</code> from
    <a href="https://github.com/pointfreeco/swift-navigation">￼<code>swift-navigation</code>￼</a>. This modifier was often used in conjunction with mutations.
  </p>
  <p>
    Custom modifiers allow for higher-order functionality that you can’t
    get in Tanstack Query, and I’ve found this kind of configuration
    flexibility to even be useful in practical scenarios as can be seen by
    the above modifiers.
  </p>
  <h3 id="operation-types">Operation Types</h3>
  <p>
    Tanstack Query gives you queries, mutations, and infinite queries. All
    of these operation types are baked into the library, and new ones
    cannot be added directly.
  </p>
  <p>
    Swift Operation also gives you those 3 operation types, though
    infinite queries are called paginated queries, but you can create more
    kinds if you want. Queries, mutations, and paginated queries all
    inherit from the <code>StatefulOperationRequest</code> protocol, and
    <code>StatefulOperationRequest</code> inherits from the
    <code>OperationRequest</code> protocol. This generality means that you
    can write a custom operation modifier, and it will automatically work
    for queries, mutations, paginated queries, and any other custom
    operation types you come up with all at the same time.
  </p>
  <p>
    There’s an article in the documentation that describes the basics of
    creating a custom operation type from scratch. I will note that
    creating an operation type with the same robustness as the built-in
    types would take a lot of effort, but generally I think the need to
    create a fully robust operation type is quite a rarity. I’ve only
    found myself creating a custom operation type on 1 occasion so far,
    which was to create a type that could paginate many different data
    streams at once for a very specific use-case. In that case, it was
    enough to create a custom <code>OperationState</code> concrete type,
    so I think the bigger idea is that you can modularly replace parts of
    the built-ins as needed.
  </p>
  <p>
    Additionally, it’s also possible to create operation types that don’t
    require any state management because <code>OperationRequest</code> has
    no stateful requirements.
  </p>
  <h3 id="multiple-data-updates">Multiple Data Updates</h3>
  <p>
    Another benefit of Swift Operation is that it’s possible to yield
    multiple data updates from an operation while it’s still running
    through the <code>OperationContinuation</code> type that’s handed to
    each operation run. Tanstack Query also has some support for this
    through
    <a href="https://github.com/TanStack/query/blob/main/packages/query-core/src/streamedQuery.ts">￼<code>streamedQuery</code>￼</a>
    which works via
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of">async iterators</a>
    (think JavaScript’s version of <code>AsyncSequence</code>), but the
    issue with that API is that any query that uses it will not retain its
    loading state after the first chunk of data arrives.
  </p>
  <p>
    Regardless, in today’s LLM-based application landscape, streaming data
    is far more relevant than it once was. Therefore, I wanted to make
    this a first-class citizen in Swift Operation. The
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CanIClimb/CanIClimbKit/Sources/CanIClimbKit/MountainsCore/ClimbReadiness/Mountain+ClimbReadinessGeneration.swift">demo app</a>
    shows how you can use Apple’s new FoundationModels in conjunction with
    <code>OperationContinuation</code> to stream data while it arrives
    from the underlying on-device model.
  </p>
  <p>
    Another use case for multiple data updates would be yielding data
    that’s locally stored on disk whilst fetching the freshest data from a
    remote server. In fact, this can be a great way to implement offline
    support as shown many
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CanIClimb/CanIClimbKit/Sources/CanIClimbKit/MountainsCore/Mountain+Detail.swift#L61">different times</a>
    in the demo app.
  </p>
  <CodeBlock language="swift" code={`

struct MyQuery: QueryRequest {
  // ...

  func fetch(
    isolation: isolated (any Actor)?,
    in context: OperationContext,
    with continuation: OperationContinuation<Value, any Error>
  ) async throws -> Value {
    async let value = serverValue()
    continuation.yield(try await locallyPersistedValue())
    return try await value
  }
}
`} />
  <p>
    Tanstack Query also supports the above use case, but I think the main
    difference between the 2 libraries is that Swift Operation surfaces
    this functionality in a more direct way.
  </p>
  <h3 id="detached-state-management">Detached State Management</h3>
  <p>
    In Tanstack Query all queries and mutations are managed directly by
    <code>QueryClient</code>, and as a result an instance of the client is
    needed everywhere to observe the state of a query or mutation.
  </p>
  <p>
    This is also the default in Swift Operation (except
    <code>QueryClient</code> is named <code>OperationClient</code>), with
    the key difference being that the <code>OperationStore</code> type is
    solely responsible for the state management of an individual
    operation. The <code>OperationClient</code> merely just holds all the
    store instances created by your app, and allows you to query specific
    store instances using an <code>OperationPath</code> (the equivalent of
    the query key in Tanstack Query). However, it’s also possible to
    create stores that are not stored inside an
    <code>OperationClient</code>, and these are called
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Sources/OperationCore/Store/OperationStore.swift#L151">“detached stores”</a>.
  </p>
  <p>Detached stores are particularly useful for 3 cases.</p>
  <ol>
    <li>
      You want multiple and completely separate store instances for the
      same operation.
    </li>
    <li>
      You don’t want the store to be deallocated as a result of being
      evicted from the store cache within an <code>OperationClient</code>.
      <ol>
        <li>
          By default, this happens when your application runs low on
          memory, but it’s also possible to create your own custom store
          cache that uses a different eviction scheme (LRU, garbage
          collection, etc.).
        </li>
      </ol>
    </li>
    <li>
      You don’t like how <code>OperationClient</code> manages its pool of
      stores, and you want to create your own pool for some reason.
      <ol>
        <li>
          This last point is a testament to one of the design principles
          of the library. If you don’t like a built-in API, then you
          should have the power to create and use your own implementation
          of that API with the library.
        </li>
      </ol>
    </li>
  </ol>
  <h3 id="run-specifications">Run Specifications</h3>
  <p>
    Tanstack Query has built-in support for refetching queries when the
    application re-enters the foreground from the background (Tanstack
    calls this refetching on focus), and refetching queries when the
    network status flips from offline to online. This is particularly
    useful for keeping data as fresh as possible in your UI in the context
    of the user switching between apps, or when implementing a
    “Reconnecting…” dialog.
  </p>
  <p>
    Swift Operation also supports automatically rerunning operations in
    these circumstances, but yet again it does so in a modular way. While
    Tanstack Query bakes this kind of refetching directly into a query,
    Swift Operation builds this functionality generically on-top of the
    <code>OperationRunSpecification</code> protocol.
  </p>
  <p>
    A run specification allows you to control when an operation
    automatically reruns. It has 2 requirements.
  </p>
  <CodeBlock language="swift" code={`

public protocol OperationRunSpecification {
  /// Returns whether or not this condition is satisfied in the specified context.
  func isSatisfied(in context: OperationContext) -> Bool

  /// Subcribes to changes on this specification in the specified context.
  func subscribe(
    in context: OperationContext,
    onChange: @escaping @Sendable () -> Void
  ) -> OperationSubscription
}
`} />
  <p>
    <code>isSatisfied</code> is general invoked immediately after
    <code>onChange</code> is called within <code>subscribe</code>.
  </p>
  <p>
    The
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Sources/OperationCore/RunSpecifications/Modifiers/RerunOnChangeOperation.swift">￼<code>rerunOnChange</code>￼ modifier</a>
    provides the same operation rerunning capabilities as Tanstack Query’s
    automatic refetching. The modifier takes a run specification, and will
    automatically rerun the operation it modifies whenever it detects that
    the return value of <code>isSatisfied</code> changes to true. In fact,
    the actual refetching is further built on top of the generic
    <code>OperationController</code> protocol.
  </p>
  <p>
    <code>NetworkConnectionRunSpecification</code> and
    <code>ApplicationIsActiveRunSpecification</code> are the run
    specifications that power the same refetching abilities that you would
    find in Tanstack Query. The difference between the 2 libraries in this
    regard, is that you can also create
    <a href="https://github.com/mhayes853/swift-operation/blob/main/Examples/CaseStudies/CaseStudies/03-CustomFetchConditions.swift">custom run specifications</a>
    to drive automatic rerunning.
  </p>
  <h3 id="stateless-operations">Stateless Operations</h3>
  <p>
    Tanstack Query solely advertises itself as an asynchronous state
    manager, yet many of its features, like retries, also work in a
    stateless operation paradigm.
  </p>
  <p>
    What do I mean by stateless operation? A stateless operation is an
    operation that doesn’t need to have its state tracked by a UI or
    something else in real-time. Just think of it as a typical
    <code>async</code> function where you also don’t need to track whether
    or not the operation is in a loading, error, or success state.
  </p>
  <p>
    Since Tanstack Query is so focused on state management with its API,
    it only really makes sense to use it in your UI layer. If you have
    async operations that run in background or non-UI contexts, you
    generally don’t use Tanstack Query even if you would benefit from some
    of its features (eg. Deduplication and retries).
  </p>
  <p>
    I wanted to make Swift Operation something that is also viable in your
    data layer, and other non-UI contexts such as within tools in the
    FoundationModels framework. This is why there’s both an
    <code>OperationRequest</code> and
    <code>StatefulOperationRequest</code> protocol, where
    <code>StatefulOperationRequest</code> inherits from
    <code>OperationRequest</code>.
  </p>
  <p>
    If you create a direct conformances to <code>OperationRequest</code>,
    you aren’t required to specify a <code>State</code> associated type,
    or an <code>OperationPath</code> that uniquely identifies your
    operation. In effect, conforming to
    <code>OperationRequest</code> directly signals to the library that
    your operation is stateless, or that it’s just an async function that
    performs some work and returns a result.
  </p>
  <p>
    Of course, you cannot create <code>OperationStore</code> instances
    with stateless operations, so you will need
    <code>StatefulOperationRequest</code> to be compatible with the store.
    However, you still get access to a wealth of modifiers with stateless
    operations, including the ability to create modifiers that change or
    enhance the output type of your operation. Stateful operations cannot
    use modifiers that change their output type because their
    <code>State</code> type only works with a certain output type.
  </p>
  <br>
  <h2 id="future-directions">Future Directions</h2>
  <p>
    I think I’ve packed a lot into the <code>0.1.0</code> release of the
    library, but I have many more ideas. This list is merely a brain dump
    of whatever I can think of at the moment.
  </p>
  <ol>
    <li>
      Embedded Swift Support
      <ol>
        <li>
          The library already supports all major Swift platforms
          (including Android, Windows, and WASM), but the main thing
          holding back Embedded support IMO would be the use of
          existentials in deep corners of the library (eg. Within
          <code>OperationContext</code>).
        </li>
      </ol>
    </li>
    <li>
      Dev Tools
      <ol>
        <li>
          The demo app shows how basic dev tools can be made that allow
          you to analyze every single operation run that your app
          performs. However, it would be better to have a library specific
          solution to this that’s cross platform, but this will probably
          take a lot of time and planning.
        </li>
      </ol>
    </li>
    <li>
      Better Defaults on Non-Apple Platforms
      <ol>
        <li>
          For instance, the default store cache on non-Apple platforms
          does not use any mechanism to evict store entries because
          <code>DistpatchSource.makeMemoryPressureSource</code> isn’t
          available on those platforms.
        </li>
        <li>
          Additionally, Linux, Windows, and Android do not have a default
          <code>NetworkObserver</code> and
          <code>ApplicationActivityObserver</code>. WASM (in web browser
          applications) has dedicated default implementations for those 2
          protocols if you enable the
          <code>SwiftOperationWebBrowser</code> trait.
        </li>
      </ol>
    </li>
    <li>
      Macros
      <ol>
        <li>
          At the moment, the library ships with no macros. However, it’s
          also quite verbose with respect to defining operations. If there
          could be a way to make creating operations just as simple as
          defining normal functions (eg. The
          <code>@DatabaseFunction</code> macro from
          <a href="https://github.com/pointfreeco/swift-structured-queries">Structured Queries</a>), that would be nice. I just haven’t figured out how this
          would fully work with operation types with multiple requirements
          such as <code>PaginatedRequest</code>.
        </li>
      </ol>
    </li>
    <li>
      A Better Way to Derive Dependent Operations
      <ol>
        <li>
          By this, I mean constructing operations that depend on the
          results of other operations. There is a documentation article
          that describes how to do this, but the solution is far from
          ideal, and I’m not at all satisfied with it.
        </li>
      </ol>
    </li>
  </ol>
  <br>
  <h2 id="try-it-today">Try it Today</h2>
  <p>
    I think the library is ready to be used on a larger scale now, and I
    don’t think I can keep improving it by iterating in isolation for much
    longer. That being said, it’s far from mature, so I would advise
    against using it in enterprise scale or mission-critical apps at the
    time of writing this.
  </p>
  <p>
    The
    <a href="https://github.com/mhayes853/swift-operation">repo</a> has a
    lot more material describing how to use the library in different
    contexts, so check it out!
  </p>
  <p>— 9/26/25</p>
</article>

<style>
  .dev-tools-image {
    width: 300px;
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    .dev-tools-image {
      width: 100%;
    }
  }
</style>
