#!/usr/bin/env node
/**
 * Validate curated README list entries look like:
 *   - [Title](https://url) — optional description
 *   - [Title](https://url) (Source)
 * Allows annotation suffixes like "— ⚠️ 404 when checked …"
 *
 * Exit 0 when clean; exit 1 when hard errors (unless --warn).
 */
import fs from 'node:fs';

const warnOnly = process.argv.includes('--warn');
const readme = fs.readFileSync('README.md', 'utf8');
const lines = readme.split('\n');

const entryRe = /^\s*[-*]\s+(?:[^\[]*?\s)?\[([^\]]+)\]\(([^)]+)\)(.*)$/;
const urlRe = /^https?:\/\//i;
const errors = [];
const warnings = [];

let inFence = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim().startsWith('```')) {
    inFence = !inFence;
    continue;
  }
  if (inFence) continue;
  if (!/^\s*[-*]\s+/.test(line)) continue;
  // Skip TOC-style internal anchors only lists under Table of Contents until next ##
  const m = line.match(entryRe);
  if (!m) {
    // numbered tactics / plain bullets without links are OK
    if (/^\s*[-*]\s+\[[^\]]+\]:#/.test(line)) continue;
    if (!/\[[^\]]+\]\([^)]+\)/.test(line) && !/https?:\/\//.test(line)) continue;
    warnings.push(`L${i + 1}: bullet looks link-like but failed parse: ${line.slice(0, 120)}`);
    continue;
  }
  const [, title, url] = m;
  if (!title.trim()) errors.push(`L${i + 1}: empty link title`);
  if (url.startsWith('#')) continue; // TOC
  if (!urlRe.test(url) && !url.startsWith('mailto:')) {
    errors.push(`L${i + 1}: non-http(s) URL for "${title}": ${url}`);
  }
}

const out = [...errors.map((e) => `ERROR ${e}`), ...warnings.map((w) => `WARN  ${w}`)];
if (out.length) console.log(out.join('\n'));
console.log(`entry-format: ${errors.length} error(s), ${warnings.length} warning(s)`);
if (errors.length && !warnOnly) process.exit(1);
