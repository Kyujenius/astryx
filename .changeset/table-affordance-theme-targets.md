---
'@astryxdesign/core': patch
---

[feat] Table: the sort and filter affordances now expose stable theme targets — `astryx-table-sort-button` (reflecting `direction`) and `astryx-table-filter-button` (reflecting `active`). Both are rendered inside Table's own plugins, so there is no wrapper a consumer can interpose and no `renderX` prop to pass through: the only way to restyle either was `.astryx-table-header-cell button[aria-haspopup='dialog']`, a selector that says "the button that opens a dialog", which is the filtering funnel today and could be anything tomorrow.

Setting a colour on either target now reaches the glyph. Both icons previously named their own colour, which writes `color` on the glyph and beats anything the button inherits down — so a theme could resolve the target, emit the rule, and see nothing move. Each icon reads `color="inherit"` and the button carries the colour instead, which is also why the sort target does not need a second one for its glyph.

[fix] Table: the resting sort arrows and filter funnel are no longer dimmed to `opacity: 0.35`. Composited against the header that put them at **1.57:1**, below the 3:1 [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) asks of a UI component; they now render at `--color-icon-secondary`, which is 4.74:1 in light and 6:1 in dark. Both affordances stay visible at rest rather than fading in on header hover. Sorted state is unchanged — the arrow still moves to the accent colour, and still changes glyph (`arrowsUpDown` → `arrowUp`/`arrowDown`) alongside the `aria-sort` the header already carries, so the state is never colour alone.

The header label inside the sort button now carries `--color-text-secondary` itself, the token the `<th>` already sets, rather than inheriting it — otherwise colouring the sort target would repaint the header text along with the arrow.

[fix] Table: both affordances now draw the shared rest → hover → pressed treatment, and the filter button gets a focus ring it never had. The dimming they used to carry doubled as their only hover feedback, so removing it for contrast left them with no pointer feedback at all; they now take `--color-overlay-hover` on hover and `--color-overlay-pressed` on press, with the glyph darkening a step alongside the tint so the feedback survives a forced-colors mode that drops backgrounds. Hover is guarded on `@media (hover: hover)`, so a touch device does not stick in the tint after a tap. The filter trigger previously fell back to the user agent's default outline on keyboard focus; it now draws the shared Astryx ring like every other control. Accent stays reserved for the sorted and filtered states, so "this column is sorted" never reads as "the pointer is here".

@freddymeta
