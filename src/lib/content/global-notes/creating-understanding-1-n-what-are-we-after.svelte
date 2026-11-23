<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Creating Understanding (1/N): What are we After?",
    date: "9/20/26",
  };
</script>

<p>
  There’s a lot of talk about understanding when it comes to agents
  writing code, but I think the dominate opinions here aren’t enough.
  Overall, there are 2 of these that I tend to see, and occasionally
  they pull people in opposite directions:
</p>
<ul>
  <li>
    Creating verification systems to gain more trust over the model
    output.
    <ul>
      <li>
        Tests (unit, integration, E2E, and newer kinds driven by
        abilities like Computer Use, etc.), Type Checking, Memory Safe
        Languages (eg. Rust, Swift, TypeScript with Effect)
      </li>
    </ul>
  </li>
  <li>
    Reading the code.
    <ul>
      <li>
        This has levels to it, as one can read every line, just the
        interface declarations, skimming, etc.
      </li>
    </ul>
  </li>
</ul>
<p>
  As stated earlier, I don’t see either of these as sufficient for
  gaining understanding.
</p>
<ul>
  <li>
    Verification systems are fine if you know which ones to have in
    place, otherwise there are emergent properties of the system that
    may be left unverified.
  </li>
  <li>
    Reading the code is simply viewing the executable specification,
    but most programming languages are syntactically noisy and assume
    implicit context in the code (see my last note on static typing for
    examples of this). As a result, just reading the code doesn’t mean
    reading all the emergent properties of the system.
  </li>
</ul>
<p>
  The key phrase here is “emergent properties”, so with that in
  mind we should define what constitutes “understanding”. That is,
  <strong><em>ensuring that no emergent properties, whether good or bad, of the
      system are surprising to its designers</em></strong>.
</p>
<p>
  An “emergent property” is an observable behavior of the system
  whether internal or external. Internal emergent properties are
  generally what we call implementation details (eg. The underlying
  assembly of a compiled language, source code, or the overall tech
  stack of a system.), while external emergent properties are the
  behaviors that are externally observable. Suffice to say, it’s not
  always feasible to understand every internal emergent property of a
  system, however ideally none should be of any surprise upon their
  discovery. Contrastively, not being aware of all external emergent
  properties is more likely, but not always, to be problematic, as those
  are what end-users experience.
</p>
<p>
  I’ve left the “not always” in because there are cases where
  users use a product in an unintentional manner towards an unintended
  problem. In some cases, this works well for those users, and that is a
  great and surprising discovery for the product direction! Perhaps, in
  that case, we should expect “surprising unintentional usage” to be
  an external emergent property of <em>any</em> product so as to not be
  surprised by it if it happens.
</p>
<p>
  Another thing to take note of the existing bias towards looking at
  systems as “abstraction hierarchies”. One common one is that higher
  level languages like C are at a “higher level of abstraction” than
  assembly since C compiles down to assembly. I think the better
  interpretation is that C is the mutable and readable specification of
  the system, whereas assembly is the true executable specification.
  Viewed like this, C and assembly are not hierarchical abstractions,
  but rather viewed as different “aspects” or internal emergent
  properties of the system. Each aspect therefore has its separate role
  that must be accounted for and weighted depending on its relevance to
  the final system (eg. Performance sensitive contexts may care about
  assembly, but not necessarily most application code).
</p>
<p>
  To summarize, the point of this note is that we want to understand
  emergent properties which isn’t necessarily every line of code, but is
  rather more tied to “aspects” and behavior. The bigger question here
  is to ask what tools do we have for this currently?
</p>
<p>
  Editors/IDEs typically allow you to see ~40-50 lines of code on a
  single screen (depends on your font/monitor size), when real systems
  are in the thousands and millions. Agentic coding UIs (eg. TUIs, T3
  Code, ChatGPT Desktop, etc.) are often not much better here either,
  mostly focusing on diff views for reading code, while it’s not
  uncommon for them to produce thousands of new lines of code in just a
  single thread. Just reading the code using these tools would be like
  trying to understand the human body by looking at 1 small group of
  cells and atoms at a time. “Jump to definition” and the like may
  make it easier to follow a single or set of call paths, but this is
  still not a complete view. Generally, this is not how we try to
  understand the human body!
</p>
<p>
  Obviously, code is important and cannot be ignored. However, if
  we’re going to change the means of code production from handwriting
  to agents, we also should look into changing the means that we see the
  things that are produced. Long term, I think this calls for a
  different kind of “code” that we should be looking at, and part of
  future notes in this series shall be exploring what that could look
  like.
</p>
<p>
  As of right now, I don’t think the answer is simply a better T3 Code,
  harness, etc. but rather something that is more dependent on the kind
  of system being built. Ideally, we should be able to make our own
  tools for these purposes, since we’re best equipped to knowing our own
  systems.
</p>
<p>
  I also don’t think the answer to this is merely that “models should
  be able to explain the code to humans”. Though such explanations can
  be useful, it often precludes that you know what questions to ask in
  the first place (and we often don’t know as much as we think we do). A
  more complete answer to this I think would need to somehow get one to
  ask the right questions about the code.
</p>
<p>— {metadata.date}</p>
