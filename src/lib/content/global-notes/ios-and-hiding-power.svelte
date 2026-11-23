<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "iOS and Hiding Power",
    date: "8/9/26",
  };
</script>

<p>
  I recently came across
  <a href="https://youtu.be/zqOrriq20Tc?si=-WYUzIiHGXibU0uo">this</a>.
</p>
<p>
  One of my notes in the backlog is about Butler Lampson’s
  “Don’t Hide Power” principle. While it goes over
  many examples including SwiftUI, I wasn’t able to find a natural
  point to fit iOS in. That being said, iOS (and much of Apple
  platforms) is a classic example of hiding power, and I think
  Theo’s rant on it exemplifies this, but doesn’t state the
  principle in clear terms.
</p>
<p>
  First, I should clarify what it means to <em>not</em> hide power. That
  is, an abstraction can hide underlying complexity from a host, but it
  shouldn’t prevent one from interfacing with the underlying host
  if necessary.
</p>
<p>
  By design iOS is designed to be “simple and easy to use”
  which isn’t bad on it’s own, but once it becomes
  “absolutely brain-dead to use” we’re in hiding power
  territory. (Bret Victor in
  <a href="https://vimeo.com/906418692?share=copy&amp;fl=cl&amp;fe=ci#t=3105.415">Inventing on Principle</a>
  even clarifies that “simple and easy to use” is “too
  vague” of a principle to act on. A single button that launches
  nukes is “simple and easy to use”, but is disastrous for
  the planet.) To put this into perspective, the main drivers behind the
  personal computer, internet, etc. was to <em>enlighten</em>
  people by giving them tools to think and create upon better ideas.
  Often, this means improving one’s ability to express themselves
  through a medium, like an artist being able to create better drawings
  by practicing their skills.
</p>
<p>
  iOS instead has kept everyone on the same homescreen for 20 years, and
  has not enabled end-users to change the interaction model between
  “apps” (or even modify apps themselves!) to suit their
  needs. This is “perpetual beginnership” because the
  ceiling for expression is disastrously low, and as a result
  there’s no intrinsic incentive to improve one’s expressive
  ability. When this happens, only a limited set of people, those who
  learn the difficult task creating software, get even any semblence of
  expression. Everyone else then must bend to the will of this tiny
  handful of app developers, because they are the only ones who have any
  sort of expressive power.
</p>
<p>
  Of course, even as a developer your expression options are limited to
  whatever Apple deems as “allowable” (see the video), which
  is arbitrary and limited (eg. Requiring WebKit for browser engines, no
  JIT for emulators, numerous private APIs, etc.). Adhoc app
  distribution with end-users remains difficult as well, since the only
  official methods of doing so are through TestFlight and the AppStore.
  Many great creative works begin through adhoc and sloppily put
  together creations (eg. a simple sketch that turns into a larger
  drawing). However, there is no good way to share a
  “sketch” that takes the form of an iOS app, which limits
  how one may test an interactive idea with actual users. (Additionally,
  most users of iOS don’t even know what TestFlight is, so the
  only place where you can distribute to these users is through the
  AppStore itself.)
</p>
<p>
  For development itself, I won’t bring up the issues I have with
  Xcode here, but suffice to say I’m also on Theo’s side
  regarding it.
</p>
<p>
  Moving on to the iPad, which in theory should be a more powerful and
  capable machine than the Mac, simply because it allows more forms of
  input (hands, keyboard, mouse, voice, etc.). However, it gets the same
  locked down version of iOS as its base OS, thereby limiting what one
  can create with it to many of the existing limitations of iOS. Theo
  mentions that one should be able to create iPad apps on an iPad, to
  which I agree and wonder why it isn’t also the case for the
  iPhone, Apple Watch, etc. If the iPad was to actually follow the
  original concept of the dynabook, then this would be something
  that’s non-negotiable.
</p>
<p>
  For the record, many of the problems that Theo has mentioned in his
  video, and that I have mentioned in this note, also do apply more
  generally. Even today’s desktops are still stuck in an
  “Application Silo”, though not to the extent that iOS is.
  I won’t re-open that rambling here, but you can check out some
  other
  <a href="https://whypeople.xyz/global-notes#how-do-we-break-the-application-silo-">notes</a>
  on it. So while iOS is most affected by this, really I think the
  larger part of personal computing needs reform.
</p>
<p>
  Towards the end of the video, in typical Theo fashion, he enters his
  “enhanced emotional state” of bashing Apple for
  “generational damage”. I recently came across another
  <a href="https://youtu.be/XwJHpMdrxEQ?si=-eTkaOAvmSxrpXjy">video</a>
  on Gen-Z struggling to use a basic Windows desktop (Windows XP of all
  things). While this video is obviously entertainment (and painful to
  watch), it does highlight the level of “perpetual
  beginnership” going on. Is the solution to yell at these people,
  and tell them to learn how to use a basic desktop? No, I don’t
  think so since Windows itself has many issues, but I certainly think
  one needs to be immersed in an environment that is sufficiently
  expressive if they want to produce great things.
</p>
<p>
  Therefore, when I see the term “Generational Damage” being
  thrown around, I’m not thinking about a general public that
  “can’t use a computer”, and is “cooked in the
  job market”. Rather, I’m thinking of a general public that
  has had it’s own intrinsic/autonomous/expressive growth stunted
  by the “simple and easy to use” systems they use
  day-to-day. A general public who has had power hidden from them. This
  is concerning, especially as the world grows an order of magnitude
  more complex and dynamic with the rise of agents.
</p>
<p>
  By learning to express yourself through a medium, you gain a
  perspective on how to approach such complexity through your
  expressions, and even be inspired by it perhaps. This is necessary for
  being able competently do things such as vote on policies that involve
  complex domains (eg. climate change, AI, etc). If one isn’t
  sufficiently competent in a complex domain, they have to get their
  competence from somewhere else in order to make an informed decision.
  Today, this means whoever is the loudest on social media. Suffice to
  say, experts in doing mass communication are quite different from
  experts in the complex domain of question, and don’t always
  share the same interests.
</p>
<p>
  Is Apple’s monopoly the reason for this “generational
  damage”? Perhaps to the extent that they aren’t willing to
  change much about it. However, many of the ideas were cemented long
  ago when the available hardware was far more limited, and before their
  monopoly. The good news is that no monopoly lasts forever, so
  eventually they will have competition. Hopefully, such competition
  won’t just be trying to build an “iOS for the agentic
  era”, but rather something that enables far more expression and
  creation than iOS today.
</p>
<p>— {metadata.date}</p>
