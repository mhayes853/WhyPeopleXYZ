<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Open Weight Models",
    date: "6/18/26",
  };
</script>

<p>
  I’m finding open weight models to be more capable in recent times.
  What’s also cool about them is that the labs behind them actually
  <a href="https://arxiv.org/pdf/2606.13392">publish</a> architectural
  details of their research. I still primarily work with GPT 5.5, which
  does significantly outperform the open weights on most tasks, but on
  side projects I’ve found that Minimax M3 can handle many of the same
  tasks as GPT 5.5. That being said, I generally think this mostly
  applies because most necessary code changes are smaller and more
  iterative. For longer running work or harder tasks, I would still pick
  GPT 5.5.
</p>
<p>
  However, the main cause for using coding agents in the first place was
  the big inflection point in December/January. Once a model gets to
  that point in terms of performance, it becomes viable so to speak, and
  improvements afterwards are mostly incremental in the sense that you
  can do larger amounts of work with them with less intervention. That
  is, you can still get lots of work done with older models like GPT
  5.2, GPT 5.3 Codex, and Opus 4.5/4.6 if you want to, but they will
  require more steering. The bigger increases in productivity since that
  time seem to be more tool/harness-based as we understand use cases
  better, and offer more ways for agents to close the loop for a given
  task.
</p>
<p>
  As for Minimax M3 specifically, it does tend to get “stuck” more
  often. I had to fight with it for an hour for it to realize that it
  should be writing the string “tool_call” rather than “tool çcall”,
  which was one of the only few agent conversations where I prompted the
  agent in all caps to indicate frustration (I literally told it to use
  the proper string over and over again, and it just could not put 2 and
  2 together…). Eventually, I had to handwrite code like a caveman to
  solve the issue. All jokes aside, I still do handwrite and enjoy
  handwriting code, especially so for library/framework code that
  requires stability (though we’ll see if the future dictates whether or
  not this will remain an option). Though overall, I find that the model
  does fine with appropriate steering, just like any other model, and
  that many of my issues probably arise from the fact that I’m primarily
  a GPT 5.5 user.
</p>
<p>
  On a side-note, I hear many people like to swear to their agents, and
  genuinely use very “controlling” (to put it nicely) language to them.
  In my case, if it weren’t for the fact that such conversations
  contained work details, I wouldn’t mind sharing them with others. I
  hope this dynamic doesn’t worsen our overall social development given
  that most working conditions are already bad enough as is lol. (It
  absolutely is having some psychological effects that aren’t good, but
  those are topics for another time.)
</p>
<p><b>Update (6/21/26):</b> I have since been enjoying GLM 5.2.</p>
<p>— {metadata.date}</p>
