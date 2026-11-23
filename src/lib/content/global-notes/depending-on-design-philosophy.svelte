<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Depending on Design Philosophy",
    date: "10/16/26",
  };
</script>

<p>
  As the means of production continue to change, the optimization
  target continues to shift toward those new means. We humans have
  tended to depend on a lot of design philosophy because we are
  error-prone creatures. The best example of this is using opinionated
  frameworks like SwiftUI and Spring Boot. While these technologies
  encapsulate some technical complexity (e.g., rendering on state
  change), their main value is ensuring that humans write code that is
  maintainable, less error-prone, and cleaner.
</p>
<p>
  However, those properties are somewhat different for agents. While
  agents share some characteristics with humans, they also have many
  unique ones. For example, should one use a dedicated dependency
  injection framework in an agent-first codebase? Sure, manual
  injection is tedious to write, but it’s exactly the kind of thing an
  agent is willing to do with a few extra tokens. Dependency injection
  frameworks often have to manage a lot of underlying complexity around
  scopes, concurrency, conflicts, code generation in some cases, and so
  on just to provide a nice abstraction for humans to use. Furthermore,
  such a framework tends to own the means of passing dependencies
  around an entire codebase if you don’t set appropriate boundaries.
</p>
<p>
  I see this in the same vein as standardized apps like Slack and the
  like, particularly in the UI layer. Sure, we need standards,
  especially since they have proven useful for compliance, security,
  and so on. However, standardizing on a UI is yet another way of
  depending on a design philosophy. When people cannot make their own
  tools due to a lack of technical knowledge or resources, depending on
  such a philosophy is the only way forward. That’s less true when
  those barriers become lower.
</p>
<p>
  In other words, this note rephrases many of my previous ones into a
  simpler message:
  <strong>“We should depend on encapsulated complexity over
    philosophy.”</strong>
</p>
<p>
  The issue with depending on a philosophy you don’t own is that you
  become locked into it for as long as you remain dependent on it. If
  the philosophy is not expressive enough to handle your use case, you
  either have to hack together a workaround or take a risk by migrating
  to something else.
</p>
<p>
  Meanwhile, depending purely on encapsulated complexity tends to enable
  more composability. For instance, if I need to handle ZIP files, I
  don’t think it’s a problem to depend on a library whose maintainers
  likely spend a lot of time optimizing it. Usually, such a library just
  works anywhere, doesn’t force me to design my system around it, and
  any performance improvements to the library are ones my system gets
  for free. I just call the API wherever it’s convenient for me to do
  so.
</p>
<p>
  Similarly, if we standardize on the infrastructure layer from Slack
  and the like, we can create our own UIs tailored to the team or tasks
  we’re working on. Such a UI just calls the API wherever it’s
  convenient, and we wouldn’t have to design all communications to
  happen in the Slack app itself.
</p>
<p>
  In other words, we have a chance to make meaningful changes to many
  of our existing abstractions going forward.
</p>
<p>— {metadata.date}</p>
