<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Native vs React Native in 2026",
    date: "1/14/26",
  };
</script>

<p>Ah yes, the classic debate.</p>
<p>
  For context, I’ve worked professionally in both Swift on the iOS and
  watchOS side (alongside many open source libraries that I maintain),
  and React Native with Expo.
</p>
<p>
  In the past, my opinions on the matter were quite nuanced, but were
  something like this.
</p>
<ul>
  <li>
    Native code generally has less dependencies, and platform feature
    are available as soon as Apple releases them.
  </li>
  <li>
    It’s easier to do platform UI and extensions (eg. Widgets) in
    native.
  </li>
  <li>
    Persistence and storage are definitely better in Native.
    <ul>
      <li>
        <code>expo-sqlite</code> is quite limited compared to GRDB and
        SQLiteData.
      </li>
      <li>
        React Native libraries tend to be geared towards simple use
        cases.
      </li>
    </ul>
  </li>
  <li>
    Native code is easier to get right and make performant given that
    it’s generally compiled to machine code and not interpreted.
    <ul>
      <li>
        Both Native and React Native can build great apps, but generally
        the best apps I’ve used tend to be native.
      </li>
    </ul>
  </li>
  <li>React Native has the advantage of speed of shipping.</li>
  <li>
    React Native is great for unified UI across both iOS and Android.
    <ul>
      <li>Skia is also quite fine for graphics.</li>
    </ul>
  </li>
  <li>
    API back deployment is easier in React Native.
    <ul>
      <li>
        It’s quite easy to build a React Native app that supports many
        previous OS versions, whereas it’s annoying to support more than
        the past 3 in native Swift apps.
      </li>
    </ul>
  </li>
</ul>
<p>
  Generally speaking, the more platform integrated your app, the more
  likely you want native. If you value more of a custom and brand
  universal UI across multiple platforms, then React Native isn’t a bad
  choice. In many cases, you can combine both.
</p>
<p>
  However, I’m not sure this is the right stance to take for the coming
  future. Agentic coding has made the cost of writing code cheap, and
  the cost of understanding and building quality systems has only
  increased. If code can be written faster, and existing systems can be
  built faster, then the only way to stand out from the competition is
  to build ever increasingly robust systems. We need to understand what
  we’re building now more than ever.
</p>
<p>
  React Native, Flutter, KMP were all created on the premise that you
  wouldn’t have to write 2 codebases twice for the same app. This
  benefit is negated if writing code is no longer the bottleneck it once
  was. Instead, that time can be spent deeply understanding the
  technical aspects of iOS and Android respectively, as well as doing a
  host other design tasks.
</p>
<p>
  In other words, I’m starting to see diminishing value in React Native.
  Perhaps if you’re a one person team, and you’re already familiar with
  React + TypeScript, it may be the best option.
</p>
<p>
  Though I would strongly consider whether or not you could spend time
  learning the native technology in depth, especially if agents can
  handle a lot of the code for you.
</p>
<p>
  Though I recommend avoiding Xcode as much as possible. I only use it
  as a debugger and for SwiftUI previews, otherwise
  <a href="https://zed.dev/">Zed</a>.
</p>
<p>— {metadata.date}</p>
