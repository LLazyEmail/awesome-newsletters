#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const outJson = path.join(websiteRoot, 'src/data/changelog.json');
fs.mkdirSync(path.dirname(outJson), {recursive: true});

// Pass --output on the CLI: auto-changelog refuses config "output" that
// escapes the cwd (../CHANGELOG.md from website/). See auto-changelog
// unsafe-config check.
const result = spawnSync(
  'npx',
  [
    '--yes',
    'auto-changelog',
    '--config',
    '.auto-changelog',
    '--output',
    '../CHANGELOG.md',
  ],
  {cwd: websiteRoot, encoding: 'utf8', stdio: 'inherit'},
);
if (result.status !== 0) process.exit(result.status ?? 1);

// Lightweight JSON sidecar for a future docs page
const md = fs.readFileSync(path.join(websiteRoot, '../CHANGELOG.md'), 'utf8');
fs.writeFileSync(
  outJson,
  JSON.stringify({generatedAt: new Date().toISOString(), markdownLength: md.length}, null, 2) + '\n',
);
console.log('Wrote', outJson);
