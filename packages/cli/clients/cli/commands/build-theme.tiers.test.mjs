// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Tests that `astryx theme build` carries responsive width tiers all the
 * way to the built stylesheet.
 *
 * The built path is where a new `defineTheme` field goes missing quietly. Three
 * places have to know about the tier keys, and none of them fails loudly:
 *
 * - `INPUT_ONLY_FIELDS` is how the build decides a plain object is raw input
 *   and needs `defineTheme()` run over it. A theme whose only input-shaped
 *   field is a tier used to skip resolution entirely — no tier CSS, no
 *   `light-dark()` conversion, exit 0, no warning.
 * - The `color-scheme` guard reads the generated CSS for `light-dark(`. A
 *   `[light, dark]` tuple living only inside a tier still needs the guard, or
 *   the built path ships `light-dark()` with nothing to resolve against while
 *   the runtime path renders correctly.
 * - `generateBuiltModule`'s inheritable fields decide what a theme extending a
 *   BUILT theme can read back.
 *
 * Building `astryx theme build` requires a compiled @astryxdesign/core (there
 * is no in-CLI fallback generator), so this suite builds core once in
 * beforeAll via the shared ensureCoreBuilt() helper.
 */

import {describe, it, expect, beforeAll, beforeEach, afterEach} from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import {ensureCoreBuilt} from './ensure-core-built.mjs';
import {runCli} from '../../../test-utils/run-cli.mjs';

/** Write a theme source file that calls defineTheme with the given input. */
function writeTheme(dir, name, inputSource) {
  fs.mkdirSync(dir, {recursive: true});
  const file = path.join(dir, `${name}.mjs`);
  fs.writeFileSync(
    file,
    `import {defineTheme} from '@astryxdesign/core/theme';\n` +
      `export default defineTheme(${inputSource});\n`,
  );
  return file;
}

/** Write a theme as a plain object — the shape that skips defineTheme(). */
function writePlainTheme(dir, name, inputSource) {
  fs.mkdirSync(dir, {recursive: true});
  const file = path.join(dir, `${name}.mjs`);
  fs.writeFileSync(file, `export default ${inputSource};\n`);
  return file;
}

beforeAll(() => {
  ensureCoreBuilt();
}, 200_000);

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-build-theme-tiers-'));
});
afterEach(() => {
  fs.rmSync(tmpDir, {recursive: true, force: true});
});

