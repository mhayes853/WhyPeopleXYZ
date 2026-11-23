<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Swift WASM Bundle Sizes With Foundation",
    date: "7/12/26",
  };
</script>

<p>
  I asked GPT 5.6 to run a simple experiment on a basic executable Swift
  package that imports Foundation, FoundationEssentials, YYJSON, and no
  Foundation import to compare the bundle sizes. It came out with this.
</p>
<p><b>Original Prompt:</b></p>
<CodeBlock wrap code={`
I want you to run a quick experiment.
 - Create a very simple Swift package that imports Foundation, and compile it for WASM.
 - Then change the Foundation import to FoundationEssentials, and compile it for WASM.
 - Then remove the import entirely, and compile it for WASM.

 At the end, report back the WASM binary sizes for each build. Make sure to build in release mode for each build.
`} />
<p><b>Later Added:</b></p>
<CodeBlock wrap code={`
Ok, now run the same experiment, but add another build that imports a C target exporting and using yyjson. Compare the new binary size to the other cases (you don't have to run the other cases again, just compare the new case to the ones you have here.)
`} />
<p><b>Final Result:</b></p>
<CodeBlock wrap code={`
┌──────────────────────┬──────────────────┬──────────────────┐
│ Variant              │ Pruned WASM      │ Brotli-11        │
├──────────────────────┼──────────────────┼──────────────────┤
│ Foundation           │ 45,718,166 bytes │ 12,016,398 bytes │
├──────────────────────┼──────────────────┼──────────────────┤
│ FoundationEssentials │ 7,765,629 bytes  │ 2,011,377 bytes  │
├──────────────────────┼──────────────────┼──────────────────┤
│ No import            │ 3,319,821 bytes  │ 896,977 bytes    │
├──────────────────────┼──────────────────┼──────────────────┤
│ CYYJSON / yyjson     │ 3,667,654 bytes  │ 984,086 bytes    │
└──────────────────────┴──────────────────┴──────────────────┘

 The yyjson case is:
 - +347,833 bytes over no import
 - 4,097,975 bytes smaller than FoundationEssentials
 - 42,050,512 bytes smaller than Foundation
`} />
<p>
  Suffice to say, 12MB shipped to the browser just because of Foundation
  is not ideal at all considering most web-apps are a fraction of the
  size. FoundationEssentials cuts down on this, but it still more than
  doubles the size of this simple package. Goodnotes’
  <a href="https://www.swift.org/blog/bringing-goodnotes-to-web-with-swift/#binary-size-and-loading">WASM binary size</a>
  is ~50MB, but it was able to be compressed down to ~12MB, and I am
  very certain they import Foundation.
</p>
<p>
  Often, I find myself using importing Foundation in library code
  because I just need <code>JSONEncoder</code>,
  <code>JSONDecoder</code>, <code>URL</code>, or <code>Date</code>.
  However, as we can see this increases the bundle size by a lot for
  WASM.
</p>
<p>
  <code>URL</code> and <code>Date</code> can be solved by using
  <code>String</code> and <code>Double</code> for most cases
  respectively. However, I would still provide a package trait for
  Foundation specifically such that the library can still ship APIs with
  them.
</p>
<p>
  <code>JSONEncoder</code> and <code>JSONDecoder</code> on the other
  hand are more painful because building a good JSON parser is not
  trivial, and is out of the scope of most projects. However, we can see
  that vendoring a small, portable, and fast C library like
  <a href="https://github.com/ibireme/yyjson">yyjson</a> can solve a lot
  of that issue. The only problem is in order to support Codable types,
  its up to you to make your own equivalents of
  <code>JSONEncoder</code> and <code>JSONDecoder</code> that don’t also
  import Foundation if you want to keep the binary size small. Though,
  it shouldn’t be too hard or tedious to do this with the help of an
  agent, as it is mainly a simple Swift wrapper.
</p>
<p>
  That being said, it would be ideal to see some of these trivial types
  in the standard library instead of Foundation, primarily to avoid
  awkward cases like this.
</p>
<p>— {metadata.date}</p>
