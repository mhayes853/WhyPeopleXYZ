<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Notes on a Better Commercial Editor (2/N)",
    date: "3/26/26",
    anchor: "notes-on-a-better-commercial-editor-2-n-",
  };
</script>

<p>
  The first part of this was written before many people began writing
  most of their code with agents, and more-or-less around the time when
  many were realizing what agents could do yet still writing most of
  their code by hand. Nowadays, outside of the most low-level and
  performance critical stuff, I find this dynamic to have massively
  changed. In many such cases, I’ve found the only times where
  handwritten code is faster to write than agentic code is for simple
  line changes. This is especially the case for typical UI code which
  tends to be quite hacky and unstable in general.
</p>
<p>
  That being said, there’s now more interest than ever in creating
  better editors and tools for this new paradigm. T3Code and cmux are
  very recent attempts that come to mind, and I’m sure more in a similar
  vein will come about in the future.
</p>
<p>
  In past notes, I’ve also not been favorable towards TUIs despite using
  OpenCode and Ghostty daily. I should rephrase my sentiment I suppose.
  What I dislike about the terminal as a basis for everything is a lack
  of feedback when typing commands, or in other words “flying blind”. If
  a TUI can offer such feedback, or otherwise be useful in the same ways
  as a GUI, then for all intensive purposes it’s essentially the same as
  a good GUI. That being said, if a GUI offers no such feedback either,
  it’s essentially a terminal (like ChatGPT). So really, the bigger idea
  is exploration and learning through real-time feedback (game design
  emphasizes this point).
</p>
<p>
  However, I still don’t think any existing solutions are approaching
  the mark for what is actually needed. From the
  <a href="https://whypeople.xyz/global-notes#notes-on-a-better-commercial-editor-1-n-">first note</a>
  in this series, the “collaborative programmable whiteboard-like space
  approach” with arrows to represent relationships is still something I
  think could be a step in this dirction if it was able to be a
  communication system between various different apps. Tools like cmux
  also show a hint in this direction as well by not imposing any
  specific app in their layout/notification system. That is, there’s no
  “built-in” agent harness, and you can choose to use a dedicated one
  like OpenCode, Claude Code, or Codex depending on what you prefer
  alongside any other TUIs/CLI tools you use. Rather cmux acts as the
  binding force between those tools.
</p>
<p>
  In the short term (ie. 1-5 year timescale, real “long term” IMO is
  decades), I think this direction is better than monolithic apps that
  bake a bunch of features into them. That is, if we’re not talking
  about any escaping the 14-inch folding rectangle on my lap kinds of
  approaches (AKA a topic for another time), which is why I had to
  clarify that I meant “short term”.
</p>
<p>
  That being said, I think we can do better than traditional
  side-by-side layout when it comes to having multiple apps on screen.
  The relationional arrows from my whiteboard approach in particular are
  a concept borrowed from project Xanadu. Notice how the arrows are not
  unidirectional, and instead represent a 2-way binding between parts of
  documents. I think this aspect in particular could be used between
  apps to mention related content.
  <img src="/images/global-notes/better-commercial-editor-2-1.jpeg" alt="A mockup of the Xanadu UI in 1972.">
  <img src="/images/global-notes/better-commercial-editor-2-2.png" alt="Xanadu Space, a 2007 prototype that does the Xanadu UI in 3D.">
  This later particular image is of a 2007 prototype called Xanadu
  Space, which does the Xanadu UI in 3D thus adding more depth.
</p>
<p>
  Another aspect encoded in the first design was realtime feedback from
  each and every action. While of course, this was an idea largely
  developed in the 60s and 70s (especially so for the idea of live
  programming), some of Bret Victor’s work pre-Dynamicland (circa
  2010-2013) is quite infamous for this. Though Dynamicland has
  naturally expanded upon it into the physical world. Regardless, my
  <a href="https://vimeo.com/906418692">favorite talk</a> to this date
  has some examples of this in the digital realm. I should also mention
  that the reason for the talk being my favorite is not because of the
  demos that show “live programming”, but rather the second half which
  goes into a lecture on the meaning of work. Suffice to say, I would
  like to stray away from such spiritual topics in this note.
</p>
<p>
  One of the biggest issues that I’m seeing with much of the ongoing
  work towards better tools is the idea that a single app that becomes
  the next editor is the ideal end-state. This is quite barbaric and
  competetive over collaborative in my opinion. For me at least, it’s a
  zero-sum game if only one or a handful of monolithic tools “win” and
  the rest become irrelevant.
</p>
<p>
  This is what happened with the previous generation of text editors
  before the AI boom, and as a result no new radical UI innovations came
  for decades until the AI boom happened. For the established editors
  such radical innovation was too risky, and new players couldn’t easily
  enter (until AI) because the incumbents already had the market share.
  Also getting people to change their workflows is incredibly difficult,
  even if it’s to something better. The AI boom is the only reason that
  <em>some</em> (many outside of traditional tech hubs are almost
  entirely ignoring this) people are more open to change, but it will
  not last forever.
</p>
<p>
  I would prefer that we are not locked with a handful of standard and
  stagnant editor UIs for the next 2 decades because no new competitor
  can easily break established workflows. Now is the our window to break
  much of the traditional application silo as we can. It’s true that
  most apps will remain monolithic, because breaking the silo requires a
  complete mindset shift that I’m not sure is easily possible at scale
  in a time frame of a few years. However, we can at least make things
  better than they have been in the past.
