<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Github Outage + Dependence",
    date: "11/18/25 (12:52 PM)",
  };
</script>

<p>
  Trying to push code to a Swift
  <a href="https://github.com/mhayes853/sqlite-vec-data">library</a> I’m
  working on, but it seems github is facing issues according to their
  status page. It looks like I “don’t have access” to pulling or pushing
  changes to remote which sucks…
</p>
<p>
  Thankfully, this is not a mission critical project, and I don’t have
  to urgently deploy a fix to some issue anywhere else. However, it
  makes one think about how Github itself is a single point of failure
  for most serious software businesses.
</p>
<p>
  I consider Github to be a safety critical system in the same vein as
  software that controls vehicles or medical devices. A crash can
  prevent an organization’s ability to urgently deploy a fix to users,
  which can be fatal if the organization is also working on safety
  critical systems.
</p>
<p>
  From a systems design standpoint, I would be looking to more than just
  Github as a code repository if I were working on safety critical
  systems. A simple implementation of this could be using something
  GitLab in conjunction, but could also mean building our own tools to
  solve this problem. Git from a collaboration/communication UX
  standpoint is quite poor IMO, it’s main value is the diffing engine.
  <img src="/images/global-notes/github-outage-1.png" alt="Me making fun of Sean for the github outage on Slack.">
  <img src="/images/global-notes/github-outage-2.png" alt="Github saying they've likely found the root cause of the outage.">
  <img src="/images/global-notes/github-outage-3.png" alt="An AI generated image of Sean's Ford Pickup Truck crashed into a data center.">
</p>
<p>— {metadata.date}</p>
