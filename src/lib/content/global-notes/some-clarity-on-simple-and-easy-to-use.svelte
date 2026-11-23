<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Some Clarity on “Simple and Easy to Use”",
    date: "8/11/26",
  };
</script>

<p>
  My last note was quite negative towards the “simple and easy to
  use” mantra, and this has generated some counter feedback.
  Towards the early part of the note, I stated that “simple and
  easy to use” isn’t bad on its own, because it is true that
  lots of things are unjustifiably hard to use. Windows is a great
  example of this, because many struggle with doing basic tasks using
  it, or do such tasks in roundabout/inefficient ways.
</p>
<p>
  I think in many retrospects, what people mean by “simple and
  easy to use”, is really “not annoying to use”. That
  is, an interface that matches the conceptual model in the user’s
  head (this is hard), and does what they expect as a result.
  Furthermore, they should be able to find the functionallity they
  actually need to use within reasonable efforts. Of course, this is a
  trait that any good interface should have by default, so my main
  argument stands for how UIs function beyond this point.
</p>
<p>
  The main issues are when things venture into an “easy to
  use” black box, but really the main issue is the black box.
  Since the black box hides power, there is no power that the user can
  learn to wield, and as a result their growth remains stunted.
</p>
<p>
  For an example of this, I’ll turn to Apple’s
  FoundationModels framework, which provides a “simple and easy to
  use” interface for using their on-device LLM. At WWDC, I talked
  to many developers who had used the framework in their own apps, but
  the amount that knew LLM internals and what power they could wield if
  they had was few. I see the same problem with coding agents, where
  many devs use them, but don’t know what a KV cache or tool call
  are. Other frameworks where I’ve heard of similar stories from
  others would be things like Spring Boot in the Java world, and
  Next/React in the TypeScript world.
</p>
<p>
  Obviously, the last note spent a lot of time talking about iOS and how
  it was also an example of this, but this also goes for most social
  media as well. The point here that I’m trying to make is that
  this is a more general problem of understanding.
</p>
<p>
  So what do we do then? We need to add more expressive power. That is,
  how do we give users the power to change and tune systems to their own
  needs, and even share those changes with other users? This requires
  that a system becomes either becomes editable somehow, or it must be
  able to show its internals publicly. Naturally, if done incorrectly
  this can be at odds with “simple and easy to use” because
  there’s more overall surface for a user to navigate and
  understand.
</p>
<p>
  However, this is not an open and shut case, great games tend to find a
  balance between expressive power and being easy to play. The trick
  involves creating a learning curve, where the player is first given
  simple and easy to use controls, but the game itself provides the
  means to learn more advanced ones over time. I think the same could be
  applied at the OS level, especially as agents make creating personal
  software much easier.
</p>
<p>
  It’s also worth metioning that many good libraries and
  frameworks follow this approach as well. Tanstack Query notably takes
  an 80-20 philosophy, where 80% of use cases can be accomplished
  relatively easily, but the remaining 20% allows you to dig into the
  many complexities of the library. SwiftUI also has the mantra of
  making simple things simple, and impossible things possible, though
  I’m pretty sure they didn’t invent that saying. (Also,
  SwiftUI hides power as many of it’s built-in views don’t
  have feature parity with UIKit/AppKit after 7 years, which forces the
  “make impossible things possible” case more often than not
  through view representable conformances.)
</p>
<p>
  Another form of argument that I’ll get is that “So and so
  people are overwhelmed already, and they don’t want to learn new
  things. They just want something that works.” If “so and
  so people” are average consumers, I would agree that it’s
  unlikely they will be captivated by an expressive product over a
  black-boxed one. However, if such people are “deep
  workers” of some kind (eg. Devs, researchers, creators, other
  passionate professionals), then I can’t see why the most
  passionate ones
  <em>wouldn’t</em> want to learn something that increases their
  quality of output. For example, the best engineers wouldn’t mind
  learning a new language, framework, or technical domain to improve a
  product. In fact, they many of them enjoy it.
</p>
<p>
  However, looking at the engineer case when it comes to frameworks,
  often new frameworks are appreciated by a small handful of engineers,
  who then tell their colleagues about it. For a while, this creates a
  lot of hype around the framework, but eventually the spread reaches
  engineers who are forced to use the framework by others rather than by
  their own curiosity. These engineers tend to dislike the framework,
  since they never opted into using it out of their own needs or
  interests. I personally saw this first-hand with TCA in the Swift
  world, where its community was passionate around it initially, but
  attracted lots of hate when it grew. I’m sure this is also the
  case for React, and I wouldn’t be surprised if it becomes the
  case for coding agents as well.
</p>
<p>
  Therefore, the most important thing is somehow cultivating curiosity
  from a cultural standpoint. If one is forced to learn things by
  work-place or other external pressures, they’ll likely dread it
  because it’s driven from
  <a href="https://www.sciencedirect.com/topics/psychology/extrinsic-motivation">extrinsic motivation</a>. Curiosity generally comes from the mind taking an active role in
  something and wanting to learn more, this is driven from
  <a href="https://www.oxfordreference.com/display/10.1093/oi/authority.20110803100009153">intrinsic motivation</a>. In other words, brain-dead interfaces don’t produce
  curiosity.
</p>
<p>— {metadata.date}</p>
