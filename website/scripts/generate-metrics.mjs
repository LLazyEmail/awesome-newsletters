#!/usr/bin/env node
/**
 * Count curated links in README + docs for a public metrics JSON (AEM MetricsStrip companion).
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(websiteRoot, '..');
const LINK_RE = /\[[^\]]+\]\((https?:\/\/[^)]+)\)/g;

function countLinks(file) {
  if (!fs.existsSync(file)) return 0;
  const text = fs.readFileSync(file, 'utf8');
  return [...text.matchAll(LINK_RE)].length;
}

const readme = path.join(repoRoot, 'README.md');
const docsDir = path.join(websiteRoot, 'docs');
let docsLinks = 0;
let docsFiles = 0;
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.md')) {
      docsFiles += 1;
      docsLinks += countLinks(full);
    }
  }
}
walk(docsDir);
const readmeLinks = countLinks(readme);
const payload = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  name: 'Awesome Newsletters metrics',
  repository: 'https://github.com/LLazyEmail/awesome-newsletters',
  readmeLinks,
  docsFiles,
  docsLinks,
  totalTrackedLinks: readmeLinks + docsLinks,
};
const out = path.join(websiteRoot, 'static/api/v1/metrics.json');
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n');
console.log(JSON.stringify(payload, null, 2));
