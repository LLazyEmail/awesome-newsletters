#!/usr/bin/env node
/**
 * Copy curated README.md sections into website/docs/*.md
 * Run from website/: node ./scripts/generate-docs-from-readme.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const readmePath = path.join(repoRoot, 'README.md');
const docsRoot = path.resolve(__dirname, '../docs');

const MAPPING = [
  ['Newsletter directories & roundups', 'directories.md', 'Newsletter directories'],
  ['Great articles to read', 'articles.md', 'Great articles'],
  ['Demand Curve & growth tactics', 'growth.md', 'Demand Curve & growth'],
  ['Building a list', 'list-building.md', 'Building a list'],
  ['Monetization', 'monetization.md', 'Monetization'],
  ['Templates & HTML email', 'templates.md', 'Templates & HTML email'],
  ['GitHub repositories', 'github-repos.md', 'GitHub repositories'],
  ['Ops, deliverability & Sendy notes', 'ops.md', 'Ops & deliverability'],
  ['Arthur Tkachenko articles', 'arthur-articles.md', 'Arthur Tkachenko articles'],
];

if (!fs.existsSync(readmePath)) {
  console.error('README.md not found at', readmePath);
  process.exit(1);
}

const readme = fs.readFileSync(readmePath, 'utf8');
const parts = readme.split(/^(## .+)$/m);
const sections = new Map();
for (let i = 1; i < parts.length; i += 2) {
  const title = parts[i].replace(/^##\s+/, '').trim();
  const body = (parts[i + 1] || '').trim();
  sections.set(title, body);
}

const present = MAPPING.filter(([title]) => sections.has(title));
if (present.length < 5) {
  console.warn(
    `generate-docs-from-readme: only ${present.length}/${MAPPING.length} sections found in README; leaving website/docs unchanged`,
  );
  process.exit(0);
}

let written = 0;
for (const [title, file, sidebar] of MAPPING) {
  const body = sections.get(title);
  if (!body) {
    console.warn('skip missing section:', title);
    continue;
  }
  const content = `---
title: "${sidebar}"
sidebar_label: "${sidebar}"
description: "Curated resources: ${sidebar}"
---

# ${sidebar}

${body}
`;
  fs.writeFileSync(path.join(docsRoot, file), content);
  written += 1;
}

console.log(`generate-docs-from-readme: wrote ${written} docs from README.md`);
