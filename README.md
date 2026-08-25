# Calendar nightly audit — PR #5453 contact sheet

92 Chromium captures, Storybook built from the branch head so `dist/` is not stale.
`before/` is `cd1a2daa59a`; `after/` is the branch.

Naming: `Calendar__<variant>__<state>__<theme>.png`, theme one of
`light` · `dark` · `matcha-light` · `matcha-dark`.

`SHEET-light.png` / `SHEET-dark.png` in each directory are the contact sheets.

## The three that changed

| | before | after |
|---|---|---|
| 320px, two months | `before/Calendar__twoMonths__narrow320__light.png` — second month clipped, next-month button off screen | `after/Calendar__twoMonths__narrow320__light.png` — months stacked, both chevrons on screen |
| forced colors, selected | `before/Calendar__selected__forcedColors__light.png` — the selected day is indistinguishable | `after/Calendar__selected__forcedColors__light.png` — Highlight fill, HighlightText label |
| 320px, new story | — | `after/Calendar__twoMonthsNarrowStory__narrow320__light.png` |

Everything else is pixel-equivalent: the radius and spacing changes swap literals
for the tokens that already resolve to the same values.

## y2k — the radius change, found by the review loop

y2k sets `--radius-full: 0px` (brutalist, everything square). The old literal
`50%` ignored that, so range endpoints rendered as circles poking out of a
square band. `--radius-full` makes them square and flush.

`before/Calendar__range__y2k__before.png` · `after/Calendar__range__y2k__after.png`
