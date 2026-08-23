// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */

export const docs = {
  name: 'mobile-readiness',
  title: 'Mobile Readiness',
  category: 'guide',
  description:
    'A reusable rubric for reviewing component behavior across viewport space, input capability, gestures, mobile viewport constraints, and WCAG 2.2 AA accessibility.',

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
      ],
    },
    {
      title: 'Required scenarios',
      content: [
        {
          type: 'table',
          headers: ['Scenario', 'What it proves', 'Minimum evidence'],
          rows: [
            [
              'Desktop + fine pointer + hover',
              'The default wide desktop contract remains intact.',
              'Story or screenshot plus focused test when layout/order/interaction can regress.',
            ],
            [
              'Small screen + touch/coarse pointer/no hover',
              'The mobile/touch contract works when width and touch constraints appear together.',
              'Story or emulator/device capture plus activation evidence.',
            ],
            [
              'Small/narrow screen + fine pointer/hover',
              'Width-driven reflow does not depend on touch or no-hover media queries.',
              'Story or viewport test demonstrating the same narrow layout as mobile when applicable.',
            ],
            [
              'Large screen + touch/coarse pointer/no hover',
              'Input capability does not accidentally force narrow/mobile geometry.',
              'Story, browser/device capture, or media-query test when pointer branches exist.',
            ],
          ],
        },
        {
          type: 'prose',
          text: 'If a scenario is irrelevant, mark it N/A with the reason. Example: a purely static text component has no pointer-activation evidence to provide, but it still owes content-fit evidence at the supported widths where it renders.',
        },
      ],
    },
    {
      title: 'Axes',
      content: [
        {
          type: 'table',
          headers: ['Axis', 'Review requirement', 'N/A guidance'],
          rows: [
            [
              'Available space and content fit',
              'Use shared breakpoint names and values: none 0, sm 640px, md 768px, lg 1024px. Reflow from viewport or container space and actual content fit; long labels and localized copy wrap instead of clipping or causing horizontal overflow.',
              'Rarely N/A. Even non-interactive components need evidence that their content fits or intentionally scrolls within their supported containers.',
            ],
            [
              'Pointer precision',
              'Review fine and coarse pointer behavior independently from width. Hit areas, drag handles, resize affordances, and hover targets must remain usable for the pointer precision they support.',
              'N/A only when the component has no pointer interaction beyond native text selection or links/buttons inherited unchanged from existing primitives.',
            ],
            [
              'Hover availability',
              'Essential information and required actions must not require hover. Hover may reveal convenience affordances only when the same action or information is available through focus, visible UI, or another non-hover path.',
              'N/A for components with no hover-specific behavior; record that no required state depends on hover.',
            ],
            [
              'Active pointer/touch input',
              'Custom gestures use Pointer Events where possible, handle mouse/touch/pen consistently, and do not block click, focus, text selection, or native scrolling. Touch activation must be intentional and reversible where destructive.',
              'N/A when the component has no custom pointer handling or gesture semantics.',
            ],
            [
              'Mobile viewport constraints',
              'Check software keyboard resize/occlusion, safe-area insets for edge-anchored UI, dynamic viewport units, body locking, and nested scroll behavior where the component owns viewport geometry.',
              'N/A for inline components or overlays whose position/size never interacts with viewport edges, keyboard, or scroll locking.',
            ],
            [
              'WCAG 2.2 Level AA',
              'Evaluate WCAG 2.2 Level AA requirements. For target size, use 2.5.8: at least 24x24 CSS px or a permitted exception.',
              'Never N/A for interactive components. Non-interactive components still owe applicable contrast, semantics, and reading-order checks.',
            ],
            [
              'Gestures',
              'Gestures enhance rather than unlock functionality. Preserve native scroll/browser/OS gestures. Path-based, multipointer, or dragging interactions need non-gesture alternatives where WCAG AA requires them, and pointer cancellation semantics must avoid accidental activation.',
              'N/A when there are no custom gestures, drag interactions, or pointer-capture flows.',
            ],
            [
              'Existing contracts',
              'State whether semantic roles/names, focus order and return, keyboard operation, reduced-motion behavior, and dismissal contracts are preserved or intentionally changed.',
              'N/A only for the sub-items the component genuinely does not own; the review still records that conclusion.',
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
          text: 'When a new or changed component affects responsive layout, input behavior, gestures, mobile viewport constraints, or accessibility, paste a completed Area / Result / Evidence table into the PR description or link one from the lab-readiness manifest.',
        },
        {
          type: 'prose',
          text: 'Use Pass when the row has concrete evidence such as a story, test, screenshot, device capture, or documented reasoning. Use Fail when applicable work remains. Use N/A only when the area does not apply, and include the reason.',
        },
        {
          type: 'code',
          lang: 'md',
          label: 'Mobile-readiness checklist',
          code: `| Area | Result | Evidence |
| --- | --- | --- |
| Desktop + fine pointer + hover | Pass/Fail/N/A | Story/test/device link |
| Small screen + touch/coarse pointer/no hover | Pass/Fail/N/A | Story/test/device link |
| Small/narrow screen + fine pointer/hover | Pass/Fail/N/A | Story/test/device link |
| Large screen + touch/coarse pointer/no hover | Pass/Fail/N/A | Story/test/device link |
| Available space and content fit | Pass/Fail/N/A | Breakpoints, wrapping/overflow notes |
| Pointer precision | Pass/Fail/N/A | Fine/coarse behavior notes |
| Hover availability | Pass/Fail/N/A | Non-hover path notes |
| Active pointer/touch input | Pass/Fail/N/A | Pointer Events/custom-handler notes |
| Mobile viewport constraints | Pass/Fail/N/A | Keyboard/safe-area/dvh/scroll notes |
| WCAG 2.2 AA | Pass/Fail/N/A | Criteria and evidence; target size = 2.5.8 24x24 CSS px or exception |
| Gestures | Pass/Fail/N/A | Alternative path and cancellation notes |
| Existing contracts | Pass/Fail/N/A | Semantics, focus, keyboard, reduced motion, dismissal |`,
        },
      ],
    },
    {
      title: 'Worked example',
      content: [
        {
          type: 'prose',
          text: 'AlertDialog demonstrates the intended separation. The layout evidence covers a desktop fine-pointer story, a narrow fine-pointer story, and a mobile touch story. Width determines the geometry: above 640px the dialog keeps the 400px centered surface and horizontal Cancel/destructive row; at 640px and below it uses token gutters, stacks destructive above Cancel, and wraps labels. Pointer and hover capability are independently testable but do not choose the layout.',
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
