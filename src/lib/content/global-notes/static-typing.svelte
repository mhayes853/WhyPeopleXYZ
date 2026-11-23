<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Static Typing",
    date: "9/2/26",
  };
</script>

<p>
  Look, I don’t know wtf I just wrote here, and it definitely
  sounds like complete and banal gibberish and discovering
  “obvious” principles at the same time. So to incriminate
  myself, I thought I would share it on the internet for some reason.
</p>
<p>
  Agents seemed to have shifted many projects to typed languages, or
  additionally typed features in dynamic languages (eg. Python type
  hints). This is generall good for agents because the types act as a
  verification and documentation mechanism. However, it’s not
  everything, and there are certainly inefficiencies with how types are
  reasoned about and explicitly written. This note is about what can be
  taken further here.
</p>
<p>First, let’s look at an example of redundancy.</p>
<CodeBlock code={`
function foo(name: string, bio: string) {
}
`} />
<p>
  In this example, both <code>name</code> and <code>bio</code> are
  strings, but we have to write out <code>: string</code> twice in the
  function signature. What if instead we could bundle?
</p>
<CodeBlock code={`
function foo(name, bio: string) {
}
`} />
<p>
  When tokenized with
  <a href="https://platform.openai.com/tokenizer">GPT 5.x’s tokenizer</a>, example 1 comes out to 12 tokens, while example 2 comes out to 10
  tokens. Therefore, the second is more token efficient, so let’s
  keep going.
</p>
<p>Often, we also like to pass down arguments to other functions.</p>
<CodeBlock code={`
function foo(name, bio: string) {
}

function bar(name, bio: string) {
}
`} />
<p>
  This is duplication again, so we may extract a type this time to avoid
  duplicating arguments.
</p>
<CodeBlock code={`
type Person = { name, bio: string }

function foo(person: Person) {
}

function bar(person: Person) {
}
`} />
<p>
  However, this time the second approach is less token efficient (26
  tokens compared to just 20 tokens for the first approach), so the
  duplication is actually better when there’s only a small number
  of variants. I measured that it would take about 6 functions with the
  <code>name, bio</code> argument pair before extracting the explicit
  type was more token efficient (it was roughly tied at 5).
</p>
<p>
  We can take this kind of experiment get a sense of basic redundancies,
  but in the long run this would likely only lead to a marginal token
  efficiency gains. It’s like taking a slow running function, and
  optimizing it just by profiling and using benchmarks. This approach
  yields some gains, but often only ones that are “incremental
  improvements”. “Order of magnitude” improvements
  require thinking about the “theoretical maximum”, and then
  comparing the gap to the existing progress.
</p>
<p>
  This poses a question, do we want to base our theoretical maximum on
  token efficiency, or semantic meaning (ie. What the type actually
  <em>means</em> in code.)? I theorize that these aren’t separate
  concepts, we need compact and powerful semantic meaning to achieve the
  theoretical maximum regardless of how it’s measured. Right now,
  the meaning of types in most languages is primarily “types as
  documentation and static verification”, and not “types as
  a container of semantic meaning”. The latter sounds quite odd,
  and is much more dynamic than the former.
</p>
<p>Let’s illustrate with a simple example.</p>
<CodeBlock code={`
class Mutation {
  attemptArgs: any[] // \`any\` for simplicity

  async mutate(args: any) {
    this.attemptArgs.append(args)
    await performWork(args)
  }

  async retryLatest() {
    if (this.attemptArgs.size === 0) throw new Error("No attempts")
    await this.mutate(this.attemptArgs[this.attemptArgs.size - 1])
  }
}
`} />
<p>
  When we use <code>Mutation</code>, we cannot guarantee at compile time
  that <code>retryLatest</code> has been called before
  <code>mutate</code>. In other words, 2 instances of
  <code>Mutation</code> may the same type statically, but not the same
  type semantically. We would retryable and non-retryable mutations 2
  separate “types” of <code>Mutation</code>.
</p>
<p>
  Functional programming can fix this to an extent, we can return a
  <code>RetryableMutation</code> from a <code>Mutation</code>. Only
  <code>RetryableMutation</code> can now call <code>retryLatest</code>,
  so we’re able to capture more semantics at the type level.
