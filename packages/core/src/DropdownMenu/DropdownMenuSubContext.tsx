// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DropdownMenuSubContext.tsx
 * @output Context that coordinates a DropdownMenuSub trigger and its flyout.
 * @position Internal; provided by DropdownMenuSub, read by
 *   DropdownMenuSubTrigger and DropdownMenuSubContent.
 *
 * The Sub owns the flyout's open state, its positioning layer, and the
 * roving-focus container for the nested items. Trigger and content read this
 * so the trigger can toggle/focus the flyout and the content can register the
 * list container + accessible wiring (aria-controls / aria-labelledby).
 */

import {createContext, use, type ReactNode, type RefObject} from 'react';
import type {ContextRenderProps} from '../Layer/useLayer';

export interface DropdownMenuSubContextValue {
  /** Whether the flyout is open. */
  isOpen: boolean;
  /** Stable id of the flyout menu (SubTrigger's aria-controls). */
  contentId: string;
  /** Stable id of the trigger row (SubContent's aria-labelledby). */
  triggerId: string;
  /** Whether the submenu can open (enabled). */
  canOpen: boolean;
  /** Open the flyout. Pass focusFirst to move focus into the first child. */
  open: (options?: {focusFirst?: boolean}) => void;
  /** Close the flyout and (by default) return focus to the trigger. */
  close: (options?: {focusTrigger?: boolean}) => void;
  /** Ref for the trigger row element. */
  triggerRef: RefObject<HTMLDivElement | null>;
  /**
   * Ref callback for the trigger row. Wires it as the flyout's positioning
   * anchor AND stores it for focus management, so the trigger attaches a single
   * ref.
   */
  setTriggerEl: (el: HTMLDivElement | null) => void;
  /** Ref for the flyout's list container (roving focus lives here). */
  menuRef: RefObject<HTMLDivElement | null>;
  /** Pointer-intent handlers for the trigger row (hover-open). */
  triggerHoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  /** Pointer-intent handlers for the flyout surface (keep-open on hover). */
  contentHoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  /** Key handler for the flyout list (arrows / Enter / Space / typeahead). */
  contentKeyDown: (e: React.KeyboardEvent) => void;
  /** Render the flyout into its positioning layer. */
  renderLayer: (children: ReactNode, props?: ContextRenderProps) => ReactNode;
}

export const DropdownMenuSubContext =
  createContext<DropdownMenuSubContextValue | null>(null);
DropdownMenuSubContext.displayName = 'DropdownMenuSubContext';

/**
 * Read the enclosing DropdownMenuSub's coordination state.
 * Returns null outside a DropdownMenuSub.
 */
export function useDropdownMenuSubContext(): DropdownMenuSubContextValue | null {
  return use(DropdownMenuSubContext);
}
