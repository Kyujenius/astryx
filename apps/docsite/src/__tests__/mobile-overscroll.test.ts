// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file mobile-overscroll.test.ts
 * @input apps/docsite/src/app/globals.css and the home hero's HeroThemeReel
 * @output Guards that the docsite never suppresses pull-to-refresh on touch
 * @position Regression test for #5392
 *
 * `overscroll-behavior-y: none` on the root element is how you turn
 * pull-to-refresh off. It was added app-wide to keep the home hero's
 * `position: fixed` layers from showing through the top/bottom overscroll gap
 * (#3032), and silently cost pull-to-refresh on every route of the site on
 * every touch browser.
 *
 * These two checks are the halves of the fix, stated as invariants rather than
 * as a mirror of the code: the root may not refuse overscroll at a width a
 * phone can actually have, and the one hero layer that reached the gap there
 * has to stay bounded to the hero instead of pinned to the viewport.
 */

import {describe, it, expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(HERE, '..', 'app');

/** A phone-class viewport, comfortably under every breakpoint the site uses. */
const PHONE_WIDTH_PX = 430;

function read(...parts: string[]): string {
  return fs.readFileSync(path.join(APP, ...parts), 'utf8');
}

/** Drop comments so their contents can't be mistaken for CSS or braces. */
function stripComments(css: string): string {
  return css.replace(/\/\*[^]*?\*\//g, '');
}

/**
 * The `{...}` preludes open at `offset`, outermost first — e.g.
 * `['@media (min-width: 1024px)', 'html']` for a declaration inside a media
 * block. Good enough for this file's hand-written CSS (no strings, no nesting
 * beyond at-rules).
 */
function openBlocksAt(css: string, offset: number): string[] {
  const stack: string[] = [];
  let preludeStart = 0;
  for (let i = 0; i < offset; i++) {
    const ch = css[i];
    if (ch === '{') {
      stack.push(css.slice(preludeStart, i).trim());
      preludeStart = i + 1;
    } else if (ch === '}') {
      stack.pop();
      preludeStart = i + 1;
    } else if (ch === ';') {
      preludeStart = i + 1;
    }
  }
  return stack;
}

/**
 * Whether a media prelude matches a viewport `width` px wide. Only the width
 * features are modelled; anything else is treated as matching, so an unhandled
 * query fails the test loudly rather than passing it by omission.
 */
function mediaMatchesWidth(prelude: string, width: number): boolean {
  for (const [, feature, value] of prelude.matchAll(
    /\((min|max)-width:\s*([\d.]+)px\)/g,
  )) {
    const px = Number(value);
    if (feature === 'min' && width < px) {return false;}
    if (feature === 'max' && width > px) {return false;}
  }
  return true;
}

describe('docsite globals.css', () => {
  it('never disables overscroll at a phone width (pull-to-refresh, #5392)', () => {
    const css = stripComments(read('globals.css'));
    const offenders: string[] = [];

    for (const match of css.matchAll(
      /overscroll-behavior(?:-block|-y)?\s*:\s*([^;}]+)/g,
    )) {
      const value = match[1].trim();
      if (value === 'auto') {
        continue;
      }
      const blocks = openBlocksAt(css, match.index);
      const selector = blocks.at(-1) ?? '(top level)';
      const reachesPhone = blocks
        .filter(b => b.startsWith('@media'))
        .every(b => mediaMatchesWidth(b, PHONE_WIDTH_PX));
      if (reachesPhone) {
        offenders.push(`${selector} { overscroll-behavior: ${value} }`);
      }
    }

    expect(offenders).toEqual([]);
  });
});

/** The `{...}` body of one `stylex.create` entry, e.g. `backdropGlow`. */
function styleBlock(source: string, name: string): string {
  const start = source.indexOf(`${name}: {`);
  expect(start, `no \`${name}\` style in the source`).toBeGreaterThan(-1);
  const open = source.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') {depth++;}
    else if (source[i] === '}' && --depth === 0)
      {return source.slice(open, i + 1);}
  }
  throw new Error(`unbalanced braces in \`${name}\``);
}

/**
 * The value a StyleX property resolves to with no media query in play — the
 * literal itself, or the `default:` arm of a conditional value object.
 */
function mobileValue(block: string, property: string): string {
  const at = block.indexOf(`${property}: `);
  expect(at, `no \`${property}\` declaration`).toBeGreaterThan(-1);
  const rest = block.slice(at + property.length + 2);
  if (!rest.startsWith('{')) {
    return rest.slice(0, rest.search(/[,\n]/)).trim();
  }
  const fallback = /default:\s*([^,\n]+)/.exec(rest);
  expect(fallback, `\`${property}\` has no default arm`).not.toBeNull();
  return fallback![1].trim();
}

describe('home hero — HeroThemeReel', () => {
  const source = read('(site)', '_landing', 'hero', 'HeroThemeReel.tsx');

  /**
   * Below 1024px the hero barely pins: heroContent is relative, the floating
   * cards are display:none, and the nav backdrop is a short strip at the very
   * top. A viewport-fixed glow, on the other hand, spans the whole page scroll
   * and paints into the gap under the footer — which is the only reason
   * globals.css was suppressing overscroll on phones.
   */
  it('does not pin the aurora glow to the viewport on mobile (#5392)', () => {
    expect(
      mobileValue(styleBlock(source, 'backdropGlow'), 'position'),
    ).not.toBe("'fixed'");
  });
});
