// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */

export const docs = {
  name: 'responsive-interaction-readiness',
  title: 'Responsive and Interaction Readiness',
  category: 'guide',
  description:
    'A reusable rubric for reviewing responsive layout, touch/pointer/hover behavior, gestures, transient and queued UI, mobile viewport constraints, platform/browser evidence, and WCAG 2.2 AA accessibility.',

  sections: [
    {
      title: 'Overview',
      content: [
        {
          type: 'prose',
          text: 'Use this rubric whenever a new or changed component could behave differently across viewport sizes, input modes, or browser/platform shells. It extends the component hardening checklist: record each applicable row as Pass, Fail, Blocked/Not verified, or N/A, and attach evidence in the issue, PR description, or lab-readiness manifest link that reviewers can open.',
        },
        {
          type: 'prose',
          text: 'Keep size, pointer, hover, and gesture capability separate. A narrow viewport does not prove touch input, and a coarse pointer does not prove a narrow viewport. Layout should follow available space and content fit; input behavior should follow the input capability it actually depends on.',
        },
        {
          type: 'prose',
          text: 'First decide from task semantics and product intent whether the interaction stays on the same surface or intentionally changes presentation. Responsive pressure alone normally means reflowing or resizing the component, not silently substituting another component.',
        },
        {
          type: 'prose',
          text: 'Storybook and Playwright are useful evidence layers, but they cannot establish iOS Safari or platform-shell behavior. Playwright WebKit runs macOS WebKit; it does not reproduce the iOS shell or every native top-layer `<dialog>` and popover behavior. Do not claim Pass for iOS touch-interaction behavior from Storybook or Playwright WebKit alone.',
        },
      ],
    },
    {
      title: 'Required scenarios',
      content: [
        {
          type: 'prose',
          text: 'Scenario coverage proves viewport-width independence and input-capability independence. Preserve these four cross-axis scenarios; add platform and browser evidence to the relevant scenario rather than creating a fifth device stereotype. A scenario can pass while a requirement still fails, and a requirement can need evidence from more than one scenario.',
        },
        {
          type: 'table',
          headers: ['Scenario', 'What it proves', 'Minimum evidence'],
          rows: [
            [
              'Wide viewport + fine pointer + hover',
              'The default wide desktop contract remains intact.',
              'Storybook or desktop-browser screenshot plus focused test when layout/order/interaction can regress.',
            ],
            [
              'Narrow viewport + fine pointer + hover',
              'Width-driven reflow does not depend on touch or no-hover media queries.',
              'Storybook or browser viewport test demonstrating the same narrow layout as mobile when applicable.',
            ],
            [
              'Narrow viewport + coarse pointer + no hover',
              'The mobile/touch contract works when width and touch constraints appear together.',
              'Browser/emulator/device capture plus activation evidence; use iOS Simulator or physical iOS evidence when the claim supports iOS platform behavior.',
            ],
            [
              'Wide viewport + coarse pointer + no hover',
              'Input capability does not accidentally force narrow/mobile geometry.',
              'Storybook, browser/device capture, or media-query test when pointer branches exist; add platform evidence when shell behavior is part of the claim.',
            ],
          ],
        },
        {
          type: 'prose',
          text: 'If a scenario is irrelevant, mark it N/A with the reason. Example: a purely static text component has no pointer-activation evidence to provide, but it still owes content-fit evidence at the supported widths where it renders. Adaptive recipes that switch presentation owe all four scenario outcomes plus an explicit override or test path for the adaptive choice.',
        },
      ],
    },
    {
      title: 'Platform and browser evidence layer',
      content: [
        {
          type: 'prose',
          text: 'Choose the lightest evidence that can actually prove the claim. If behavior supports iOS and depends on touch dispatch, native top-layer dialog or popover behavior, focus or dismissal propagation, visual viewport/software keyboard behavior, safe-area/platform chrome, or other WebKit-on-iOS behavior, require real iOS evidence from an iOS Simulator or physical iOS device. If that evidence is unavailable, mark the outcome Blocked or Not verified; reserve N/A for behavior that is genuinely inapplicable.',
        },
        {
          type: 'table',
          headers: ['Evidence source', 'Appropriate for', 'Cannot prove'],
          rows: [
            [
              'Storybook',
              'Component states, examples, visual review, responsive width checks, and reviewer screenshots in a controlled desktop browser.',
              'Real touch dispatch, native iOS Safari/platform shell, iOS visual viewport/software keyboard, platform chrome, or every native top-layer `<dialog>`/popover behavior.',
            ],
            [
              'Playwright browser engines',
              'Repeatable keyboard, pointer, layout, focus, and browser-regression tests across supported desktop engines.',
              'iOS Safari/platform-shell behavior. Playwright WebKit is macOS WebKit and does not reproduce the iOS shell or every native top-layer `<dialog>`/popover behavior.',
            ],
            [
              'iOS Simulator or device',
              'iOS Safari/WebKit evidence for touch dispatch, top-layer dialog/popover propagation, focus/dismissal propagation, visual viewport, software keyboard, safe area, and platform chrome behavior.',
              'Physical-device-only constraints such as actual hardware ergonomics, camera/notch variation not represented by the simulator profile, real network/performance pressure, or accessory/input quirks.',
            ],
            [
              'Physical-device checks',
              'Final verification when real hardware shape, OS/browser version, input method, sensor/notch/chrome configuration, or performance can affect the experience.',
              'A complete automated regression suite by itself; keep focused tests and Storybook evidence for repeatable coverage.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Review categories',
      content: [
        {
          type: 'prose',
          text: 'Use these four categories to organize the review outcome after the scenarios are covered. The Transient and queued UI checks are conditional: apply them to toasts, snackbars, notifications, transient banners, and similar queued or auto-dismissing surfaces; unrelated components should mark them N/A with the reason.',
        },
        {type: 'heading', level: 3, text: 'Responsive layout'},
        {
          type: 'prose',
          text: 'Adaptive presentation decision gate: choose the intended experience before choosing implementation signals. When the task keeps the same semantics, reflow or resize the same component. When product intent calls for another presentation, make it an explicit opt-in recipe and document any placement, motion, dismissal, focus, scrolling, gesture, or announcement contract differences. Across presentations, preserve shared controlled state, accessible name/semantics, action availability, and equivalent non-gesture paths; document intentional differences.',
        },
        {
          type: 'table',
          headers: ['Task or intent', 'Typical outcome', 'Evidence to record'],
          rows: [
            [
              'Same task/semantics under tighter space',
              'Responsive component: reflow, wrap, resize, or scroll intentionally.',
              'Show supported widths and content fit; do not swap components just because the viewport is narrow.',
            ],
            [
              'Complex compact flow that needs more room or sequence',
              'Explicit fullscreen or page presentation.',
              'Document route/placement, focus, scrolling, dismissal, and state continuity.',
            ],
            [
              'Lightweight contextual actions or pickers tied to a trigger',
              'Explicit sheet, tray, popover, or anchored option.',
              'Document opt-in API, trigger relationship, dismissal, focus return, and non-gesture paths.',
            ],
            [
              'Critical alert or confirmation',
              'Retain alert/dialog semantics unless product intent explicitly differs.',
              'Preserve accessible name, action availability, controlled state, and announcement/dismissal contracts; document intentional differences.',
            ],
          ],
        },
        {
          type: 'table',
          headers: ['Check', 'Review requirement', 'N/A guidance'],
          rows: [
            [
              'Adaptive presentation decision',
              'Decide from task semantics and product intent whether the interaction stays on the same surface or uses another presentation. Responsive pressure alone normally means reflow/resize, not substitution. After that decision, use available space and input capabilities as independent signals; never use width alone as a device detector or touch alone as a presentation mandate.',
              'N/A only when no component substitution or adaptive recipe is involved; still record that the same component presentation is retained.',
            ],
            [
              'Available space and content fit',
              'Use shared breakpoint names and values: none 0, sm 640px, md 768px, lg 1024px. Reflow from viewport or container space and actual content fit; long labels and localized copy wrap instead of clipping or causing horizontal overflow.',
              'Rarely N/A. Even non-interactive components need evidence that their content fits or intentionally scrolls within their supported containers.',
            ],
            [
              'Transient and queued UI: queue/stack policy and content fit',
              'For toasts, snackbars, notifications, transient banners, and similar surfaces, define whether concurrent items stack, queue, replace, or deduplicate. Limit visible items from available space rather than touch capability, start timeouts only once an item is visible, and verify long localized text, actions, and dismiss controls do not overflow.',
              'N/A when the component does not queue, auto-dismiss, or show transient feedback surfaces; record the reason.',
            ],
          ],
        },
        {
          type: 'prose',
          text: 'Anti-patterns: silent component swapping at a breakpoint, breakpoint-as-device detection, treating touch capability as a mandate to change presentation, and choosing top or bottom placement because “touch device” without obstruction evidence.',
        },
        {type: 'heading', level: 3, text: 'Touch, pointer, and hover'},
        {
          type: 'table',
          headers: ['Check', 'Review requirement', 'N/A guidance'],
          rows: [
            [
              'Pointer precision',
              'Review fine and coarse pointer behavior independently from width. Hit areas, drag handles, resize affordances, and hover targets must remain usable for the pointer precision they support.',
              'N/A only when the component has no pointer interaction beyond native text selection or links/buttons inherited unchanged from existing primitives.',
            ],
            [
              'Hover independence',
              'Essential information and required actions must not require hover. Hover may reveal convenience affordances only when the same action or information is available through focus, visible UI, or another non-hover path.',
              'N/A for components with no hover-specific behavior; record that no required state depends on hover.',
            ],
            [
              'Pointer and gesture behavior',
              'Custom pointer handling uses Pointer Events where possible, handles mouse/touch/pen consistently, and does not block click, focus, text selection, or native scrolling. Path-based, multipointer, dragging, or other custom gestures need non-gesture alternatives where applicable, and pointer cancellation semantics must avoid accidental activation.',
              'N/A when the component has no custom pointer handling, gesture semantics, drag interactions, or pointer-capture flows.',
            ],
            [
              'iOS/WebKit platform behavior',
              'For touch-interaction claims that support iOS, require evidence from an iOS Simulator or physical iOS device when behavior depends on touch dispatch, native top-layer dialog/popover, focus/dismissal propagation, visual viewport/software keyboard, safe-area/platform chrome, or other WebKit-on-iOS behavior. Storybook and Playwright WebKit alone cannot establish Pass for these claims.',
              'N/A only when the component does not support iOS or the behavior is genuinely independent of iOS touch/WebKit/platform-shell behavior. If real iOS evidence is unavailable, mark Blocked or Not verified instead of N/A.',
            ],
            [
              'Transient and queued UI: gesture alternatives',
              'Gestures are optional accelerators. Provide button and keyboard alternatives, preserve native scrolling, require directional intent, test below-threshold, wrong-direction, and pointercancel paths, and pause timers during active pointer interaction.',
              'N/A when the component has no transient gesture, swipe, pointer-drag, or timer behavior; record the reason.',
            ],
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Accessibility and interaction contracts',
        },
        {
          type: 'table',
          headers: ['Check', 'Review requirement', 'N/A guidance'],
          rows: [
            [
              'WCAG 2.2 AA target size',
              'Evaluate WCAG 2.2 Level AA requirements. For target size, use 2.5.8: at least 24x24 CSS px or a permitted exception.',
              'Never N/A for interactive components. Non-interactive components still owe applicable contrast, semantics, and reading-order checks.',
            ],
            [
              'Semantics',
              'State whether roles, names, descriptions, reading order, and landmark/list/table semantics are preserved or intentionally changed.',
              'N/A only for semantic sub-items the component genuinely does not own; record that conclusion.',
            ],
            [
              'Keyboard, focus, and dismissal',
              'Keyboard operation, focus order and return, focus visibility, and dismissal contracts remain available or intentionally change with evidence.',
              'N/A only for sub-items the component genuinely does not own; record that conclusion.',
            ],
            [
              'Reduced motion',
              'Motion and animation respect reduced-motion behavior and preserve the component contract when motion is reduced.',
              'N/A only when the component has no motion or animation behavior.',
            ],
            [
              'Transient and queued UI: timing',
              'WCAG 2.2 AA SC 2.2.1 applies to timed content; do not claim that five seconds is inherently compliant. Actionable or non-redundant feedback persists or has an untimed equivalent, and critical or blocking information escalates to persistent in-context UI or a dialog.',
              'N/A when the component has no timed, auto-dismissing, queued, or transient feedback behavior; record the reason.',
            ],
            [
              'Transient and queued UI: announcement semantics',
              'Separate interactive visual content from live-region announcements. Choose polite or assertive announcement based on urgency, do not place controls inside status or alert live regions, appearance does not move focus, and document keyboard entry/restore when provided.',
              'N/A when the component has no live-region or transient feedback semantics; record the reason.',
            ],
          ],
        },
        {type: 'heading', level: 3, text: 'Mobile viewport constraints'},
        {
          type: 'table',
          headers: ['Check', 'Review requirement', 'N/A guidance'],
          rows: [
            [
              'Software keyboard',
              'Check resize, occlusion, focus movement, and scroll position where the component owns inputs or viewport geometry. For iOS-supported behavior, use an iOS Simulator or physical device rather than Storybook or Playwright WebKit alone.',
              'N/A when the component has no text input and does not own viewport geometry around focused controls; unavailable iOS evidence is Blocked/Not verified, not N/A.',
            ],
            [
              'Viewport obstruction and placement',
              'For fixed overlays, transient feedback, floating actions, and other viewport-anchored surfaces, choose top, bottom, or edge placement from actual obstructions and content priority, not from touch or coarse pointer alone. Evaluate software keyboard, safe-area insets, browser chrome, bottom navigation/toolbars, sheets, focused controls, and important top navigation/status. Safe-area support does not prove keyboard or app-chrome avoidance. Test relevant placements, narrow stack pressure, and both edge placements when the component exposes them; use iOS Simulator/device evidence when iOS platform chrome or visual viewport behavior is part of the claim; maintain consistency within a flow and record evidence.',
              'N/A when the component is not fixed or viewport-anchored, exposes no placement choice, and cannot obstruct or be obstructed by viewport-edge UI; unavailable platform evidence is Blocked/Not verified, not N/A.',
            ],
            [
              'Safe-area insets',
              'Edge-anchored or full-viewport UI accounts for safe-area insets without hiding actions or content.',
              'N/A when the component never reaches viewport edges or delegates safe-area handling to a parent shell.',
            ],
            [
              'Dynamic viewport and scroll behavior',
              'Dynamic viewport units, body locking, nested scroll, and constrained-height behavior remain intentional and testable where the component owns them.',
              'N/A for inline components or overlays whose position and size never interact with viewport edges, keyboard, or scroll locking.',
            ],
          ],
        },
        {
          type: 'prose',
          text: 'Transient UI anti-patterns: auto-hide actionable feedback without an untimed equivalent, controls inside alert/status live regions, an unbounded narrow stack, touch=>placement assumptions, and gesture-only dismissal.',
        },
      ],
    },
    {
      title: 'Reporting in component PRs',
      content: [
        {
          type: 'prose',
          text: 'When a new or changed component affects responsive layout, input behavior, gestures, mobile viewport constraints, or accessibility, paste Responsive and Interaction Readiness outcomes as a Check / Result / Evidence report into the PR description or link them from the lab-readiness manifest.',
        },
        {
          type: 'prose',
          text: 'Use Pass when the row has concrete evidence that can prove the claim: a story, test, screenshot, device capture, or documented reasoning, with iOS Simulator/device evidence for iOS platform behavior. Use Fail when applicable work remains. Use Blocked or Not verified when the behavior applies but the required platform evidence is unavailable. Use N/A only when the area does not apply, and include the reason.',
        },
        {
          type: 'code',
          lang: 'md',
          label: 'Responsive and Interaction Readiness outcomes',
          code: `## Responsive and Interaction Readiness outcomes

### Responsive layout

| Check | Result | Evidence |
| --- | --- | --- |
| Scenario: wide viewport + fine pointer + hover | Pass/Fail/Blocked/N/A | Story/test/screenshot link |
| Scenario: narrow viewport + fine pointer + hover | Pass/Fail/Blocked/N/A | Story/test/screenshot link |
| Requirement: presentation choice | Pass/Fail/Blocked/N/A | Same-surface decision, explicit adaptive option, contract differences, or N/A reason when no substitution is involved |
| Requirement: available space/content fit/wrapping/overflow | Pass/Fail/Blocked/N/A | Breakpoints, wrapping, overflow, or documented N/A reason |
| Requirement: queue/stack policy (transient/queued UI) | Pass/Fail/Blocked/N/A | Stack/queue/replace/deduplicate policy, visible limit, visible-only timeout start, long text/actions/dismiss fit, or N/A reason |

### Touch, pointer, and hover

| Check | Result | Evidence |
| --- | --- | --- |
| Scenario: narrow viewport + coarse pointer + no hover | Pass/Fail/Blocked/N/A | Story/test/device capture link |
| Scenario: wide viewport + coarse pointer + no hover | Pass/Fail/Blocked/N/A | Story/test/device capture link |
| iOS/WebKit platform verification | Pass/Blocked/Not verified/N/A | OS/device or Simulator version, browser, input method, and evidence link/screenshot; use Blocked/Not verified if unavailable, not Pass from Storybook/Playwright WebKit alone |
| Requirement: hover independence | Pass/Fail/Blocked/N/A | Non-hover path or documented N/A reason |
| Requirement: pointer/custom gesture behavior | Pass/Fail/Blocked/N/A | Pointer, activation, cancellation, or custom-handler evidence |
| Requirement: gesture alternatives (transient/queued UI) | Pass/Fail/Blocked/N/A | Button/keyboard alternative, native scroll preservation, directional intent, below-threshold/wrong-direction/pointercancel tests, timer pause, or N/A reason |
| Requirement: non-gesture alternatives where applicable | Pass/Fail/Blocked/N/A | Alternative path or documented N/A reason |

### Accessibility and interaction contracts

| Check | Result | Evidence |
| --- | --- | --- |
| Requirement: WCAG 2.2 AA target size | Pass/Fail/Blocked/N/A | 2.5.8 24x24 CSS px or permitted exception evidence |
| Requirement: semantics | Pass/Fail/Blocked/N/A | Role, name, description, reading-order, or semantic-structure evidence |
| Requirement: keyboard/focus/dismissal | Pass/Fail/Blocked/N/A | Keyboard, focus order/return, focus visibility, or dismissal evidence |
| Requirement: timing (transient/queued UI) | Pass/Fail/Blocked/N/A | SC 2.2.1 timeout/equivalent/persistence evidence, visible-only timer start, or N/A reason |
| Requirement: announcement semantics (transient/queued UI) | Pass/Fail/Blocked/N/A | Live-region urgency, separate interactive content, no controls inside status/alert, focus behavior, escalation path, or N/A reason |
| Requirement: reduced motion | Pass/Fail/Blocked/N/A | Reduced-motion behavior or documented N/A reason |

### Mobile viewport constraints

| Check | Result | Evidence |
| --- | --- | --- |
| Requirement: software keyboard | Pass/Fail/Blocked/N/A | Resize, occlusion, focus, scroll, or documented N/A reason |
| Requirement: viewport obstruction and placement | Pass/Fail/Blocked/N/A | Keyboard, safe-area, browser/app chrome, nav/toolbars, sheet, focused-control, content-priority, relevant placements, narrow stack pressure, consistency, or documented N/A evidence |
| Requirement: safe-area insets | Pass/Fail/Blocked/N/A | Edge/safe-area evidence or documented N/A reason |
| Requirement: dynamic viewport/scroll behavior | Pass/Fail/Blocked/N/A | Dynamic viewport, body locking, nested scroll, constrained-height, or documented N/A reason |`,
        },
      ],
    },
    {
      title: 'Diagnostic notes',
      content: [
        {
          type: 'prose',
          text: 'When a remote console is unavailable, a query-flagged, on-page forensics overlay can make iOS evidence reviewable in one screenshot. Keep it development-only, disable or remove it in production, set pointer-events: none so it cannot change the interaction under test, and record only the event, pointer, dispatch, focus, dismissal, and top-layer details needed for diagnosis.',
        },
        {
          type: 'prose',
          text: 'React instrumentation caveat: React may freeze props in development, so do not mutate a props object to wrap handlers. Instrument at a component or wrapper boundary, or, if dynamically intercepting props, return a wrapped copy so the instrumentation survives commits. This is a diagnostic note, not a normative component requirement.',
        },
      ],
    },
    {
      title: 'Worked example',
      content: [
        {
          type: 'prose',
          text: 'AlertDialog demonstrates the intended separation. The layout evidence covers a wide-viewport fine-pointer story, a narrow-viewport fine-pointer story, and a narrow-viewport touch story. Width determines the geometry: above 640px the dialog keeps the 400px centered surface and horizontal Cancel/destructive row; at 640px and below it uses token gutters, stacks destructive above Cancel, and wraps labels. Pointer and hover capability are independently testable but do not choose the layout.',
        },
        {
          type: 'prose',
          text: 'For that component, custom gestures, software-keyboard behavior, and safe-area behavior are N/A unless the implementation changes to own them. Existing focus, role, keyboard, reduced-motion, and dismissal contracts remain explicit review items and should be named in the evidence instead of inferred from the responsive layout work.',
        },
      ],
    },
    {
      title: 'Related docs',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            '`astryx docs layout` for frame, region, spacing, and breakpoint contracts',
            '`astryx docs browser-support` for platform feature support and feature detection',
            '`astryx docs motion` for reduced-motion expectations and motion token use',
          ],
        },
      ],
    },
  ],
};
