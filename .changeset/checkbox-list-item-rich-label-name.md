---
'@astryxdesign/core': patch
---

[fix] CheckboxListItem: a ReactNode `label` now names the checkbox from its visible text through `aria-labelledby`, the way RadioListItem already does, instead of falling back to the generic name "Checkbox". `aria-label` still replaces that name when the visible text is absent or reads badly; the dev-time warning that asked for it is gone.

@Kyujenius
