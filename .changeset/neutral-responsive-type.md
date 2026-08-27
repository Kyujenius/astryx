---
'@astryxdesign/theme-neutral': patch
---

[feat] Try a 16px Neutral type scale on coarse-pointer mobile and tablet viewports

Neutral keeps its 14px / 1.2 default scale for fine pointers and viewports above
the tablet band. On coarse primary pointers through 1024px, it raises the base
to 16px and compresses the ratio to 1.1745, lifting the lower ladder while
keeping Display 1 at its default 42px.

@imdreamrunner
