<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import ReadingTime from "#lib/components/ReadingTime.svelte";
  import type { PageMetadata } from "#lib/content/pages.ts";

  export const metadata: PageMetadata = {
    title: "A Realization on Low and High Level Languages",
    description: "Low and high level languages are tied to systems, not computer architecture.",
    nav: ["home", "about", "now"],
  };
</script>

<article>
  <h1 id="a-realization-on-low-and-high-level-languages">
    A Realization on Low and High Level Languages
  </h1>
  <ReadingTime />

  <p>
    If you write code, you’re probably familiar with the concept of high
    and low level languages. In technical terms, low level means closer to
    the machine, like assembly languages or machine code. Higher level in
    technical terms means further from the machine like C, JavaScript,
    Swift, and so on.
  </p>
  <p>
    However, this shouldn’t be the case. Speaking of high and low levels
    in the context of how close a language is to computer architecture is
    quite a narrow view point on the world.
  </p>
  <p>
    Rather, in the context of “real systems”, this distinction should be
    reversed. In other words, C, JavaScript, and Swift are lower-level
    languages. Meanwhile, assembly and machine code are higher-level
    languages.
  </p>
  <p>
    For instance, if we’re writing a pseudo random number generator, which
    language do you think gives you a better <em>understanding</em> about
    <em>the process</em> of how random numbers are generated?
  </p>
  <p><strong>x86-64 Assembly</strong></p>
  <CodeBlock language="x86asm" code={`

rotl:
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi
        mov     DWORD PTR [rbp-12], esi
        mov     eax, DWORD PTR [rbp-12]
        mov     rdx, QWORD PTR [rbp-8]
        mov     ecx, eax
        rol     rdx, cl
        mov     rax, rdx
        pop     rbp
        ret

xoshiro_256_next:
        push    rbp
        mov     rbp, rsp
        push    rbx
        sub     rsp, 24
        mov     QWORD PTR [rbp-32], rdi
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 8
        mov     rdx, QWORD PTR [rax]
        mov     rax, rdx
        sal     rax, 2
        add     rax, rdx
        mov     esi, 7
        mov     rdi, rax
        call    rotl
        mov     rdx, rax
        mov     rax, rdx
        sal     rax, 3
        add     rax, rdx
        mov     QWORD PTR [rbp-16], rax
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 8
        mov     rax, QWORD PTR [rax]
        sal     rax, 17
        mov     QWORD PTR [rbp-24], rax
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 16
        mov     rcx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        mov     rdx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 16
        xor     rdx, rcx
        mov     QWORD PTR [rax], rdx
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 24
        mov     rcx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 8
        mov     rdx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 24
        xor     rdx, rcx
        mov     QWORD PTR [rax], rdx
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 8
        mov     rcx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 16
        mov     rdx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 8
        xor     rdx, rcx
        mov     QWORD PTR [rax], rdx
        mov     rax, QWORD PTR [rbp-32]
        mov     rdx, QWORD PTR [rax]
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 24
        mov     rax, QWORD PTR [rax]
        xor     rdx, rax
        mov     rax, QWORD PTR [rbp-32]
        mov     QWORD PTR [rax], rdx
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 16
        mov     rax, QWORD PTR [rax]
        mov     rdx, QWORD PTR [rbp-32]
        add     rdx, 16
        xor     rax, QWORD PTR [rbp-24]
        mov     QWORD PTR [rdx], rax
        mov     rax, QWORD PTR [rbp-32]
        add     rax, 24
        mov     rax, QWORD PTR [rax]
        mov     rdx, QWORD PTR [rbp-32]
        lea     rbx, [rdx+24]
        mov     esi, 45
        mov     rdi, rax
        call    rotl
        mov     QWORD PTR [rbx], rax
        mov     rax, QWORD PTR [rbp-16]
        mov     rbx, QWORD PTR [rbp-8]
        leave
        ret
`} />
  <p><strong>C</strong></p>
  <CodeBlock language="c" code={`

#include <stdint.h>

static inline uint64_t rotl(const uint64_t x, int k) {
  return (x << k) | (x >> (64 - k));
}

uint64_t xoshiro_256_next(uint64_t s[4]) {
  const uint64_t result = rotl(s[1] * 5, 7) * 9;
  const uint64_t t = s[1] << 17;

  s[2] ^= s[0];
  s[3] ^= s[1];
  s[1] ^= s[2];
  s[0] ^= s[3];
  s[2] ^= t;
  s[3] = rotl(s[3], 45);
  return result;
}
`} />
  <p>
    I would imagine that you find that the C code describes the process of
    generating a random number more clearly. In other words, the C code
    describes reality more than x86 assembly.
  </p>
  <p>Take a line from the assembly example.</p>
  <CodeBlock language="x86asm" code={`
mov     rax, rdx
`} />
  <p>
    <code>mov</code> is a move instruction, and <code>rax</code> and
    <code>rdx</code> are registers. As a whole, a move instruction can be
    applied in an infinite number of programs, and <code>rax</code> and
    <code>rdx</code> will also be a part of those infinite numbers of
    programs. In other words, a move instruction is
    <em>very high level</em> because it doesn’t describe the domain
    specific processes of any particular program. It is therefore detached
    from reality.
  </p>
  <p>
    Notice how the concept of registers and instructions are only directly
    relevant in the context of the assembly example. We don’t need to talk
    about these things in C, because they are ultimately
    <em>irrelevant</em> (only in the sense of understanding, not
    execution) to the <em>larger process</em> of generating a random
    number. The C code is closer to reality because it describes such
    reality more accurately from an <em>understandings</em> stand point.
  </p>
  <p>
    In assembly, because we’re so focused on primitive details like
    registers and instructions, we easily miss the larger picture. We
    therefore miss <em>reality</em>.
  </p>
  <p>
    To conclude here, if we want to build great systems, we need to
    optimize for understanding and reasoning about our systems. Computer
    architecture is an implementation detail that is largely detached from
    reality as it says nothing about our systems on its own. Sticking
    closer to computer architecture may produce faster and more performant
    programs, but it is often detached from the deeper truth of what we
    directly create.
  </p>
  <p>
    All in all, lower level means providing both full and real awareness
    of the true reality of our systems, and higher level detaches itself
    from that in order to focus more on abstractions. In this sense,
    Assembly is higher level than C.
  </p>
  <p>
    To end, in this exploration I stayed close to existing languages that
    are used in the mainstream. I suppose one could therefore ask about a
    language so low level that it describes and enhances reality
    perfectly, and how that would look and operate. That is, something
    that indeed may <a href="https://dynamicland.org/">exist</a> in a
    primitive form.
  </p>
  <p>— 6/29/25</p>
</article>
