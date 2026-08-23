// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */

export const docs = {
  name: 'responsive-interaction-readiness',
  title: 'Responsive and Interaction Readiness',
  category: 'guide',
  description:
    'A reusable rubric for reviewing responsive layout, touch/pointer/hover behavior, gestures, mobile viewport constraints, and WCAG 2.2 AA accessibility.',

  sections: [
    {
      title: 'Overview',
      content: [
        {
          type: 'prose',
          text: 'Use this rubric whenever a new or changed component could behave differently across viewport sizes or input modes. It extends the component hardening checklist: record each applicable row as Pass, Fail, or N/A, and attach evidence in the issue, PR description, or lab-readiness manifest link that reviewers can open.',
        },
        {
          type: 'prose',
          text: 'Keep size, pointer, hover, and gesture capability separate. A narrow viewport does not prove touch input, and a coarse pointer does not prove a narrow viewport. Layout should follow available space and content fit; input behavior should follow the input capability it actually depends on.',
        },
        {
          type: 'prose',
          text: 'First decide from task semantics and product intent whether the interaction stays on the same surface or intentionally changes presentation. Responsive pressure alone normally means reflowing or resizing the component, not silently substituting another component.',
        },
      ],
    },
    {
      title: 'Required scenarios',
      content: [
        {
          type: 'prose',
          text: 'Scenario coverage proves viewport-width independence and input-capability independence. Keep these separate from the requirement categories below: a scenario can pass while a requirement still fails, and a requirement can need evidence from more than one scenario.',
        },
        {
          type: 'table',
          headers: ['Scenario', 'What it proves', 'Minimum evidence'],
          rows: [
            [
              'Wide viewport + fine pointer + hover',
              'The default wide desktop contract remains intact.',
              'Story or screenshot plus focused test when layout/order/interaction can regress.',
            ],
            [
              'Narrow viewport + fine pointer + hover',
              'Width-driven reflow does not depend on touch or no-hover media queries.',
              'Story or viewport test demonstrating the same narrow layout as mobile when applicable.',
            ],
            [
              'Narrow viewport + coarse pointer + no hover',
              'The mobile/touch contract works when width and touch constraints appear together.',
              'Story or emulator/device capture plus activation evidence.',
            ],
            [
              'Wide viewport + coarse pointer + no hover',
              'Input capability does not accidentally force narrow/mobile geometry.',
              'Story, browser/device capture, or media-query test when pointer branches exist.',
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
      title: 'Review categories',
      content: [
        {
          type: 'prose',
          text: 'Use these four categories to organize the review outcome after the scenarios are covered.',
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
          ],
        },
        {
          type: 'prose',
          text: 'Anti-patterns: silent component swapping at a breakpoint, breakpoint-as-device detection, and treating touch capability as a mandate to change presentation.',
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
          ],
        },
        {type: 'heading', level: 3, text: 'Mobile viewport constraints'},
        {
          type: 'table',
          headers: ['Check', 'Review requirement', 'N/A guidance'],
          rows: [
            [
              'Software keyboard',
              'Check resize, occlusion, focus movement, and scroll position where the component owns inputs or viewport geometry.',
              'N/A when the component has no text input and does not own viewport geometry around focused controls.',
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
          text: 'Use Pass when the row has concrete evidence such as a story, test, screenshot, device capture, or documented reasoning. Use Fail when applicable work remains. Use N/A only when the area does not apply, and include the reason.',
        },
        {
          type: 'code',
          lang: 'md',
          label: 'Responsive and Interaction Readiness outcomes',
          code: `## Responsive and Interaction Readiness outcomes

### Responsive layout

| Check | Result | Evidence |
| --- | --- | --- |
| Scenario: wide viewport + fine pointer + hover | Pass/Fail/N/A | Story/test/screenshot link |
| Scenario: narrow viewport + fine pointer + hover | Pass/Fail/N/A | Story/test/screenshot link |
| Requirement: presentation choice | Pass/Fail/N/A | Same-surface decision, explicit adaptive option, contract differences, or N/A reason when no substitution is involved |
| Requirement: available space/content fit/wrapping/overflow | Pass/Fail/N/A | Breakpoints, wrapping, overflow, or documented N/A reason |

### Touch, pointer, and hover

| Check | Result | Evidence |
| --- | --- | --- |
| Scenario: narrow viewport + coarse pointer + no hover | Pass/Fail/N/A | Story/test/device capture link |
| Scenario: wide viewport + coarse pointer + no hover | Pass/Fail/N/A | Story/test/device capture link |
| Requirement: hover independence | Pass/Fail/N/A | Non-hover path or documented N/A reason |
| Requirement: pointer/custom gesture behavior | Pass/Fail/N/A | Pointer, activation, cancellation, or custom-handler evidence |
| Requirement: non-gesture alternatives where applicable | Pass/Fail/N/A | Alternative path or documented N/A reason |

### Accessibility and interaction contracts

| Check | Result | Evidence |
| --- | --- | --- |
| Requirement: WCAG 2.2 AA target size | Pass/Fail/N/A | 2.5.8 24x24 CSS px or permitted exception evidence |
| Requirement: semantics | Pass/Fail/N/A | Role, name, description, reading-order, or semantic-structure evidence |
| Requirement: keyboard/focus/dismissal | Pass/Fail/N/A | Keyboard, focus order/return, focus visibility, or dismissal evidence |
| Requirement: reduced motion | Pass/Fail/N/A | Reduced-motion behavior or documented N/A reason |

### Mobile viewport constraints

| Check | Result | Evidence |
| --- | --- | --- |
| Requirement: software keyboard | Pass/Fail/N/A | Resize, occlusion, focus, scroll, or documented N/A reason |
| Requirement: safe-area insets | Pass/Fail/N/A | Edge/safe-area evidence or documented N/A reason |
| Requirement: dynamic viewport/scroll behavior | Pass/Fail/N/A | Dynamic viewport, body locking, nested scroll, constrained-height, or documented N/A reason |`,
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
