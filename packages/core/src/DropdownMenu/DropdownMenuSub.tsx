// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DropdownMenuSub.tsx
 * @input Uses React, useLayer (context mode), useListFocus, useMenuHover,
 *   useTypeahead, DropdownMenu item roles.
 * @output Exports DropdownMenuSub — the orchestrator for a nested flyout menu.
 * @position Sub-component; wraps a DropdownMenuSubTrigger + DropdownMenuSubContent
 *   inside a DropdownMenu (or ContextMenu).
 *
 * Owns the flyout's open state, its own positioning Layer (auto-flip via CSS
 * anchor positioning, opening inline-end by default so it is RTL-correct), a
 * dedicated useListFocus for the nested items, and pointer hover-intent so
 * moving onto the trigger opens the flyout and moving away closes it. Cross-
 * level keyboard routing (Right/Enter opens + focuses first child; Left/Escape
 * closes + returns focus to the trigger) is wired here and consumed by the
 * trigger/content via context.
 *
 * Prior art: legacy internal XDS `XDSDropdownSubMenuItem` (APG menubar-
 * navigation submenu). This re-expresses the same contract on Astryx
 * primitives (useLayer + useListFocus + useMenuHover) rather than the www
 * hovercard stack.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/DropdownMenu/DropdownMenuSub.doc.mjs
 * - /packages/core/src/DropdownMenu/DropdownMenuSub.test.tsx
 * - /packages/core/src/DropdownMenu/index.ts
 * - /apps/storybook/stories/DropdownMenu.stories.tsx
 * - /packages/cli/templates/blocks/components/DropdownMenu/ (showcase blocks)
 */

