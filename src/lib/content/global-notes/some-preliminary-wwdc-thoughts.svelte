<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Some (Preliminary) WWDC Thoughts",
    date: "6/12/26",
  };
</script>

<p>
  Since it’s that time of the year again, and after spending a good
  amount of the week in Cupertino, I suppose I can write some things.
  I’ll mainly focus on the actual dev stuff like new frameworks, APIs,
  Swift language updates, etc. since I’m sure you can find better
  reviews about the new OS versions from other sources. Though, I’m
  still going through many of the video sessions, which is a task that
  I’ll expect will take the entire weekend, and some time after to
  actually use the new tools in various projects.
</p>
<p>
  I can actually recommend FoundationModels as a usable framework now,
  primarily because it’s possible to integrate other engines with it. I
  also like the general API shape they took (it seems similar to
  <a href="https://github.com/mhayes853/swift-cactus/pull/38">this</a>
  agent framework that I had in mind at one point, but adandoned because
  it wasn’t worth scoping such a general framework to a single inference
  engine). Furthermore, one issue in Swift was the lack of a standard
  generic framework for writing agentic workflows, which caused me to
  write an entire agentic API from scratch for Swift Cactus that was
  similar, but not the same as the FoundationModels API. Given that
  Apple is opening up the core of FoundationModels and getting Anthropic
  + Google to contribute official adapter packages, I think it’s safe to
  say that we have that standard now. All of this means that engines can
  focus on being good engines now without having to worry much about
  creating a good Swift API, which isn’t the kind of work that most who
  work on such engines are suited for.
</p>
<p>
  CoreAI seems like a cool CoreML successor. However, it faces the
  typical Apple platforms problem of being scoped to only the latest OS
  version, which means that it will be at least 2 more years until it
  can be used reliably at a widespread scale. In the meantime, there are
  <a href="https://github.com/ml-explore/mlx-swift-lm">quite</a>
  <a href="https://github.com/pytorch/executorch">a</a>
  <a href="https://developer.apple.com/documentation/coreml">few</a>
  <a href="https://github.com/cactus-compute/cactus">more</a>
  <a href="https://github.com/ggml-org/llama.cpp">options</a>
  of which most also work (or will soon) with any torch model.
</p>
<p>
  SwiftUI seems to have stabilized quite a bit given the relatively
  simple additions this year. Notably, I would say it’s nice to see more
  robust document support (so one doesn’t have to fallback to using
  <code>UIDocument</code> or <code>NSDocument</code> as much). Though,
  very advanced text capabilities outside of cool animations are still
  seem to require dropping down to UIKit/AppKit/TextKit. Nevertheless, I
  think agents have largely made writing traditional UI code quite
  straightforward no matter the framework, so dropping down to
  UIKit/AppKit is easier than ever if SwiftUI is missing something you
  need.
</p>
<p>
  Swift Data also finally allows observations outside of SwiftUI views,
  but once again this faces the OS requirement problem. Even then, I’ve
  never been biggest fan of Swift Data due it feeling like a black box.
  <a href="https://github.com/pointfreeco/sqlite-data">SQLiteData</a>
  supports the full capabilities of SQLite, is open source, uses Swift
  value types, supports Observation, works outside the Apple ecosystem,
  and even has automatic CloudKit sync if you desire it (Though
  personally, I’ve found that application-specific sync engines make
  more sense for large complex things). That being said, value types and
  the Observation can be a rabbit hole, especially when it comes to
  observing individual properties on larger value types (I even once
  made
  <a href="https://github.com/mhayes853/WhyPeopleKit/blob/main/Sources/WPPerception/ObservedValue.swift">this helper class</a>
  to make such observation easier).
</p>
<p>
  <code>withContinuousObservation</code> is also a nice addition to the
  Observation framework, but has the OS requirement problem.
  <code>observe</code> from
  <a href="https://github.com/pointfreeco/swift-navigation/blob/main/Sources/SwiftNavigation/Observe.swift">Swift Navigation</a>
  provides most of the same functionallity, but will work properly on
  any Observation supported OS version. It’s also quite self-contained
  so you can drag and drop into your project if you don’t want the
  dependency.
</p>
<p>
  I personally try to avoid Xcode in favor of using Zed and the Codex
  desktop app, and also tend to write most of my code (even for apps) in
  Swift packages. Therefore, I cannot comment much on its updates.
  Primarily this is because of performance, but also the fact that I
  work with other languages, so it’s nice to have a single editor for
  all of my code. That being said, there are more alternatives to Xcode
  than ever before, so you can always use something different if it
  doesn’t live up to standards.
</p>
<p>
  As for video sessions, many felt more like guidance/how you should do
  things kind of sessions over “here’s some example code” like in
  previous years. This makes sense given how agents are handling most of
  the code writing now, which means more emphasis is placed on
  higher-level patterns. (That being said, the need for great
  engineering is needed more than ever now, and that generally doesn’t
  come from looking at a few code examples.)
</p>
<p>
  Overall, I would rate this year higher than last year where much of
  the focus was on some glass (see
  <a href="https://whypeople.xyz/liquid-glass">this</a>). Though I
  suppose it’s annoying that my Apple Watch Series 7 will not be getting
  watchOS 27, time to upgrade…
</p>
<p>— {metadata.date}</p>
