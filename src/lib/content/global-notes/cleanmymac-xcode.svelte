<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "CleanMyMac + Xcode",
    date: "11/20/25",
  };
</script>

<p>
  CleanMyMac is software meant for cleaning up junk files on your mac
  when your disk inevitably fills up with Xcode’s shenanigans.
  Incredibly, CleanMyMac will refuse to launch when your disk space is
  actually full!
</p>
<p>
  Now the real question is why does Xcode need to take up so much space?
  Even more importantly, why does Xcode go to such lengths to hide the
  actual contents of the things it stores? This much invisibility is not
  very nice…
</p>
<p>
  Caches = storing information that allows us to access information…
</p>
<p>
  The interesting thing is that the idea of disk-based storage forces us
  to think in very abstract terms since you can’t visually see what’s
  being stored, which most human minds massively fail at. MacOS also
  likes to put a “user-friendly facade” around the whole thing, because
  a lot of that storage is taken by various caches and internal
  application data. This facade comes with the tradeoff that the larger
  part of society is completely oblivious as to what their machines are
  actually doing.
</p>
<p>— {metadata.date}</p>
