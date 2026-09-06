---
'@astryxdesign/core': patch
---

[fix] DropdownMenu: keep focus where it is when a controlled menu mounts already open (#5976)

Mounting with `isMenuOpen` true no longer moves focus into the first item; only an open that happens after mount does, per the input-modality rules. A page that renders a menu open on load no longer drops keyboard users into it, and ArrowDown on the focused trigger walks into an already-open menu instead of requiring a close and reopen.

@Kyujenius
