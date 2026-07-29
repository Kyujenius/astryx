// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DropdownMenuSubTrigger.tsx
 * @input React, stylex, Item + Icon + DropdownMenu context + Sub context.
 * @output DropdownMenuSubTrigger — the row that reveals a submenu flyout.
 * @position Sub-component; must be a direct child of DropdownMenuSub.
 *
 * A menu row (role="menuitem", aria-haspopup="menu") that opens its sibling
 * DropdownMenuSubContent. Keyboard: Right (Left in RTL) / Enter / Space opens
 * the flyout and moves focus to its first item. Pointer: hover opens after an
 * intent delay (wired in DropdownMenuSub). A trailing caret marks it as a
 * parent row (a spinner when async children are loading).
 *
 * Composes Item like DropdownMenuItem, so it inherits the shared start-content
 * + label + description + end-content layout and the menu's item sizing.
 */

import {useCallback, type ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {Icon, renderIconSlot, type IconType} from '../Icon';
import {Spinner} from '../Spinner';
import {Item} from '../Item';
import {
  colorVars,
  spacingVars,
  typographyVars,
  typeScaleVars,
} from '../theme/tokens.stylex';
import {mergeProps} from '../utils';
import type {BaseProps} from '../BaseProps';
import {useDropdownMenuContext} from './DropdownMenuContext';
import {useDropdownMenuSubContext} from './DropdownMenuSubContext';
import {themeProps} from '../utils/themeProps';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    width: '100%',
    paddingBlock: spacingVars['--spacing-2'],
    paddingInline: spacingVars['--spacing-2'],
    borderRadius: `max(0px, calc(var(--_dropdown-menu-radius, ${spacingVars['--spacing-2']}) - var(--_dropdown-menu-padding, ${spacingVars['--spacing-1']})))`,
    fontFamily: typographyVars['--font-family-body'],
    fontSize: typeScaleVars['--text-label-size'],
    color: colorVars['--color-text-primary'],
    backgroundColor: {
      default: 'transparent',
      ':focus': colorVars['--color-overlay-hover'],
    },
    ':hover': {
      '@media (hover: hover)': {
        backgroundColor: colorVars['--color-overlay-hover'],
      },
    },
    border: 'none',
    cursor: 'pointer',
    textAlign: 'start',
    outline: 'none',
  },
  // While the flyout is open, keep the trigger visibly active so the open
  // branch reads as the current path even when focus has moved into the child.
  open: {
    backgroundColor: colorVars['--color-overlay-hover'],
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  // The trailing caret points toward where the flyout opens. It is mirrored
  // automatically in RTL because the icon lives in the inline-end slot and the
  // chevron itself is direction-agnostic via logical placement.
  caret: {
    display: 'flex',
    alignItems: 'center',
  },
});

const itemSizeStyles = stylex.create({
  sm: {
    paddingBlock: spacingVars['--spacing-1'],
    paddingInline: spacingVars['--spacing-2'],
  },
  md: {
    paddingBlock: spacingVars['--spacing-1-5'],
  },
  lg: {},
});

export interface DropdownMenuSubTriggerProps extends Pick<
  BaseProps,
  'xstyle' | 'className' | 'style'
> {
  /** Icon to display before the label. */
  icon?: ReactNode | IconType;
  /** Primary label text. */
  label: ReactNode;
  /** Secondary description text displayed below the label. */
  description?: ReactNode;
  /**
   * Show a spinner in place of the caret, e.g. while a lazy submenu's children
   * are loading. Ported from the legacy `hasSpinner` async-submenu affordance.
   * @default false
   */
  hasSpinner?: boolean;
  /** Test id for the trigger row. */
  'data-testid'?: string;
}

/**
 * The row that reveals a DropdownMenuSub's flyout. Must be a direct child of
 * DropdownMenuSub, immediately before DropdownMenuSubContent.
 *
 * @example
 * ```
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger label="Move to" icon="folder" />
 *   <DropdownMenuSubContent>…</DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
export function DropdownMenuSubTrigger({
  icon,
  label,
  description,
  hasSpinner = false,
  xstyle,
  className,
  style,
  'data-testid': testId,
}: DropdownMenuSubTriggerProps) {
  const menuCtx = useDropdownMenuContext();
  const subCtx = useDropdownMenuSubContext();
  const menuSize = menuCtx?.menuSize ?? 'md';
  const isDisabled = !(subCtx?.canOpen ?? false);

  const handleClick = useCallback(() => {
    if (!subCtx || isDisabled) {
      return;
    }
    // Click toggles the flyout, moving focus into it on open (parity with the
    // legacy onClick-opens behavior; pointer hover-open is handled separately).
    if (subCtx.isOpen) {
      subCtx.close({focusTrigger: true});
    } else {
      subCtx.open({focusFirst: true});
    }
  }, [subCtx, isDisabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!subCtx || isDisabled) {
        return;
      }
      const isRtl =
        typeof window !== 'undefined' && subCtx.triggerRef.current
          ? window.getComputedStyle(subCtx.triggerRef.current).direction ===
            'rtl'
          : false;
      const openKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
      if (e.key === openKey || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        subCtx.open({focusFirst: true});
      }
    },
    [subCtx, isDisabled],
  );

  const endAffordance = hasSpinner ? (
    <span {...stylex.props(styles.caret)}>
      <Spinner size="sm" />
    </span>
  ) : (
    <span {...stylex.props(styles.caret)}>
      <Icon icon="chevronRight" size="sm" color="secondary" />
    </span>
  );

  return (
    <Item
      ref={el => {
        subCtx?.setTriggerEl(el as HTMLDivElement | null);
      }}
      id={subCtx?.triggerId}
      role="menuitem"
      tabIndex={isDisabled ? undefined : -1}
      aria-haspopup="menu"
      aria-expanded={subCtx?.isOpen ?? false}
      aria-controls={subCtx?.isOpen ? subCtx?.contentId : undefined}
      aria-disabled={isDisabled || undefined}
      data-testid={testId}
      onMouseEnter={subCtx?.triggerHoverProps.onMouseEnter}
      onMouseLeave={subCtx?.triggerHoverProps.onMouseLeave}
      startContent={
        icon
          ? renderIconSlot(icon, {size: 'sm', color: 'secondary'})
          : undefined
      }
      label={label}
      description={description}
      endContent={endAffordance}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      isDisabled={isDisabled}
      xstyle={[
        styles.root,
        itemSizeStyles[menuSize],
        subCtx?.isOpen && styles.open,
        isDisabled && styles.disabled,
        xstyle,
      ]}
      {...mergeProps(themeProps('dropdown-menu-item', {size: menuSize}), {
        className,
        style,
      })}
    />
  );
}

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';
