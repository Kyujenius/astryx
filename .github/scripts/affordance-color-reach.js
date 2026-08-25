#!/usr/bin/env node
// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @description Asserts a colour set on an affordance's theme target reaches the glyph it names
 * @input --storybook-dir <path> [--port <n>]
 * @output One line per case; exit 1 if a target cannot colour its own glyph
 *
 * A theme target that names a button holding one icon promises the obvious
 * thing: set a colour on it and the icon changes. That promise is easy to ship
 * broken, because an `Icon` that names its own colour (`color="secondary"`)
 * writes `color` on the glyph itself and beats anything the button inherits
 * down — the target resolves, the rule emits, and nothing moves. Table's sort
 * and filter affordances both shipped that way, which is what this guards.
 *
 * Nothing in the unit suite can see it. jsdom resolves no cascade, so a test
 * there can assert the class is on the button and the rule is in the CSS text
 * while the glyph still paints its own colour.
 *
 * The sibling guard, theme-var-reachability.js, asks whether a documented
 * *var* is settable. This asks whether an ordinary inherited property reaches
 * the descendant the target exists for, and it checks three things a var
 * cannot:
 *
 *   1. the glyph takes the themed colour at rest
 *   2. it still takes it under `:hover`, where a resting-state rule that only
 *      fires on hover would otherwise take over
 *   3. the elements the target must NOT repaint keep their own colour — a
 *      button that holds both a label and a glyph must colour only the glyph
 *
 * It also pins the resting contrast, because the reason these two grew a
 * `color` of their own is that the dimming they used instead (`opacity: 0.35`)
 * put them below the 3:1 WCAG 1.4.11 asks of a UI component.
 */

const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const args = process.argv.slice(2);
const getArg = name => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
};

const storybookDir = getArg('storybook-dir') || 'apps/storybook/dist';
const port = Number(getArg('port') || 6013);

/** Distinctive enough that a coincidental match is not a concern. */
const SENTINEL = 'rgb(1, 2, 3)';

/** WCAG 1.4.11 — a UI component's states must reach 3:1 against their ground. */
const MIN_CONTRAST = 3;

const CASES = [
  {
    name: 'Table sort affordance',
    story: 'core-tablefiltering--with-sorting',
    target: 'astryx-table-sort-button',
    // The header label shares the button with the glyph, so it has to keep the
    // cell's colour rather than follow the affordance's.
    unchanged: 'the header label',
    unchangedSelector: '.astryx-table-sort-button > span:first-child',
  },
  {
    name: 'Table filter affordance',
    story: 'core-tablefiltering--with-sorting',
    target: 'astryx-table-filter-button',
    unchanged: null,
    unchangedSelector: null,
  },
];

const CONTENT_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function createServer(dir, listenPort) {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const filePath = path
        .join(dir, req.url === '/' ? 'index.html' : req.url)
        .split('?')[0];

      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(path.resolve(dir))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      fs.readFile(resolved, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': CONTENT_TYPES[path.extname(resolved)] || 'text/plain',
        });
        res.end(data);
      });
    });

    server.listen(listenPort, () => resolve(server));
  });
}

/** WCAG relative luminance of an `rgb(r, g, b)` string. */
function luminance(color) {
  const [r, g, b] = (color.match(/\d+/g) || []).slice(0, 3).map(Number);
  const channel = v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

/**
 * In the page: read the glyph's colour, the ground it sits on, and the colour
 * of whatever the target must leave alone. `opacity` is folded in because it
 * composites toward the ground and is what put these two under 3:1.
 */
function readInPage([target, unchangedSelector]) {
  const button = document.querySelector(`.${target}`);
  if (!button) return {status: 'missing'};

  const glyph = button.querySelector('svg');
  if (!glyph) return {status: 'noglyph'};

  let opacity = 1;
  for (let el = glyph; el && el !== document.body; el = el.parentElement) {
    opacity *= Number(getComputedStyle(el).opacity);
  }

  let ground = 'rgb(255, 255, 255)';
  for (let el = button; el; el = el.parentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) {
      ground = bg;
      break;
    }
  }

  const unchanged = unchangedSelector
    ? getComputedStyle(document.querySelector(unchangedSelector)).color
    : null;

  return {
    status: 'ok',
    color: getComputedStyle(glyph).color,
    opacity: Number(opacity.toFixed(3)),
    ground,
    unchanged,
  };
}

/** Composite `color` over `ground` at `opacity`, the way the screen does. */
function composite(color, ground, opacity) {
  const c = (color.match(/\d+/g) || []).slice(0, 3).map(Number);
  const g = (ground.match(/\d+/g) || []).slice(0, 3).map(Number);
  const mixed = c.map((v, i) => Math.round(v * opacity + g[i] * (1 - opacity)));
  return `rgb(${mixed.join(', ')})`;
}

