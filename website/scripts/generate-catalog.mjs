#!/usr/bin/env node
/**
 * Parse curated README + website/docs markdown lists into tagged catalog JSON.
 * Mirrors awesome-email-marketing generate-catalog.mjs (simplified for newsletters).
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(websiteRoot, '..');
const docsRoot = path.join(websiteRoot, 'docs');

const SOURCES = [
  {file: 'README.md', root: repoRoot, section: 'readme', page: '/', baseTags: ['readme']},
  {file: 'directories.md', root: docsRoot, section: 'directories', page: '/docs/directories', baseTags: ['directory']},
  {file: 'articles.md', root: docsRoot, section: 'articles', page: '/docs/articles', baseTags: ['article']},
  {file: 'growth.md', root: docsRoot, section: 'growth', page: '/docs/growth', baseTags: ['growth']},
  {file: 'list-building.md', root: docsRoot, section: 'list-building', page: '/docs/list-building', baseTags: ['list-building']},
  {file: 'monetization.md', root: docsRoot, section: 'monetization', page: '/docs/monetization', baseTags: ['monetization']},
  {file: 'templates.md', root: docsRoot, section: 'templates', page: '/docs/templates', baseTags: ['templates']},
  {file: 'github-repos.md', root: docsRoot, section: 'github', page: '/docs/github-repos', baseTags: ['github']},
  {file: 'ops.md', root: docsRoot, section: 'ops', page: '/docs/ops', baseTags: ['ops', 'deliverability']},
  {file: 'arthur-articles.md', root: docsRoot, section: 'arthur', page: '/docs/arthur-articles', baseTags: ['article']},
];

const TAG_RULES = [
  {tag: 'directory', pattern: /directory|roundup|best newsletter|list of/i},
  {tag: 'growth', pattern: /growth|demand curve|subscriber|referral/i},
  {tag: 'monetization', pattern: /monetiz|sponsor|affiliate|paid/i},
  {tag: 'templates', pattern: /template|html email|mjml|maizzle/i},
  {tag: 'github', pattern: /github\.com/i},
  {tag: 'platform', pattern: /substack|beehiiv|ghost|buttondown|convertkit|kit\.com/i},
  {tag: 'analytics', pattern: /analytics|benchmark|metric|open rate/i},
  {tag: 'deliverability', pattern: /deliverability|dkim|spf|dmarc|spam/i},
];

const ITEM_RE =
  /^\s*[-*]\s+(?:[^\[]*?\s)?\[([^\]]+)\]\(([^)]+)\)(?:\s*[-–—:]\s*(.+))?/;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function inferTags(name, description, url, baseTags) {
  const haystack = `${name} ${description || ''} ${url}`;
  const tags = new Set(baseTags);
  for (const rule of TAG_RULES) {
    if (rule.pattern.test(haystack)) tags.add(rule.tag);
  }
  if (url.includes('github.com')) tags.add('github');
  return [...tags].sort();
}

function parseFile(absPath, meta) {
  if (!fs.existsSync(absPath)) return [];
  const text = fs.readFileSync(absPath, 'utf8');
  const items = [];
  for (const line of text.split('\n')) {
    const m = line.match(ITEM_RE);
    if (!m) continue;
    const [, name, url, description = ''] = m;
    if (!/^https?:\/\//i.test(url)) continue;
    if (url.includes('img.shields.io') || url.includes('awesome.re/badge')) continue;
    items.push({
      id: slugify(name),
      name: name.trim(),
      url: url.trim(),
      description: (description || '').replace(/\s*—\s*⚠️.*$/, '').trim(),
      section: meta.section,
      sourcePage: meta.page,
      sourceFile: meta.file,
      tags: inferTags(name, description, url, meta.baseTags),
    });
  }
  return items;
}

const all = [];
for (const src of SOURCES) {
  const abs = path.join(src.root, src.file);
  all.push(...parseFile(abs, src));
}

const tags = [...new Set(all.flatMap((i) => i.tags))].sort();
const payload = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  name: 'Awesome Newsletters catalog',
  homepage: 'https://llazyemail.github.io/awesome-newsletters/',
  repository: 'https://github.com/LLazyEmail/awesome-newsletters',
  tags,
  items: all,
};

const dataOut = path.join(websiteRoot, 'src/data/catalog.json');
const apiOut = path.join(websiteRoot, 'static/api/v1/catalog.json');
fs.mkdirSync(path.dirname(apiOut), {recursive: true});
fs.writeFileSync(dataOut, JSON.stringify(payload, null, 2) + '\n');
fs.writeFileSync(apiOut, JSON.stringify(payload, null, 2) + '\n');
console.log(`catalog: ${all.length} items, ${tags.length} tags`);