</p>
<CodeBlock code={`
class Mutation {
  async mutate(args: any) {
    const retryable = new RetryableMutation(args)
    await retryable.retryLatest()
    return retryable
  }
}

class RetryableMutation {
  attemptArgs: any[]

  constructor(initialArgs: any) {
    this.attemptArgs = [initialArgs]
  }

  async mutate(args: any) {
    this.attemptArgs.append(args)
    await performWork(args)
  }

  async retryLatest() {
    await this.mutate(this.attemptArgs[this.attemptArgs.size - 1])
  }
}
`} />
<p>
  However, this rabbit hole continues. For instance, are separate
  <code>RetryableMutation</code> instances with 3 attempts and 5
  attempts “separate types”? Some code may have a dependency
  on needing a minimum of 5 attempts, and while we could encode this
  statically, spelling out every possible variation on a mutation
  statically (ie. in source code) quickly becomes impractical.
  Furthermore, it certainly doesn’t help token efficiency.
</p>
<p>
  Another issue. What happens if you receive this HTTP blob from a
  network request?
</p>
<CodeBlock code={`
{ "name": "blob", "bio": "I am a blob." }
`} />
<p>
  Clearly, we know this resembles the <code>Person</code> type from
  earlier, but how do we express this notation statically? In
  TypeScript, we have validation libraries like Zod to handle parts of
  this.
</p>
<CodeBlock code={`
const PersonSchema = z.object({ name: z.string(), bio: z.string() })

type Person = z.infer<typeof PersonSchema>

const blobFromNetwork = "{ JSON DATA }"
const person: Person = PersonSchema.parse(JSON.parse(blobFromNetwork))
`} />
<p>
  However, even here we’re merely guessing. We simply don’t
  just “know” the type of network bytes. The most we can do
  is assume a blueprint and validate for the best.
</p>
<p>
  So generally speaking, we can’t know <em>every</em> type, even
  in so-called strongly-typed languages. This sounds weird, but it makes
  intuitive sense when we look at things we don’t know yet. For
  instance, we don’t know every “type” of species,
  life form, etc. They have to be discovered somehow (this problem will
  also get a lot worse in a bit).
</p>
<p>
  When we do discover those additional “types”, we will want
  to explicitly spell them out, but I reckon that our
  <code>Mutation</code>
  example from earlier should look more like this in order to compress
  the semantic meaning easily.
</p>
<CodeBlock code={`
Mutation = A container with attemptArgs
  | Method mutate accepts args -> invoke performWork -> invoke attemptArgs.append with args

RetryableMutation = Mutation where attemptArgs.size > 0
  | Method retryLatest -> invoke mutate with last value of attemptArgs
MutationOf5 = Mutation where attemptArgs.size === 5
`} />
<p>
  This concludes what I believe to be a first order of magnitude step,
  which is to make known variants easy to express. Having things known
  is like having an L1 cache, but for type-safety. This implies
  there’s more to this if we’re willing to make
  type-checking more than a cache lookup.
</p>
<p>
  Of course, we all know what type inference is, since compilers these
  days do it all the time.
</p>
<CodeBlock code={`
// We don't need to specify that num is a number in TypeScript
const num = 1
`} />
<p>
  However, inference is also a term we use often for
  “predicting” in machine learning, as LLM’s are often
  described as “next token predictors” (yet we call the act
  of using an LLM “inference”). Therefore, could we try
  something akin to “type prediction”? Well it turns out
  that we can’t make predictions out of nothing, but rather we
  need data to do so (a lot of data in the case of LLMs).
</p>
<p>
  In terms of program data, we can collect “real-world” data
  in many kinds of ways, this allows us to see all the
  “types” of inputs to our program, and then we can optimize
  or design around those types. For instance, while our
  <code>Person</code> type accepts any <code>name</code> and
  <code>bio</code>, the various “types” of most instances
  may have a name within 5-50 characters and a bio of around 0-300
  characters.
</p>
<p>
  Often, this kind of knowledge is written implicitly in code, but not
  the type-level. For example:
</p>
<CodeBlock code={`
function PersonView({ person }: { person: Person }) {
  return (
    <div>
      <b>{person.name}</b>
      <p>{person.bio}</p>
    </div>
  )
}
`} />
<p>
  You may wonder what is so special about this React component. The
  specialty is that we’re implicitly deciding that the
  <code>name</code> and <code>bio</code> of any <code>Person</code> is
  sufficiently sized to be displayed in a user interface comfortably. In
  other words, we’re already expecting the “type” of
  person to be reasonable for the UI, yet we semantically accept any
  length of string. This is a “type” that we’re
  implicitly writing into code, but that we’re not explictly
  keeping track of in code.
