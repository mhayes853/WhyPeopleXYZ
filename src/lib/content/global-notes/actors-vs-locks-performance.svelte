<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Actors vs Locks (Performance)",
    date: "4/26/26",
  };
</script>

<p>
  Some may have watched a recent PointFree episode that detailed a
  performance comparison of actors and locks on a given cache. The gist
  of the episode shows that when it comes to individual calls, locks
  perform faster, but when you can group actor calls into 1 isolation
  hop then the actor performs faster.
</p>
<p>ie. (Based on the episode code examples)</p>
<CodeBlock language="swift" code={`
final class MutexCache {
  private let entries = Mutex<[Int: Int]>()

  func set(_ key: Int, value: Int) {
    self.entries.withLock { $0[key] = value }
  }
}

final actor ActorCache {
  private var entries = [Int: Int]()

  func set(_ key: Int, value: Int) {
    self.entries[key] = value
  }
}

let actorCache = ActorCache()
let mutexCache = MutexCache()

// 1. Mutex Cache is Faster
for key in 0...10_000 {
  mutexCache.set(key, value: key + 1)
}
for key in 0...10_000 {
  await actorCache.set(key, value: key + 1)
}

// 2. Actor Cache is Faster
extension Actor {
  func run<T>(_ fn: @Sendable (isolated Self) -> T) -> T {
    fn(self)
  }
}

for key in 0...10_000 {
  mutexCache.set(key, value: key + 1)
}
await actorCache.run { actorCache in
  for key in 0...10_000 {
    actorCache.set(key, value: key + 1)
  }
}
`} />
<p>
  Intuitively, this makes sense since each call to <code>set</code> on
  <code>MutexCache</code> will have to acquire a lock, whereas all the
  calls to <code>set</code> on <code>ActorCache</code> can be grouped
  into a single isolated access (which effectively removes the
  overhead).
</p>
<p>
  However, there's more to this, as right now the
  <code>MutexCache</code>
  embeds a lock internally, but what if we did this instead.
</p>
<CodeBlock language="swift" code={`
final class NonSendableCache {
  private var entries = [Int: Int]()

  func set(_ key: Int, value: Int) {
    self.entries[key] = value
  }
}

let nonSendableCache = Mutex(NonSendableCache())
`} />
<p>
  Now, you can see that we made a simple cache that was non-Sendable,
  which means that we don't even have to worry about concurrency in its
  implementation. Then, we create a local variable that wraps the
  non-Sendable cache in a <code>Mutex</code>. This allows to do the
  following:
</p>
<CodeBlock language="swift" code={`
nonSendableCache.withLock { nonSendableCache in
  for key in 0...10_000 {
    nonSendableCache.set(key, value: key + 1)
  }
}
`} />
<p>
  This is essentially the same thing as calling the
  <code>run</code> helper on <code>ActorCache</code>, but for mutexes
  instead. Now because we only have a single grouped access from both
  <code>ActorCache</code> and our <code>NonSendableCache</code>, the
  performance is essentially the same for our benchmark operation. Since
  the number of isolation hops/mutex acquisitions is 1, the overall
  synchronization overhead is practically negligible.
</p>
<p>
  However, the benefit of <code>NonSendableCache</code> is that we also
  get to use it inside an actor if we want to defend it, and everything
  is still all well and good.
</p>
<CodeBlock language="swift" code={`
final actor ActorCache2 {
  private var cache = NonSendableCache()

  func set(_ key: Int, value: Int) {
    self.cache.set(key, value: value)
  }
}
`} />
<p>
  So really, the lesson here is that non-Sendable code will avoid any
  synchronization overhead by default, and allows us to defer
  Sendability concerns to the minimal points where it's absolutely
  necessary. I wrote about this
  <a href="https://whypeople.xyz/non-sendable-core-sendable-shell">here</a>.
</p>
<p>— {metadata.date}</p>
