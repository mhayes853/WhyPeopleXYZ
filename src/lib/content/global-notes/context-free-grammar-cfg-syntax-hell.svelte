<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Context-Free Grammar (CFG) Syntax Hell",
    date: "3/15/26",
  };
</script>

<p>
  CFGs are something I’ve been working with as of late, and I wanted to
  take moment to describe my suffering with all the various syntaxes and
  weird parsing behaviors.
</p>
<p>
  First, for anyone getting into the topic of EBNF, just know that while
  there are some formal syntax definitions, the ecosystem of parsers is
  largely just imeplemented in a “freeform do whatever feels right” kind
  of sense. To this end, I’ve seen some parsers use ordered choice
  instead of unordered choice for alternation, PEG-style syntax, random
  regex/epsilon/character-class extensions. That is, there is literally
  no definition for what a valid EBNF syntax is, and the only thing I
  can say is that it depends on the parser you’re using.
</p>
<p>
  In one sense, my idea of relativeness makes sense here. A parser
  should pick a format most optimized for its needs. On the other hand,
  we also have to ask if we need all of these syntax variants floating
  around? CFGs are a stable formalism that are a product of computer
  science research, so in this case I think it’s worth having a unified
  standard.
</p>
<p>Some notes:</p>
<ul>
  <li>LLMs generally use GBNF to constrain outputs.</li>
  <li>The W3C standard seems to be pretty common.</li>
  <li>
    Almost no one uses Wirth syntax except for the Wikipedia article on
    it.
  </li>
  <li>ISO EBNF is also a pretty popular standard.</li>
  <li>Almost all parsers extend pure BNF in various ways.</li>
</ul>
<p>
  I’m currently working on a Swift library to make grammar definitions
  easier and flexible. You’ll be able to define CFGs in a simple and
  standard formal syntax using strong types, proper formalisms of CFGs,
  result builders, and potentially macros.
</p>
<CodeBlock language="swift" code={`

// Small Sneak Peak (not finalized)

let grammar = Grammar(startingSymbol: .root) {
  Rule(.root) {
    Choice {
      Ref("second")
      Ref("first")
    }
  }

  Rule("first") {
    "a"
  }

  Rule("second") {
    CharacterGroup("A-Z0-9")
  }
}

let language = Language {
  Union {
    Reverse {
      grammar
    }
    KleeneStar {
      otherGrammar
    }
    ConcatenateLanguages {
      l1
      l2
    }
  }
}
`} />
<p>
  Then you will be able to generate the syntax for whatever grammar spec
  you need, including upcoming CFG support in Cactus (which will be
  backed by XGrammar and GBNF). Note that since there are so many syntax
  variations, and tools that make up new syntax, I cannot realistically
  support everything. That being said, you can definitely expect a wide
  range of supported formats.
</p>
<CodeBlock language="swift" code={`

// More Sneak Peak (not finalized)

let formatted = try grammar.formatted(style: .w3cEbnf)
"""
root ::= second | first
first ::= "a"
second ::= [A-Z0-9]
"""

let formattedLanguage = try language.grammar().formatted(style: .wirthEbnf)
// GBNF is also supported at the time of writing this...
// ISO EBNF is also planned...
// So is a generic BNF format with many syntax options...
`} />
<p>
  Additionally, the <code>formatted</code> function has to be throwing
  due to the disparity of expression support between different formats.
  The library tries to convert expressions for each built-in formatter
  if possible, but admittedly some expressions (eg. negated character
  groups in Wirth) cannot be converted. As a result, a formatter is
  allowed to throw if it encounters an unsupported expression.
</p>
<p>
  Parsing is also something I would like to add in the future. However,
  it’s not a priority for release at the moment.
</p>
<p>
  <strong>Update: </strong>
  <a href="https://www.grammarware.net/text/2012/bnf-was-here.pdf">https://www.grammarware.net/text/2012/bnf-was-here.pdf</a>
</p>
<p>— {metadata.date}</p>
