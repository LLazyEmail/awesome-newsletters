# Awesome Newsletters website

Docusaurus site for [LLazyEmail/awesome-newsletters](https://github.com/LLazyEmail/awesome-newsletters).

## Scripts

| npm script | Purpose |
| --- | --- |
| `start` | Local dev server |
| `build` | Production build |
| `generate:catalog` | Parse README/docs → `src/data/catalog.json` + `static/api/v1/catalog.json` |
| `generate:notable-newsletters` | Parse notable profiles → `static/api/v1/notable-newsletters.json` |
| `generate:metrics` | Link counts → `static/api/v1/metrics.json` |

## Public JSON API

Served from `static/api/v1/` after build/deploy:

- `/api/v1/catalog.json` — tagged catalog of curated links
- `/api/v1/notable-newsletters.json` — notable newsletter profiles
- `/api/v1/glossary.json` — glossary terms
- `/api/v1/metrics.json` — link/doc counts

Pattern mirrors [awesome-email-marketing](https://github.com/LLazyEmail/awesome-email-marketing) industry-leaders + catalog APIs.

## Docs layout

- Top-level docs mirror README sections
- `docs/guides/` — practical publisher guides
- `docs/notable-newsletters/` — per-newsletter study pages
