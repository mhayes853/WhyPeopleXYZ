<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "One Annoying Thing About Codex",
    date: "5/8/26",
  };
</script>

<p>
  If left unbound, it over complicates things (I don't like the term
  over-engineering in a negative connotation, rather I prefer
  over-complicated). I don't need 500 guard clauses for each function,
  neither do I need 4,000 tests for a trivial helper method. Also, we
  don't need to add 20,000 additional fields to a simple outbox table
  "just in case". This is like me when I program with anxiety.
</p>
<p>
  In planning, pay attention to anything it does, and I often will have
  it sketch interfaces/types to understand what it's about to generate.
  I often find that it will create types with many unecessary fields,
  methods, conformances, etc. So I tell it to cutdown, and it generally
  listens.
</p>
<p>— {metadata.date}</p>
