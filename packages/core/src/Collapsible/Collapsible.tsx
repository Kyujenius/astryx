// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file Collapsible.tsx
 * @input Uses React, StyleX, useCollapsible hook, CollapsibleGroupPresentationContext, getIcon, theme tokens
 * @output Exports Collapsible component and CollapsibleProps
 * @position Collapsible content primitive — trigger toggles visibility of children
 *
 * Collapsible is a standalone primitive that makes any content collapsible.
 * It renders a trigger area (always visible) and a content area that toggles.
 * Handles state management, accessibility (aria-expanded + aria-controls linking
 * the trigger to its content region), and chevron indicator.
 *
 * Works standalone or coordinated by CollapsibleGroup via the `value` prop.
 * When the surrounding CollapsibleGroup sets `hasDividers`, each Collapsible
 * draws its own row chrome (borderBlockStart suppressed on :first-child, plus
 * density padding) from CollapsibleGroupPresentationContext — StyleX has no
 * child selectors, so the group cannot draw it from outside. The presentation
 * context is reset around children so nested collapsibles stay chrome-free.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Collapsible/index.ts (exports)
 * - /packages/core/src/Collapsible/Collapsible.doc.mjs
 * - /apps/storybook/stories/Collapsible.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/Collapsible/ (showcase blocks)
 */

import {
  use,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  borderVars,
  colorVars,
  typographyVars,
  fontWeightVars,
  spacingVars,
  typeScaleVars,
  durationVars,
  easeVars,
} from '../theme/tokens.stylex';

import {useCollapsible} from './useCollapsible';
import {CollapsibleGroupPresentationContext} from './CollapsibleGroupContext';
import {Icon} from '../Icon';
import {mergeProps} from '../utils';
import type {BaseProps} from '../BaseProps';
import {themeProps} from '../utils/themeProps';
import {focusOutlineProps} from '../utils/focusOutline.stylex';

