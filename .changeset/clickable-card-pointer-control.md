---
'@astryxdesign/core': patch
---

[fix] ClickableCard: the element carrying the card's role now receives pointer activation. The invisible control was clipped to 1×1 and covered by the card's content, so a click aimed at it — speech input, assistive technology, automation — never landed. It now covers the whole card; positioned nested interactive elements still paint above it.

@Kyujenius
