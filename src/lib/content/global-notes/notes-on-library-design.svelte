<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Notes on Library Design",
    date: "12/1/25",
  };
</script>

<p>
  This probably deserves a longer piece at some point, but it’s worth
  touching up on it here briefly.
</p>
<p>IMO, a good (mature) library has 2 strong design traits:</p>
<ol>
  <li>
    An easy to use high-level API that achieves a task with minimal
    effort.
  </li>
  <li>
    A extensive low-level API that offers so much control such that the
    higher-level API can be completely re-written from the ground up
    externally if need be.
  </li>
</ol>
<p>
  Of these traits, the second is definitely the more important aspect
  for real-world/long-term use, and is my first task when creating a new
  library. The first point largely exists as a necessary consequence to
  gain adoption, or to provide an answer to the common cases. IMO, it’s
  much more of a nice to have, and can come later down the line in
  development.
</p>
<p>
  In Swift Operation, I made it a priority to give you the tools to
  reconstruct the higher level API if necessary. That is, if you don’t
  like a built-in API (eg. The retry API), you should be able to
  implement your own version of it that’s tailored to your needs.
</p>
<p>
  SQLiteData also did a good job at providing both higher and lower
  level control. On one hand, it exposes the
  <code>@Fetch</code> property wrapper which <code>@FetchAll</code> and
  <code>@FetchOne</code> build on top of. Additionally, it provides
  low-level tools that integrate StructuredQueries with GRDB, so you’re
  not tied to the property wrappers.
</p>
<p>
  GRDB does this well too. It offers convenience APIs around
  transactions that work in 99% of scenarios, and the remaining 1% of
  cases allow you to reconstruct the way transactions work if needed.
  You can also write raw SQL alongside using its more convenient record
  request interface. StructuredQueries also does this latter part well.
</p>
<p>Now for some counterexamples.</p>
<p>
  Tanstack Query did a good job at the higher level API, but its lower
  level could use some reconstructing. For instance, I can’t replace the
  built-in retry mechanism easily, or add composable behavior to queries
  or mutations.
</p>
<p>
  Cactus did a good job providing a lower-level C FFI, but the official
  client libraries leave quite a lot to be desired. They seem to want to
  hide the complexities of model downloading, but also surface the
  low-level details of the FFI alongside those higher level details. At
  the same time, they had the library handle concurrency concerns for
  you, which may not align with your application’s desired workflow.
</p>
<p>
  In Swift Cactus, I provide a higher level API for model downloading,
  but I also allow you to construct a
  <code>CactusLanguageModel</code> directly from a URL. Additionally, I
  made the language model run synchronously which gives the caller more
  control over which thread it runs on. This takes more work on the
  caller’s end to put the model behind an actor, but the synchronous
  nature also lets you put a mutex around an individual model instance
  if you want to keep thread-safe synchronous access. This later
  approach is very useful for things like generating vector embeddings
  inside a synchronous database function.
</p>
<p>
  A
  <a href="https://github.com/mhayes853/swift-cactus/pull/38">higher level agentic framework</a>
  is currently in the works for Swift Cactus as I’m writing this. Here,
  you have less control over concurrency (mainly due to tool calling),
  but I think the resulting API should feel a lot easier to use once
  it’s completed. Despite all of this, the higher level agentic
  framework is built entirely on top of the existing lower level tools
  that you can use today, and you should be able to reconstruct parts of
  the agentic framework as you see fit.
</p>
<p>— {metadata.date}</p>
