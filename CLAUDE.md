# CLAUDE.md

Project notes for Claude (and compatible agents). See also [`AGENTS.md`](./AGENTS.md).

## Project

**awesome-newsletters** — curated newsletter resources for LLazyEmail. Sister project: **awesome-email-marketing** (use it as the reference for docs site, workflows, and PR style).

## Working agreements

- Small draft PRs; never wholesale-delete list content.
- Commit trailer when applicable: `Co-authored-by: petroved <arthur.tkachenko.netweight@gmail.com>`
- Default branch: `main`
- Website (when present): Node ≥ 20, `website/` with Docusaurus; Pages URL expected at `https://llazyemail.github.io/awesome-newsletters/` after settings are enabled.

## Useful commands (after website lands)

```bash
cd website
npm ci
npm start          # local docs
npm run build      # production build
```