describe('theme build width tiers', () => {
  it('emits a tier as a media block inside the theme layer', async () => {
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writeTheme(
      themesDir,
      'tiered',
      `{
        name: 'tiered',
        tokens: {'--spacing-4': '16px'},
        mobile: {tokens: {'--spacing-4': '12px'}},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );
    expect(result.code).toBe(0);

    const css = fs.readFileSync(path.join(themesDir, 'tiered.css'), 'utf-8');

    expect(css).toContain('@media (width <= 756px)');
    expect(css).toContain('--spacing-4: 12px;');

    // Inside @layer astryx-theme, and after the base value it overrides —
    // a media query adds no specificity, so source order is the mechanism.
    const themeLayerStart = css.indexOf('@layer astryx-theme');
    expect(themeLayerStart).toBeGreaterThanOrEqual(0);
    const themeLayer = css.slice(themeLayerStart);
    expect(themeLayer).toContain('@media (width <= 756px)');
    expect(themeLayer.indexOf('--spacing-4: 16px')).toBeLessThan(
      themeLayer.indexOf('--spacing-4: 12px'),
    );
  });

  it('emits every declared tier, and the pointer refinement after its tier', async () => {
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writeTheme(
      themesDir,
      'full-scale',
      `{
        name: 'full-scale',
        tokens: {'--spacing-4': '16px'},
        mobile: {
          tokens: {'--spacing-4': '12px'},
          '@media (pointer: coarse)': {tokens: {'--spacing-4': '10px'}},
        },
        tablet: {tokens: {'--spacing-4': '13px'}},
        desktop: {tokens: {'--spacing-4': '14px'}},
        wide: {tokens: {'--spacing-4': '20px'}},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );
    expect(result.code).toBe(0);

    const css = fs.readFileSync(path.join(themesDir, 'full-scale.css'), 'utf-8');
    const preludes = [...css.matchAll(/@media ([^{]+)\{/g)].map(m =>
      m[1].trim(),
    );

    expect(preludes).toEqual([
      '(width <= 756px)',
      '(width <= 756px) and (pointer: coarse)',
      '(756px < width <= 1024px)',
      '(1024px < width <= 1440px)',
      '(width > 1440px)',
    ]);
  });

  it('resolves a plain-object theme whose only input field is a tier', async () => {
    // Regression: the build decides whether to run defineTheme() by sniffing
    // for input-only fields. With the tier keys missing from that list, this
    // theme skipped resolution — the tier vanished and the tuple below was
    // emitted as a raw comma-joined array instead of light-dark().
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writePlainTheme(
      themesDir,
      'plain-tiered',
      `{
        name: 'plain-tiered',
        tokens: {'--color-accent': ['#111111', '#eeeeee']},
        mobile: {tokens: {'--spacing-4': '12px'}},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );
    expect(result.code).toBe(0);

    const css = fs.readFileSync(
      path.join(themesDir, 'plain-tiered.css'),
      'utf-8',
    );

    expect(css).toContain('@media (width <= 756px)');
    expect(css).toContain('--spacing-4: 12px;');
    // The tuple resolved, rather than stringifying into invalid CSS.
    expect(css).toContain('light-dark(#111111, #eeeeee)');
    expect(css).not.toContain('#111111,#eeeeee');
  });

  it('emits the color-scheme guard for a light-dark() value only a tier sets', async () => {
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writeTheme(
      themesDir,
      'tier-only-tuple',
      `{
        name: 'tier-only-tuple',
        mobile: {tokens: {'--color-accent': ['#0077B6', '#48CAE4']}},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );
    expect(result.code).toBe(0);

    const css = fs.readFileSync(
      path.join(themesDir, 'tier-only-tuple.css'),
      'utf-8',
    );

    expect(css).toContain('light-dark(#0077B6, #48CAE4)');
    expect(css).toContain(':root { color-scheme: light dark; }');
    expect(css).toContain('html[data-theme="light"] { color-scheme: light; }');
    expect(css).toContain('html[data-theme="dark"] { color-scheme: dark; }');
  });

  it('carries the tiers into the built module so an extending theme keeps them', async () => {
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writeTheme(
      themesDir,
      'built-base',
      `{
        name: 'built-base',
        typography: {scale: {base: 14, ratio: 1.414}},
        mobile: {typography: {scale: {base: 16}}},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );
    expect(result.code).toBe(0);

    const js = fs.readFileSync(path.join(themesDir, 'built-base.js'), 'utf-8');
    expect(js).toContain('__tiers');
    // The declarations travel too, so an extending theme can re-resolve the
    // tier against the ratio this theme was declared with.
    expect(js).toContain('__tierInput');
    expect(js).toContain('__valuesInput');
  });

  it('leaves a theme with no tiers unchanged', async () => {
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writeTheme(
      themesDir,
      'no-tiers',
      `{
        name: 'no-tiers',
        typography: {scale: {base: 14, ratio: 1.2}},
        tokens: {'--spacing-4': '16px'},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );
    expect(result.code).toBe(0);

    const css = fs.readFileSync(path.join(themesDir, 'no-tiers.css'), 'utf-8');
    expect(css).not.toContain('@media');
  });

  it('fails the build with a usable message when a tier is misdeclared', async () => {
    const project = path.join(tmpDir, 'project');
    const themesDir = path.join(project, 'themes');
    const themeFile = writeTheme(
      themesDir,
      'bad-tier',
      `{
        name: 'bad-tier',
        mobile: {maxWidth: 1200},
        tablet: {maxWidth: 800},
      }`,
    );

    const result = await runCli(
      ['theme', 'build', path.relative(project, themeFile)],
      project,
    );

    expect(result.code).not.toBe(0);
    expect(`${result.stdout}${result.stderr}`).toContain(
      'tier bounds must increase',
    );
  });
});
