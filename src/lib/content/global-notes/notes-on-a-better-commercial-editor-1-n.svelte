<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Notes on a Better Commercial Editor (1/N)",
    date: "12/23/25",
    anchor: "notes-on-a-better-commercial-editor-1-n-",
  };
</script>

<p>
  First and foremost, we need to define what makes a better editor than
  existing alternatives. One of my controversial takes is that I believe
  that there hasn’t been a good widespread editor for most software
  development for the past few decades, and that agentic coding isn’t
  the answer to this problem. Today’s editors are fantastic at writing
  text faster, but not so great at creating systems.
</p>
<p>
  The true answer to this problem is that each system needs its own
  specific editor, and the system’s designers should be responsible for
  the design of that editor!
</p>
<p>
  However, this is antithetical to the way software is commercialized
  and shipped today for a multitude of cultural reasons.
</p>
<ol>
  <li>
    We as consumers expect black-boxed “products” and “apps”, not
    malleable tools that we can understand the internals of.
  </li>
  <li>
    We’ll make claims that “building our own editor is too costly and
    time consuming”, and that we need to spend that time shipping faster
    today.
  </li>
</ol>
<p>
  However, one trait I’ve seen with some of the best software is that
  often its developers will have built specific tools to assist with its
  development! A good example of this can be seen
  <a href="https://youtu.be/IdpD5QIVOKQ?si=AWT4lRVpDXrT-bR9&amp;t=1164">here</a>.
</p>
<p>
  Some of those inherent benefits will be lost when we think of
  commercialization (we have to show something that is ready made!), but
  I think what I’ll present here in these notes is “YC startup worthy”.
  That is, I only plan on showing merely a connection between the
  system, and subsequent parts that edit it. Also, since we’re focused
  on commercialization, I’ll keep the parts that make up the editor
  familiar.
</p>
<p>
  There are certainly deeper principles that I haven’t had the chance to
  explore yet, but be my guest if you want to apply to the next batch
  with what you see here.
</p>
<p>
  Say we have an app.
  <img src="/images/global-notes/better-commercial-editor-1-1.png" alt="An app showing a CTA button titled 'Let's Get Started!'">
</p>
<p>
  Now let’s right click on the “Let’s Get Started!” button.
  <img src="/images/global-notes/better-commercial-editor-1-2.png" alt="The app with an instance of the Zed text editor opened beside it.">
</p>
<p>
  This opens my code editor of choice (<a href="https://zed.dev/">Zed</a>
  btw) directly to the file and line of where the button was declared.
  In this case, the button is powered by SwiftUI, so I’m taken directly
  to the SwiftUI View containing the button. For the record, both the
  app and Zed need to be in view side-by side.
</p>
<p>
  Now as I edit the text for the button. (<code>"Let's Get Started!" -&gt; "Let's Get
    Climbing!"</code>)
  <img src="/images/global-notes/better-commercial-editor-1-3.png" alt="Editing the text for the button from 'Let's get started!' to 'Let's Get Climbing!'">
</p>
<p>
  The app should then update in real time (think hot reload for
  simplicity).
  <img src="/images/global-notes/better-commercial-editor-1-4.png" alt="The app with the updated button text alongsize Zed.">
</p>
<p>
  Now let’s go ahead and select another screen in the app, by perhaps
  dragging downwards at the bottom of the app. (If such an editor
  materializes, we may stop thinking of things in terms of screens for
  the record!)
  <img src="/images/global-notes/better-commercial-editor-1-5.png" alt="An arrow pointing downwards from the app that links to a section where other app screens can be selected, most notably there's one with a mountain depicted.">
</p>
<p>
  Let’s pick the one with the mountain in view because it catches my
  eye.
  <img src="/images/global-notes/better-commercial-editor-1-6.png" alt="The screen with the mountain depicted alongside another instance of Zed that Stephen was using to edit the system prompt for the 'Climb Readiness' section.">
</p>
<p>
  It looks like we had some previous edits from Stephen here, and now I
  can see them. That’s really cool! Looks like he’s editing the system
  prompt for the “Climb Readiness Section”. I wonder if I could see
  changes in real time, it would be really cool to see a live feed of
  him editing the system prompt, and see how that would impact things!
</p>
<p>
  Wait a minute it looks like he’s doing just that!
  <img src="/images/global-notes/better-commercial-editor-1-7.png" alt="As Stephen edits the system prompt, the prompt is tested against the LLM with some sample generations being present in a section below.">
</p>
<p>
  Perhaps, we can see what a mockup would look like with one of these
  outputs. Let me select one!
  <img src="/images/global-notes/better-commercial-editor-1-8.png" alt="After selecting one of the sample generations, we can see a real time mockup of what that generation would look like in the final product.">
</p>
<p>Nice! Now I know exactly how it looks in the final product!</p>
<p>I can keep going, but I think this covers a basic starting point.</p>
<p>
  One trick question I like to ask other developers is the following.
</p>
<p>
  <em>Say we’re working on a codebase for a commercial aircraft system.
    Now let’s assume that we want to find the code for the left engine,
    how should we organize the system to make finding it easier?</em>
</p>
<p>I’ll often hear answers such as:</p>
<p>
  <em>Let’s put it in a clear module with a clear name somewhere in the
    repo, and let’s make the folder structure easy to parse so that one
    could find the core modules easily.</em>
</p>
<p>My answer is simple.</p>
<p>
  <em>Why can’t we find it on the left engine of an actual plane?</em>
</p>
<p>— {metadata.date}</p>
