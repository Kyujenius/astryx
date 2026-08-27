// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file neutralTheme.test.ts
 * @input Neutral's responsive width tiers and coarse-pointer typography
 * @output Regression coverage for the mobile/tablet touch scale and emitted CSS
 * @position Neutral theme package; keeps the experiment scoped to this theme
 */

import {describe, expect, it} from 'vitest';
import {generateTierCSS} from '@astryxdesign/core/theme';
import {neutralTheme} from './neutralTheme';

describe('Neutral responsive typography', () => {
  it('raises the type scale only for coarse pointers through tablet widths', () => {
    const layers = neutralTheme.__tiers ?? [];

    expect(
      layers.map(layer => ({
        tier: layer.tier,
        condition: layer.condition,
        query: layer.query,
      })),
    ).toEqual([
      {
        tier: 'mobile',
        condition: undefined,
        query: '(width <= 756px)',
      },
      {
        tier: 'mobile',
        condition: '@media (pointer: coarse)',
        query: '(width <= 756px) and (pointer: coarse)',
      },
      {
        tier: 'tablet',
        condition: undefined,
        query: '(756px < width <= 1024px)',
      },
      {
        tier: 'tablet',
        condition: '@media (pointer: coarse)',
        query: '(756px < width <= 1024px) and (pointer: coarse)',
      },
    ]);

    const mobileTouch = layers[1];
    const tabletTouch = layers[3];

    expect(neutralTheme.tokens['--font-size-base']).toBe('0.875rem');
    expect(neutralTheme.tokens['--font-size-5xl']).toBe('2.625rem');
    expect(mobileTouch.tokens['--font-size-base']).toBe('1rem');
    expect(mobileTouch.tokens['--font-size-5xl']).toBe('2.625rem');
    expect(mobileTouch.tokens['--text-display-1-leading']).toBe(
      neutralTheme.tokens['--text-display-1-leading'],
    );
    expect(tabletTouch.tokens['--font-size-base']).toBe('1rem');
    expect(tabletTouch.tokens['--font-size-5xl']).toBe('2.625rem');
    expect(tabletTouch.tokens['--font-size-lg']).toBe(
      mobileTouch.tokens['--font-size-lg'],
    );
  });

  it('emits no width-only typography override for fine pointers', () => {
    const {component, prose} = generateTierCSS(neutralTheme);
    const css = `${component}\n${prose}`;
    const mediaQueries = [...css.matchAll(/@media ([^{]+)\{/g)].map(match =>
      match[1].trim(),
    );

    expect(mediaQueries).toEqual([
      '(width <= 756px) and (pointer: coarse)',
      '(756px < width <= 1024px) and (pointer: coarse)',
      '(width <= 756px) and (pointer: coarse)',
      '(756px < width <= 1024px) and (pointer: coarse)',
    ]);
    expect(css).not.toMatch(/@media \(width <= 756px\) \{/);
    expect(css).not.toMatch(/@media \(756px < width <= 1024px\) \{/);
  });
});
