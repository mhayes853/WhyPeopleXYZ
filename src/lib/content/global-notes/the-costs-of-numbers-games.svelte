<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "The Costs of Numbers Games",
    date: "11/16/26",
  };
</script>

<p>
  Many of us talk about the concept of a “numbers game”, or essentially
  the idea of doing some action repeatedly until the desired result is
  achieved (i.e., brute force). For humans, searching for a job is often
  touted as one such game, especially as candidates send hundreds of
  applications just to find a single position. For agents, an example
  would be unbounded exploration that burns many tokens and hours. In
  essence, numbers games are <em>expensive</em>, so I have a philosophy
  of trying to avoid ones that are painful in favor of ones where the act
  of performing them is itself beneficial and non-ephemeral.
</p>
<p>
  For example, I have only sent one application for an engineering
  position in my entire life to this point, and all positions I’ve held
  have come as a result of someone reaching out (including an offer I
  signed last week). Instead of sending out a massive number of resumes,
  I’ve opted to play other numbers games: building and writing. Unlike
  sending out a bunch of resumes, building and writing are actually
  enjoyable activities, inherently attract other people to reach out,
  and efforts towards them compound positively unlike sending resumes.
  (I.e., someone may find something I wrote 10 years ago valuable in the
  future; meanwhile, the value of a single job application from 10 years
  ago is zero even if it resulted in an offer at the time.)
</p>
<p>
  That’s enough bragging, as I also want to discuss how this matters with
  agents.
</p>
<p>Let’s take this prompt to improve the performance of some code:</p>
<blockquote>
  <p>Improve the performance of this code by X%.</p>
</blockquote>
<p>Then, compare that to a prompt such as:</p>
<blockquote>
  <p>
    Look for areas where we can better leverage ILP and SIMD in this
    code, implement such fixes, and remeasure performance.
  </p>
</blockquote>
<p>
  In many cases, prompt 1 will run for many hours and consume far more
  tokens than prompt 2. This is simply because the agent has to
  experiment with far more possibilities in prompt 1 compared to prompt
  2. Prompt 2 tells the agent to look for specific optimizations, which
  may result in a considerably shorter search time than prompt 1
  (although optimal implementation and measurement could still take a
  long time). Potentially worse, with prompt 1, the agent may not even
  think to optimize for SIMD and ILP, as it only needs to reach an X%
  goal. If it can reach that X% goal with an existing suboptimal
  architecture, it will generally do so.
</p>
<p>
  To write the second prompt, one needs to know what ILP and SIMD are,
  and make the judgment that they may be a useful approach in the
  current context. Skimming the code is one way to make that judgment,
  but you also need to be familiar with the deep knowledge terms in this
  case (SIMD + ILP).
</p>
<p>
  In other words, we can reduce the costs of numbers games via leverage
  of some form. For jobs, that may be having a lot of public work that
  can be used to attract opportunities. For agents, that may be having
  intimate systems and domain knowledge to find approaches that would
  take the agent hours to find on its own.
</p>
<p>— {metadata.date}</p>
