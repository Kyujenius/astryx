// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DropdownMenuSubContent.tsx
 * @input React, stylex, useLayer render (via Sub context), DropdownMenu context.
 * @output DropdownMenuSubContent — the flyout menu revealed by a SubTrigger.
 * @position Sub-component; must be a direct child of DropdownMenuSub, after
 *   DropdownMenuSubTrigger.
 *
 * Renders the nested `role="menu"` into the Sub's positioning layer. Opens
 * inline-end of the trigger by default (RTL-correct via logical placement) and
 * auto-flips to inline-start at the viewport edge through CSS anchor
 * positioning — the same mechanism ContextMenu uses, no bespoke floating code.
 * The flyout hosts its own roving focus + typeahead (owned by DropdownMenuSub)
 * so keyboard navigation stays scoped to this level.
 */

import {useMemo, type ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  radiusVars,
  durationVars,
  easeVars,
  shadowVars,
} from '../theme/tokens.stylex';
import {layerAnimations} from '../Layer/layerAnimations.stylex';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';
import type {BaseProps} from '../BaseProps';
import {
  DropdownMenuContext,
  useDropdownMenuContext,
  type DropdownMenuContextValue,
} from './DropdownMenuContext';
import {useDropdownMenuSubContext} from './DropdownMenuSubContext';

const styles = stylex.create({
  menu: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-0-5'],
    maxHeight: '300px',
    overflowY: 'auto',
    '--_dropdown-menu-radius': radiusVars['--radius-container'],
    '--_dropdown-menu-padding': spacingVars['--spacing-1'],
    padding: spacingVars['--spacing-1'],
    borderRadius: 'var(--_dropdown-menu-radius)',
    backgroundColor: colorVars['--color-background-popover'],
    boxShadow: shadowVars['--shadow-low'],
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: durationVars['--duration-fast'],
    transitionTimingFunction: easeVars['--ease-standard'],
  },
  popover: {
    minWidth: '160px',
    // Small inline gap so the flyout doesn't sit flush against the parent menu.
    marginInlineStart: spacingVars['--spacing-1'],
    marginInlineEnd: spacingVars['--spacing-1'],
  },
  popoverCustomWidth: (width: string | number) => ({
    minWidth: typeof width === 'number' ? `${width}px` : width,
    marginInlineStart: spacingVars['--spacing-1'],
    marginInlineEnd: spacingVars['--spacing-1'],
  }),
});

export interface DropdownMenuSubContentProps extends Pick<
  BaseProps,
  'xstyle' | 'className' | 'style'
> {
  /** The flyout's menu items. */
  children: ReactNode;
  /**
   * Fixed flyout width. Defaults to sizing to its content (min 160px).
   */
  menuWidth?: number | string;
  /**
   * Accessible name for the flyout. Defaults to the trigger's label via
   * `aria-labelledby`, so an explicit value is rarely needed.
   */
  'aria-label'?: string;
  /** Test id for the flyout menu. */
  'data-testid'?: string;
}

/**
 * The flyout menu revealed by a DropdownMenuSubTrigger. Must be a direct child
 * of DropdownMenuSub, immediately after the trigger.
 *
 * @example
 * ```
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger label="Move to" />
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem label="Folder A" onClick={() => move('a')} />
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
export function DropdownMenuSubContent({
  children,
  menuWidth,
  'aria-label': ariaLabel,
  xstyle,
  className,
  style,
  'data-testid': testId,
}: DropdownMenuSubContentProps): ReactNode {
  const menuCtx = useDropdownMenuContext();
  const subCtx = useDropdownMenuSubContext();

  const menuSize = menuCtx?.menuSize ?? 'md';
  // closeMenu here closes just this flyout (without returning focus to the
  // trigger — a leaf selection dismisses the whole stack via the root menu's
  // light dismiss). Re-providing the menu context makes nested items behave
  // exactly like top-level ones.
  const nestedMenuContext = useMemo<DropdownMenuContextValue>(
    () => ({
      menuSize,
      closeMenu: () => {
        subCtx?.close({focusTrigger: false});
      },
    }),
    [menuSize, subCtx],
  );

  if (!subCtx) {
    return null;
  }

  const popoverXstyle = menuWidth
    ? styles.popoverCustomWidth(menuWidth)
    : styles.popover;

  return subCtx.renderLayer(
    <div
      ref={subCtx.menuRef}
      id={subCtx.contentId}
      role="menu"
      aria-labelledby={ariaLabel ? undefined : subCtx.triggerId}
      aria-label={ariaLabel}
      onKeyDown={subCtx.contentKeyDown}
      onMouseEnter={subCtx.contentHoverProps.onMouseEnter}
      onMouseLeave={subCtx.contentHoverProps.onMouseLeave}
      data-testid={testId}
      {...mergeProps(
        themeProps('dropdown-menu'),
        stylex.props(styles.menu, xstyle),
        className,
        style,
      )}>
      <DropdownMenuContext value={nestedMenuContext}>
        {children}
      </DropdownMenuContext>
    </div>,
    {
      placement: 'end',
      alignment: 'start',
      xstyle: [popoverXstyle, layerAnimations.end],
    },
  );
}

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';
