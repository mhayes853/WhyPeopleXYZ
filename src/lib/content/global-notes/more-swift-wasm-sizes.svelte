<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "More Swift WASM Sizes",
    date: "7/27/26",
  };
</script>

<p>
  My last note on this was on a simple test binary. This one comes an
  actual framework I’m currently working on and plan to release very
  soon.
</p>
<p>
  Note that the “Foundation” build comes from enabling a package trait
  that adds <code>import Foundation</code> in various places to support
  various Foundation APIs.
</p>
<CodeBlock wrap code={`
Built release WASM with Swift 6.3.2 WASI SDK. Results:
 ┌────────────┬────────────┬────────────┬────────────┐
 │ Build      │ Raw WASM   │ gzip -9    │ Brotli -11 │
 ├────────────┼────────────┼────────────┼────────────┤
 │ Foundation │ 60.74 MiB  │ 20.18 MiB  │ 13.28 MiB  │
 ├────────────┼────────────┼────────────┼────────────┤
 │ No traits  │ 13.01 MiB  │ 3.60 MiB   │ 2.59 MiB   │
 ├────────────┼────────────┼────────────┼────────────┤
 │ Difference │ +47.72 MiB │ +16.58 MiB │ +10.69 MiB │
 └────────────┴────────────┴────────────┴────────────┘

 Foundation is 4.67× the raw size, 5.61× gzip-compressed, and 5.12×
 Brotli-compressed.

 Artifacts are in /tmp/swift-edge-tools-wasm-trait-size-experiment/results/. No
 repository files were changed.
`} />
<p>
  After running this experiement, I found that all Foundation imports
  could be replaced by <code>import FoundationEssentials</code> on WASM.
  This massively reduced the size with the Foundation trait enabled. The
  increase in size is still 1 MB, which is significant for something
  that runs in a browser, so the trait will have to stay.
</p>
<CodeBlock code={`
┌───────────────────────────────────┬───────────┬───────────┬────────────┐
 │ Build                             │ Raw WASM  │ gzip -9   │ Brotli -11 │
 ├───────────────────────────────────┼───────────┼───────────┼────────────┤
 │ Foundation / FoundationEssentials │ 19.48 MiB │ 5.17 MiB  │ 3.61 MiB   │
 ├───────────────────────────────────┼───────────┼───────────┼────────────┤
 │ No traits                         │ 13.01 MiB │ 3.60 MiB  │ 2.59 MiB   │
 ├───────────────────────────────────┼───────────┼───────────┼────────────┤
 │ Difference                        │ +6.46 MiB │ +1.57 MiB │ +1.02 MiB  │
 └───────────────────────────────────┴───────────┴───────────┴────────────┘

 The FoundationEssentials configuration is 49.7% larger raw, 43.7% larger gzip-compressed, and 39.3% larger Brotli-compressed.

 Packages and artifacts:

 /tmp/swift-edge-tools-wasm-trait-size-experiment-essentials/
 /tmp/swift-edge-tools-wasm-trait-size-experiment-essentials/results/
`} />
<p>
  The framework uses yyjson to handle all JSON decoding, since
  <code>JSONDecoder</code> is tied to Foundation. It also depends on
  swift-collections for <code>OrderedDictionary</code>, though that
  doesn’t seem to add much to the binary size. This proposal seems like
  it could bring JSON support to the standard library at some point,
  which would allow the yyjson dependency to be eliminated (but
  unfortunately it would likely only be tied to the latest Apple
  platform versions…).
</p>
<p>
  2.6 MB is still quite large, but I think this is more of a Swift WASM
  problem in general more-so than the framework itself. I will try my
  best to get embedded WASM supported, which should reduce the binary
  size massively (though some APIs won’t work of course).
</p>
<p><b>Update (7/29/26)</b></p>
<CodeBlock code={`
┌──────────────────────┬───────────────────┬──────────────────┬──────────────────┐
 │ Config               │ raw .wasm         │ wasm-opt -Oz     │ + brotli -q11    │
 ├──────────────────────┼───────────────────┼──────────────────┼──────────────────┤
 │ baseline (no traits) │ 13.59 MB          │ 4.90 MB          │ 1.32 MB          │
 ├──────────────────────┼───────────────────┼──────────────────┼──────────────────┤
 │ JS only              │ 15.04 MB (+10.7%) │ 5.08 MB (+3.7%)  │ 1.37 MB (+3.9%)  │
 ├──────────────────────┼───────────────────┼──────────────────┼──────────────────┤
 │ ONNXCore only        │ 41.33 MB (+204%)  │ 6.45 MB (+31.8%) │ 1.69 MB (+28.1%) │
 ├──────────────────────┼───────────────────┼──────────────────┼──────────────────┤
 │ ONNXCore + JS        │ 42.90 MB (+216%)  │ 6.66 MB (+35.9%) │ 1.74 MB (+32.1%) │
 └──────────────────────┴───────────────────┴──────────────────┴──────────────────┘
`} />
<p>— {metadata.date}</p>
