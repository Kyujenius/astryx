// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Colocated tests for the `doctor` leaf (api/doctor/doctor.mjs). `doctor`
 * had no api-level tests; this locks the envelope shape and the summary
 * invariant (the counts must always add up to the number of checks).
 */

import {describe, it, expect, afterEach} from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  doctor,
  checkVersionAlignment,
  checkThemeBuilt,
  findThemeSources,
  findThemeBuildScript,
  isThemeBuildWired,
} from './doctor.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const cwd = REPO;
const SLOW = 30_000;

/** Throwaway project dirs, cleaned up after each test. */
const tmpDirs = [];
function mkProject(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-doctor-'));
  tmpDirs.push(dir);
  for (const [rel, content] of Object.entries(files)) {
    const abs = path.join(dir, rel);
    fs.mkdirSync(path.dirname(abs), {recursive: true});
    fs.writeFileSync(abs, content);
  }
  return dir;
}
afterEach(() => {
  while (tmpDirs.length) {
    fs.rmSync(tmpDirs.pop(), {recursive: true, force: true});
  }
});

describe('doctor leaf', () => {
  it('returns a `doctor` envelope with checks + summary', async () => {
    const r = await doctor({cwd});
    expect(r.type).toBe('doctor');
    expect(Array.isArray(r.data.checks)).toBe(true);
    expect(r.data.checks.length).toBeGreaterThan(0);
    expect(r.data.summary).toBeDefined();
  }, SLOW);

  it('every check has an id, label, and a valid status', async () => {
    const r = await doctor({cwd});
    for (const c of r.data.checks) {
      expect(typeof c.id).toBe('string');
      expect(typeof c.label).toBe('string');
      expect(['pass', 'warn', 'fail', 'info']).toContain(c.status);
    }
  }, SLOW);

  it('summary counts sum to the number of checks (invariant)', async () => {
    const r = await doctor({cwd});
    const {pass, warn, fail, info} = r.data.summary;
    expect(pass + warn + fail + info).toBe(r.data.checks.length);
  }, SLOW);

  it('reports the core node-version and core-installed checks', async () => {
    const r = await doctor({cwd});
    const ids = r.data.checks.map(c => c.id);
    expect(ids).toContain('node-version');
    expect(ids).toContain('core-installed');
  }, SLOW);
});

describe('doctor leaf — degradation & error paths', () => {
  it('does not crash on multiple config files; reports a config FAIL', async () => {
    const dir = mkProject({
      'package.json': '{"name":"x"}',
      'astryx.config.mjs': 'export default {};',
      'astryx.config.js': 'export default {};',
    });
    const r = await doctor({cwd: dir});
    const config = r.data.checks.find(c => c.id === 'config');
    expect(config).toBeDefined();
    expect(config.status).toBe('fail');
    expect(config.message).toMatch(/multiple|exactly one/i);
  }, SLOW);

  it('reports a config FAIL (not a crash) when astryx.config.mjs throws on import', async () => {
    const dir = mkProject({
      'package.json': '{"name":"x"}',
      'astryx.config.mjs': 'throw new Error("boom");\nexport default {};',
    });
    const r = await doctor({cwd: dir});
    const config = r.data.checks.find(c => c.id === 'config');
    expect(config.status).toBe('fail');
    expect(config.message).toMatch(/failed to load/i);
  }, SLOW);

  it('flags a non-object config default export as FAIL', async () => {
    const dir = mkProject({
      'package.json': '{"name":"x"}',
      'astryx.config.mjs': 'export default 42;',
    });
    const r = await doctor({cwd: dir});
    const config = r.data.checks.find(c => c.id === 'config');
    expect(config.status).toBe('fail');
    expect(config.message).toMatch(/not an object/i);
  }, SLOW);

  it('degrades gracefully on invalid package.json', async () => {
    const dir = mkProject({'package.json': '{ not json }'});
    const r = await doctor({cwd: dir});
    const {pass, warn, fail, info} = r.data.summary;
    expect(pass + warn + fail + info).toBe(r.data.checks.length);
  }, SLOW);
});

describe('doctor — checkVersionAlignment', () => {
  it('skips (info) when the core version is not comparable semver', () => {
    const dir = mkProject({
      'node_modules/@astryxdesign/core/package.json': JSON.stringify({
        name: '@astryxdesign/core',
        version: 'workspace:*',
      }),
    });
    const c = checkVersionAlignment({
      cwd: dir,
      coreDir: path.join(dir, 'node_modules/@astryxdesign/core'),
      nodeVersion: '',
      configPath: null,
      configTheme: null,
    });
    expect(c.status).toBe('info');
    expect(c.fix ?? '').not.toMatch(/NaN|undefined/);
  });

  it('does not leak NaN/undefined for a comparable semver core version', () => {
    const dir = mkProject({
      'node_modules/@astryxdesign/core/package.json': JSON.stringify({
        name: '@astryxdesign/core',
        version: '0.0.1',
      }),
    });
    const c = checkVersionAlignment({
      cwd: dir,
      coreDir: path.join(dir, 'node_modules/@astryxdesign/core'),
      nodeVersion: '',
      configPath: null,
      configTheme: null,
    });
    expect(['pass', 'warn']).toContain(c.status);
    expect(c.message).not.toMatch(/NaN|undefined/);
    if (c.fix) expect(c.fix).not.toMatch(/NaN|undefined/);
  });
});

