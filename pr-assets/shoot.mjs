// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// Before/after evidence harness for the Banner `collapsible` change.
//
// Bundles a real @astryxdesign/core build (from whichever worktree is passed
// on argv), serves it on 127.0.0.1:5599 with the proxy stripped, and shoots
// each scenario in Chromium. Run once per build; the two PNG sets are the
// before/after pair the design review asks for.
//
//   node shoot.mjs <path-to-worktree> <out-dir> <before|after>
//
// Scenarios:
//   default — children, no collapse prop at all. MUST be identical across the
//             two builds: that is the "nothing breaks" claim.
//   open    — starts open: `defaultIsExpanded` before, the config after. Also
//             must be identical.
//   optout  — content with no toggle. Unreachable before, so the old build
//             renders the closest thing a consumer could have written.

import {createServer} from 'node:http';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import esbuild from 'esbuild';
import {chromium} from 'playwright';

const [, , worktree, outDir, mode] = process.argv;
if (!worktree || !outDir || !mode) {
  throw new Error('usage: node shoot.mjs <worktree> <out-dir> <before|after>');
}

const core = path.join(worktree, 'packages/core');
const isBefore = mode === 'before';

// The props that differ between the two APIs. Everything else about each
// scenario is identical, so a diff in the screenshots is a diff in behaviour.
const defaultProp = '';
const openProp = isBefore ? ' defaultIsExpanded' : ' collapsible={{defaultIsOpen: true}}';
const optOutProp = isBefore ? '' : ' collapsible={false}';

const entry = `
import {createRoot} from 'react-dom/client';
import {Banner} from ${JSON.stringify(path.join(core, 'dist/Banner/Banner.js'))};

const errors = (
  <ul style={{margin: 0, paddingInlineStart: '20px', fontSize: '13px'}}>
    <li>Email address is invalid</li>
    <li>Password must be at least 8 characters</li>
    <li>Username is already taken</li>
  </ul>
);

function Scenarios() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 24, width: 640}}>
      <div id="default">
        <Banner
          status="warning"
          title="Configuration changes detected"
          description="Review the changes before they take effect."${defaultProp}>
          {errors}
        </Banner>
      </div>
      <div id="open">
        <Banner
          status="info"
          title="System maintenance scheduled"
          description="Sunday, 02:00-04:00."${openProp}>
          {errors}
        </Banner>
      </div>
      <div id="optout">
        <Banner
          status="error"
          title="3 fields need attention"
          description="The following issues need to be resolved:"${optOutProp}>
          {errors}
        </Banner>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Scenarios />);
`;

const bundle = await esbuild.build({
  stdin: {
    contents: entry,
    resolveDir: worktree,
    loader: 'jsx',
    sourcefile: 'entry.jsx',
  },
  bundle: true,
  format: 'iife',
  jsx: 'automatic',
  write: false,
  logLevel: 'warning',
});

const js = bundle.outputFiles[0].text;
const css = readFileSync(path.join(core, 'dist/astryx.css'), 'utf8');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>${css}
body {margin: 0; padding: 24px; background: #fff; font-family: system-ui, sans-serif;}
</style></head>
<body><div id="root"></div><script>${js}</script></body></html>`;

const server = createServer((_req, res) => {
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
  res.end(html);
});
await new Promise(resolve => server.listen(5599, '127.0.0.1', resolve));

const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 720, height: 900}});
await page.goto('http://127.0.0.1:5599/', {waitUntil: 'networkidle'});
await page.waitForSelector('#default');

const ids = ['default', 'open', 'optout'];
mkdirSync(outDir, {recursive: true});
for (const id of ids) {
  await page.locator(`#${id}`).screenshot({
    path: path.join(outDir, `${mode}-${id}.png`),
  });
}

// What a consumer actually observes: is there a toggle, and is the content in
// the DOM? Recorded as text so the claim is checkable, not just eyeballed.
const facts = await page.evaluate(scenarioIds => {
  const read = id => {
    const root = document.getElementById(id);
    return {
      buttons: [...root.querySelectorAll('button')].map(
        b => b.getAttribute('aria-label') ?? b.textContent,
      ),
      listItems: root.querySelectorAll('li').length,
      ariaExpanded: [...root.querySelectorAll('[aria-expanded]')].map(el =>
        el.getAttribute('aria-expanded'),
      ),
    };
  };
  return Object.fromEntries(scenarioIds.map(id => [id, read(id)]));
}, ids);
writeFileSync(
  path.join(outDir, `${mode}-facts.json`),
  JSON.stringify(facts, null, 2),
);
console.log(mode, JSON.stringify(facts));

await browser.close();
server.close();
