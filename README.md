Screenshot evidence for PR #5552 — nightly component audit of core/Button.
Captured in Chromium via captureWithSensors() against 58f9542; each source frame
carries a sensor receipt in the audit run, not published here.

## Review-loop frames

`shots/review-elevations__{before,after}.png` — the elevation row captured either
side of the change by the review pass. They are **byte-identical** (`cmp` clean),
which is the claim: the theme target was added without moving a pixel.
