<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "How to Teach Monads in Programming",
    description: "You don't learn monads by learning monads.",
    nav: ["home", "about", "now"],
  };
</script>

<article>
  <h1 id="how-to-teach-someone-monads-in-programming" class="title">
    How to Teach Monads in Programming
  </h1>
  <ReadingTime />

  <p>
    So, how does one understand this seemingly impossible to understand
    topic in programming? If seemingly, no one can explain it to a 5 year
    old, do we truly understand this intellectual monstrosity?
  </p>
  <p>Google what a monad is, and this is one of the top image results.</p>
  <img src="/images/monads/monad.png" alt="A mathematical drawing of a monad that describes this function: (&gt;&gt;=):: ma → (a→ mb) → mb.">
  <p>
    I’m sure that taught you a lot, and now I’m totally sure that you
    really understand what a monad is…
  </p>
  <p>
    Well, we could also try by showing you an example of one. Here, take a
    look at the
    <a href="https://developer.apple.com/documentation/swift/result">documentation</a>
    for <code>Result</code> in Swift!
  </p>
  <p>
    Still doesn’t make you understand it… Ok, how about we have
    <a href="https://chatgpt.com/share/68796b83-f57c-8009-ab55-ca698d8de980">ChatGPT</a>
    give us a nice summary! (I’ll even tell it that I’m a 5 year old!)
  </p>
  <CodeBlock code={`

Okay! Imagine you have a **magic box**. This magic box can hold *one toy* inside.

Now, this isn’t just any box—it’s a **special box**:
    1.    You can **put** a toy in the box.
    2.    You can **play** with the toy **inside** the box, but only using special gloves (because it’s a magic toy).
    3.    If the toy does something special (like turning into a different toy), the box makes sure everything stays safe and magical.

That’s kind of what a **monad** is in programming:
* It’s like a box that **holds a value**.
* You can **do things with the value**, but you have to use special rules to keep everything safe and tidy.
* It **knows how to handle the magic stuff** like errors, waiting, or doing things in order.

So, a monad is a *magical box* that helps programmers **play nicely with tricky things** like missing data, time delays, or big sequences of steps—without breaking the game. 🧙📦✨

Want a grown-up version too?
`} />
  <p>
    ChatGPT has introduced concepts like “special box”, “holds a value”,
    and “handles the magic stuff”… I think you’re probably more confused
    now…
  </p>
  <br>
  <h2 id="good-teaching-and-good-learning-are-experiential">
    Good Teaching and Good Learning are Experiential
  </h2>
  <p>
    This is one of my
    <a href="https://whypeople.xyz/personal-laws-of-design">personal laws of design</a>, and the core idea is that we learn best through using all of our
    human senses (not just hearing and eyesight). Good education is not
    just about transferring information from point A to point B, because
    good education forces you to accept a style of action into your
    lifestyle rather than focusing on concept retention.
  </p>
  <p>
    Therefore, all existing online resources (including this article) will
    never be able to teach you what a monad is in programming. Simply put,
    only reading articles, looking at fancy diagrams, or looking at code
    is not making you adopt the style of thinking that enables you to use
    monads to their fullest potential.
  </p>
  <p>
    <strong><em>You’re failing to learn monads because you’re stuck trying to
        “learn monads”!</em></strong>
  </p>
  <br>
  <h2 id="pain-is-the-only-way-to-learn-monads">
    Pain is the Only Way to Learn Monads
  </h2>
  <p>
    You’re going to learn monads through physical and mental pain. Yes,
    you will experience pain over and over again as you write that same
    repetitive and absolutely annoying code. In fact, you’re not even
    going to be writing monads when you experience this pain, and you
    don’t need to understand them to feel the pain. Eventually, this will
    become so painful that monads will become the natural cure for that
    pain.
  </p>
  <p>
    I can show you examples (in words and code) that describes the
    <em>information</em> of this pain. However, you will only be
    enlightened once you <em>feel</em> that pain yourself.
  </p>
  <h3 id="arrays">Arrays</h3>
  <p>You’ve probably written code like this before.</p>
  <CodeBlock language="swift" code={`

let array = [1, 2, 3]
var doubled = [Int]()
for num in array {
  doubled.append(num * 2)
}
`} />
  <p>
    Now do this for every single time you want to iterate over an array in
    your application. This is <em>painful</em>. You don’t want to write
    <code>for element in array</code> every single freaking time, and then
    either call <code>array.append</code> or filter through an if
    statement every single time.
  </p>
  <CodeBlock language="swift" code={`

let array = [1, 2, 3, 4]

var tripled = [Int]()
for num in array {
  tripled.append(num * 3)
}

var even = [Int]()
for num in tripled {
  guard num.isMultiple(of: 2) else { continue }
  even.append(num)
}

var stringified = [String]()
for num in even {
  stringified.append(String(num))
}

var joined = ""
for str in stringified {
  joined += "\\(str), "
}

print(joined) // "6, 12, "
`} />
  <p>
    Reading this code is painful. Writing it was also painful. Good, now
    let’s have monads cure our pain!
  </p>
  <CodeBlock language="swift" code={`

let str = [1, 2, 3, 4]
  .map { $0 * 3 }
  .filter { $0.isMultiple(of: 2) }
  .map(String.init)
  .joined(separator: ", ")
`} />
  <p>
    Much more compact, much less <em>painful</em>. In this case, “the
    magic stuff” (according to the ChatGPT explanation) is the iteration.
    You no longer have to worry about the iteration, and instead you
    specify what the iteration means.
  </p>
  <h3 id="result">Result</h3>
  <p>
    You’re probably familiar with <code>try catch</code> (Swift uses
    <code>do catch</code> instead) for error handling. Sometimes, that can
    be annoying such as when you want to store an <code>Error</code> in a
    struct like so. (An example of where you would want to store an error
    in a struct would be if you wanted to render an error message in your
    UI.)
  </p>
  <CodeBlock language="swift" code={`

// ❌ Bad

struct MyData {
  let error: (any Error)?
  let value: String
}

// ✅ Good

struct MyData {
  let result: Result<String, any Error>
}
`} />
  <p>
    So now let’s say we’ve got a function that throws, and returns a
    <code>Result</code> that doesn’t contain a <code>String</code>.
  </p>
  <CodeBlock language="swift" code={`

func someWork() -> Result<UUID, any Error> {
  // ...
}
`} />
  <p>
    We need to pass a <code>Result&lt;String, any Error&gt;</code> to
    <code>MyData</code>. So we’ll need to transform this result.
  </p>
  <CodeBlock language="swift" code={`

func transform() -> MyData {
  switch someWork() {
  case .success(let uuid):
    MyData(result: .success(uuid.uuidString))
  case .failure(let error):
    MyData(result: .failure(error))
  }
}
`} />
  <p>
    This is <em>painful</em> code to write. I don’t want to think about
    the failure case, instead I merely only care about the success case.
    So let’s turn to monads to cure our pain.
  </p>
  <CodeBlock language="swift" code={`

func transform() -> MyData {
  MyData(result: someWork().map(\\.uuidString))
}
`} />
  <p>
    Nice! However, what if instead of a uuid string, we treated the
    <code>UUID</code> as a user identifier of some kind, and then we
    wanted to look up the user name for that identifier. If the user
    doesn’t exist, we’ll return a failure result.
  </p>
  <CodeBlock language="swift" code={`

func username(for id: UUID) -> Result<String, any Error> {
  // Return success if user with id exists, else failure...
}

func transform() -> MyData {
  // ❌ Won't compile because map returns Result<Result<String, any Error>, any Error>
  MyData(result: someWork().map { username(for: $0) })
}

func compilingTransform() -> MyData {
  // Back to switch...
  switch someWork() {
  case .success(let uuid):
    switch username(for: uuid) {
    case .success(let name):
      MyData(result: .success(name))
    case .failure(let error):
      MyData(result: .failure(error))
    }
  case .failure(let error):
    MyData(result: .failure(error))
  }
}
`} />
  <p>
    Again, this is painful because we have to think about the failure and
    success cases twice! My primary concern here is translating the UUID
    into a username, so let’s turn to monads to cure our pain.
  </p>
  <CodeBlock language="swift" code={`

func transform() -> MyData {
  MyData(result: someWork().flatMap { username(for: $0) })
}
`} />
  <p>
    In this case, “the magic stuff” (according to the ChatGPT explanation)
    is the handling the result for an operation. You don’t need to worry
    about the result handling, and instead you specify what the result
    handling means.
  </p>
  <br>
  <h2 id="pain-gives-meaning-to-monads">Pain Gives Meaning to Monads</h2>
  <p>
    You still don’t understand monads from those examples. You won’t until
    you feel the pain, the least I can do is show you what that pain feels
    like, such that you can anticipate it. Pain is a method of learning.
  </p>
  <p>
    Monads are actually an incredibly simple idea, just like this glass.
  </p>
  <img src="/images/monads/glass.jpeg" alt="A glass that holds liquid.">
  <p>Yet how do you "learn a glass"? What does that even mean?</p>
  <p>
    A glass can do many things, it can hold liquid, dirt, toys, cash,
    coins, etc. It can be used to cover or trap something by acting as a
    surface. It’s also transparent, so we can see and learn from the
    internals of what it holds.
  </p>
  <p>
    Try drinking water without a glass or some other object. You’ll find
    this is painful, and you’ll use the glass as a cure. The pain gives
    meaning to the glass.
  </p>
  <p>
    Since the glass is so simple, we don’t derive meaning from it, we
    imbue it with meaning instead. Pouring different liquids give the
    glass a different meaning in a certain context. All of these meanings
    combined is what gives us an understanding of what a glass is.
  </p>
  <p>
    Understanding monads in programming has nothing to do with functors.
    endofunctors, or mathematical functions. Those terms do not describe
    the systems you’re building because they describe mathematics. You
    describe the systems you’re building with the artifacts at your
    disposal, and monads are an artifact to augment your ability to do so.
  </p>
  <p>So, to end this particular discussion.</p>
  <p>
    <strong><em>Don’t find meaning in Monads, give Monads your meaning.</em></strong>
  </p>
  <p>— 7/17/25</p>
</article>
