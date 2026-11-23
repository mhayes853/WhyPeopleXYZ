<script module lang="ts">
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "A Mobile OS-Level Model Registry",
    date: "7/22/26",
  };
</script>

<p>
  If more mobile apps keep downloading the same models that are
  considered large assets for mobile standards (1-4 GB), it would be
  wise to find some way to share them at an OS level unless we want to
  suffer a tradegy of the commons when it comes to app storage sizes.
  Furthermore, it would be a better user experience if a new app can
  simply detect if a model has already been downloaded, and avoid doing
  so itself as a result. Both Apple and Google already do this for their
  on-device models, so it’s clearly possible at some scale. The question
  is how practical can it be at larger scales?
</p>
<p>
  One primary issue is that the “same model” does not imply “same
  weights”, so it’s possible to have multiple copies a single model with
  different quantizations, fine-tunes, etc. This is not even considering
  the proprietary file formats from some engines, which would cause
  further fragmentation.
</p>
<p>
  It wouldn’t be practical to run a single OS-level inference server on
  mobile either due to the disparity in the amount of engines that
  exist. Any server would have to have a set of “known engines”, or an
  ability to link new engines dynamically somehow (perhaps in a similar
  manner to dynamic SQLite extensions). The latter of which is something
  Apple would certainly never allow (their on-device SQLite build
  explicitly disables registering extensions). So the global registry
  would largely be for storage purposes.
</p>
<p>
  The next question would be one of security, both in guarding which
  apps are allowed to access certain models, and in terms of defining
  “what is a model”.
</p>
<p>
  Open weight models like are probably ok to share globally with other
  apps, but this wouldn’t be ideal for proprietary models/fine-tunes.
  Today, we have privacy by default since each app has its own sandbox.
  iOS can support limited sharing through app-group containers, and
  Android also has mechanisms for this.
</p>
<p>
  Next is “what is a model”? Presumably, the registry would be optimized
  for model storage specifically, but models are merely distributed as
  ordinary files with some engines having their own dedicated file
  formats. In essence, this would largely be a standard directory
  service that an app would probably interact with through an on-device
  framework (eg. <code>ModelStorageKit</code>), but even this framework
  would likely have to resort to depending on a plain <code>URL</code>
  from both Swift and Kotlin respectively. Various app review processes
  would be necessary to determine if the registry is being used for
  “model files” in practice.
</p>
<p>
  Afterwards, we want to allow end-user control somehow. Of course, 99%
  of users are completely clueless as to how any of this works, and thus
  won’t be able to exert much control in the first place. (See Apple’s
  “Buy more Intelligence” messaging for requiring users to upgrade their
  iCloud accounts for more Private Cloud Compute access…) Generally
  speaking, I’m unlikely to come up with something good here since I’m
  primarily looking at this from a technical lens first.
</p>
<p>
  All in all, this is clearly a very silly idea. Though I still do think
  the problem may become more real if edge inference picks up more, so
  hopefully by that point we have better means of solving this. The
  end-user perspective is something that will need to be fleshed out
  more because I don’t think “here’s a screen with all the model names
  and the ability to delete them” is a good UI for this. Furthermore,
  it’s also clear that the current means of model distribution don’t fit
  nicely into this potential system, and I suspect more than just simple
  shared file storage would be necessary.
</p>
<p>— {metadata.date}</p>