async function checkCase(context, testCase) {
  const page = await context.newPage();
  const failures = [];
  const notes = [];

  try {
    await page.goto(
      `http://localhost:${port}/iframe.html?id=${testCase.story}&viewMode=story`,
      {waitUntil: 'networkidle', timeout: 30000},
    );

    const args = [testCase.target, testCase.unchangedSelector];
    const rest = await page.evaluate(readInPage, args);

    if (rest.status === 'missing') {
      return {failures: [`no element carries .${testCase.target}`], notes};
    }
    if (rest.status === 'noglyph') {
      return {failures: [`.${testCase.target} holds no glyph to colour`], notes};
    }

    // 1 — resting contrast, composited the way it is seen.
    const painted = composite(rest.color, rest.ground, rest.opacity);
    const ratio = contrastRatio(painted, rest.ground);
    notes.push(
      `rest ${rest.color}${rest.opacity === 1 ? '' : ` @ ${rest.opacity}`} on ${rest.ground} — ${ratio}:1`,
    );
    if (ratio < MIN_CONTRAST) {
      failures.push(
        `resting glyph is ${ratio}:1 against the header, below the ${MIN_CONTRAST}:1 ` +
          `WCAG 1.4.11 asks of a UI component` +
          (rest.opacity === 1
            ? ''
            : ` (it is dimmed to ${rest.opacity}, which composites toward the ground)`),
      );
    }

    // 2 — a themed colour reaches the glyph.
    await page.evaluate(css => {
      const style = document.createElement('style');
      style.id = 'reach-probe';
      style.textContent = css;
      document.head.appendChild(style);
    }, `@layer astryx-theme { .${testCase.target} { color: ${SENTINEL}; } }`);

    const themed = await page.evaluate(readInPage, args);
    if (themed.color !== SENTINEL) {
      failures.push(
        `a colour on .${testCase.target} in @layer astryx-theme did not reach the glyph — ` +
          `it stayed ${themed.color}. The glyph names its own colour, so the ` +
          `target a theme is told to use cannot move it.`,
      );
    } else {
      notes.push(`themed → ${themed.color}`);
    }

    // 3 — and still reaches it under hover.
    const header = page.locator(`th:has(.${testCase.target})`).first();
    await header.hover({force: true});
    await page.waitForTimeout(120);
    const hovered = await page.evaluate(readInPage, args);
    if (hovered.color !== SENTINEL) {
      failures.push(
        `the themed colour is lost on hover — glyph went to ${hovered.color}. ` +
          `A hover rule that re-states the resting colour takes the theme's away.`,
      );
    } else {
      notes.push(`hovered → ${hovered.color}`);
    }

    // 4 — what the target must not repaint kept its own colour.
    if (testCase.unchangedSelector) {
      if (themed.unchanged === SENTINEL) {
        failures.push(
          `${testCase.unchanged} followed the target's colour. It shares the ` +
            `element with the glyph, so it needs a colour of its own.`,
        );
      } else {
        notes.push(`${testCase.unchanged} held at ${themed.unchanged}`);
      }
    }
  } finally {
    await page.close();
  }

  return {failures, notes};
}

async function run() {
  const dir = path.resolve(process.cwd(), storybookDir);
  if (!fs.existsSync(path.join(dir, 'index.json'))) {
    console.error(`Storybook build not found at ${dir}`);
    return 1;
  }

  const server = await createServer(dir, port);
  const browser = await chromium.launch();
  let failed = 0;

  try {
    const context = await browser.newContext({
      viewport: {width: 1100, height: 700},
    });

    for (const testCase of CASES) {
      const {failures, notes} = await checkCase(context, testCase);
      if (failures.length === 0) {
        console.log(`✓ ${testCase.name} — ${notes.join('; ')}`);
        continue;
      }
      failed += 1;
      for (const f of failures) {
        console.error(`✗ ${testCase.name}: ${f}`);
      }
      if (notes.length > 0) {
        console.error(`  measured: ${notes.join('; ')}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failed > 0) {
    console.error(
      `\nFailing: ${failed} affordance target(s). A target that names a button ` +
        `holding one icon has to be able to colour that icon — otherwise the ` +
        `documented seam does nothing and says nothing.`,
    );
    return 1;
  }
  console.log(`\nAll ${CASES.length} affordance targets colour their own glyph.`);
  return 0;
}

run()
  .then(code => {
    process.exitCode = code;
  })
  .catch(e => {
    console.error('Affordance colour reachability guard failed:', e);
    process.exit(1);
  });