const styles = stylex.create({
  root: {
    width: '100%',
  },
  // Trigger button — full width, flex row, no browser button styling.
  // Anchors heading-adjacent typography (body family, large size, semibold)
  // so the label reads as a section header regardless of where the
  // Collapsible is placed. External themes retarget it independently from the
  // content via the `astryx-collapsible-trigger` target — e.g. a heading font
  // on the trigger while the content stays on the body font.
  trigger: {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // WCAG 2.5.8 AA target-size floor. Undensified, this button is only as
    // tall as its own line box — 17px at the default `large` type step, and
    // shorter still if a caller gives the trigger a smaller type — which is
    // under the 24x24 minimum. Width is never the problem (the button is
    // full-bleed), so a min-height is the whole fix.
    //
    // Coarse pointers get the system's 44px comfortable-touch floor (the same
    // one TouchDateField and Table filtering use). Fine pointers keep the 24px
    // AA floor, preserving the point of compact/balanced/spacious density on
    // desktop. A flat 44px minimum would make all three density settings look
    // identical in the very data-heavy surfaces they exist for.
    minHeight: {
      default: '24px',
      '@media (pointer: coarse)': spacingVars['--spacing-11'],
    },
    cursor: {
      default: 'pointer',
      ':is(:disabled,[aria-disabled="true"])': 'default',
    },
    fontFamily: typographyVars['--font-family-body'],
    fontSize: typeScaleVars['--text-large-size'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
    color: colorVars['--color-text-primary'],
    textAlign: 'start',
    paddingBlock: 0,
    // `all: unset` above wipes the UA focus outline; restore a keyboard-only
    // focus ring using the standard token/offset (WCAG 2.4.7).
  },
  // Capsize: trim leading from text triggers
  triggerLabel: {
    textBoxEdge: 'cap alphabetic',
    textBoxTrim: 'trim-both',
  },
  // Disabled trigger — non-interactive, dimmed. Native `disabled` on the
  // button blocks click + keyboard activation; these styles restore the
  // visual affordance that `all: unset` wipes.
  triggerDisabled: {
    cursor: 'default',
    opacity: 0.5,
  },
  // Chevron indicator
  chevron: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    // The chevron is sized off the trigger's own type size (--text-large-size,
    // 17px), which sits between Icon's `sm` (16px) and `md` (20px) boxes.
    // Pinning the box to the token keeps the glyph exactly the size it was
    // when it was a bare 1em SVG inheriting the trigger's font-size, and keeps
    // it tracking the trigger if a theme retunes that step.
    width: typeScaleVars['--text-large-size'],
    height: typeScaleVars['--text-large-size'],
    fontSize: typeScaleVars['--text-large-size'],
    transitionProperty: 'transform',
    transitionDuration: durationVars['--duration-fast'],
    transitionTimingFunction: easeVars['--ease-standard'],
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  chevronClosed: {
    transform: 'rotate(0deg)',
  },
  // Content area — an animatable height track.
  //
  // Was `display: none`, which cannot animate at all. `interpolate-size:
  // allow-keywords` makes `height: 0 -> auto` a real transition, so the panel
  // interpolates from nothing to exactly its content height without anyone
  // measuring it in JS. Browsers without it simply snap open, which is the
  // behaviour this component had before — the degradation path is the status
  // quo, not a regression.
  //
  // Nothing here hides the collapsed subtree from assistive tech or the tab
  // order — a zero-height clipped box is still "rendered" as far as the a11y
  // tree is concerned. That is the `inert` and `hidden="until-found"`
  // attributes' job; see the layout effect in the component, which explains
  // why the second one cannot be a style and has to be timed around the
  // transition.
  //
  // Duration and easing come from private custom properties rather than being
  // baked in, so a theme (or a preview harness) can retune the feel without
  // reaching into the component. Open and close read separate properties
  // because they belong on the state each move ends in: the closed style
  // governs closing, the open style governs opening.
  contentTrack: {
    interpolateSize: 'allow-keywords',
    height: 0,
    overflow: 'hidden',
    transitionProperty: 'height',
    transitionDuration: `var(--_collapsible-close-duration, ${durationVars['--duration-medium']})`,
    transitionTimingFunction: `var(--_collapsible-close-ease, ${easeVars['--ease-standard']})`,
    '@media (prefers-reduced-motion: reduce)': {transitionDuration: '1ms'},
  },
  contentTrackOpen: {
    height: 'auto',
    transitionDuration: `var(--_collapsible-open-duration, ${durationVars['--duration-medium']})`,
    transitionTimingFunction: `var(--_collapsible-open-ease, ${easeVars['--ease-standard']})`,
    '@media (prefers-reduced-motion: reduce)': {transitionDuration: '1ms'},
  },
  // Anchors body typography so revealed text renders at the system's body
  // scale (family/size/weight/leading) instead of inheriting from wherever
  // the Collapsible is placed. External themes override via the
  // `astryx-collapsible-content` target, independently from the trigger.
  //
  // The padding lives here, inside the clipped track, rather than on the
  // track itself: padding on a `height: 0` box still paints, so the collapsed
  // panel would keep a few stubborn pixels of gap.
  content: {
    paddingBlockStart: spacingVars['--spacing-1'],
    fontFamily: typographyVars['--font-family-body'],
    fontSize: typeScaleVars['--text-body-size'],
    fontWeight: typeScaleVars['--text-body-weight'],
    lineHeight: typeScaleVars['--text-body-leading'],
    color: colorVars['--color-text-primary'],
  },
  // Content fade, on the inner box rather than the track.
  //
  // Height alone reads as a clip: the text is fully opaque from the first
  // frame and the panel edge wipes down over it. Fading the content as the box
  // grows is what makes it read as arriving. It has to be a separate element
  // from the track — opacity on the track would fade the clip itself.
  //
  // The fade runs in PARALLEL with the height, on the same duration and the
  // same curve, so the two land together and read as one move. (An earlier
  // pass staggered them — hold the content back, then fade it in behind the
  // box. It measured well and looked like two events; the parallel ramp is
  // what a reader perceives as the panel arriving, and it is what the
  // reference implementations of this pattern do.) There is no separate
  // opacity delay to tune as a result: the fade inherits whichever of the
  // open/close duration properties is in play.
  contentFade: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: `var(--_collapsible-close-duration, ${durationVars['--duration-medium']})`,
    transitionTimingFunction: `var(--_collapsible-close-ease, ${easeVars['--ease-standard']})`,
    '@media (prefers-reduced-motion: reduce)': {transitionDuration: '1ms'},
  },
  contentFadeOpen: {
    opacity: 1,
    transitionDuration: `var(--_collapsible-open-duration, ${durationVars['--duration-medium']})`,
    transitionTimingFunction: `var(--_collapsible-open-ease, ${easeVars['--ease-standard']})`,
    '@media (prefers-reduced-motion: reduce)': {transitionDuration: '1ms'},
  },
  // Group divider chrome — a hairline above every item except the first.
  // The group's wrapper (or 'all' mode) owns the outer edges.
  divided: {
    borderBlockStartWidth: {
      default: borderVars['--border-width'],
      ':first-child': '0',
    },
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: colorVars['--color-border'],
  },
});

