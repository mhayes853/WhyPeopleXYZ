<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Clean Code is Good UI Design (4/N)",
    date: "4/20/26",
    anchor: "clean-code-is-good-ui-design-4-n-",
  };
</script>

<p>
  If you know ARM NEON, you would know immediately what the following
  code does.
</p>
<CodeBlock language="c" code={`

void f(__fp16* out, const __fp16* values, size_t values_size) {
    for (size_t i = 0; i < values_size; i += 8) {
        vst1q_f16(out + i, vaddq_f16(vld1q_f16(values + i), vld1q_f16(out + i)));
    }
}
`} />
<p>
  However, I assume most of you reading this don’t, so here’s what it
  actually does.
</p>
<CodeBlock language="c" code={`

void sum_all(float* out, const float* values, size_t values_size) {
    for (size_t i = 0; i < values_size; i++) {
        out[i] += values[i];
    }
}
`} />
<p>
  This really shows that the lack of understanding came from the fact
  that the “UI” for the NEON version looks quite cryptic for such a
  simple operation. That is, one doesn’t know what
  <code>vst1q_f16</code> means unless they’ve read the ARM NEON ISA.
</p>
<p>
  Furthermore, if you want to make the NEON version handle sums properly
  when <code>values_size</code> is not a multiple of 8, you would need
  to add the scalar section at the end to handle the remaining values. I
  didn’t include that bit in the first NEON example because it would’ve
  given the answer away.
</p>
<CodeBlock language="c" code={`

void sum_all_neon(__fp16* out, const __fp16* values, size_t values_size) {
    size_t i = 0;
    for (; i + 8 <= values_size; i += 8) {
        vst1q_f16(out + i, vaddq_f16(vld1q_f16(values + i), vld1q_f16(out + i)));
    }

    for (; i < values_size; i++) {
        out[i] += values[i];
    }
}
`} />
<p>
  Another thing worth noting is that you would generally not write NEON
  code like that as an isolated function, but rather as a part of a
  fused mathematical operation in practice.
</p>
<CodeBlock language="c" code={`

void fused_op(__fp16* out, const __fp16* values, size_t values_size) {
    size_t i = 0;
    for (; i + 8 <= values_size; i += 8) {
        float16x8 vals = vld1q_f16(values + i);
        float16x8 out_vals = vld1q_f16(out + i);
        // Other math ops that use vals and out_vals...

        vst1q_f16(out + i, vaddq_f16(vals, out_vals));

        // Other math ops that use vals and out_vals...
    }

    for (; i < values_size; i++) {
        // Handle remaining values via scalar loop...
    }
}
`} />
<p>
  There are a whole host of reasons for why that is, but the issue is
  that such reasons are completely invisible to you whether or not you
  write code by hand or through an agent. Agents, from my experience,
  unfortunately tend to fall for the human tendencies of microbenchmark
  optimization (at the expense of E2E performance) when it comes to
  these kinds of things, so it isn’t of much help on its own. So even
  the agent can have blindspots despite having far more trained
  knowledge than you ever will.
</p>
<p>
  In nearly all tools that deal with code today (Text Editors, IDEs,
  Agent CLIs, Github, etc.), context about the production environment is
  essentially invisible from within the tool itself. That is, all code
  is displayed with the same visual hierarchy, regardless of how
  critical or uncritical it is. This means that the context has to live
  somewhere else, which is often one’s head or in model context/weights.
  I wonder how well that’s worked so far.
</p>
<p>— {metadata.date}</p>
