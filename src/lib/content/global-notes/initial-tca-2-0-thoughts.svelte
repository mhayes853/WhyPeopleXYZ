<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Initial TCA 2.0 Thoughts",
    date: "11/19/25",
  };
</script>

<p>
  This looks interesting, as someone who’s casually used TCA since
  pre-Reducer protocol days, I can give some thoughts here.
</p>
<p>
  I like how the ping-ponging of actions has been taken away, this was
  extremely annoying, and I generally gated all of these ping-ponging
  actions inside an <code>Effect</code> enum. Eg.
</p>
<CodeBlock language="swift" code={`

// This

@Reducer
struct Feature {
  // ...

  enum Action {
    case buttonTapped
    case effect(Effect)

    enum Effect {
      case dataLoaded(Result<SomeData, any Error>)
    }
  }

  var body: some ReducerOf<Self> {
    Reduce { state, action in
      switch action {
      case .buttonTapped:
        return .run { send in
          let result = await Result { try await someWork() }
          await send(.effect(.dataLoaded(result))
        }
      case .effect(.dataLoaded(let result)):
        // ...
      }
    }
  }
}

// Now Becomes This

@Reducer
struct Feature {
  // ...

  enum Action {
    case buttonTapped
  }

  var body: some ReducerOf<Self> {
    Reduce { state, action in
      switch action {
      case .buttonTapped:
        return .run { store in
          let result = await Result { try await someWork() }
          try store.modify { /* Just set state in here */ }
        }
      }
    }
  }
}
`} />
<p>
  With the old way of doing things, it was quite easy to lose focus of
  the overall control flow.
</p>
<p>
  In terms of <code>Store</code> vs <code>StoreActor</code>, I would
  rather that they also have a non-Sendable store type, and simply wrap
  the actor isolation on top. This is what I did with
  <code>CactusLanguageModel</code> in
  <a href="https://github.com/mhayes853/swift-cactus">Swift Cactus</a>,
  and the flexibility is quite nice. I can choose to call the language
  model synchronously in a thread-safe manner using <code>Mutex</code>,
  or asynchronously by wrapping it in an actor. I think it should be the
  same for the store as well.
</p>
<p>
  <code>onMount</code> and <code>onDismount</code> are also healthy
  additions, especially since they’re not tied to any one view system
  (which I presume is necessary for the cross platform support they want
  to achieve). Long ago, in one of my first apps, I remeber defining the
  notion of an <code>AppearableAction</code> which essentially tried to
  automate the whole <code>onAppear</code> and
  <code>onDisappear</code> dance. Suffice to say,
  <code>onMount</code> and <code>onDismount</code> are better than those
  tools.
</p>
<p>
  The new <code>onChange</code> behavior is also very welcome, and it’s
  definitely more intuitive.
</p>
<p>
  I also presume the removal of <code>BindingReducer</code> is a natural
  consequence of wanting to make things cross platform.
</p>
<p>
  I like the overall direction of turning features into descriptions
  rather than imperative messes. Swift itself is still quite imperative
  though which is admittedly annoying.
</p>
<p>— {metadata.date}</p>
