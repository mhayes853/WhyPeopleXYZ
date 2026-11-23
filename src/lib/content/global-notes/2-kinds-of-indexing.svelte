<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "2 Kinds of Indexing",
    date: "4/29/26",
  };
</script>

<p>
  The first is mechanical, in which information is indexed by analysis
  of its literal content. This is implemented using your typical
  textbook CS + ML algorithms. This is useful for pattern detection and
  "seeing relationships which cannot typically be seen".
</p>
<p>
  The second is intuition, in which information is index by an explicit
  process that determines a set of information is related for some
  reason. This is typically implemented manually by humans as they
  determine which pieces of information are related, and a good UI helps
  with this. This is useful for creating and understanding.
</p>
<p>
  Both of these seem to be essential properties for any dynamic
  information system.
</p>
<p>— {metadata.date}</p>
