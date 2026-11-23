<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Why I’m Interested in Edge Models/Inference",
    date: "2/4/26",
  };
</script>

<p>
  Apparently, just having some amount of information on the public
  internet that even demonstrates a slight hint towards enjoying edge
  models will get a few random people emailing you. Many of these emails
  contain the typical talking points for why edge inference is a good
  idea (privacy, offline, etc.). However, while those talking points are
  good, they are not the primary reasons I’m interested in this space.
</p>
<p>
  First and foremost, my biggest concern is systems design, and the way
  in which people think about systems. The second of those is what I
  want to elaborate on in this note, because the idea of that point is
  to create mediums that enable better thinking.
</p>
<p>
  Making people think better requires giving them framework for thought,
  most often that is a typical GUI, but it also concerns the design of
  frameworks in code.
  <a href="https://youtu.be/AdNJ3fydeao?si=LKY7jna7VrHV9Gxm">Rethinking Reactivity</a>
  by Rich Harris is probably my all-time favorite frontend talk, and in
  it he really pushes the idea that frameworks are tools for your mind,
  not your code.
</p>
<p>
  But let’s get back to traditional GUIs for a moment, because that is
  the interface most people use for technology. Take Calendar apps for
  example, of which we often claim as a “productivity tool”. Why is it
  so productive to put events on your calendar? Really, it’s because the
  calendar’s UI allows you to layout your daily events/schedule in a way
  that allows you to come to an <em>understanding</em> about them. This
  understanding is what makes you more productive.
</p>
<p>
  When you use a calendar, you think a certain way. Likewise, when you
  use a coding agent, you also think a certain way. When you talk to
  someone, you think a certain way about your language and person you’re
  talking to.
</p>
<p>
  Doug Engelbart saw this trend in particular, and spent many years
  researching various types of interfaces that would augment one’s
  thinking instead of degrading it. In particular, he extended this idea
  to groups of people more so than a single person, but
  commercialization ultimately chose the path of the individual.
</p>
<p>
  Likewise, I’m interested in interfaces that are malleable, almost like
  spoken language. For instance, while you may speak English to 2
  separate people, you will not speak the same form of English to both
  of those people. As you further converse with someone, the language
  you uses will change and adapt as more information is understood about
  the person. English is used as the base, but it is mutated at runtime
  (ie. In a conversation) to suit the needs of the receiver.
</p>
<p>
  In other words, this mutation of English is a dynamic user interface,
  one that adapts based on the context. It turns out that we have
  technology that can: live in the user’s context, speak English
  fluently, runs fast on consumer hardware, and can pattern match far
  better than humans. In case you’re wondering, I’m talking about
  running edge models and inference.
</p>
<p>
  All in all, edge models and inference are a technology that I believe
  can power the idea of a dynamic user interface. One might ask, why not
  cloud models/inference? These models are far bigger and knowledgeable
  than edge models, so one has to ask why I would accept potentially
  degraded performance.
</p>
<p>
  My answer to that is more so an engineering answer from an engineering
  standpoint, in which I would say that the internet is too flaky and
  slow for the real-time component of generating UIs in response to
  quick user interactions. Edge models can easily hit generation speeds
  of &gt;100 tps on the CPU alone given the right configuration, and are
  not bottlenecked by network concerns. Additionally, it’s best if they
  operate directly in the user’s context such that we don’t have to send
  sensitive data across the network.
</p>
<p>
  So yes, privacy and offline support are great reasons for why I’m
  interested, but only from an engineering standpoint. That is, I see
  them as more of an implementation detail rather than the ideals
  themselves.
</p>
<p>— {metadata.date}</p>