// Density padding for divided/padded accordion rows. paddingBlock mapping
// follows Table's density scale (spacing-1/2/3); content only pads its end
// so text doesn't sit on the divider below (block-start stays spacing-1).
const densityStyles = stylex.create({
  triggerCompact: {paddingBlock: spacingVars['--spacing-1']},
  triggerBalanced: {paddingBlock: spacingVars['--spacing-2']},
  triggerSpacious: {paddingBlock: spacingVars['--spacing-3']},
  contentCompact: {paddingBlockEnd: spacingVars['--spacing-1']},
  contentBalanced: {paddingBlockEnd: spacingVars['--spacing-2']},
  contentSpacious: {paddingBlockEnd: spacingVars['--spacing-3']},
});

// Upper bound for how long a close is given to animate before the a11y
// attribute is applied regardless. Comfortably past the slowest motion token
// (--duration-slow-max, 1.3s) so it never pre-empts a real transition, and
// short enough that a browser which ran no transition at all is not left with
// collapsed content in the a11y tree for meaningfully long.
const FALLBACK_SETTLE_MS = 1500;

const triggerDensity = {
  compact: densityStyles.triggerCompact,
  balanced: densityStyles.triggerBalanced,
  spacious: densityStyles.triggerSpacious,
} as const;

const contentDensity = {
  compact: densityStyles.contentCompact,
  balanced: densityStyles.contentBalanced,
  spacious: densityStyles.contentSpacious,
} as const;

export interface CollapsibleProps extends BaseProps {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Content shown in the trigger area (always visible).
   * Rendered inside a button with aria-expanded and a chevron indicator.
   */
  trigger: ReactNode;

  /**
   * Content that collapses/expands when the trigger is clicked.
   */
  children?: ReactNode;

  /**
   * Default open state for uncontrolled usage.
   * @default true
   */
  defaultIsOpen?: boolean;

  /**
   * Controlled open state. When provided, the component is fully controlled.
   */
  isOpen?: boolean;

  /**
   * Whether the collapsible is disabled. A disabled item can't be toggled —
   * its trigger is non-interactive and dimmed. Following the system-wide
   * disabled convention, the trigger uses `aria-disabled` (not the native
   * `disabled` attribute) and drops out of the tab order, staying perceivable
   * to assistive tech. The content stays in whatever open state it was;
   * disabling doesn't collapse an already-open item.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Callback when the open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Unique identifier for this collapsible within an CollapsibleGroup.
   * Required when using inside a group for coordination.
   */
  value?: string;

  /**
   * Test ID for the collapsible element.
   */
  'data-testid'?: string;
}

/**
 * A primitive that makes any content collapsible.
 *
 * Renders a trigger area (always visible) with a chevron indicator,
 * and a content area that toggles visibility on click.
 * Handles its own state by default, or defers to CollapsibleGroup
 * when a `value` prop is provided and a group is present.
 *
 * Use inside Card for elevated collapsible sections.
 * Wrap multiple instances in CollapsibleGroup for accordion behavior.
 *
 * @example
 * ```
 * <Collapsible trigger="Details">
 *   <Text type="body">Collapsible content</Text>
 * </Collapsible>
 * <Card>
 *   <Collapsible trigger="Settings">
 *     <SettingsForm />
 *   </Collapsible>
 * </Card>
 * <CollapsibleGroup type="single" defaultValue="general">
 *   <VStack gap={2}>
 *     <Card>
 *       <Collapsible trigger="General" value="general">
 *         <GeneralSettings />
 *       </Collapsible>
 *     </Card>
 *     <Card>
 *       <Collapsible trigger="Advanced" value="advanced">
 *         <AdvancedSettings />
 *       </Collapsible>
 *     </Card>
 *   </VStack>
 * </CollapsibleGroup>
 * ```
 */
