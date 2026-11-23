<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "An Alternative to Feature Creep",
    date: "5/5/26",
  };
</script>

<p>
  In some of my earlier days, I would fall victim to the so-called
  feature creep because I wanted to build everything. This would cause
  me to at times not finish anything for long periods of time, despite
  spending lots of time writing code, desiging, etc. In the era of
  agents, I'm noticing the tendencies of more people to want to feature
  creep their stuff because they can just "prompt it into existence".
  Undoubtedly, this will cause massive feature balls to be created,
  where-in not all of the features will interact very well with each
  other.
</p>
<p>
  Of course, the natural advice for getting around this is to "scope
  down", or essentially slash your creation until it becomes a dwarfed
  version of it's actual self. Then you may actually finish it!
</p>
<p>There are 2 points I generally don't like about this:</p>
<ul>
  <li>
    Not everything <em>should</em> be finished.
    <ul>
      <li>
        The idea that we have to finish everything we start is really an
        arbitrary thing learned through schooling. Yet it's of the only
        things that leads to the "predicatability" we so crave, so it
        becomes the norm in the real world.
      </li>
      <li>
        Honestly, I would rather that a conceptually bad project never
        gets finished rather than unleashing a zombie in the real world.
      </li>
    </ul>
  </li>
  <li>
    If "cutting scope" is the correct answer, that inherently means
    we're creating something that isn't at it's fullest potential.
    <ul>
      <li>
        From an building-as-an-art standpoint, this hurts me
        emotionally.
      </li>
      <li>
        From a building central infrastructure standpoint, this hurts me
        logistically.
      </li>
    </ul>
  </li>
</ul>
<p>
  However, things do need to get finished at some point, we can't just
  keep adding features endlessly. Therefore, how does a line actually
  get drawn here?
</p>
<p>
  For me at least, this has been the result of a perception change. That
  is, instead of creating the thing to solve <em>the</em> problem
  entirely, instead create the thing that allows the end-user to solve
  <em>their</em> own problems. Or, in Theo's words, "Allow your users to
  do their bespoke bullshit". I view this as enhancing one's inherent
  ability rather than substituting it with a product they can't see the
  internals of or modify directly for their personal needs.
</p>
<p>
  With that perception change, now the entirety of how we design things
  changes. The basic notion is that whatever is built has to be directly
  expandable by end-users. I've found that getting to this point has
  much smaller inherent "scope" whilst still being able to produce
  something useful. This is because now the focus shifts from "How many
  features does this need to please people?" to "How simple can this be
  to be adaptable in any reasonable situation?". In fact, I treat
  feature requests as bugs with this perception (If you have to ask me
  for the feature, what is missing that prevents you from making it
  yourself?).
</p>
<p>
  Reaching such simplicity is hard, but it's a necessary part of systems
  design, especially for things that need to be stable. It also requires
  saying "no" in a professional context to features that don't benefit
  this simplicity, though this may not always be ideal personal
  reputation-wise.
</p>
<p>
  Regardless, this is one of the things that I think library design
  makes you realize, since libraries by design have to be
  adaptable/extendable by principle. We often speak of "less is more"
  for this kind of reason.
</p>
<p>— {metadata.date}</p>
