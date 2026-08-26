// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';

describe('sharedResizeObserver', () => {
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockUnobserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;
  let capturedCallback: ResizeObserverCallback;
  let constructorCalls: number;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();
    constructorCalls = 0;

    global.ResizeObserver = vi.fn(function (cb: ResizeObserverCallback) {
      constructorCalls++;
      capturedCallback = cb;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    }) as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('creates a single ResizeObserver for multiple elements', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    observeResize(el1, vi.fn());
    observeResize(el2, vi.fn());

    expect(constructorCalls).toBe(1);
    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(el1);
    expect(mockObserve).toHaveBeenCalledWith(el2);

    unobserveResize(el1);
    unobserveResize(el2);
  });

  it('fires callback synchronously on registration', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el = document.createElement('div');
    const cb = vi.fn();

    observeResize(el, cb);

    // Callback should have fired once immediately with a synthetic entry
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(expect.objectContaining({target: el}));

    unobserveResize(el);
  });

  it('dispatches resize entries to the correct callbacks', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const cb1 = vi.fn();
    const cb2 = vi.fn();

    observeResize(el1, cb1);
    observeResize(el2, cb2);

    // Reset counts from the initial synchronous fire
    cb1.mockClear();
    cb2.mockClear();

    // Simulate observer firing for el1 only
    capturedCallback(
      [{target: el1} as unknown as ResizeObserverEntry],
      {} as ResizeObserver,
    );

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).not.toHaveBeenCalled();

    // Simulate observer firing for el2
    capturedCallback(
      [{target: el2} as unknown as ResizeObserverEntry],
      {} as ResizeObserver,
    );

    expect(cb2).toHaveBeenCalledTimes(1);

    unobserveResize(el1);
    unobserveResize(el2);
  });

  it('destroys the observer when the last element is unobserved', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    observeResize(el1, vi.fn());
    observeResize(el2, vi.fn());

    unobserveResize(el1);
    expect(mockDisconnect).not.toHaveBeenCalled();

    unobserveResize(el2);
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  it('recreates observer after full teardown', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el1 = document.createElement('div');
    observeResize(el1, vi.fn());
    unobserveResize(el1);
    expect(constructorCalls).toBe(1);

    const el2 = document.createElement('div');
    observeResize(el2, vi.fn());
    expect(constructorCalls).toBe(2);

    unobserveResize(el2);
  });

  it('fans out to every callback registered on the same element', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el = document.createElement('div');
    const cb1 = vi.fn();
    const cb2 = vi.fn();

    observeResize(el, cb1);
    cb1.mockClear();

    observeResize(el, cb2);

    capturedCallback(
      [{target: el} as unknown as ResizeObserverEntry],
      {} as ResizeObserver,
    );

    // Two features can watch one node without knowing about each other — a
    // card watching a child for content growth, a Text inside it watching
    // itself for truncation — so the second registration must not evict the
    // first.
    expect(cb1).toHaveBeenCalledTimes(1);
    // cb2: once on registration, once from the observer.
    expect(cb2).toHaveBeenCalledTimes(2);

    unobserveResize(el);
  });

  it('is called with a callback everywhere in core', async () => {
    // The one-argument form removes EVERY callback on the element, so a
    // caller using it takes another feature's callback out with its own.
    // Nothing in core may rely on it.
    const {readdirSync, readFileSync} = await import('node:fs');
    const {join} = await import('node:path');
    const src = join(__dirname, '..');

    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, {withFileTypes: true})) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (
          /\.tsx?$/.test(entry.name) &&
          !entry.name.includes('.test.')
        ) {
          files.push(full);
        }
      }
    };
    walk(src);

    const oneArg: string[] = [];
    for (const file of files) {
      if (file.endsWith('sharedResizeObserver.ts')) {
        continue;
      }
      for (const line of readFileSync(file, 'utf-8').split('\n')) {
        const call = /unobserveResize\(([^)]*)\)/.exec(line);
        if (call && call[1].trim() !== '' && !call[1].includes(',')) {
          oneArg.push(`${file.slice(src.length + 1)}: ${line.trim()}`);
        }
      }
    }

    expect(oneArg).toEqual([]);
  });

  it('keeps the other callbacks when one unobserves by identity', async () => {
    const {observeResize, unobserveResize} =
      await import('./sharedResizeObserver');

    const el = document.createElement('div');
    const cb1 = vi.fn();
    const cb2 = vi.fn();

    observeResize(el, cb1);
    observeResize(el, cb2);
    unobserveResize(el, cb1);
    cb1.mockClear();
    cb2.mockClear();

    capturedCallback(
      [{target: el} as unknown as ResizeObserverEntry],
      {} as ResizeObserver,
    );

    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).toHaveBeenCalledTimes(1);
    expect(mockUnobserve).not.toHaveBeenCalled();

    unobserveResize(el, cb2);
    expect(mockUnobserve).toHaveBeenCalledWith(el);
  });
});
