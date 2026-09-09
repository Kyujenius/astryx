---
'@astryxdesign/core': patch
---

[fix] CheckboxListItem: the visible `description` is now the checkbox's accessible description. The row wraps it in an id'd element and the checkbox points at it with `aria-describedby`, the way RadioListItem already does, so the browser computes a distinct description instead of none. CheckboxInput now merges a consumer-supplied `aria-describedby` with its own description, status, and disabled-reason ids rather than replacing it.

@Kyujenius
