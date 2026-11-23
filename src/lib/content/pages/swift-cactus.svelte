<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "Swift Cactus, an Alternative to Foundation Models",
    description: "More model choice, works on any OS version, on any Apple Device.",
    nav: ["home", "about", "now"],
  };
</script>

<article>
  <h1 id="swift-cactus-an-alternative-to-foundation-models" class="title">
    Swift Cactus, an Alternative to Foundation Models
  </h1>
  <ReadingTime />

  <p>
    Given that Foundation Models has had a positive reception since it was
    introduced earlier this year at WWDC, what could be so wrong with it?
  </p>
  <p>
    Let’s sum up all of the problems I have with Foundation Models in one
    sentence.
    <em>It’s practically impossible to put FoundationModels at the center
      of your app’s experience.</em>
  </p>
  <p>
    Now let’s see why that is the case, and why I created
    <a href="https://github.com/mhayes853/swift-cactus">swift-cactus</a>
    to begin solving this problem.
  </p>
  <h2 id="problems-with-foundation-models">
    Problems with Foundation Models
  </h2>
  <p>
    One of the obvious answers is that it requires a device that supports
    Apple Intelligence, which for iPhones is really only the everything
    from iPhone 15 Pro and beyond. This is extremely limiting, and as a
    developer it makes it so that you can’t reliably base your product
    around the framework. Well, that is unless you want to alienate ~80%
    (rough estimate) of your potential market.
  </p>
  <p>
    iPad models are a bit more in luck with any M-series iPad getting
    support automatically, but note that this article is being written on
    an 11inch iPad Pro from 2018 (it still runs really well to this day).
    Additionally, mac users are in a far more optimal spot given that the
    M1 processor was introduced ~5 years ago at this point. However, it’s
    no secret that most Apple development happens on iOS, yet many of it
    devices are left out.
  </p>
  <p>
    Additionally, Foundation Models only ships a singular 3B parameter
    model that you’re forced to use nearly as is (outside of adapters). Of
    course, this really means that your options are limited with the
    framework. That lack of optionality probably isn’t a problem for small
    indie to mid-sized apps that have a non-AI primary value proposition.
    However, I think those trying to build incredibly sophisticated apps
    using offline models in very scientific or highly intellectual domains
    (eg. Health) may find this lack of optionality to be problematic.
  </p>
  <p>
    Lastly, given that this is an Apple-specific framework, newer APIs
    added to the framework won’t be available on previous OS versions. In
    fact, you can’t even use Foundation Models below iOS 26, so it will
    probably quite some time before it gains any sort of reliable adoption
    outside of early adopters.
  </p>
  <p>
    I think the why behind the problem here is that Foundation Models is
    far too limited, and more is needed here if we want to build great
    privacy-aware apps that involve AI at the center of their experience.
    Right now, I can only see it as a framework that indie devs or small
    teams adopt in their apps, and even then it still isn’t reliable
    enough to be at the center of their app’s experience due to hardware
    limitations.
  </p>
  <p>
    Eventually (in ~2-3 years), the hardware limitation won’t be as much
    of a problem, but you’ll still likely be limited in model options
    whilst still having to deal with newer API compatibility issues.
  </p>
  <h2 id="swift-cactus">Swift Cactus</h2>
  <p>
    <a href="https://github.com/mhayes853/swift-cactus">Swift Cactus</a>
    is a wrapper over the
    <a href="https://github.com/cactus-compute/cactus">cactus compute</a>
    inference engine, which at the time of writing this seems to be the
    fastest inference engine that I could find for ARM chips (ie. Mobile
    Devices). The company behind the engine is also YC backed, so we’ll
    see where this goes.
  </p>
  <p>
    The package provides an API for downloading cactus-supported models
    (Qwen and Gemma for now) into your application, telemetry with the
    cactus dashboard, and a minimal wrapper around the C cactus FFI. The C
    FFI includes an embeddings API, which isn’t available at all in
    Foundation Models. The library runs on all Apple platforms, including
    watchOS, where Foundation Models lacks total support.
  </p>
  <p>
    Like all other articles on libraries I create, examples of how to use
    the library can be found in the repo itself. This article will focus
    on design.
  </p>
  <h3 id="limitations">Limitations</h3>
  <p>
    The API isn’t nearly as high-level as Foundation Models, but I think
    the essential building blocks are there. For instance, tool calling is
    supported, but there’s no fancy <code>Tool</code> protocol, rather you
    have to execute the tool calling loop yourself. Neither is there any
    fancy <code>@Generable</code> macro yet, and you also have to ensure
    entire responses from the model fit inside of a fixed size buffer as
    the C FFI requires you to as of now. I think with more time, these
    limitations can be overcome by providing a higher level wrapper API
    over the existing minimal API.
  </p>
  <p>
    Additionally, the <code>CactusLanguageModel</code> class isn’t
    thread-safe because the C FFI isn’t fully thread-safe either, and all
    of its methods are synchronous and blocking. While this gives you
    flexibility, it also makes it easy to misuse the model (such as
    running it on the main thread). I recommend that you solve this by
    creating a dedicated actor to house the model instance.
  </p>
  <CodeBlock language="swift" code={`

final class LanguageModelActor {
  let model: CactusLanguageModel

  init(model: sending CactusLanguageModel) {
    self.model = model
  }

  func withIsolation<T, E: Error>(
    perform operation: (isolated Self) throws(E) -> sending T
  ) throws(E) -> sending T {
    try operation(self)
  }
}

@concurrent
func chatInBackground(with modelActor: LanguageModelActor) async throws {
  try await modelActor.withIsolation { modelActor in
    // You can access the model directly because the closure is isolated
    // to modelActor
    let model = modelActor.model

    // ...
  }
}
`} />
  <p>
    Lastly, you’re limited to models that the cactus engine directly
    supports, which isn’t a lot right now. However, you have more options
    than Foundation Models, and more will be added in the future. At the
    very least, the current options you have perform well on a wider range
    of devices than what Foundation Models supports.
  </p>
  <h3 id="embeddings">Embeddings</h3>
  <p>
    Foundation Models currently doesn’t have support for generating a
    vector of embeddings from a string of text. Embeddings can be used to
    match similar pieces of text, and a common way to do this is through
    checking the cosine similarity score.
  </p>
  <CodeBlock language="swift" code={`

import Cactus

func cosineSimilarity<C: Collection>(_ a: C, _ b: C) throws -> Double
where C.Element: BinaryFloatingPoint {
  guard a.count == b.count else {
    struct LengthError: Error {}
    throw LengthError()
  }
  var dot = 0.0, normA = 0.0, normB = 0.0
  var ia = a.startIndex, ib = b.startIndex
  while ia != a.endIndex {
    let x = Double(a[ia])
    let y = Double(b[ib])
    dot += x * y
    normA += x * x
    normB += y * y
    ia = a.index(after: ia)
    ib = b.index(after: ib)
  }
  let denom = (normA.squareRoot() * normB.squareRoot())
  return denom == 0 ? 0 : dot / denom
}

let model = try CactusLanguageModel(from: modelURL)

let fancy = try model.embeddings(for: "This is some fancy text")
let pretty = try model.embeddings(for: "This is some pretty text")

print(cosineSimilarity(fancy, pretty))
`} />
  <p>
    You can use the techniques such as cosine similarity to search through
    text in natural language. For instance, if you’re using
    <a href="https://github.com/pointfreeco/sqlite-data">SQLiteData</a>,
    you can use this as alternative to FTS5 to implement search for your
    application. Instead of maintaining an FTS virtual table, you would
    have to maintain a column that holds the embeddings for the content
    you want to search instead.
  </p>
  <p>
    Here’s a very simplified example of how you can use temporary triggers
    to maintain this column using SQLiteData.
  </p>
  <CodeBlock language="swift" code={`

import Cactus
import Foundation
import SQLiteData
import Synchronization

@Table
struct Reminder: Identifiable {
  var id: UUID
  var name: String

  @Column(as: [Float].JSONRepresentation.self)
  var embeddings: [Float]
}

private let model = Mutex(try! CactusLanguageModel(from: modelURL))

@DatabaseFunction(as: ((String) -> [Float].JSONRepresentation).self)
func embeddings(text: String) -> [Float] {
  model.withLock { (try? $0.embeddings(for: text)) ?? [] }
}

// Triggers to ensure that embeddings are always created after inserts and updates.
func createEmbeddingsTriggers(in db: Database) throws {
  try Reminder.createTemporaryTrigger(
    after: .insert { new in
      Reminder.find(new.id)
        .update { $0.embeddings = $embeddings(new.name) }
    }
  )
  .execute(db)

  try Reminder.createTemporaryTrigger(
    after: .update { _, new in
      Reminder.find(new.id)
        .update { $0.embeddings = $embeddings(new.name) }
    } when: { old, new in
      new.name != old.name
    }
  )
  .execute(db)
}
`} />
  <h3 id="telemetry">Telemetry</h3>
  <p>
    Swift Cactus also ships with support for telemetry such that you can
    analyze model performance and registered devices in the cactus
    dashboard. Currently, the default telemetry integration is only
    supported on iOS and macOS, but you can also build your own custom
    integration if you wish. (This is because there seems to be a
    proprietary binary that Cactus uses to decrypt the string that
    contains the device id, and I could only find XCFrameworks for iOS and
    macOS. I could also choose to reverse engineer the solution since it
    seems like the decryption key is in the compiled binary, but I don’t
    want to get in trouble.)
  </p>
  <p>
    Telemetry is completely optional, and events are recorded
    automatically by the <code>CactusLanguageModel</code> class. All you
    need to do to set it up is pass your token from the cactus dashboard
    to <code>CactusTelemetry</code>.
  </p>
  <CodeBlock language="swift" code={`

import Cactus

CactusTelementry.configure("<your token here>")
`} />
  <h2 id="an-alternative-foundation-models">
    An Alternative Foundation Models
  </h2>
  <p>
    Why provide an alternative to an Apple framework? Wouldn’t Apple
    always know what’s the best for their ecosystem?
  </p>
  <p>
    There are multiple successful third-party alternatives to some of
    Apple’s largest frameworks in my opinion. RevenueCat providing an
    alternative to StoreKit is probably the largest case of this,
    especially considering that RevenueCat is a venture backed company.
    Another good example is SQLiteData and GRDB competing directly with
    CoreData and SwiftData, both the of former are open source, and
    SQLiteData even uses GRDB under the hood. Additionally, Alamofire also
    provides a more robust alternative to <code>URLSession</code>.
  </p>
  <p>
    With local LLMs quickly becoming more prevalant at center of consumer
    apps, I think it’s only natural that alternatives to Foundation Models
    present themselves to address its limitations. Just as alternatives
    came in to address the limitations of CoreData and SwiftData (which
    are also at the center of many apps).
  </p>
  <p>
    Right now, at this present point in time, I don’t think Foundation
    Models is solving this problem well enough. Additionally, given
    Apple’s release cadences, I don’t think Foundation Models will solve
    this problem well enough for a while.
  </p>
  <p>
    There’s a lot of work to do for Swift Cactus to match the more
    convenient higher level API offered by Foundation Models. Even so, I
    think having access to the lower level functionality is beneficial
    regardless. However, just the already present lower-level
    functionality already makes bringing local LLMs to the center of your
    app’s experience possible for everyone, not just those on the latest
    iPhones and OS versions.
  </p>
  <p>— 10/10/25</p>
</article>
