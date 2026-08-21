# PR assets — Banner `collapsible` (#5255)

Screenshots and DOM facts, plus the harness that produced them
(`pr-assets/shoot.mjs`: esbuild-bundles a real `@astryxdesign/core` build,
serves it on localhost, shoots it in Chromium).

Both sets come from a real build — `before` from `main` at 5ab06259c, `after`
from the PR branch. `default` and `open` are byte-identical across the two,
which is the "nothing breaks" proof; `optout` is the new capability.

Nothing here is imported by the repo; delete this branch once the PR is merged.