export function Collapsible({
  trigger,
  children,
  defaultIsOpen,
  isOpen: controlledIsOpen,
  isDisabled = false,
  onOpenChange,
  value,
  ref,
  xstyle,
  className,
  style,
  ...props
}: CollapsibleProps) {
  // Build the config for the hook
  const collapsibleConfig =
    controlledIsOpen !== undefined
      ? {isOpen: controlledIsOpen, onOpenChange}
      : {defaultIsOpen: defaultIsOpen ?? true, onOpenChange};

  const {isOpen, toggle} = useCollapsible({
    isCollapsible: collapsibleConfig,
    value,
  });

  // Activation is blocked by this guard rather than the native `disabled`
  // attribute, so the trigger keeps `aria-disabled` semantics and stays
  // discoverable. A native `disabled` button would silently swallow events
  // (e.g. a wrapping tooltip's hover) — the system-wide disabled convention.
  const handleToggle = () => {
    if (isDisabled) {
      return;
    }
    toggle();
  };

  const presentation = use(CollapsibleGroupPresentationContext);
  const isDivided = presentation?.hasDividers ?? false;
  const density = presentation?.density ?? null;

  // Links the trigger to the region it shows/hides so assistive tech can move
  // from the button to its controlled content (disclosure pattern).
  const contentId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(isOpen);
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const canInterpolateSize =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('interpolate-size', 'allow-keywords');
  // Browsers without the feature derive visual state directly and snap — the
  // previous Collapsible behaviour. Supporting browsers use the deliberately
  // frame-delayed state below so `hidden="until-found"` can come off and the
  // content can lay itself out before `height: auto` is applied.
  const visuallyOpen = canInterpolateSize ? isExpanded : isOpen;

  // Find-in-page, and taking the collapsed subtree out of the a11y tree.
  //
  // Two attributes share this job, landing at different moments.
  //
  // `inert` (below, in the JSX) rides directly off `isOpen`, so it is in the
  // server HTML and applies on the very render that closes the panel. It is
  // what keeps collapsed content out of the tab order and the a11y tree,
  // including during the close animation, when the panel is visually shutting
  // but its content is still on screen.
  //
  // `hidden="until-found"` is the upgrade over the `display: none` this
  // component used to use: it hides the subtree the same way, but the browser
  // can still find text inside it with Ctrl+F (or a scroll-to-text link),
  // reveals it on a match, and fires `beforematch` on the way. On an FAQ that
  // is the difference between search working and silently missing the answer.
  // It is applied imperatively because React types `hidden` as a boolean and
  // coerces any truthy value to `hidden=""` — plain `display: none`, which
  // would stop the panel opening at all.
  //
  // The attribute carries `content-visibility: hidden`, and that is what makes
  // the timing fiddly at BOTH ends:
  //
  // - Opening takes two frames, and has to. While the attribute is set the
  //   content is not laid out, so `height: auto` resolves to zero; flip the
  //   attribute off and the height on together and the transition has no
  //   distance to travel and the panel snaps. So frame one removes the
  //   attribute only — the content lays out behind a track that is still
  //   `height: 0` — and frame two applies the open height, which now resolves
  //   against real content and animates. That is what `isExpanded` is for: the
  //   STYLE state, one frame behind `isOpen`, which is the semantic state.
  //   (A JS height animation would not need this; it sets explicit pixel
  //   heights and never asks the browser to resolve `auto`. The frame is the
  //   price of animating on the compositor instead.)
  // - Closing applies the attribute only after the transition has finished,
  //   or it blanks the content on the frame it lands and leaves an empty box
  //   to shrink.
  //
  // transitionend is the accurate "finished" signal, but it never fires when
  // no transition ran — a browser without `interpolate-size` snaps, and a
  // panel inside a `display: none` ancestor never animates. The timer is the
  // backstop, so collapsed content cannot be left in the a11y tree; whichever
  // arrives first wins, and re-opening cancels both.

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;

    if (isOpen) {
      track.removeAttribute('hidden');
      if (!canInterpolateSize) {
        // The visual state already derives directly from isOpen in this arm;
        // there is no delayed state to maintain and no empty frame to pay.
        return;
      }
      const frame = requestAnimationFrame(() => setIsExpanded(true));
      return () => cancelAnimationFrame(frame);
    }

    // The initial collapsed render has no open panel to animate from. Hide it
    // now rather than waiting 1.5s for a transition that cannot exist. A real
    // close arrives with the previous semantic state still open, so it falls
    // through and animates first.
    if (!wasOpen) {
      track.setAttribute('hidden', 'until-found');
      return;
    }

    // Without interpolate-size there is no close transition either: the visual
    // state already snapped to closed from isOpen, so put the find-in-page
    // attribute on now. Supporting browsers schedule the style change for the
    // next frame, after this effect has installed the transitionend listener.
    if (!canInterpolateSize) {
      track.setAttribute('hidden', 'until-found');
      return;
    }

    const frame = requestAnimationFrame(() => setIsExpanded(false));

    let settled = false;
    const hide = () => {
      if (!settled) {
        settled = true;
        track.setAttribute('hidden', 'until-found');
      }
    };
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === track && event.propertyName === 'height') {
        hide();
      }
    };
    track.addEventListener('transitionend', onTransitionEnd);
    const fallback = window.setTimeout(hide, FALLBACK_SETTLE_MS);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('transitionend', onTransitionEnd);
      window.clearTimeout(fallback);
    };
  }, [canInterpolateSize, isOpen]);

  // The browser fires `beforematch` when find-in-page matches inside the
  // collapsed panel, then reveals it by removing the attribute itself. React
  // does not know that happened, so without this the DOM would be showing an
  // open panel while state still said closed — and the next render would slam
  // it shut under the user, having just shown them their match. Routing
  // through the same toggle a click uses keeps a controlled parent and a
  // CollapsibleGroup in step too.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const onBeforeMatch = () => {
      if (!isOpen && !isDisabled) {
        toggle();
      }
    };
    track.addEventListener('beforematch', onBeforeMatch);
    return () => track.removeEventListener('beforematch', onBeforeMatch);
  }, [isOpen, isDisabled, toggle]);

  return (
    <div
      ref={ref}
      {...mergeProps(
        themeProps('collapsible', {
          density: density ?? undefined,
        }),
        stylex.props(styles.root, isDivided && styles.divided, xstyle),
        className,
        style,
      )}
      {...props}>
      <button
        type="button"
        onClick={handleToggle}
        aria-disabled={isDisabled || undefined}
        aria-expanded={isOpen}
        aria-controls={contentId}
        // A disabled trigger drops out of the tab order so it isn't a silently
        // dead tab stop; activation stays blocked by the handleToggle guard,
        // and aria-disabled keeps the state perceivable to assistive tech —
        // the system-wide disabled convention (never native `disabled`, which
        // would swallow events like a wrapping tooltip's hover).
        tabIndex={isDisabled ? -1 : undefined}
        {...mergeProps(
          themeProps('collapsible-trigger', {
            density: density ?? undefined,
          }),
          focusOutlineProps.focusVisible(
            styles.trigger,
            density != null && triggerDensity[density],
            isDisabled && styles.triggerDisabled,
          ),
        )}>
        <span {...stylex.props(styles.triggerLabel)}>{trigger}</span>
        <Icon
          icon="chevronDown"
          // Nearest size to the trigger's 17px type step; `chevron` re-pins the
          // exact box (see the style) so the glyph does not resize.
          size="sm"
          // Was `--color-icon-secondary` on the old wrapper span; `secondary`
          // is the same token, expressed as an Icon color.
          color="secondary"
          xstyle={[
            styles.chevron,
            isOpen ? styles.chevronOpen : styles.chevronClosed,
          ]}
        />
      </button>
      <div
        id={contentId}
        ref={trackRef}
        // `inert` is a real boolean attribute, so React renders it directly and
        // it is present in the server HTML — which matters, because it is what
        // keeps a collapsed panel out of the tab order and the a11y tree
        // before hydration and during the close animation. (`hidden` lands
        // later; see the effect above.) Without it there is a window where the
        // panel is visually shut but tabbing still walks into it.
        inert={!isOpen}
        {...mergeProps(
          themeProps('collapsible-content', {
            density: density ?? undefined,
          }),
          stylex.props(
            styles.contentTrack,
            visuallyOpen && styles.contentTrackOpen,
          ),
        )}>
        <div
          {...stylex.props(
            styles.content,
            styles.contentFade,
            visuallyOpen && styles.contentFadeOpen,
            density != null && contentDensity[density],
          )}>
          {presentation != null ? (
            <CollapsibleGroupPresentationContext value={null}>
              {children}
            </CollapsibleGroupPresentationContext>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

Collapsible.displayName = 'Collapsible';
