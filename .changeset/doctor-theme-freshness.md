---
'@astryxdesign/cli': patch
---

[feat] `astryx doctor` now checks that built theme output is in step with its `defineTheme()` source. This is the one silent failure in the theming pipeline: a stale built theme still carries `__built`, so the runtime skips style injection and the app renders the previous theme with no error and no warning.

Only drift is a failure. Absent artifacts report `missing`, which just means the app imports the theme source directly (runtime injection) — a supported path. And when a `predev`/`prebuild` script already rebuilds the theme, drift on disk is reported as `info` rather than `fail`, since nothing ever consumes the stale output.

Also generalizes the doctor engine so a check may be sync or async and runs in its declared position. Previously the list was sync-only and `checkConfig` was spliced in by comparing each function against `checkThemes` by identity, which supported exactly one async check and hid its ordering from the list.
@josephfarina
