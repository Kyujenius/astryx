---
'@astryxdesign/core': minor
---

[breaking] Move the labelled Spinner's public `astryx-spinner` selector and its
size/shade data attributes from the root wrapper to the inner status indicator,
so theme overrides target the element that renders the ring.

Migration: If CSS or DOM queries expect `.astryx-spinner` on a labelled
Spinner's root wrapper, select its descendant `[role='status']` instead. The
public root still owns refs, rest props, `xstyle`, `className`, `style`, and
`data-testid`; CSS custom-property overrides on that root continue to cascade
to the ring.

@cixzhang
