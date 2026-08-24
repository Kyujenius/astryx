---
'@astryxdesign/core': patch
---

[feat] Table: the sort and filter affordances now carry stable theme targets — `astryx-table-sort-button` and `astryx-table-sort-indicator` (both reflecting `direction`), and `astryx-table-filter-button` (reflecting an `active` state). Both controls are rendered inside their plugins, so a theme had no way to restyle them at all: no class, no data attribute, and no wrapper a consumer can interpose. Purely additive; no visual change.
@freddymeta
