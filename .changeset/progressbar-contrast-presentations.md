---
'@astryxdesign/core': patch
---

[feat] ProgressBar: add explicit standalone and supplemental contrast presentations

`contrast="standalone"` is the default and renders a terminal stop indicator so
the total range remains visible without nearby value text. Use
`contrast="supplemental"` only when an equivalent visible value is rendered by
the ProgressBar or immediately nearby; the component does not inspect surrounding
DOM to infer that context. Indeterminate bars retain the self-contained
fill/track pairing, while disabled bars use the quieter supplemental treatment.

@rubyycheung
