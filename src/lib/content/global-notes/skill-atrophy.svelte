<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Skill Atrophy",
    date: "1/15/26",
  };
</script>

<p>
  One of the biggest counter arguments I’ve seen to agentic coding is
  the idea that your skills will atrophy if you start adopting agents to
  write all the code. Firstly, while the agents are now good enough to
  write most code in many cases, they certainly aren’t good enough to
  write <em>all</em> code yet. So at least on that front, your
  handwriting skills will still be necessary for quite some time.
</p>
<p>
  However, the main point that I want to make here is that you can only
  upskill so much by repeatedly manually writing simple UI components,
  network calls, database queries, caching, or simple business logic.
  That is, writing the code for these things isn’t typically all that
  hard, but rather more time consuming than anything else. The hard part
  is generally how all of those components are orchestrated in the
  larger system, and how they are isolated from one another. That’s why
  mobile developers love talking about app architecture and design
  patterns.
</p>
<p>
  For IO bound systems, you can generally write the code as verbose as
  you want, as decoupled as you want, and favor readability over
  performance. At the end of the day, you’ll likely still have fine
  performance at the individual lines of code level regardless of the
  style you choose. This is because the actual application performance
  optimizations generally come from designing a better higher level
  architecture with less latency/throughput/better resource
  utilization/etc. This architecture largely exists outside of the code.
</p>
<p>
  Now of course, for compute bound systems the actual code matters a lot
  more. You can’t just add 15 levels of indirection, or use convenience
  algorithms (eg. <code>.map</code> in JavaScript) if you need top-notch
  performance. Even choosing between contiguous vs non-contiguous memory
  based data structures can have a massive impact on performance in such
  cases.
</p>
<p>
  Thirdly, there are frameworks that often require stretching a language
  to its limits to provide a more convenient API to end-users. Often
  times, the interface needs to be carefully crafted, and in statically
  typed languages, the way you define types is akin to a work of genuine
  art. I still remember when my colleague wrote an internal TRPC clone,
  and the typescript types were an absolutely beautiful work of art to
  admire.
</p>
<p>
  Generally speaking, I think skill increases for most programmers come
  from either investing in better architecture, writing performance
  intensive code, or writing framework code. Even just spending a
  weekend writing a fast JSON parser by hand will probably improve your
  skills a lot more than writing 300 HTTP API calls by hand over the
  next few months.
</p>
<p>
  Right now, I think those things are what agents are lacking in,
  because both require lots of precision to get right. I imagine agents
  will improve at both those things in the foreseeable future, but the
  improvements will be slower than the ability to churn out more IO
  based systems. In the real world, it just seems that more IO bound
  systems are directly making money than compute bound systems, so
  obviously the model improvements will follow that direction.
</p>
<p>
  In the meantime, if you occasionally opt to write performance
  intensive and code that requires precision by hand, then your skills
  will probably continue to increase despite using agents for everything
  else. At the end of the day, novelty in writing code will yield more
  improvements.
</p>
<p>— {metadata.date}</p>
