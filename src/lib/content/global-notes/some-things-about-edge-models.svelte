<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Some Things About Edge Models",
    date: "2/3/26",
  };
</script>

<p>
  I talk with iOS developers sometimes, and FoundationModels is a more
  popular topic in recent conversations. Notably, Apple is considered to
  be “behind” in the AI arms race, and primarily I think the reason for
  this is because of their focus on edge models. Instead of focusing on
  burning billions in infrastructure costs to fuel the next generation
  of lobsters running on Mac Minis, Apple has decided that they’ll just
  run the inference on your phone instead.
</p>
<p>
  One of the things I’ve realized is that most developers and
  technically enthusiastic users, is that they expect the output of edge
  models to be on par with GPT-5. Ok, maybe they don’t think that way
  directly, but certainly my conversations have shown hope for being
  able to use edge models for the same kinds of applications as cloud
  models.
</p>
<p>
  To an extent, this opinion is valid. I do believe that most of us
  developers are throwing the biggest models at every problem (see Opus
  Spam), when smaller models, or even just basic classifier models will
  do. However, you’re not going to get good results attempting agentic
  coding with a model that only has ~3B parameters and a 4K token
  context window (the primary agentic coding models have at least 100B
  parameters and and 150k token context length).
</p>
<p>
  I keep hearing hopeful statements for this year’s up and coming WWDC
  in which we’ll somehow get an edge model on par with the offerings
  from the big AI labs. Unfortunately, that will likely not happen, at
  least on the current generation of hardware.
</p>
<p>
  That being said, I think edge models have lots of unique power over
  cloud models besides the usual privacy and offline statements. One of
  the things I haven’t talked about publicly yet, is the idea of doing
  dynamic user interfaces that adapt in real time as a user uses an
  application. Some may call this “Generative UI”, and there’s even an
  SDK called <a href="https://github.com/tambo-ai/tambo">Tambo</a> for
  this, but this SDK misses the main ideas of what I have in mind (In
  future writings, you’ll see that real dynamic UI is much more than
  merely tailoring the UI to each user based on a prompt).
</p>
<p>
  I wouldn’t try to use a cloud model for dynamic UI because of either
  network latency/reliability or because inference speeds are too slow.
  It’s not uncommon for edge models to reach speeds of over &gt;100 tps
  even just running on the CPU directly. The network issue is the bigger
  problem here, because even inference speeds of &gt;1000 tps mean
  nothing if the user’s network is down.
</p>
<p>
  Another thing to note is that edge models can defeat the bigger cloud
  models in some tasks, that is if you fine tune them. Any application
  that seriously uses edge models should be using fine tuned models, and
  I think this is a hole in the space that should be addressed from
  available tooling. Most developers are completely unfamiliar with the
  concept, and would rather be building feature instead of LoRA
  adapters.
</p>
<p>
  Lastly, one other big idea is remote control. Since edge models run
  locally on the client, the system prompts are also going to have to be
  present on the client. However, a hard-coded client-side system prompt
  that’s dangerous will be incredibly hard to update, especially if
  you’re deploying to the App Store. Once a prompt is hard-coded on the
  client, it remains forever, so for that reason it’s ideal to have your
  app check for system prompts updates at runtime such that you can
  deploy new prompts without going through app review.
</p>
<p>
  Now of course, you need to ensure that you take appropriate measures
  to prevent MITM attacks from injecting bad prompts on the client.
  Prompt injection still is a security problem at the end of the day.
</p>
<p>
  Additionally, observability is also an important aspect. Particularly,
  you’ll want to address the basics of detecting things like output
  speeds, confidence thresholds, memory usage, etc. on a per-prompt
  basis. However, good observability should also embed safety, and
  therefore act as a NORAD in order to detect warning signs of things
  going catastrophically wrong. (eg. A system prompt that’s doing more
  harm than good to a user.)
</p>
<p>
  I’ll have more to say on this topic in future writings. At the very
  least, edge models are likely to be used as the implementation driver
  of a lot of my upcoming design work, which is why I’m interested in
  them.
</p>
<p>— {metadata.date}</p>
