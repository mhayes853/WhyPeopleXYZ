<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Thoughts on TUIs",
    date: "12/17/25",
  };
</script>

<p>
  It seems that we’re seeing more and more TUIs as of late, and
  personally I’ve been experimenting with agentic coding using the Codex
  CLI which uses a TUI. Claude Code and Open Code are also using such a
  TUI for their UI, and I’ve even seen a
  <a href="https://github.com/whyisdifficult/jiratui">Jira TUI</a>
  floating around.
</p>
<p>
  My unapologetic opinion still remains that the terminal is perhaps one
  of the worst UI designs that has continually stuck around, despite its
  efficiencies comapred to GUIs. The main reason for such efficiencies
  over the GUI is because GUI applications are designed to be completely
  siloed and isolated from each other! On the other hand, modern shells
  generally abide by the UNIX philosophy of composable and small
  programs.
</p>
<p>
  This is a powerful idea! Smalltalk systems did it as well for GUIs in
  the 70s! (<a href="https://youtu.be/AnrlSqtpOkw?si=vPdCNiqOu8WR2G98&amp;t=595">This</a>
  is one of the coolest demos on how this could be done.)
</p>
<p>
  Unfortunately, companies behind the major <em>consumer</em> (sorry
  linux) desktop operating systems (Apple, Microsoft) missed the
  composition idea, and we’re still stuck with the result today. Of
  course, we’re also still stuck with the UNIX terminals of the past
  today, which is why often they are more efficient to use than modern
  GUI applications.
</p>
<p>
  However, that reasoning doesn’t explain my dislike for the terminal’s
  UI design. The simple answer to that is a lack of visibility and
  feedback. For instance, as you type
  <code>rm -drf /some-important-directory</code> nothing warns you that
  you are about to nuke critical data <em>as you’re typing</em>. You
  only find out what happens after you run the command (hopefully you
  have proper permissions in place)! This lack of feedback has no doubt
  led to many instances of dropping tables in production databases, or
  similarly destructive acts in production environments!
</p>
<p>
  Of course, this is not even mentioning the fact that it takes rote
  memorization to even know what commands you have at your disposal in
  the first place. The terminal doesn’t offer any sort of environment to
  learn them either. Therefore, you usually you’ll end up finding them
  online or in videos like
  <a href="https://www.youtube.com/watch?v=XhLMS47l8Bw">this</a>.
</p>
<p>
  As I type a prompt into the Codex TUI, I get absolutely zero feedback
  on what effect that prompt will have until I actually submit it to the
  agent. Given that as serious programmers (not vibe coders), we often
  need to explicitly guide the agent by telling it how to implement
  things, this lack of feedback can get quite intolerable as
  implementation details must be kept in one’s head.
</p>
<p>
  For the record, most chatbot UIs are generally not much better than
  the terminal either. ChatGPT is essentially the same thing, because
  you’re entering a prompt into a tiny text box that offers no feedback
  until you submit the prompt. ChatGPT is designed to do almost exactly
  as you say with little to no room for pushback (outside of loosely
  defined guardrails), which if used incorrectly can further cognitive
  biases (eg. Look at the agreeableness phenomenon). It’s basically a
  glorified terminal for AI inference!
</p>
<p>
  People seem to like TUIs because they often don’t suffer the same
  complexities or performance issues found in traditional GUIs. I say we
  should just make GUIs that aren’t just glorified command centers. The
  GUI was meant to be an explorable medium for learning and not a
  command center for poor thought. Regardless, I think this TUI trend
  highlights an important aspect of GUIs that we at large haven’t been
  taking advantage of, or much less even thought of in the first place.
</p>
<p>— {metadata.date}</p>
