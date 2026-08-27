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
  tokens: {'--spacing-4': '16px'},

  mobile: {
    maxWidth: 756, // optional; this is the default
    tokens: {'--spacing-4': '12px'}, // narrow, any pointer
    '@media (pointer: coarse)': {
      tokens: {
        '--size-element-sm': '36px',
        '--size-element-md': '40px',
        '--size-element-lg': '44px',
      },
    },
  },

  tablet: {extends: 'mobile'},
});
```

- **Declared tier bands do not overlap** — at most one tier matches at any
  width, so two tiers never compete. Bounds default to 756 / 1024 / 1440;
  `wide` is the open top and takes no `maxWidth`.
- **A tier you do not declare is not a boundary.** Declare `mobile` and
  `desktop` and there is one line, not three: desktop covers everything from
  the phone line up to 1440px, with no band falling back to the theme's own
  values in between. (`wide` alone is refused — it would have no lower bound.)
- **A tier is a partial theme**, resolved through the same pipeline as the
  theme itself, so state only what differs. A scale that sets `base` and not
  `ratio` inherits the theme's ratio, and an axis a tier never mentions is not
  re-expanded at all — a tier changes what it names and nothing else.
- **`extends` is value inheritance, not the cascade** — it defaults to the
  theme's own values, and naming another tier starts from that tier's resolved
  values. The extended tier still applies only in its own band.
- **Pointer is a separate axis, nested inside a tier.** Use it for values that
  depend on the primary pointer rather than viewport width — for example,
  taller controls under a coarse pointer. A narrow desktop window still has a
  fine pointer, while a tablet can be wider than `mobile` and still need the
  coarse-pointer values.
- **Explicit tokens stay pinned inside tiers.** If a theme pins a generated
  scale token and changes that scale in a tier, the pinned step stays fixed
  while neighbouring generated steps move; pin only when that uneven scale is
  intentional.
- Tiers are plain CSS media queries in the theme stylesheet: SSR-safe, no
  `useMediaQuery`, no hydration flash. Both distribution modes emit them from
  the same generator, last in each layer so a tier beats everything without a
  media query.

@imdreamrunner
