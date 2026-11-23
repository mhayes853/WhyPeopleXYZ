<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Opus Spam",
    date: "1/11/26",
  };
</script>

<p>
  One of the interesting things I’ve taken note of is how many people
  are doing essentially what I call “Opus Spam”, but the same can apply
  to whatever model is considered the flagship model of the day. One
  could also call this “GPT Spam” or “Gemini Spam” depending on which
  lab has the lead in perceived model performance at any given point in
  time. “Opus Spam” by its very definition is essentially just spamming
  Claude Opus 4.5 to do essentially every task you can think of.
</p>
<p>
  IMO, this is like using a forklift to pull a nail out of the ground
  for many things. It’s true that Opus 4.5 can do a lot of complicated
  things, but that doesn’t mean it should be used for everything. In
  fact, smaller, cheaper, and less capable models can do quite a lot of
  tasks. If you’re just trying to do a simple refactor on a class for
  instance, you probably don’t need Opus 4.5.
</p>
<p>
  The reason I bring this up is because Opus 4.5 is not a cheap model to
  host and maintain by any means, and future flagship models of the day
  likely won’t be either. Access to these expensive models for most is
  only even possible because of the generous subscription tiers of the
  big AI labs. For the record, none of those labs are profitable on
  their AI capex at the moment, so only time will tell how well the
  subscription tiers fare.
</p>
<p>
  This is all to say that Opus Spam is essentially a massive waste of
  resources, and we need to do better. We should be actively looking for
  ways to make smaller and more specialized models an option for many
  common tasks. Potentially, these models could be local models, which
  would massively reduce the cost of inference for consumers.
</p>
<p>— {metadata.date}</p>