const THEME_SRC = [
  "import {defineTheme} from '@astryxdesign/core/theme';",
  "export const appTheme = defineTheme({name: 'app', tokens: {}});",
].join('\n');

describe('findThemeSources', () => {
  it('finds a file that imports defineTheme and exports the call', () => {
    const dir = mkProject({'src/themes/appTheme.ts': THEME_SRC});
    expect(findThemeSources(dir)).toEqual([path.join(dir, 'src/themes/appTheme.ts')]);
  });

  it('ignores files that merely mention defineTheme', () => {
    // Generated registries and docs embed the name in strings; matching a bare
    // `defineTheme(` swept up a registry and a minified vendor bundle.
    const dir = mkProject({
      'src/docs.ts': "export const text = 'call defineTheme({name}) to start';",
      'src/helper.ts': 'export function wrap() { return defineTheme({}); }',
    });
    expect(findThemeSources(dir)).toEqual([]);
  });

  it('skips generated, public, and build output directories', () => {
    const dir = mkProject({
      'src/generated/registry.ts': THEME_SRC,
      'public/vendor.js': THEME_SRC,
      'dist/theme.js': THEME_SRC,
      'src/themes/appTheme.ts': THEME_SRC,
    });
    expect(findThemeSources(dir)).toEqual([path.join(dir, 'src/themes/appTheme.ts')]);
  });

  it('skips files carrying the @generated header', () => {
    const dir = mkProject({
      'src/themes/built.ts': `/* @generated by astryx theme build */\n${THEME_SRC}`,
    });
    expect(findThemeSources(dir)).toEqual([]);
  });
});

describe('findThemeBuildScript', () => {
  it('recovers the source and --out from a package.json script', () => {
    const dir = mkProject({
      'package.json': JSON.stringify({
        scripts: {'build:theme': 'astryx theme build src/themes/appTheme.ts --out src/themes/app.css'},
      }),
      'src/themes/appTheme.ts': THEME_SRC,
    });
    const found = findThemeBuildScript(path.join(dir, 'src/themes/appTheme.ts'), dir);
    expect(found?.source).toBe('src/themes/appTheme.ts');
    expect(found?.out).toBe('src/themes/app.css');
  });

  it('returns null when no script builds a theme', () => {
    const dir = mkProject({
      'package.json': JSON.stringify({scripts: {test: 'vitest'}}),
      'src/themes/appTheme.ts': THEME_SRC,
    });
    expect(findThemeBuildScript(path.join(dir, 'src/themes/appTheme.ts'), dir)).toBeNull();
  });
});

describe('isThemeBuildWired', () => {
  it('detects a build reached indirectly through another script', () => {
    // docsite's shape: dev -> generate -> build:theme
    const dir = mkProject({
      'package.json': JSON.stringify({
        scripts: {
          'build:theme': 'astryx theme build src/themes/appTheme.ts',
          generate: 'pnpm build:theme && node scripts/gen.mjs',
          dev: 'pnpm generate && next dev',
        },
      }),
    });
    expect(isThemeBuildWired(dir)).toBe(true);
  });

  it('detects a direct predev hook', () => {
    const dir = mkProject({
      'package.json': JSON.stringify({
        scripts: {predev: 'astryx theme build src/themes/appTheme.ts', dev: 'vite'},
      }),
    });
    expect(isThemeBuildWired(dir)).toBe(true);
  });

  it('is false when the build exists but nothing runs it', () => {
    const dir = mkProject({
      'package.json': JSON.stringify({
        scripts: {'build:theme': 'astryx theme build src/themes/appTheme.ts', dev: 'vite'},
      }),
    });
    expect(isThemeBuildWired(dir)).toBe(false);
  });

  it('is false for a project with no scripts at all', () => {
    expect(isThemeBuildWired(mkProject({'package.json': '{}'}))).toBe(false);
  });
});

describe('checkThemeBuilt', () => {
  const ctx = dir => ({
    cwd: dir,
    nodeVersion: process.versions.node,
    coreDir: null,
    configPath: null,
    configTheme: null,
  });

  it('skips when the project has no theme source', async () => {
    const c = await checkThemeBuilt(ctx(mkProject({'package.json': '{}'})));
    expect(c.id).toBe('theme-built');
    expect(c.status).toBe('info');
    expect(c.message).toMatch(/no defineTheme/i);
  });

  it('passes a theme with no built output — runtime injection is a supported path', async () => {
    // Absent artifacts report `missing`, which only means the app imports the
    // theme source directly. Only `outdated` is drift, and only drift is a
    // failure; treating `missing` as stale would flag every valid dev setup.
    const dir = mkProject({'package.json': '{}', 'src/themes/appTheme.ts': THEME_SRC});
    const c = await checkThemeBuilt(ctx(dir));
    expect(c.status).toBe('pass');
    expect(c.fix).toBeUndefined();
  }, SLOW);

  it('never throws, whatever the theme file contains', async () => {
    const dir = mkProject({
      'package.json': '{}',
      'src/themes/appTheme.ts': `import {defineTheme} from '@astryxdesign/core/theme';
export const appTheme = defineTheme(JSON.parse('{{{ not json'));`,
    });
    const c = await checkThemeBuilt(ctx(dir));
    expect(['pass', 'warn', 'fail', 'info']).toContain(c.status);
  }, SLOW);
});