import React, {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {useLayer} from '../Layer/useLayer';
import {useListFocus} from '../hooks/useListFocus';
import {useMenuHover} from '../hooks/useMenuHover';
import {useTypeahead} from '../hooks/useTypeahead';
import {MENU_ITEM_ROLES, MENU_ITEM_SELECTOR} from './menuItemRoles';
import {
  DropdownMenuSubContext,
  type DropdownMenuSubContextValue,
} from './DropdownMenuSubContext';

export interface DropdownMenuSubProps {
  /**
   * A `DropdownMenuSubTrigger` followed by a `DropdownMenuSubContent`.
   */
  children: ReactNode;
  /**
   * Whether the submenu is disabled. A disabled submenu renders its trigger
   * but never opens the flyout.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Called when the flyout opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Groups a nested-menu trigger with its flyout content. Place inside a
 * DropdownMenu (or ContextMenu) alongside plain items.
 *
 * @example
 * ```
 * <DropdownMenu button={{label: 'Actions'}}>
 *   <DropdownMenuItem label="Rename" onClick={rename} />
 *   <DropdownMenuSub>
 *     <DropdownMenuSubTrigger label="Move to" icon="folder" />
 *     <DropdownMenuSubContent>
 *       <DropdownMenuItem label="Folder A" onClick={() => move('a')} />
 *       <DropdownMenuItem label="Folder B" onClick={() => move('b')} />
 *     </DropdownMenuSubContent>
 *   </DropdownMenuSub>
 * </DropdownMenu>
 * ```
 */
export function DropdownMenuSub({
  children,
  isDisabled = false,
  onOpenChange,
}: DropdownMenuSubProps) {
  const contentId = useId();
  const triggerId = useId();
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const canOpen = !isDisabled;

  const [isOpen, setIsOpen] = useState(false);

  const layer = useLayer({
    mode: 'context',
    lightDismiss: false,
    onShow: useCallback(() => {
      setIsOpen(true);
      onOpenChange?.(true);
    }, [onOpenChange]),
    onHide: useCallback(() => {
      setIsOpen(false);
      onOpenChange?.(false);
    }, [onOpenChange]),
  });

  const show = useCallback(() => {
    if (canOpen) {
      layer.show();
    }
  }, [canOpen, layer]);
  const hide = useCallback(() => {
    layer.hide();
  }, [layer]);

  // Dedicated roving-focus + typeahead for this flyout level. Each Sub owns its
  // own useListFocus so focus roves within a single level; cross-level moves are
  // explicit (open focuses first child, close returns to trigger).
  const {
    listRef: menuRef,
    handleKeyDown: listNavKeyDown,
    focusFirst,
    focusItem,
  } = useListFocus<HTMLDivElement>({
    itemSelector: MENU_ITEM_SELECTOR,
    wrap: false,
    onEscape: () => close({focusTrigger: true}),
  });

  const getMenuItems = useCallback(
    (): HTMLElement[] =>
      menuRef.current
        ? Array.from(
            menuRef.current.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR),
          )
        : [],
    [menuRef],
  );
  const typeahead = useTypeahead({
    getItemLabels: () => getMenuItems().map(el => el.textContent),
    onMatch: focusItem,
    getCurrentIndex: () =>
      getMenuItems().findIndex(
        el =>
          el === document.activeElement || el.contains(document.activeElement),
      ),
  });

  // Hover-intent: entering the trigger opens after a short delay; leaving
  // either surface closes after a delay. Hover-open does not steal focus (the
  // pointer user's focus stays put until they keyboard/click in).
  const {triggerProps, contentProps} = useMenuHover<HTMLDivElement>({
    show,
    hide,
    isOpen,
    isEnabled: canOpen,
  });

  const open = useCallback(
    (options?: {focusFirst?: boolean}) => {
      if (!canOpen) {
        return;
      }
      layer.show();
      if (options?.focusFirst) {
        requestAnimationFrame(() => focusFirst());
      }
    },
    [canOpen, layer, focusFirst],
  );

  const close = useCallback(
    (options?: {focusTrigger?: boolean}) => {
      layer.hide();
      if (options?.focusTrigger !== false) {
        triggerRef.current?.focus();
      }
    },
    [layer],
  );

  // Single ref for the trigger row: store it for focus management AND wire it
  // as the flyout's positioning anchor (CSS anchor positioning). Combining both
  // here means the trigger attaches one ref callback and never mutates a ref
  // returned by another function.
  const setTriggerEl = useCallback(
    (el: HTMLDivElement | null) => {
      triggerRef.current = el;
      layer.ref(el);
    },
    [layer],
  );

  // Enter/Space activate the focused row; typeahead jumps by first character;
  // everything else (arrows/Home/End, RTL-aware) defers to useListFocus. Left
  // (or Right in RTL) closes the flyout and returns focus to the trigger,
  // completing the APG submenu contract.
  const contentKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const focused = document.activeElement as HTMLElement | null;
        if (
          focused &&
          MENU_ITEM_ROLES.has(focused.getAttribute('role') ?? '')
        ) {
          focused.click();
        }
        return;
      }
      const isRtl =
        typeof window !== 'undefined' && menuRef.current
          ? window.getComputedStyle(menuRef.current).direction === 'rtl'
          : false;
      const closeKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === closeKey) {
        e.preventDefault();
        close({focusTrigger: true});
        return;
      }
      if (typeahead.onKeyDown(e)) {
        e.preventDefault();
        return;
      }
      listNavKeyDown(e);
    },
    [close, listNavKeyDown, typeahead, menuRef],
  );

  const contextValue = useMemo<DropdownMenuSubContextValue>(
    () => ({
      isOpen,
      contentId,
      triggerId,
      canOpen,
      open,
      close,
      triggerRef,
      setTriggerEl,
      menuRef,
      triggerHoverProps: {
        onMouseEnter: triggerProps.onMouseEnter,
        onMouseLeave: triggerProps.onMouseLeave,
      },
      contentHoverProps: {
        onMouseEnter: contentProps.onMouseEnter,
        onMouseLeave: contentProps.onMouseLeave,
      },
      contentKeyDown,
      renderLayer: layer.render,
    }),
    [
      isOpen,
      contentId,
      triggerId,
      canOpen,
      open,
      close,
      layer.render,
      menuRef,
      setTriggerEl,
      triggerProps.onMouseEnter,
      triggerProps.onMouseLeave,
      contentProps.onMouseEnter,
      contentProps.onMouseLeave,
      contentKeyDown,
    ],
  );

  return (
    <DropdownMenuSubContext value={contextValue}>
      {children}
    </DropdownMenuSubContext>
  );
}

DropdownMenuSub.displayName = 'DropdownMenuSub';