</p>
<p>
  So the next order of magnitude step seems to be some sort of
  “discovery” of sorts, and ensuring that any
  <code>Person</code> instance fits the discovery. Even better if we can
  easily express new <code>Person</code> types, so they fit in our
  “cache”.
</p>
<CodeBlock code={`
Person = An object with a name string and bio string
DisplayablePerson = A Person where name.size in [5, 50] and bio.size in [0, 300]
`} />
<p>
  However, there’s more to this than looking at code and inferring
  a new “type” implicitly. Consider the network blob case
  again.
</p>
<CodeBlock code={`
{ "name": "blob", "bio": "I am a blob." }
`} />
<p>
  Where did this blob come from? How much do we know about who sent it?
  How much does the sender know about us receiving it? Clearly, the
  sender knows that we’re able to parse JSON, and that we
  implicitly use <code>person.name</code> and <code>person.bio</code> in
  some non-malicious manner. So there’s some implicit contract of
  “trust” here that we have to reason about. This contract
  is yet another thing that needs to be “type-checked” (on
  both sides continuously), even though we may not represent it
  explicitly in code.
</p>
<p>
  Furthermore, how was the instance of <code>person</code> created? What
  procedures has it passed through? What processes have transformed it?
  If we wanted to know, it would have to be modeled explicitly on the
  type in today’s programming languages.
</p>
<CodeBlock code={`
type Person = {
  name: string
  bio: string

  // A list of validation filters ("name length", "bio length", "profanity", etc.)
  checks: string[]
}
`} />
<p>
  If this data is not present explicitly in the type, then we
  can’t distinguish between 2 <code>Person</code> instances that
  have gone through the same checks, even if their <code>name</code> and
  <code>bio</code> is the same. So even with equivalent names and bios,
  2 <code>Person</code> instances may not be the same
  “type”.
</p>
<p>
  Think about someone reaching out to you, or otherwise sending a
  message to you somehow. Often, you question where this
  “someone” came from, what their circumstances are, and why
  they are communicating with you. This way, you can respond
  effectively. A higher degree of trust with the “someone”
  lowers the need for those questions, but the trust itself is
  constantly in check (ie. Once it’s broken, we’re back to
  questioning their intentions).
</p>
<p>
  Ok, so weren’t we trying to optimize token efficiency, perhaps
  so that agents can write code without burning through much usage? The
  past many paragraphs of rambling were about defining our theoretical
  maximum! So if you want token efficiency, we need:
</p>
<ul>
  <li>
    A compact way to represent “types” and their subsequent
    variants.
  </li>
  <li>
    A way to implicitly to discover “types”, or otherwise
    represent them in a latent space without expending tokens.
  </li>
</ul>
<p>
  The bigger ideas here I think relate to the idea “static
  types” to being a “growing body of knowledge”, and
  not just mere constructs in source code. Such “types”
  exist thoughout all sorts of boundaries that are often not represented
  in code, and that any “coding agent” will need to be able
  to “type-check” those boundaries somehow.
</p>
<p>
  However, I think this says the following about programming with (and
  without) agents today:
</p>
<ul>
  <li>
    Systems behaviors and ideas are more important than raw syntax.
  </li>
  <li>Many types in the system are not explicitly in the code.</li>
  <li>
    Reading the code isn’t sufficient for understanding since many
    things are implicit there, but understanding all the latent
    behaviors and ideas of the system is.
    <ul>
      <li>
        This doesn’t necessarily require reading any code, in fact
        reading too much code could take time away from using other
        means to discover the real latent behaviors and ideas!
      </li>
      <li>
        This is much more of a question about what the “right kind
        of code” looks like for understanding more so than
        treating existing codebases and programming languages as the
        bible for understanding a system.
      </li>
    </ul>
  </li>
  <li>
    Modern programming needs better ways to explicitly represent types,
    because a simple struct often masks unbounded variants.
    <ul>
      <li>
        Often, representing a new variant means creating a new struct
        with all sorts of behavior, which gets way out of hand in
        today’s programming languages.
      </li>
    </ul>
  </li>
</ul>
<p>
  In other words, this note is much about programming with the
  “right” programming languages and styles, which are not
  necessarily the ones that exist today.
</p>
<p>— {metadata.date}</p>
