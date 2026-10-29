#!/usr/bin/env node
/**
 * Within each ## / ### section, check that link-entry titles are
 * alphabetically sorted (case-insensitive). Default: warn-only (exit 0).
 * Pass --strict to exit 1 on disorder.
 */
import fs from 'node:fs';

const strict = process.argv.includes('--strict');
const lines = fs.readFileSync('README.md', 'utf8').split('\n');
const entryRe = /^\s*[-*]\s+\[([^\]]+)\]\((https?:\/\/[^)]+)\)/;

let section = '(preamble)';
let titles = [];
const problems = [];

function flush() {
  if (titles.length < 2) {
    titles = [];
    return;
  }
  const sorted = [...titles].sort((a, b) =>
    a.localeCompare(b, 'en', {sensitivity: 'base'}),
  );
  for (let i = 0; i < titles.length; i++) {
    if (titles[i] !== sorted[i]) {
      problems.push(
        `Section "${section}": not alphabetical near "${titles[i]}" (expected "${sorted[i]}")`,
      );
      break;
    }
  }
  titles = [];
}

for (const line of lines) {
  if (/^#{2,3}\s+/.test(line)) {
    flush();
    section = line.replace(/^#+\s+/, '').trim();
    continue;
  }
  const m = line.match(entryRe);
  if (m) titles.push(m[1]);
}
flush();

if (problems.length) console.log(problems.join('\n'));
console.log(`sorted-sections: ${problems.length} section(s) out of order`);
if (problems.length && strict) process.exit(1);
