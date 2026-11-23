<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Thoughts on the Future of Libraries",
    date: "1/26/26",
  };
</script>

<p>
  What’s the point of libraries now that one can just generate them? The
  inital question I posed above comes from
  <a href="https://ghuntley.com/libraries/">this article</a>, but I’ve
  also watched others give their thoughts on the topic like
  <a href="https://youtu.be/u9P3CKwtRnM?si=2xV1siBM7vl6lZ4d">Theo’s video</a>.
</p>
<p>
  This is a great question, and in fact I did just that last night for
  my new
  <a href="https://github.com/mhayes853/sqlite-vec-data">SQLiteVecData</a>
  library, which provides interop for Structured Queries and SQLiteData
  with the sqlite-vec extension. That being said, I still shipped it as
  a library and put it publicly on the Swift Package Index.
</p>
<p>
  That only begs the question of why I did this. After all, the library
  is also something you could generate yourself with just a few
  specs/plans in a short amount of time.
</p>
<p>
  When we ask the question about the relevance of 3rd party libraries
  going forward, we have to consider a few things.
</p>
<ol>
  <li>What are we depending on?</li>
  <li>What are the costs of getting it wrong?</li>
  <li>
    What is the minimum knowledge threshold required to maintain it?
  </li>
  <li>Will I reuse it across different projects?</li>
  <li>etc.</li>
</ol>
<p>
  These of course are all questions you would’ve asked yourself in the
  pre-agentic era, but it’s certainly now worth asking yourself these
  questions again from first principles.
</p>
<p>
  From what I’ve found, simple libraries that merely save syntax are
  almost certainly things that you should generate yourself. This would
  include things like HTTP API clients, common UI components, things
  like <a href="https://react-hook-form.com/">react-hook-form</a>, or
  even just any sort of basic wrapper functionallity.
</p>
<p>
  For instance, in the Swift world there are many HTTP client libraries
  that wrap <code>URLSession</code>, though 2 of the more significant
  libraries are Alamofire and the OpenAPI Client Generator from Apple.
  However, for all my projects I still just use
  <code>URLSession</code> with very minimal generic abstractions on top
  of it. In fact, in today’s world, I see even fewer benefits of using
  things like Alamofire and the Open API generator directly. For the
  former case, agents are trained on all of the common HTTP strategies
  that Alamofire implements. In the latter case you could simply hand
  the agent the API documentation, and it could probably generate the
  client itself.
</p>
<p>
  SQLiteVecData also falls into the thin wrapper category, which is why
  it was so easy to generate. Yet, the reason I published it is because
  I plan to reuse it in different projects, and it would be a waste of
  tokens for me to generate it again and again. So I suppose another
  benefit of 3rd libraries is that they could potentially reduce token
  consumption, even if they are a simple wrapper.
</p>
<p>
  Though, one of the other questions people have of course is related to
  needing to coordinate with maintainers to resolve any bugs/missing
  features in the 3rd party library. Why should I have this
  communication overhead if I can just generate things myself?
</p>
<p>
  For source-available libraries, you could always make your own fork
  depending on the license, and then modify the existing library using
  agents. In fact, this is the primary reason I still am publishing even
  simple wrapper libraries like SQLiteVecData. Even if someone wouldn’t
  install the package directly into their project, agents could almost
  certainly both fork and add/modify any behaviors in the library. It
  would also likely do that faster than generating your own solution
  from scratch, but in this case you still own the dependency.
</p>
<p>
  Even if you don’t modify the library directly, and still opt to
  generate your own implementation, you can also use the libary’s source
  code as a way to guide the agent in your own internal generation
  through injecting it into the context. After all, whenever I would opt
  to write an internal implementation of a library in the pre-agentic
  world, I would still commonly look through the existing solution’s
  source code as a reference.
</p>
<p>
  So wrapper libraries may not be useful to install and use directly,
  but their mere existence certainly can <em>help</em> when generating
  your own internal solution.
</p>
<p>
  That brings us to more complex dependencies such as React, SQLiteData,
  GRDB, etc. In these cases, the library implements some sort of robust
  component that took significant amounts of engineering time (eg. UI
  reactivity for React, CloudKit sync engine for SQLiteData, Proper
  database connection/concurrency/transaction management for GRDB.)
  Generating these yourself will be a challenge, and is definitely a
  decision you should make conciously.
</p>
<p>
  For these dependencies, I would still be inclined to use them
  directly. Either because the cost of an unreliable implementation is
  too high, or because the dependency provides a unique
  <em>way of thinking</em> for building parts of your system (eg.
  React’s component model).
</p>
<p>
  Even then, when you need to make changes you can still easily fork and
  generate additional features. In fact, it’s never been easier to
  create and maintain internal forks of existing libraries.
</p>
<p>
  I think this is fantastic. If someone decides to fork one of my
  libraries, and adapt it for their own purposes instead of installing
  it directly, then I treat forking as a bigger win for me. It shouldn’t
  just be a binary choice between installing and using directly, or
  generating from scratch. There’s certainly a middleground here, and
  not acknowledging it is a very limited outlook.
</p>
<p>— {metadata.date}</p>
