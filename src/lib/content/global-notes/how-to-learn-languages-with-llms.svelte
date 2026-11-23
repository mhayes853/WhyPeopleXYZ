<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "How to Learn Languages With LLMs",
    date: "5/14/26",
  };
</script>

<p>
  Ever since the agent boom, this has been a topic much discussed, and
  particularly for beginners that have tendencies to jump right into
  agentic coding without first handwriting code. However, I don't think
  there's anything really new here in terms of the advice I would give
  to new learners, especially since this story has played out before
  with beginners learning React before Vanilla JavaScript, SwiftUI
  before Swift, etc. This is going to be a more contrarian take on
  learning programming, and I believe the consensus take comes from a
  place of desiring control in times of uncertainty.
</p>
<p>
  I disagree with the general sentiment that states that one must ascend
  through the "fundamentals" before they get to use the cool frameworks
  or techniques that are perhaps more abstracted from the
  "fundamentals". It is true that pure vibe coders and framework
  warriors aren't the ideal end-states for new programmers. However,
  I've known many others in the past who were said framework warriors
  that eventually learned the "fundamentals", and are sufficiently
  skilled today. (eg. In the Swift world, Paul Hudson begins 100 days of
  SwiftUI with only 2 weeks of Swift fundamentals, and every subsequent
  project is building apps with SwiftUI and other Apple frameworks. Many
  talented developers today went through that course as their intro to
  programming in general.)
</p>
<p>
  What we call the "fundamentals", and the designs of various frameworks
  and agentic coding styles are really all just <em>ideas</em>. Ideas
  are things that we play with through exploration, intuition,
  connection, etc. Without this, we would never discover new insights or
  novelty. It's worth noting that most traditional schooling or
  structured curriculum typically does not promote learning via playing
  with ideas, but rather through drilling them into you in a specific
  order via fear and punishment. This often fails to cultivate any
  enthusiasm for long-term learning other than for personal extrinsic
  achievement.
</p>
<p>
  So really, if a learner isn't interested in playing with ideas, they
  aren't going to be good regardless of whether or not they start with
  the "fundamentals" or with the bleeding edge. If they start with the
  fundamentals, they'll quickly become disinterested because they'll get
  bored. If they start with the bleeding edge, they'll never reach a
  sufficient level of competency because they have no reason to do so
  (the bleeding edge abstracts them).
</p>
<p>
  By contrast, a person who loves playing with ideas will do fine no
  matter what path they start with. If they start with the
  "fundamentals", they'll enjoy playing with the foundational ideas, and
  become curious as to how those apply to the bleeding edge. If they
  start with the bleeding edge, they'll become curious as to how the
  fundamentals will improve their usage of the bleeding edge stuff.
</p>
<p>
  This means the more important goal here should be to cultivate
  learners who love playing with ideas, especially those of "systems"
  and "processes". There are many ways to do this, but I don't think a
  strictly structured curriculum is the answer you want here. Good
  "systems" and "processes" often take many ideas from the "outside", so
  you need to allow for this exploration to happen (which often requires
  removing structure in favor of creating a good overall environment).
</p>
<p>
  Some people are concerned about giving "juniors" access to agentic
  tools, and that they should earn their right to use them. However, I
  think it is wrong to deny learners access to essential tools that they
  will likely have to use everyday in the future. Richard Hamming once
  said that teachers should prepare their students for their future, and
  not the teacher's past. We can claim the quality of agent code is bad
  or otherwise lacking (it certainly is severely lacking compared to a
  good human). However, bad code won't stop agents from becoming a
  necessary everyday industry tool (this point comes from Casey
  Muratori).
</p>
<p>
  A corollary example to this is with regards to the skill of general
  communication, of which most people are seemingly lacking. If the
  training for the workplace was the school classroom, then we'll take
  note that "talking" is often forbidden in the classroom, and that it's
  a right to be earned. That is, in order to earn your right to begin
  building your oral communication skills, you must first earn the right
  to talk in the first place. Of course, you would think that the last
  sentence is ridiculous when stated as such, yet we enforce it in
  schools anyways.
</p>
<p>
  <em>Forcing people to "earn" the right to learn essential skills is
    generally a great way to gate-keep people from learning them.</em>
</p>
<p>
  So I say let new learners use the agents in safe environments. As long
  as they are interested in playing with ideas, they <em>will</em> make
  an effort to avoid the negative effects of cognitive outsourcing
  present in today's tools. Of course, future tools could offer more
  forms of input and visibility which can massively help with reducing
  that outsourcing, and may even <em>enhance</em>
  understanding. Despite that, today agents are an output amplifier of
  current thinking. A curious person using them will likely remain
  curious, and a non-curious person using them will likely remain
  non-curious.
</p>
<p>
  This isn't an AI problem, it's a cultural learning problem in general,
  so any long-term fix would need to happen at that level. Good tools
  can aid that process, but a real solution to this problem really
  requires looking at our institutions of cultivating learners.
</p>
<p>
  <strong>So how can one use LLMs for learning new languages?</strong>
</p>
<p>
  I'll answer this straight with the technique I have been using, which
  I think can also work for beginners learning their first language.
  Though the learning process for total beginners will be a bit longer
  since they must also learn the foundational ideas behind today's
  languages. Thankfully, given that pretty much all mainstream languages
  are quite similar, this foundational learning only needs to be done
  from scratch once.
</p>
<p>
  I start by generating lots of agent code for various non-critical
  things, and then spending a lot of time actually reading the generated
  code. This allows me to see the mechanics of the language in a real
  setting at a mere glimpse. Then, I continue to drive the agent by
  describing high-level designs in prompts, continuing to read/analyze
  the code along the way. After doing this enough times, I decide
  whether or not it's worth learning the language by hand based on how
  much I enjoy its mechanics from a glimpse. In other words, this
  process builds a high-level map of how to navigate the language, and
  forms a general opinion on whether or not I will like writing code in
  it.
</p>
<p>
  The handwriting aspect is important because it forces you to
  understand the foundational mechanics that make up the language in
  great detail. This in-turn makes you better at using the agents in the
  future. However, the aspects I would focus on handwriting should not
  be glue code like basic IO, basic data transforms, and simple UI
  components, but rather things that the agent will struggle with.
  Namely: performance intensive code, library/advanced typing
  shenanigans, non-trivial memory management, security, etc. Good
  library design tends to cover all of these points, and will often
  require you to push the language to its conceptual limits via
  handwriting.
</p>
<p>
  Another aspect of handwriting you can do while using an agent is
  "being a janitor". That is, take part in manually cleaning up agent
  code, since it tends to be verbose and/or slow in the general case.
  This will get you familiar with the various syntatic sugars and
  performance facilities found in the language, and will help you
  further craft a personal style.
</p>
<p>
  Generally speaking, I think this process also makes it easier to learn
  languages in parallel. One of my current projects uses Rust, Go, and a
  bit of Python all at once, which I hadn't touched in a while (~2-3
  years for each) before starting the project (TypeScript is also used,
  but I'm already experienced with it). I was also able to use this
  technique to become proficient enough with C++ to do some open source
  contributions where much of the code was written by hand (this also
  required reading dedicated books).
</p>
<p>
  That being said, none of this works if you don't like playing with
  ideas. So really, the difficulty is cultivating that.
</p>
<p>— {metadata.date}</p>
