<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Code is a Representation",
    date: "7/23/26",
  };
</script>

<p>
  Since the monthly “reading code” debate seems to be going around
  again, I thought I would add absolutely zero value to it by writing
  this note. As I’ve mentioned before, code, your editor, etc. is just a
  visual representation of a system. It is literally a UI in the most
  literal sense possible for your to be able to edit and understand what
  is going on.
</p>
<p>
  The interesting thing is that representations are interchangeable, and
  the right one very much depends on the system’s domain (I really like
  <a href="https://vimeo.com/64895205">Stop Drawing Dead Fish</a>). So
  while handwriting code in general purpose programming remains fun as
  an art form, it hasn’t really ever been the best representation for
  understanding and editing. Just the most unquestioned one. For the
  record, my statements in this paragraph obviously don’t support a
  general purpose successor to today’s code either because of domain
  specificity (eg. Visual things need visual and not textual
  representations).
</p>
<p>
  A lot of talk has gone around about “writing slop to validate code”,
  which I interpret more as “writing formal verification tools that
  would’ve been too time consuming before”. I generally agree with this
  sentiment, and I often do these things myself. For instance, I find
  myself mocking interfaces a lot less because it’s simply easier to
  write test infrastructure using live implementations. One of my most
  recent internal projects even had an entire dedicated library just for
  testing IPC, Websocket, and HTTP interactions because they were so
  common place. One of my upcoming open source projects has an entire
  Python CLI alongside the main Swift package that I wouldn’t have had
  time to write by hand just to be able to create an export of a model
  for various inference engines (including Apple’s new CoreAI
  framework). These are quality improvements that are only worth it from
  a time standpoint because of agents. (Furthermore, it’s worth
  mentioning that as humans we are quite bad at making decisions due to
  a lot of psychological/biological factors. This is where having tools
  that don’t succumb to those same flaws can help. See the
  <a href="https://en.wikipedia.org/wiki/Hungry_judge_effect">hungry judge effect</a>
  for an example of such a biological factor.)
</p>
<p>
  How one interacts (ie. reading or writing) with code today largely
  depends on what is being built seems to be my line of thinking. For
  one, if the end product is an SDK of some kind, then you’ll be forced
  to at least read the code for the public API since code literally is
  the product. For complex and safety critical domains (ie. hard to get
  write/dangerous to get wrong), it obviously still makes sense to read
  and verify everything alongside having formal verification tools to
  make that process more robust. However, for apps where the code-level
  implementation consists of mostly “gluing libraries/frameworks
  together”, it’s probably becoming less important since the difficult
  part for those was never the code in the first place, but rather
  architecture and domain complexity. (In fact, the intensive focus on
  code may have taken away necessary focus on architecture! This is
  something I’ve certainly been guilty of in the past.)
</p>
<p>
  I still like handwriting some amount of code whenever I have spare
  time to, mostly for learning purposes and because it’s still fun. (eg.
  When learning MLX Swift recently, I opted to write a model by hand
  before I allowed myself to use agents for the same thing, this gave me
  a better understanding of the framework’s mechanics.)
</p>
<p>— {metadata.date}</p>