</p>
<p>
  A great example of this kind of system from a UI perspective can be
  found in Alan Kay’s
  <a href="https://youtu.be/AnrlSqtpOkw?si=vPdCNiqOu8WR2G98&amp;t=595">tribute</a>
  to Ted Nelson. In today’s world, one would need to write or generate
  thousands of lines of code to make a dedicated app for what is seen in
  the demo. However, nearly zero new lines of code need to be added in a
  Smalltalk system to achieve the same functionallity.
</p>
<p>
  Fun fact, the entirety of Smalltalk-76 was only ~10,000 lines of code.
  Not because the programmers were necessarily Carmack-tier, or because
  Smalltalk was such a great textual language. Rather, the system was
  designed such that few lines of code needed to be written in the first
  place. There was no separation between the GUI and programming itself,
  just dragging things around constituted “programming”. This was in
  1976 by the way.
</p>
<p>
  The key idea that is shown in the Smalltalk system from Alan Kay’s
  tribute is that there is a way for each object to communicate with
  each other without direct knowledge of their existence. This way, one
  can focus on building “separate apps”, but still have them all
  communicate together in one cohesive and hyper-personalized
  experience. UNIX is somewhat an example of this in terminal-land, but
  an ideal solution is more for traditional UIs (and even TUIs). Fun
  fact, an ancient (2005) Bret Victor
  <a href="https://worrydream.com/MagicInk/#engineering_inference_from_the_environment">paper</a>
  actually describes what such a communication system could look like
  for GUIs. However, I’m sure we can make a more advanced one in today’s
  world that isn’t named MCP. MCP is only an agent protocol that has to
  be conciously invoked by an agent, where the agent has to know the
  tools available to it. We need something much more event-driven, where
  no 2 apps need to have explicit knowledge of each other in order to
  communicate.
</p>
<p>
  One could argue that OpenClaw is fulfilling this “communication” need
  between different apps, but if that were the case we wouldn’t be
  having this discussion. OpenClaw is more focused on “doing things”
  rather than “understanding things”, which is why most of us are still
  writing code with tools like Codex, Claude Code, Cursor, OpenCode,
  etc. What I actually think we need is the inverse of OpenClaw, which
  implies an explicit focus on “understanding” (which in turn would aid
  us in the “doing” part).
</p>
<p>
  This would imply less apps that bundle an agent panel, diff viewer,
  browser, terminal, code reviewer, etc. into 1 monolithic app. Rather,
  those would all be separate (and possibly developed by separate
  individuals and teams), but in turn would focus more efforts on
  communication with each other.
</p>
<p>
  To give a simple model of thought, imagine if OpenCode could directly
  communicate with whatever browser you’re using, no matter if its Zen,
  Firefox, some chromium browser, Safari even (lol Apple would never),
  etc. and vice-versa? Today, either OpenCode would have to implement a
  browser feature (not happening), or all of the browsers would have to
  implement a coding agent (more likely, but still likely not a priority
  feature).
</p>
<p>
  However, for the case of OpenCode implementing a browser, what would
  it look like? You wouldn’t just be able to pull in your favorite
  browser because it cannot exist as a part of the OpenCode monolith.
</p>
<p>
  Similarly, what does a coding agent look like in the browser? Sure,
  you can use the appropriate agent SDKs from Codex, Claude Code
  (maybe?), OpenCode, etc. but what if you wanted to use T3 Code as the
  agent UI for this hypothetical browser integration? You wouldn’t,
  because T3 Code is a separate app with it’s own design goals and not
  part of the browser monolith.
</p>
<p>
  One quote from that ancient Bret Victor
  <a href="https://worrydream.com/MagicInk/">paper</a> since for some
  reason I thought of bringing up a 20-year old paper of all things.
</p>
<blockquote>
  <p>
    Monolithic systems are bad for software providers. In a healthy
    marketplace, whether of groceries or auto parts, individual
    providers offer components which combine with others for a complete
    solution. A small software provider could provide an excellent email
    program, or an excellent map. But only a large corporation has the
    resources to develop an integrated package. Once small companies
    can’t compete, progress stagnates.
  </p>
</blockquote>
<p>
  Thinking about grocery stores for a second, of which there are many
  sellers within the store. While some big name food brands exist that
  are household names, many enjoyable ones aren’t. Furthermore, there’s
  no popular food brand in a grocery store that owns a monopoly on
  breakfast, lunch, or dinner. That is, you can make such meals by
  combining different food products from different brands. I don’t think
  the same can be said for software today, since each app wants to drag
  you into its own world entirely.
</p>
<p>
  Is this to suggest that monolithic applications that have a more
  cohesive end-to-end experience by damned for eternity? Not
  necessarily, and if the universal app communication system struggles
  to model a cohesive interaction between 2 distinct applications, this
  will be necessary. However, if all the monolithic app does is provide
  a horizontal layout with a browser/editor tab next to an agent tab
  with no other visual interactions between the tabs, I wouldn’t exactly
  call that a cohesive end-to-end experience either.
</p>
<p>
  I suppose, if there’s anything to build, it would be the universal
  communication mechanism. This is definitely something I’m interested
  in, but the sheer logistics of necessary adoption suggest that it will
  require more than just a single guy with agents and occassional free
  time.
</p>
<p>
  Sure enough many (potentially millions) of us are in the same boat of
  having agents and occassional free time. It would be quite a waste if
  only a handful had the opportunity to be on the “winning team” that
  makes everyone else’s contributions irrelevant. We don’t need the next
  killer app made by a handful of people, we need the next killer effort
  contributed to by everyone.
</p>
<p>— {metadata.date}</p>
