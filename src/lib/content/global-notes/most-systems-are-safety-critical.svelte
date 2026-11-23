<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Most Systems are Safety Critical",
    date: "1/17/26",
  };
</script>

<p>
  This might sound quite ridiculous to say, but I think of TikTok as a
  safety critical system. Yes, in the same sense as medical devices,
  automobiles, etc.
</p>
<p>
  With that latter kind of system, it’s quite easy to conclude that “bug
  in software -&gt; potential death”.
</p>
<p>
  For TikTok, I would say that “bug in user interface -&gt; potential
  death”, where the user interface is naturally a subset of software.
  TikTok’s biggest user interface bug is keeping you endlessly trapped
  in a false perception of reality. This has no doubt led to deaths and
  widespread pyschological issues across society.
</p>
<p>
  Though even a simple bug in the code can cause issues. If TikTok was
  taken offline from such a bug, you may think of it as just a simple
  inconvenience. However, their user interface bug has created quite a
  psychological dependence on the platform for younger generations, and
  taking away an addictive substance abruptly usually isn’t a good cure.
  Also, for better or for worse, TikTok is an archive of collective
  knowledge that may need to be accessed for non-trivial purposes, so
  workflows that depend on that archive (eg. Court) may be disrupted.
</p>
<p>
  If we look at the overall landscape of damage, would we say that
  automobile accidents, or mental health issues are bigger?
</p>
<p>
  Of course, both are bad, but inuitively we more clearly see the
  consequences of automobile accidents over mental health issues. In
  fact, many say that mental health isn’t a real problem!
</p>
<p>
  Automobile accidents are also very easy to measure compared to the
  effects of mental health issues. To measure the latter, you need to
  use more science, and often infer conclusions based on a number of
  downstream indirect measurements (eg. An oversimplification: Poor
  mental health -&gt; bad performance at job -&gt; company loses money).
</p>
<p>
  Unfortunately, most people think of science as a jumble of facts
  instead of as a way of thinking, and will use facts discovered by
  scientific thinking when it’s convenient for them, which is often when
  trying to win an argument. They’ll claim that their ideology “follows
  the science”, but in truth they are just using rhetoric, which is
  exactly the opposite of scientific thinking.
</p>
<p>
  Jumbles of facts are also not a replacement for systems understanding.
  If we don’t universally learn the latter as a society, we’ll never
  acknowledge many of the real issues caused by our man-made systems.
  You may believe that universal learning is practically impossible, but
  we’ve already achieved it with literacy. Nearly every citizen on the
  US can read at least a little bit thanks to public education, which is
  why TikTok even works as a business in the first place.
</p>
<p>
  Regardless, I’m going to take a wild guess and assume that most
  software engineering at TikTok is the typical kind of gluing things
  together, often between tightly coupled distributed services (Though
  TikTok is at the scale where microservices make sense), possibly
  skipping out on tests for time’s sake, and writing “good enough” code
  to reach arbitrary deadlines.
</p>
<p>
  Does TikTok need assembly level code verification like other safety
  critical systems? Probably not. However, its user interface surely
  needs to go through real clinical trials, and its infrastructure also
  needs to be heavily audited to prevent outages from blocking data
  access entirely.
</p>
<p>— {metadata.date}</p>
