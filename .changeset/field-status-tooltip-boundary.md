---
'@astryxdesign/core': minor
---

[breaking] FieldStatus now limits its direct `variant` prop to the presentations it renders: `attached` and `detached`. The Field family still supports `statusVariant="tooltip"` through the new `FieldStatusPresentation` type. (#5738)
@cixzhang

If you imported `FieldStatusVariant` from `@astryxdesign/core/Field` to type a Field-family `statusVariant`, rename it to `FieldStatusPresentation`. Direct `<FieldStatus variant="tooltip">` usage must move to `attached` or `detached`, or use a Field-family control whose `statusVariant="tooltip"` surfaces the message from its on-field affordance.

**Codemod:** `npx astryx upgrade --codemod rename-field-status-presentation-type --apply` retargets imports only when every use is directly on a known Field-family component's `statusVariant` prop. Standalone annotations, root imports, re-exports, mixed direct `FieldStatus` usage, and other ambiguous cases require manual review.
