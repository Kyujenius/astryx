---
'@astryxdesign/core': patch
'@astryxdesign/cli': patch
---

[feat] `defineTheme` gains responsive width tiers — `mobile`, `tablet`, `desktop`, `wide`

A theme can now say what it looks like at each viewport width. Declaring a tier
turns it on; a theme that declares none emits no tier CSS and is byte-identical
to before.

```ts
defineTheme({
  name: 'acme',
  typography: {scale: {base: 14, ratio: 1.2}},
  tokens: {'--spacing-4': '16px'},

  mobile: {
    maxWidth: 756, // optional; this is the default
    tokens: {'--spacing-4': '12px'}, // narrow, any pointer
    '@media (pointer: coarse)': {
      typography: {scale: {base: 16}}, // narrow AND touch; ratio inherited
    },
  },

  tablet: {extends: 'mobile'},
});
```

- **Tiers partition the width axis** — exactly one matches at any width, so no
  two ever compete and there is no precedence question between them. Bounds
  default to 756 / 1024 / 1440; `wide` is the open top and takes no `maxWidth`.
- **A tier is a partial theme**, resolved through the same pipeline as the
  theme itself, so state only what differs. A scale that sets `base` and not
  `ratio` inherits the theme's ratio.
- **`extends` is value inheritance, not the cascade** — it defaults to the
  theme's own values, and naming another tier starts from that tier's resolved
  values. The extended tier still applies only in its own band.
- **Pointer is a separate axis, nested inside a tier.** The 16px body floor is
  an iOS Safari input-zoom fix, true on a phone and an iPad alike and never
  true of a desktop window dragged narrow — so width and pointer must not be
  fused into one condition.
- Tiers are plain CSS media queries in the theme stylesheet: SSR-safe, no
  `useMediaQuery`, no hydration flash. Both distribution modes emit them from
  the same generator.

@imdreamrunner
