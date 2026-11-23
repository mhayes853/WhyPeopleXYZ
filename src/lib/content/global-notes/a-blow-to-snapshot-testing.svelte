<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "A Blow to Snapshot Testing",
    date: "1/6/26",
  };
</script>

<p>
  Tests that have large outputs to verify (eg. Macro Expansions, Codegen
  Tools,) are tedious to write. In such cases, my go to strategy was to
  always use
  <a href="https://github.com/pointfreeco/swift-snapshot-testing">Snapshot Testing</a>, which would instead capture the output into a file (or even
  inline). Then, subsequent test runs would diff against the snapshot
  output, which would alert you to changes. Of course, you would have to
  scan the initial snapshot manually to ensure it looked correct the
  first time.
</p>
<p>
  Ideally, you would break up the code into smaller pieces that work on
  smaller outputs, and can therefore be tested in isolation. Though at
  some point, it is worth it to have that larger test case that ensures
  the whole thing is tied together properly.
</p>
<p>
  However, with the advent of agentic coding and LLMs, I’ve found less
  of a need to rely on snapshot testing other than for
  non-deterministic/hard to determine ahead of time output (eg. See
  <code>CactusLanguageModelTests</code> in
  <a href="https://github.com/mhayes853/swift-cactus/blob/main/Tests/CactusTests/LanguageModelTests/CactusLanguageModelTests.swift#L363">Swift Cactus</a>).
</p>
<p>
  Here’s a recent test that I would’ve normally written with Snapshot
  Testing.
</p>
<CodeBlock language="swift" code={`

@Test
@available(macOS 15.0, iOS 18.0, tvOS 18.0, watchOS 11.0, visionOS 2.0, *)
func \`Streams JSON Large Negative Int128 Digits\`() throws {
  let json = "-170141183460469231731687303715884105727"
  let expected: [Int128] = [
    0,
    -1,
    -17,
    -170,
    -1_701,
    -17_014,
    -170_141,
    -1_701_411,
    -17_014_118,
    -170_141_183,
    -1_701_411_834,
    -17_014_118_346,
    -170_141_183_460,
    -1_701_411_834_604,
    -17_014_118_346_046,
    -170_141_183_460_469,
    -1_701_411_834_604_692,
    -17_014_118_346_046_923,
    -170_141_183_460_469_231,
    -1_701_411_834_604_692_317,
    -17_014_118_346_046_923_173,
    -170_141_183_460_469_231_731,
    -1_701_411_834_604_692_317_316,
    -17_014_118_346_046_923_173_168,
    -170_141_183_460_469_231_731_687,
    -1_701_411_834_604_692_317_316_873,
    -17_014_118_346_046_923_173_168_730,
    -170_141_183_460_469_231_731_687_303,
    -1_701_411_834_604_692_317_316_873_037,
    -17_014_118_346_046_923_173_168_730_371,
    -170_141_183_460_469_231_731_687_303_715,
    -1_701_411_834_604_692_317_316_873_037_158,
    -17_014_118_346_046_923_173_168_730_371_588,
    -170_141_183_460_469_231_731_687_303_715_884,
    -1_701_411_834_604_692_317_316_873_037_158_841,
    -17_014_118_346_046_923_173_168_730_371_588_410,
    -170_141_183_460_469_231_731_687_303_715_884_105,
    -1_701_411_834_604_692_317_316_873_037_158_841_057,
    -17_014_118_346_046_923_173_168_730_371_588_410_572,
    -170_141_183_460_469_231_731_687_303_715_884_105_727
  ]
  try expectJSONStreamedValues(json, initialValue: Int128(0), expected: expected)
}
`} />
<p>Thankfully I didn’t have to write that by hand!</p>
<p>— {metadata.date}</p>
