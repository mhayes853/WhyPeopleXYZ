<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "MiniMax",
    date: "3/12/26",
  };
</script>

<p>
  I’m a Codex user, and GPT 5.4 is my go-to model for anything serious.
  That being said, it’s not good for everything, and there are times
  where simpler models that just get the job done are more ideal than
  Codex’s thouroughness. I suppose I could use Opus or Sonnet for this,
  but that would mean subscribing to Anthropic and using Claude Code.
  Unfortunately, I would much rather stay in OpenCode (or possibly a
  newer tool like T3 Code if it matures into something I like) to ensure
  that everything is as streamlined as possible with no weird TOS stuff
  in-between.
</p>
<p>
  Since Gemini doesn’t seem to be optimized for agentic coding
  workflows, the only remaining options left are open weight models.
  Particularly, GLM, Kimi, Minimax, and Qwen have the edge in this
  space.
</p>
<p>
  I haven’t bothered much with Qwen outside of using edge versions of it
  as a testing model for
  <a href="https://github.com/mhayes853/swift-cactus">swift-cactus</a>.
  Generally speaking, Qwen models aren’t generally that fast from my
  experience, at least on the Cactus engine. Furthermore, I don’t hear
  much talk about Qwen’s larger models overall, so I felt pulled in
  different directions.
</p>
<p>
  That brings us to GLM 5 and Kimi K2.5 which have gotten a lot of
  attention. Having tried these models briefly, they both work very
  well, take their time, and can get most tasks done that codex can
  accomplish. However, I have Codex already, and I don’t need a cheaper
  and slightly worse overall version of it. Remember that I just want
  something that can perform simple things fast and well.
</p>
<p>
  This leaves us with Minimax M2.5. While I wouldn’t say it’s output is
  as strong as GLM 5 and Kimi K2.5, it’s definitely not that far off,
  and can generally solve the tasks I need it for. Furthermore, it’s
  model size is quite small, only ~230B params compared to ~750B for GLM
  5 and ~1.1T for Kimit K2.5 by comparison, which means it’s often
  faster given equivalent hardware. The reason I like it is because it
  isn’t trying to be a cheap Codex or Opus, but rather be it’s own thing
  entirely. It has the exact opposite qualities compared to Codex, while
  still having good enough output quality, which is why I think it
  complements Codex very well.
</p>
<p>
  Furthermore, from a subscriptions/usage standpoint, it’s also very
  generous if you go past their $10/month plan. I actually think that
  most people could seriously get by on their $20/month plan. Even when
  running it continuously through my recent entry into ralph-looping, I
  found that I never came even close to hitting any usage limits.
</p>
<p>
  That being said, Minimax is no Codex or Opus, and you will have to
  significantly hand-hold the model, especially compared to Codex.
  Therefore, I still recommend the $200 or even $20 Codex tier above all
  else first, and an open-weight model like Minimax second. AFAIK, the
  $20 Codex tier is actually a lot better than the $20 Claude tier for
  many. I also think a $100 Codex tier would actually do quite well for
  many since it’s quite difficult to hit the limits on the $200 tier,
  which therefore means one is theoretically overspending on inference
  (not counting subsidization).
</p>
<p>
  Another question one may ask is why not just get a subscription that
  gives you access to all the open-weight models like OpenCode or
  Synthetic? My reason for this is because OpenCode will give generally
  give free-access to open weight models for a limited time, which means
  that I will always get to at least try them without paying. Secondly,
  I’m not interested in the other openweight competition for now.
  Perhaps NVIDIA’s Nemotron model will change my mind, but for now I
  haven’t had any issues with Minimax itself.
</p>
<p>— {metadata.date}</p>
