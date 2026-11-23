<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "The Need for Local Models",
    date: "7/13/26",
  };
</script>

<p>
  It’s true that most consumers aren’t and will likely not be capable of
  running models like GLM 5.2 in the near furture. Further, the frontier
  seems to be expanding further with models like Fable 5 and GPT 5.6
  Sol, meaning that models like GLM 5.2 are technically a tier below the
  true frontier. It’s also true that more and more workloads are
  parallel these days, which means just having the hardware to run a
  single GLM 5.2 instance isn’t enough on its own. With all that said,
  local models “can be a future”, if we mean a future that includes a
  medium only possible through local models. That is, they serve a
  different purpose than the frontier, and one that the frontier cannot
  fulfill itself.
</p>
<p>
  Inference requires more hardware resources than gaming, especially so
  for memory. To put this into perspective, most AAA games can played
  casually on a single NVIDIA GPU or directly on consoles that cost
  &lt;$1000. Yet, running just a single inference task on a frontier
  model requires a cluster of enterprise-grade GPUs and parallel
  distributed overhead due to available memory bandwidth. Training
  requires even more resources than that generally. So the compute needs
  for SOTA inference are often greater than SOTA gaming, and we’ve tried
  to put gaming in the cloud. It’s generally a worse experience due to
  latency.
</p>
<p>
  This is to say that no amount of compute can remove the constraint of
  a simple network connection, which means that a truly realtime medium
  is likely best suited for local models. For the record, this doesn’t
  necessarily mean LLMs either. In fact, if anything it’s more likely
  that LLMs are <em>not</em> the kind of model for the kinds of mediums
  that would benefit most from local models (see
  <a href="https://en.wikipedia.org/wiki/World_model_%28artificial_intelligence%29">World Models</a>).
</p>
<p>
  Of course, I’m also ignoring the need for privacy, ethics, etc. Those
  are also things that necessitate local models, but I don’t consider
  those the selling point because historically few in the general public
  care about those concerns. (If they did, they wouldn’t be using social
  media the way they currently do.) The medium is the massage (the typo
  is intentional if you're familiar with McLuhan), and that’s what I
  would rather focus on. Especially given that any medium driven by
  local models will also have privacy and ethics concerns more tightly
  integrated by default.
</p>
<p>
  In essence, I would avoid looking at local models as a “cheaper and
  more private/ethical alternative” to frontier models. The frontier
  will likely always have an edge on local models for “hands-off”
  non-latency critical agentic workflows, which is the major paradigm
  today. However, AI is thankfully more vast than agentic workflows and
  LLMs. Almost certainly there’s at least something that can come out of
  that where local models will have an edge over the cloud.
</p>
<p>— {metadata.date}</p>
