<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Plugins",
    date: "4/15/26",
  };
</script>

<p>
  My recent notes have mentioned a “universal medium” for apps to
  communicate with each other. However, some might ask, why not design a
  plugin system for your app? I’ll have to refer to the term “plugin” in
  the sense that it seems to be defined at large, which is “an
  extendable module to a particular application”. Technically, the
  “universal medium” could also be described as a “plugin system”, but
  not in the sense that we typically think of plugins so it’s best to
  stick with the at large definition for this.
</p>
<p>
  For the record, I don’t think the idea of plugins are a bad thing, but
  they are not a solution to the general application silo problem.
  Plugins can be fine under the following conditions:
</p>
<ul>
  <li>
    The API/architecture supporting the plugins is designed for maximal
    customization.
  </li>
  <li>
    The plugin is specifically designed for the application that exposes
    a plugin system.
  </li>
</ul>
<p>
  The main issue is knowledge, particularly that the plugin author has
  to know the application that it’s interacting with. The real idea in
  breaking the application silo is to make it possible for multiple apps
  to communicate
  <em>without knowing about each other or their intimate details</em>.
  This is fundamentally impossible with plugins in the way they are
  adopted at large.
</p>
<p>
  This knowledge problem is also an issue with how we interact with
  web-services as well. For instance, you may have your app call
  OpenRouter, but what if another service comes along that’s better
  somehow? In today’s world, you would have to manually (or get your
  agent to), deploy an update to switch to the new service. This is
  because somewhere in your app there’s a hardcoded URL string that
  points to OpenRouter directly, so if you want to get around that you
  need a service discovery mechanism. Thankfully, correlation and
  pattern matching are what AI tends to be good at.
</p>
<p>
  Now, at some point you will have to know at least one of the thing’s
  you’re interacting with. That is, you will have to have a hardcoded
  interaction with <em>something</em> (URL, file, database, etc.) to get
  the process of discovery started. However, that
  <em>something</em> ideally is a mechanism for finding “all the things”
  you need, and therefore you limit the number of hardcoded interactions
  in exchange for dynamic ones.
</p>
<p>— {metadata.date}</p>
