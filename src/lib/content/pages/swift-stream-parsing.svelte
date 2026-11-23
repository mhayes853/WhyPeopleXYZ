<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "Swift Stream Parsing, an Incremental Byte-by-Byte Parsing Library",
    description: "Incremental parsing written in pure Swift because I needed this for LLMs.",
    nav: ["home", "about", "now"],
  };
</script>

<article>
  <h1 id="swift-stream-parsing" class="title">
    Swift Stream Parsing, an Incremental Byte-by-Byte Parsing Library
  </h1>
  <ReadingTime />

  <p>Say we have a structured output from an LLM.</p>
  <CodeBlock language="json" code={`

{
  "key": "value",
  "key2": "value2",
  // More fields...
}
`} />
  <p>
    Given that many LLM applications stream data incrementally, how can we
    stream a structured format such as JSON incrementally? After all, one
    cannot fully parse JSON without having all the bytes up front.
  </p>
  <p>
    One approach is NDJSON, in which we can simply stream each token as an
    entire full JSON blob.
  </p>
  <CodeBlock language="json" code={`

{ "key": "v" }
{ "key": "va" }
{ "key": "val" }
{ "key": "valu" }
{ "key": "value" }
{ "key2": "v" }
// And so on...
`} />
  <p>
    Another approach is to complete the incomplete JSON string and decode
    with <code>JSONDecoder</code>. In fact, there’s a library called
    <code>PartialJSONDecoder</code> that does just this.
  </p>
  <CodeBlock code={`

{ "key": "value", "key2": "va
// Gets translated to
{ "key": "value", "key2": "va"}
`} />
  <p>
    Of course, the issue with doing this is that one must decode the
    entire JSON payload with each new significant byte arrival.
  </p>
  <p>
    Lastly, one could just parse the JSON byte-by-byte until reaching an
    invalid character or the end of the stream. At the time of writing
    this, there has been at least one working implementation of this in
    the library.
  </p>
  <p>
    Regardless of the format and parsing technique,
    <code>Decodable</code> will not work because
    <code>Decodable</code> generally only works if the full data payload
    is present. If we want to support incremental and lazy parsing without
    all the data being available, we need a completely different interface
    altogether. That’s why I today I would like to announce Swift Stream
    Parsing, a cross-platform library for stream parsing in Swift.
  </p>
  <p>
    As always, this article is about the library’s design and quite weird
    development process this time around. You can check the
    <a href="https://github.com/mhayes853/swift-stream-parsing">README</a>
    and documentation for usage examples.
  </p>
  <br>
  <h2 id="some-basics">Some Basics</h2>
  <h3 id="not-a-jsondecoder-decodable-replacement">
    Not a JSONDecoder/Decodable Replacement
  </h3>
  <p>
    This library is meant to parse streams of data byte-by-byte. The
    advantage of this is that it allows one to parse streams of data
    incrementally, but the disadvantage is that parsing the entire payload
    itself byte-by-byte is often quite slow (exponentially slower than
    libraries like simdjson). Having all the bytes available enables
    certain kinds of optimizations that one doesn’t get with a
    byte-by-byte approach, such as far less branching and SIMD.
  </p>
  <p>
    If you have all the bytes available, or don’t need to wait too long
    for them to arrive, <code>JSONDecoder</code> is a far better option
    than the JSON parser built into this library.
  </p>
  <p>
    Additionally, the library has zero interop with
    <code>Decodable</code>. This is because <code>Decodable</code> is
    generally only meant for decoding entire data payloads, and not
    incremental streaming. The equivalent protocol in the library,
    <code>StreamParseableValue</code>, is quite limited by comparison.
    Types that expect primitive data in a certain format like
    <code>URL</code> and <code>Date</code> are completely unsupported by
    the library because there’s no way to incrementally parse them (the
    incremental values likely wouldn’t be valid instances of those types).
  </p>
  <p>
    There are some niceities that you get with the JSON parser in this
    library, such as being able to toggle certain forms of syntax on and
    off (eg. Comments, hex numbers, trailing commas, etc.). This syntax
    toggling was largely needed due to the tendency of local LLMs to not
    output properly formatted JSON. The parser can also automatically
    handle converting snake case to camel case just like
    <code>JSONDecoder</code> if you decide to enable it (you can also use
    a custom key decoding strategy just like <code>JSONDecoder</code>).
  </p>
  <p>
    In essence, this library is not a <code>JSONDecoder</code> replacement
    in the same sense that the <code>@Generable</code> macro from
    FoundationModels also doesn’t replace <code>JSONDecoder</code>. Of
    course, FoundationModels does use JSON, but had to create its own
    incremental parsing logic since <code>JSONDecoder</code> wasn’t a
    viable option.
  </p>
  <p>
    In fact, you can say that this library is an open source
    implementation of the parsing capabilities <code>@Generable</code>.
    Though <code>@Generable</code> must also generate a JSON Schema that
    the underlying LLM must understand.
  </p>
  <h3 id="dependencies">Dependencies</h3>
  <p>
    The library itself has no dependencies, not even on Foundation, just
    pure Swift with the standard library. Given that it ships with a
    built-in JSON parser, this means that I had the pleasure of writing
    that from scratch.
  </p>
  <p>
    However, while the core library itself has no dependencies, there are
    package traits that add support for a few different libraries:
    Foundation, Swift Collections, and Tagged. The package trait for
    Foundation support is even enabled by default.
  </p>
  <br>
  <h2 id="it-s-just-as-easy-as-conforming-to-decodable-">
    It’s Just as Easy as Conforming to Decodable!
  </h2>
  <p>
    Of course, I wanted to make the interface nearly as convenient as
    implementing <code>Decodable</code> on a struct. Which naturally means
    we have to have the compiler generate code. I wonder what feature of
    Swift can do that? It turns out, it’s called a macro!
  </p>
  <CodeBlock language="swift" code={`

// See it's just as easy as Decodable!
@StreamParseable
struct Streamable {
  var property: String
  var property2: Int
}
`} />
  <p>
    Don’t get ahead of yourself however. All properties on
    <code>Streamable</code> are required to conform to a protocol called
    <code>StreamParseable</code>. Due to the nature of
    <code>Decodable</code> requiring the full value to be present at
    decode time, the library unfortunately has no overlap with it.
  </p>
  <br>
  <h2 id="stream-parseable">Stream Parseable</h2>
  <p>
    The <code>StreamParseable</code> protocol requires one to have a
    <code>Partial</code> associated type. This <code>Partial</code> type
    is the type of value that can be parsed from a stream of bytes. The
    <code>@StreamParseable</code> macro of course generates this
    <code>Partial</code> type for you. For the record, this is exactly how
    <code>@Generable</code> from FoundationModels works as well.
  </p>
  <p>
    The <code>Partial</code> type must then conform to another protocol
    called <code>StreamParseableValue</code>, which has a requirement that
    requires the conforming type to register key paths to fields that can
    be parsed incrementally.
  </p>
  <p>The <code>@StreamParseable</code> macro generates this payload.</p>
  <CodeBlock language="swift" code={`

extension Streamable: StreamParseable {
  struct Partial: StreamParsingCore.StreamParseable,
    StreamParsingCore.StreamParseableValue {
    var property: String.Partial?
    var property2: Int.Partial?

    init(
      property: String.Partial? = nil,
      property2: Int.Partial? = nil,
    ) {
      self.property = property
      self.property2 = property2
    }

    static func initialReduceableValue() -> Self {
      Self()
    }

    static func registerHandlers(in handlers: some StreamParsingCore.StreamParserHandlers<Self>) {
      handlers.registerKeyedHandler(forKey: "property", \\.property)
      handlers.registerKeyedHandler(forKey: "property2", \\.property2)
    }
  }
}
`} />
  <p>
    The interesting bit is <code>registerHandlers</code> which effectively
    tells that parser that the data type is interested in parsing the
    values for the <code>”property"</code> and
    <code>”property2"</code> keys, which are than assigned at parse
    time via the key paths passed to <code>registerKeyedHandler</code>.
  </p>
  <p>
    Similarly, more primitive types can also register handlers as well.
    Take the conformance of <code>String</code> for instance.
  </p>
  <CodeBlock language="swift" code={`

extension String: StreamParseableValue {
  public static func initialParseableValue() -> Self {
    ""
  }

  public static func registerHandlers(in handlers: inout some StreamParserHandlers<Self>) {
    handlers.registerStringHandler(\\.self)
  }
}
`} />
  <p>
    This depends on a primitive handler registration method. There a
    number of these primitive handler registration methods, and generally
    speaking they mirror all the primitive types (including
    <code>Int128</code> and <code>UInt128</code>) that are supported by
    the Standard Library’s <code>Decoder</code> protocol.
  </p>
  <p>
    More compound types such as <code>Optional</code>, or even
    <code>Tagged</code>, the latter of which is only available behind a
    package trait, can be registered via the
    <code>registerScopedHandler</code> method.
  </p>
  <CodeBlock language="swift" code={`

extension Optional: StreamParseableValue where Wrapped: StreamParseableValue {
  public static func initialParseableValue() -> Wrapped? {
    Wrapped.initialParseableValue()
  }

  public static func registerHandlers(in handlers: inout some StreamParserHandlers<Self>) {
    handlers.registerScopedHandlers(on: Wrapped.self, \\.streamParsingWrappedValue)
    handlers.registerNilHandler(\\.self)
  }

  private var streamParsingWrappedValue: Wrapped {
    get { self ?? Wrapped.initialParseableValue() }
    set { self = newValue }
  }
}
`} />
  <p>
    Notice how since the library requires handlers to be key paths, we can
    use a computed property to handler mappings to and from the wrapped
    value.
  </p>
  <p><code>Data</code> is another interesting case of this.</p>
  <CodeBlock language="swift" code={`

extension Data: StreamParseableValue {
  public static func initialParseableValue() -> Self {
    Self()
  }

  public static func registerHandlers(in handlers: inout some StreamParserHandlers<Self>) {
    handlers.registerStringHandler(\\.streamParsingStringValue)
  }

  private var streamParsingStringValue: String {
    get { String(decoding: self, as: UTF8.self) }
    set { self = Data(newValue.utf8) }
  }
}
`} />
  <p>
    Now what about collection types like Array? Since there are more
    collections than arrays, the library actually has a protocol called
    <code>StreamParseableArrayObject</code> that array conforms to. The
    protocol has requirements for minimal functionality necessary to parse
    array objects incrementally, and this minimalism is what allows types
    from Swift Collections like <code>BitArray</code> and
    <code>Deque</code> to be registered with the handlers directly.
  </p>
  <CodeBlock language="swift" code={`

public protocol StreamParseableArrayObject<Element>: StreamParseableValue {
  associatedtype Element: StreamParseableValue

  subscript(index: Int) -> Element { get set }
  mutating func append(contentsOf sequence: some Sequence<Element>)
}

extension StreamParseableArrayObject {
  public static func registerHandlers(in handlers: inout some StreamParserHandlers<Self>) {
    handlers.registerArrayHandler(\\.self)
  }
}

// Array

extension Array: StreamParseableValue where Element: StreamParseableValue {
  public static func initialParseableValue() -> [Element] {
    []
  }
}

extension Array: StreamParseableArrayObject where Element: StreamParseableValue {}

// Deque

extension Deque: StreamParseableValue where Element: StreamParseableValue {
  public static func initialParseableValue() -> Deque<Element> {
    []
  }
}

extension Deque: StreamParseableArrayObject where Element: StreamParseableValue {}
`} />
  <p>
    Dictionaries, and closely related types like
    <code>OrderedDictionary</code> also use a similar dedicated protocol
    called <code>StreamParseableDictionaryObject</code>.
  </p>
  <p>
    Under the hood, the <code>Handlers</code> type for each parser knows
    exactly how to append key paths together in order to construct the
    proper key path to write to at parse time. This process is quite ugly
    involving many hacks with <code>AnyKeyPath</code>, but thankfully you
    don’t have to worry about it!
  </p>
  <br>
  <h2 id="parsers">Parsers</h2>
  <p>
    The library ships with a built-in JSON parser, and because of its no
    dependencies philosophy, it had to be implemented it from scratch! How
    fun!
  </p>
  <p>
    If you want another format, just ask Claude to create a parser for
    your desired format, it’s that easy! (Ok, enough joking…) All your
    custom format parser has to do is conform to the
    <code>StreamParser</code> protocol, and you’re set.
  </p>
  <p>The <code>StreamParser</code> protocol is quite simple.</p>
  <CodeBlock language="swift" code={`

public protocol StreamParser<Value> {
  associatedtype Value: StreamParseableValue
  associatedtype Handlers: StreamParserHandlers<Value>

  mutating func parse(bytes: some Sequence<UInt8>, into reducer: inout Value) throws

  mutating func finish(reducer: inout Value) throws

  mutating func registerHandlers()
}
`} />
  <p>
    As we can see by the protocol definition, the parser owns the that
    are<code>Handlers</code> that are passed to
    <code>registerHandlers</code> static method on <code>Value</code>.
  </p>
  <p>
    The protocol also works over an arbitrary sequence of bytes, which
    represent a chunk of bytes from a source. If you want to optimize
    parsing somehow based on the type of the sequence, then you have the
    ability to do so, but generally speaking you should expect that your
    parser will have to do things byte by byte.
  </p>
  <br>
  <h2 id="algorithms">Algorithms</h2>
  <p>
    Generally speaking, you won’t use the
    <code>StreamParser</code> interface directly, as the library provides
    a <code>PartialsStream</code> type that wraps the parser and current
    value being parsed. Additionally, there are also extensions on
    <code>Sequence</code> and <code>AsyncSequence</code> that will map a
    stream of bytes to a stream of parsed values.
  </p>
  <CodeBlock language="swift" code={`

// PartialsStream

@StreamParseable
struct Payload {
  // ...
}

let json = "{ ... }"

var stream = PartialsStream(initialValue: Payload.Partial(), parser: .json())

for byte in jsonBytes {
  let partial = stream.next(byte)
  // ...
}

let finalPartial = stream.finish()
`} />
  <CodeBlock language="swift" code={`

// Sequence

let payloads: [Payload.Partial] = try json.utf8.partials(of: Payload.Partial.self, using: .json())
`} />
  <CodeBlock language="swift" code={`

// AsyncSequence

struct AsyncBytesSequence: AsyncSequence {
  typealias Element = UInt8
  // ...
}

let json = AsyncBytesSequence(...)
let partials = json.partials(of: Payload.Partial.self, using: .json())
for try await payload in partials {
  print(payload)
}
`} />
  <p>
    Under the hood, the sequence and async sequence helpers are of course
    just using <code>PartialsStream</code>.
  </p>
  <br>
  <h2 id="performance">Performance</h2>
  <p>
    As I mentioned earlier, this library is far from a
    <code>JSONDecoder</code> replacement, and performance is the primary
    reason.
  </p>
  <p>There are 2 reasons for this:</p>
  <ul>
    <li>
      The library is designed for convenience over being the fastest
      possible option.
      <ul>
        <li>
          This is code word for, “most of the bottlenecks are for Swift
          KeyPath indirection because we have to perform a write on nearly
          every single byte”.
        </li>
      </ul>
    </li>
    <li>
      Having all the data upfront enables optimizations that one doesn’t
      get with a byte-by-byte approach.
    </li>
  </ul>
  <p>
    However, my only threshold was to be many orders of magnitude faster
    than
    <a href="https://github.com/mattt/PartialJSONDecoder/tree/main">￼<code>PartialJSONDecoder</code>￼</a>, which I can gladly say was achieved.
  </p>
  <p>
    Don’t get me wrong, there’s certainly a lot of room for optimization
    (probably via a method that would extract pointers to each primitive
    field directly rather than key paths), but I don’t see it ever getting
    to the point where it suffices as a
    <code>JSONDecoder</code> replacement simply due to the nature of the
    required approach. Right now, the performance is good enough for my
    needs (parsing small-mid sized payloads from LLMs), so I likely won’t
    revisit this until a need for better performance arises.
  </p>
  <br>
  <h2 id="conclusion">Conclusion</h2>
  <p>
    As of writing this the library should now be available. I don’t
    suspect that I’ll need to make many updates to the library itself
    since it handles a pretty simple and stable concern. At the end of the
    day, I suspect this will mainly be used by other libraries/tools
    rather than applications directly.
  </p>
  <p>— 1/30/26</p>
</article>
