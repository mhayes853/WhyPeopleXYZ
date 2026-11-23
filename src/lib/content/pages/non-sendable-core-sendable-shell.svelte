<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import FootnoteDef from "#lib/components/FootnoteDef.svelte";
  import FootnoteRef from "#lib/components/FootnoteRef.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "Non-Sendable Core, Sendable Shell",
    description: "How to push Swift Concurrency to the edge, and make the rest of your code simpler.",
    nav: ["home", "about", "now"],
  };
</script>

<article>
  <h1 id="non-sendable-core-sendable-shell" class="title">
    Non-Sendable Core, Sendable Shell
  </h1>
  <ReadingTime />
  <p>
    Swift Concurrency seems to be one of the hard Swift topics, and one
    thing we can do in Computer Science is to continue pushing hard
    problems away to another layer of abstraction. Naturally, we can do
    that with Swift Concurrency too!
  </p>
  <p>
    This isn’t an article about understanding isolation or Sendable. I
    assume you already are somewhat familiar with basic Swift Concurrency
    concepts. Rather, I more or less want to outline the pain points
    around those concepts, and demonstrate a technique for pushing them to
    the edge.
  </p>
  <br>
  <h2 id="tldr-example">TLDR Example</h2>
  <p>
    Since this article naturally draws out the explanation to include many
    details, I’ll give a TLDR code example right away. That is,
    non-Sendable types are much more flexible than Sendable types.
    Sendable types require either locking or actor isolation overhead, so
    it’s much easier to defer such mechanisms as long as possible.
  </p>
  <CodeBlock language="swift" code={`

// ✅ By making CactusModel non-Sendable, we can reuse it 
// in any Sendable type whether it's an actor, or class with a lock.

struct CactusModel: ~Copyable {
  // Non-Sendable Core...
}

final actor CactusModelActor {
  let model: CactusModel

  init(model: consuming sending CactusModel) {
    self.model = model
  }

  // Sendable Shell...
}

final class SomeState: Sendable {
  struct State {
    let model: CactusModel
    var otherState: Value
  }

  private let state = Mutex(State())

  // Sendable Shell...
}
`} />
  <p>
    With that out of the way, now we can focus on dragging out the
    explanation from first principles. However, I would first like to look
    at a corollary idea, and where this article gets its naming scheme
    from.
  </p>
  <br>
  <h2 id="functional-core-imperative-shell">
    Functional Core, Imperative Shell
  </h2>
  <p>
    The name of this article comes from the “Functional Core, Imperative
    Shell” idea. If you’re unfamiliar with “Functional Core, Imperative
    Shell”, here’s a simple code example to illustrate.
  </p>
  <CodeBlock language="swift" code={`

struct Item {
  // ...
}

// ❌ Bad, mixes IO (side effects) and business logic.

func processBad() async throws {
  let items = try await loadItems()
  let transformed = items.filter { /* ... */ }
    .map { /* ... */ }
    .reversed()
    .dropFirst()
  try await save(transformed)
}

// ✅ Good, separates IO (side effect) from business logic

func processGood() async throws {
  let items = try await loadItems()
  try await save(items.transformed)
}

extension Sequence where Element: Item {
  var transformed: some Sequence<TransformedItem> {
    items.filter { /* ... */ }
      .map { /* ... */ }
      .reversed()
      .dropFirst()
  }
}
`} />
  <p>
    By separating out the collection transformation, we gain more
    flexibility. That is, we can choose to reuse the transformation logic
    regardless of how the underlying data is persisted, or even write
    isolated unit tests just for the transformation logic. In general,
    once IO or side effects are introduced to your code, it becomes much
    less flexible, so it's best to keep those isolated from the core to
    maintain flexibility.
  </p>
  <p>
    In the above example, the transformation logic is what we call the
    “functional core”, and the IO is what we call the “imperative shell”.
  </p>
  <br>
  <h2 id="async-makes-things-harder">Async Makes Things Harder</h2>
  <p>
    Generally speaking, once async/await is required to call a method,
    things get much harder. If you’re in a synchronous context, you’ll
    either have to create an unstructured task, or mark the enclosing
    method as <code>async</code>.
  </p>
  <CodeBlock language="swift" code={`

func foo() {
  // ❌
  await someWork()
}

// ✅ Either approach compiles, but aren't always ideal

func foo() async {
  // 🔵 Delegates async responsibility to whoever calls foo
  await someWork()
}

func foo() {
  // 🔵 Completely hides the fact that async unstructured work has been started
  Task { await someWork() }
}
`} />
  <p>
    Furthermore, you open a whole can of worms regarding
    <code>Sendable</code> once you start getting into concurrency land.
    When it comes to dealing with non-Sendable types, you have to take
    special care when passing them across actor isolation boundaries,
    otherwise the Swift compiler will hate you.
  </p>
  <p>
    Thankfully, the <code>sending</code> keyword can help somewhat when it
    comes to non-Sendable types and tasks. This keyword allows you to
    transfer non-Sendable values across isolation boundaries, which means
    that you can use non-Sendable values within tasks.
  </p>
  <CodeBlock language="swift" code={`

func foo(value: sending NonSendable) {
  Task {
    // ✅ value is being explicitly transferred into the Task's 
    // isolation context
    let v = value
  }
}
`} />
  <p>
    However, it doesn't work everywhere. For instance, you can’t use
    <code>sending</code> to capture a non-Sendable value inside an
    <code>@Sendable</code> closure.
  </p>
  <CodeBlock language="swift" code={`

func badTransfer(
  value: sending NonSendableValue
) -> @Sendable () -> Void {
  // ❌ Capture of 'value' with non-Sendable type 'NonSendableValue' in a '@Sendable' closure
  return { work(value) }
}
`} />
  <p>
    The reason this doesn’t work is because
    <code>@Sendable</code> closures are meant to be thread-safe, and as a
    result may be called multiple times from different threads. Once you
    understand that fact, it becomes clear why the above code example
    doesn’t work. The point of the <code>sending</code> keyword is only to
    send a value to a different isolation context, and nothing more. In
    fact, the original proposal for <code>sending</code> actually named
    the keyword <code>transferring</code> at first until it was renamed
    presumably due to naming conflation with Swift's ownership model and
    to be more in line with Sendable.
  </p>
  <br>
  <h2 id="conforming-to-sendable-can-be-annoying">
    Conforming to Sendable can be Annoying
  </h2>
  <p>
    If we can’t use the <code>sending</code> keyword to get around
    concurrency issues, the next step up is to conform to Sendable
    directly. For simple structs, this is trivial because the compiler can
    infer thread-safety for you. In fact, I personally do this by
    <em>default</em> whenever I make a new simple struct data type.
  </p>
  <CodeBlock language="swift" code={`

// ✅ Trivially Sendable.
//
// I always tend to conform simple structs to Hashable and Sendable 
// without second thought.
struct Item: Hashable, Sendable {
  let fieldA: Int
  let fieldB: String
}
`} />
  <p>
    However, things get harder when we need to deal with reference types.
    Any non-final class, or even simple mutable properties will prevent an
    auto synthesized Sendable conformance.
  </p>
  <CodeBlock language="swift" code={`

// ❌ Cannot have mutable properties
final class Item: Sendable {
  var fieldA: Int
  var fieldB: String
}

// ❌ Must be a final class 
// (Subclasses could add mutable/non-Sendable properties otherwise)
class Item: Sendable {
  let fieldA: Int
  let fieldB: String
}
`} />
  <h3 id="unchecked-sendable">Unchecked Sendable</h3>
  <p>
    Of course, you can use <code>@unchecked Sendable</code>, but that
    usually isn’t something you want to deliberately touch because it
    turns off compiler checking for Sendable. That is, the compiler can no
    longer offer any guarantees that your type is thread-safe. Think of it
    in the same vein as force-unwrapping an optional. It’s allowed, but
    you better know what you’re doing.
  </p>
  <p>
    I’m not suggesting that you should never use
    <code>@unchecked Sendable</code>. In fact, if you go deep enough with
    integrating legacy frameworks, low-level C libraries, or locks, it’s
    almost certain that you will need to use it at some point. Just make
    sure you justify yourself when you do so, ideally through a comment
    next to the <code>@unchecked Sendable</code> conformance.
  </p>
  <h3 id="actors">Actors</h3>
  <p>
    Another way to get automatic an Sendable conformance is to convert
    your type to an actor (or just throw a global actor like
    <code>@MainActor</code> at the problem).
  </p>
  <CodeBlock language="swift" code={`

// ✅ Actors are Sendable by default.

actor Item {
  var fieldA: Int
  var fieldB: String
}

@MainActor
final class Item {
  var fieldA: Int
  var fieldB: String
}
`} />
  <p>
    For <code>@MainActor</code> specifically, new Xcode projects even make
    MainActor isolation the default for all declarations. However, if you
    want a type be usable from multiple isolation contexts, you will have
    to mark it <code>nonisolated</code> in addition to a Sendable
    conformance.
  </p>
  <CodeBlock language="swift" code={`

nonisolated struct Item: Sendable {
  var fieldA: Int
  var fieldB: String
}
`} />
  <p>
    On a personal note, I tend not to use default MainActor isolation. At
    least for me, I like to be explicit when something is main actor
    compatible, and since I tend to write a lot of thread-agnostic non-UI
    code in addition UI code, I find it simpler to keep everything
    consistent and turn off default Main Actor isolation.
  </p>
  <p>
    Regardless of how you choose to use actors, you’ll be dealing with
    async/await when you’re not isolated to the actor. As previously
    mentioned above, adding async just complicates things.
  </p>
  <p>
    With actors, there’s also more lesser-understood points of conceptual
    overhead.
  </p>
  <ul>
    <li>
      The <code>SerialExecutor</code> protocol allows an actor to
      customize its execution environment.
      <ul>
        <li>Useful if you need to run things on a dedicated thread.</li>
      </ul>
    </li>
    <li>
      Any non-Sendable type returned from an actor method also requires
      <code>sending</code>
      <ul>
        <li>
          Furthermore, the value returned from the method also cannot be
          an instance member of the actor, because doing so would make the
          non-Sendable type present in 2 separate isolation contexts.
        </li>
      </ul>
    </li>
    <li>
      Actor interleaving.
      <ul>
        <li>
          Only 1 task can enter an actor at a time, so if a task must
          await another <code>async</code> method within the actor, it
          must leave the current actor to swap isolation contexts. This
          allows another task to enter<FootnoteRef n={1} /> the actor in the meantime.
        </li>
      </ul>
    </li>
    <li>
      Actor re-entrancy.
      <ul>
        <li>
          Once the original task from the interleaving explanation is done
          performing its async work, it must re-enter the original actor
          that it once left to continue execution past the suspension
          point it previously awaited.
        </li>
      </ul>
    </li>
    <li>
      <code>isolated</code> parameters.
      <ul>
        <li>
          This allows one to declare methods external to the actor as
          being isolated to the actor. Since a task can only be on at most
          1 actor at a time, this also means that a function can only have
          at most 1 isolated parameter.
        </li>
      </ul>
    </li>
  </ul>
  <br>
  <h2 id="avoiding-sendable">Avoiding Sendable</h2>
  <p>
    Since Sendable brings a lot of inconveniences, we have to ask
    ourselves the question of how long it can be avoided. In today’s
    world, the answer to this that we can get quite far with non-Sendable
    types.
  </p>
  <h3 id="async-methods-in-non-sendable-types">
    Async Methods in Non-Sendable Types
  </h3>
  <p>
    One of the previous issues with non-Sendable types was the notion of
    having async methods on them. Invoking them would cause an isolation
    hop to a non-isolated context, which would produce often very
    non-intuitive errors.
  </p>
  <CodeBlock language="swift" code={`

class NonSendable {
  func work() async {
    // ...
  }
}

@MainActor
@Observable
final class MyViewModel {
  let nonSendable = NonSendable()

  func buttonTapped() async {
    // ❌ Sending 'self.nonSendable' risks causing data races
    await self.nonSendable.work()
  }
}
`} />
  <p>
    However, today you can use <code>nonisolated(nonsending)</code> to fix
    this error.
  </p>
  <CodeBlock language="swift" code={`

class NonSendable {
  nonisolated(nonsending) func work() async {
    // ...
  }
}

@MainActor
@Observable
final class MyViewModel {
  let nonSendable = NonSendable()

  func buttonTapped() async {
    // ✅ No longer sending non-Sendable to a nonisolated context
    await self.nonSendable.work()
  }
}
`} />
  <p>
    What this tells the compiler is that <code>work</code> will execute on
    the isolation context that it is invoked on. In fact, you can even
    enable this behavior by default through the
    <code>NonIsolatedNonSendingByDefault</code> feature.
  </p>
  <p>
    However, it's also worth noting that this theoretical example is a
    textbook definition of “NonSendable core, Sendable Shell” since the
    <code>NonSendable</code> class acts as the non-Sendable core and
    <code>MyViewModel</code> the Main Actor bound Sendable shell. Now, we
    can look at some more practical examples involving wrapping a C
    library that I’m involved in semi-regularly.
  </p>
  <br>
  <h2 id="practical-example-swift-cactus">
    Practical Example: Swift Cactus
  </h2>
  <p>
    In particular, say you need to wrap a C library with weird threading
    semantics, but need to integrate it with Swift Concurrency. For this
    example, I’ll wrap the
    <a href="https://github.com/cactus-compute/cactus">cactus inference engine</a>, which is a highly energy efficient, ARM optimized, and performant
    alternative to MLX, ONNX, llama, etc. that runs primarily on the CPU.
    I’m not going to make a sales pitch for the engine in this article
    because I want the focus to be wrapping it properly from Swift. In
    fact, the principles in these code examples can be found in the
    <a href="https://github.com/mhayes853/swift-cactus">swift-cactus</a>
    package that I actively maintain.
  </p>
  <p>
    The Cactus FFI exposes many functions, so I’ll only include heavily
    simplified signatures of some of the basic FFI functions for
    simplicity. Just note that in reality the library supports many more
    advanced features, but the underlying principles of the Swift API
    design are the same.
  </p>
  <CodeBlock language="c" code={`

// Loads model weights.
CACTUS_FFI_EXPORT cactus_model_t cactus_init(
    const char* model_path
);

// Deallocate a model.
CACTUS_FFI_EXPORT void cactus_destroy(cactus_model_t model);

// Stops an active ongoing generation for a model.
CACTUS_FFI_EXPORT void cactus_stop(cactus_model_t model);

// Runs inference for a given model, and outputs the 
// result into response_buffer.
CACTUS_FFI_EXPORT int cactus_complete(
    cactus_model_t model,
    const char* messages_json,
    char* response_buffer,
    size_t buffer_size
);
`} />
  <p>
    <code>cactus_model_t</code> itself is an opaque pointer, but under the
    hood it’s represented as a struct in C++ that looks something like
    this. (Once again, very simplified from the actual handle<FootnoteRef n={2} />.)
  </p>
  <CodeBlock language="cpp" code={`

struct CactusModelHandle {
    std::unique_ptr<cactus::engine::Model> model;
    std::atomic<bool> should_stop;

    CactusModelHandle() : should_stop(false) {}
};
`} />
  <p>
    As we can see, we have an atomic for whether or not ongoing inference
    should stop. Furthermore, the <code>Model</code> class in the C++
    engine does not use any locks under the hood. This puts us in a weird
    case where <code>cactus_stop</code> is safe to call from different
    isolation contexts in Swift, but <code>cactus_complete</code> is not.
  </p>
  <p>
    However, LLM inference is also incredibly expensive, and certainly you
    should not be doing it from the Main Actor. Yet, only exposing the
    model API behind an actor would limit the Swifty wrapper to purely
    async contexts.
  </p>
  <p>
    As such, I think this is a perfect case for non-Sendable core,
    Sendable shell. Since we’re wrapping a pointer from an underlying C
    library, we can use a non-Sendable and non-Copyable struct to ensure
    ownership semantics when passing the model around. Then, we can create
    a wrapper <code>CactusModelActor</code> that wraps our non-Copyable
    type to grant proper built-in Sendable and background execution to the
    inference engine.
  </p>
  <CodeBlock language="swift" code={`

struct CactusModel: ~Copyable {
  private let pointer: cactus_model_t

  init(pointer: consuming sending cactus_model_t) {
    self.pointer = pointer
  }

  init(path: URL) {
    guard let pointer = cactus_init(path.absoluteString) else {
      throw CactusModelError.failedToLoadModel
    }
    self.init(pointer: pointer)
  }

  deinit {
    cactus_destroy(self.pointer)
  }

  func complete(messages: [Message]) throws -> Completion {
    let encodedMessages = try JSONEncoder().encode(messages)
    let buffer = UnsafeMutableBufferPointer<CChar>.allocate(capacity: 8192)
    defer { buffer.deallocate() }
    let result = cactus_complete(
      self.pointer,
      String(decoding: encodedMessages, as: UTF8.self),
      buffer,
      8192 * MemoryLayout<CChar>.stride
    )
    if result < 0 {
      throw CactusModelError.badResponse
    }
    let data = bufferToData(buffer)
    return try JSONDecoder().decode(ChatCompletion.self, from: data)
  }

  func stop() {
    cactus_stop(self.pointer)
  }
}

actor CactusModelActor {
  private actor DefaultIsolation {}

  private let defaultIsolation = DefaultIsolation()
  private let executor: (any SerialExecutor)?
  private let model: CactusModel

  nonisolated var unownedSerialExeuctor: UnownedSerialExecutor {
    self.executor?.asUnownedSerialExecutor() ?? self.defaultIsolation.unownedSerialExecutor
  }

  init(
    executor: (any SerialExecutor)? = nil,
    model: consuming sending CactusModel
  ) {
    self.executor = executor
    self.model = model
  }

  func complete(messages: [Message]) async throws -> Completion {
    try self.model.complete(messages: messages)
  }

  func stop() {
    self.model.stop()
  }

  borrowing func withModel<T, E: Error>(
    operation: (CactusModel) throws(E) -> sending T
  ) throws(E) -> sending T {
    try operation(self.model)
  }
}
`} />
  <p>
    As you can see, the actor provides quite a few concurrency specific
    additions, such as even allowing a custom
    <code>SerialExecutor</code> to be used. This latter bit could be
    useful for an application because the inference engine will block the
    cooperative thread pool for a <em>long</em> time. A custom executor
    allows you to create a dedicated thread outside of the cooperative
    thread-pool for inference in your application.
  </p>
  <p>
    However, because we split the non-Sendable core from the Sendable
    shell, we could also decide to use the model inside another completely
    synchronous context. This could include a class with a lock, a
    non-main global actor, or another actor that bundles various
    non-Sendable types together. If our needs are simple enough, we could
    even just rely on region based isolation with <code>sending</code>.
  </p>
  <CodeBlock language="swift" code={`

final class LockedModel: Sendable {
  let model: Mutex<CactusModel>

  // ...
}

final actor CactusModelAgent {
  var transcript: [Message]
  var nonSendable: NonSendable
  let model: CactusModel

  // ...
}

@NonMainGlobalActor
final class ModelActor {
  let model: CactusModel
}

func infer(model: sending CactusModel) async throws {
  // ...
}
`} />
  <p>
    Of course, it is also possible to use
    <code>CactusModel</code> irresponsibly like this.
  </p>
  <CodeBlock language="swift" code={`

@MainActor
@Observable
final class Store {
  // ❌ Really bad idea, inference is insanely expensive and should not be run on the Main Actor
  let model: CactusModel
}
`} />
  <p>
    However, the flexibility out weights the potential cons of doing
    something not so bright. Even if someone were to attempt to do
    inference on the main actor, we could always check if the caller is on
    the main actor and emit a purple runtime warning discouraging that
    behavior using a library such as
    <a href="https://github.com/pointfreeco/swift-issue-reporting">IssueReporting</a>.
  </p>
  <br>
  <h2 id="conclusion">Conclusion</h2>
  <p>
    Non-Sendable types are actually quite nice to work with. You don’t
    have to worry about thread-safety, isolation, or any other weird
    cryptic errors. Even <code>nonisolated(nonsending)</code> will
    eventually become the default for all <code>async</code> functions,
    but you can enable default behavior for it today through the
    <code>NonIsolatedNonSendingByDefault</code> feature.
  </p>
  <p>
    Further, when you focus on making things non-Sendable, you gain more
    control over how you want to handle the concurrency behavior for that
    logic. Whether that’s through local actor isolation,
    <code>@MainActor</code>/global actor isolation, a class with a lock,
    or even just through region based isolation with <code>sending</code>,
    you get that flexibility.
  </p>
  <p>
    At the end of the day, concurrency is difficult, and it’s why we have
    tools like Swift Concurrency in the first place. That being said, the
    simplest form of concurrency is often no concurrency, so I would try
    to stay in that land for as long as possible.
  </p>
  <p>— 2/25/26</p>
  <FootnoteDef n={1}>I find it's best to think of actor interleaving in the sense
    that tasks enter actors rather than actors executing tasks. If the
    task must enter an actor, then it can therefore only be on 1 actor at
    a time, just like how a human can only be in 1 physical location at
    any given time. In order to hop to another isolation context, the task
    therefore must leave the actor, just as a human must leave their
    current location to go somewhere else. When speaking in these terms,
    ideas like actor-interleaving and re-entrancy make a lot more sense.
  </FootnoteDef>
  <FootnoteDef n={2}>At the time of writing this, if you look at the actual source
    code for the engine, you will find a <code>model_mutex</code> inside
    the handle struct. However, it isn’t actually used in
    <code>cactus_complete</code>. As a result, the model pointer still
    must be treated as non-thread-safe in higher level code that calls
    into the inference engine.
  </FootnoteDef>
</article>
