#!/usr/bin/env node
/**
 * Parse website/docs/notable-newsletters/** into public API JSON.
 * Mirrors AEM generate-industry-leaders.mjs for newsletter profiles.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const root = path.join(websiteRoot, 'docs/notable-newsletters');
const outputPath = path.join(websiteRoot, 'static/api/v1/notable-newsletters.json');

const SKIP = new Set(['index.md', '_SOURCE_TEMPLATE.md']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || entry.name === '_category_.json') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.md') && !SKIP.has(entry.name)) out.push(full);
  }
  return out;
}

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return {data: {}, body: text};
  const end = text.indexOf('\n---', 3);
  if (end === -1) return {data: {}, body: text};
  const data = {};
  let currentObject = null;
  for (const raw of text.slice(4, end).split('\n')) {
    const nested = raw.match(/^  ([A-Za-z0-9_]+):\s*(.*)$/);
    if (nested && currentObject) {
      let value = nested[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
        value = value.slice(1, -1);
      data[`${currentObject}.${nested[1]}`] = value;
      continue;
    }
    const match = raw.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (value === '') { currentObject = match[1]; continue; }
    currentObject = null;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
      value = value.slice(1, -1);
    data[match[1]] = value;
  }
  return {data, body: text.slice(end + 4)};
}

const files = walk(root);
const newsletters = [];
const byTopic = {};
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const {data} = parseFrontmatter(text);
  const rel = path.relative(path.join(websiteRoot, 'docs'), file).replace(/\\/g, '/');
  const id = path.basename(file, '.md');
  const topic = data['source.topic'] || data.topic || 'general';
  byTopic[topic] = (byTopic[topic] || 0) + 1;
  newsletters.push({
    id,
    name: data['source.name'] || data.title || id,
    topic,
    homepage: data['source.homepage'] || '',
    sourcePage: `/docs/notable-newsletters/${id}`,
    path: rel,
    whyStudy: data.description || '',
  });
}
newsletters.sort((a, b) => a.name.localeCompare(b.name));
const payload = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  name: 'Notable newsletters',
  homepage: 'https://llazyemail.github.io/awesome-newsletters/docs/notable-newsletters',
  repository: 'https://github.com/LLazyEmail/awesome-newsletters',
  count: newsletters.length,
  byTopic,
  newsletters,
};
fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + '\n');
console.log(`notable-newsletters: ${newsletters.length} profiles`);
