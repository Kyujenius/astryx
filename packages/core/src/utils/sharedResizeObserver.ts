// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file sharedResizeObserver.ts
 * @input ResizeObserver API
 * @output Exports observeResize / unobserveResize for shared observation
 * @position Utility; consumed by useTruncation, useOverflow, and any component
 *   that needs resize observation without creating per-instance observers
 *
 * A single ResizeObserver can observe thousands of elements. Creating one
 * per component (e.g. per table cell) is wasteful — browsers batch
 * observations per observer instance, so a shared observer means one
 * callback dispatch per animation frame instead of N.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/utils/index.ts (exports)
 * - /packages/core/src/Text/useTruncation.ts (primary consumer)
 */

type ResizeCallback = (entry: ResizeObserverEntry) => void;

let observer: ResizeObserver | null = null;
const callbacks = new Map<Element, Set<ResizeCallback>>();

/**
 * The shared observer, or null where the API does not exist (jsdom, an old
 * browser). Callers still get the one-shot measurement `observeResize` fires
 * on registration; live resize updates are the part that needs the API.
 */
function getObserver(): ResizeObserver | null {
  if (typeof ResizeObserver === 'undefined') {
    return null;
  }
  if (!observer) {
    observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const forElement = callbacks.get(entry.target);
        if (forElement) {
          // Copy: a callback may observe or unobserve during dispatch.
          for (const cb of [...forElement]) {
            cb(entry);
          }
        }
      }
    });
  }
  return observer;
}

/**
 * Observe an element's size via a shared ResizeObserver singleton.
 *
 * Fires the callback once synchronously on registration (with a
 * synthetic entry) so callers don't need separate initial-measurement
 * logic. Subsequent callbacks fire on actual resizes.
 *
 * An element may carry several callbacks: two independent features can watch
 * the same node — a card watching its children for content growth and a Text
 * inside it watching itself for truncation — and neither knows about the
 * other. Registering the same callback twice is a no-op.
 *
 * Call `unobserveResize` when the element unmounts or observation is
 * no longer needed. The shared observer is destroyed when the last
 * element is unobserved.
 *
 * @example
 * ```
 * observeResize(element, (entry) => {
 *   console.log(entry.contentBoxSize);
 * });
 *
 * // Cleanup:
 * unobserveResize(element, callback);
 * ```
 */
export function observeResize(
  element: Element,
  callback: ResizeCallback,
): void {
  const existing = callbacks.get(element);
  if (existing) {
    existing.add(callback);
  } else {
    callbacks.set(element, new Set([callback]));
  }
  getObserver()?.observe(element);

  // Fire once immediately so callers get an initial measurement
  // without duplicating their logic outside the observer path.
  const entry: Partial<ResizeObserverEntry> = {target: element};
  callback(entry as ResizeObserverEntry);
}

/**
 * Stop observing an element. Pass the callback that was registered to remove
 * only that one; omitting it removes every callback on the element, which is
 * only safe when the caller owns the element. If no elements remain, the
 * shared observer is disconnected and released for garbage collection.
 */
export function unobserveResize(
  element: Element,
  callback?: ResizeCallback,
): void {
  const forElement = callbacks.get(element);
  if (!forElement) {
    return;
  }
  if (callback) {
    forElement.delete(callback);
  } else {
    forElement.clear();
  }
  if (forElement.size > 0) {
    return;
  }
  callbacks.delete(element);
  if (observer) {
    observer.unobserve(element);
    if (callbacks.size === 0) {
      observer.disconnect();
      observer = null;
    }
  }
}
