#!/usr/bin/env node
/**
 * Report duplicate URLs in README.md curated entries.
 * Exit 1 if duplicates found (unless --warn).
 * CI uses --warn so intentional cross-references stay green.
 */
import fs from 'node:fs';

const warnOnly = process.argv.includes('--warn');
const text = fs.readFileSync('README.md', 'utf8');
const re = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
const seen = new Map();
const dupes = [];
let m;
while ((m = re.exec(text))) {
  const title = m[1];
  let url = m[2].replace(/\/$/, '').toLowerCase();
  if (url.includes('img.shields.io') || url.includes('awesome.re/badge')) continue;
  if (seen.has(url)) {
    dupes.push({url: m[2], first: seen.get(url), second: title});
  } else {
    seen.set(url, title);
  }
}

if (dupes.length) {
  for (const d of dupes) {
    console.log(`DUPLICATE ${d.url}\n  first: ${d.first}\n  again: ${d.second}`);
  }
}
console.log(`duplicate-links: ${dupes.length} duplicate(s) across ${seen.size} unique URLs`);
if (dupes.length && !warnOnly) process.exit(1);
