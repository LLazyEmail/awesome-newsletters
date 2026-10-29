# Awesome Newsletters — merge order

Source of truth for merging open PRs in
[`LLazyEmail/awesome-newsletters`](https://github.com/LLazyEmail/awesome-newsletters).

**Generated:** 2026-10-29 (Thursday) — generated 22:21 Europe

Work top to bottom. Tick each box after the PR lands on `main`.
Prefer squash or rebase merges that keep list content. Do **not** drop README
or catalog entries. Re-fetch `main` between groups if anything else merges first.

---

## 1. Notable newsletter profiles (independent docs)

Each PR adds a single docs page. Safe in any order within this group.

- [ ] [#71 feat(docs): add TLDR notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/71) — leaf docs page; no deps
- [ ] [#72 feat(docs): add Dense Discovery notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/72) — leaf docs page; no deps
- [ ] [#73 feat(docs): add Milk Road notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/73) — leaf docs page; no deps
- [ ] [#74 feat(docs): add Not Boring notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/74) — leaf docs page; no deps
- [ ] [#75 feat(docs): add Every notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/75) — leaf docs page; no deps
- [ ] [#76 feat(docs): add Bytes notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/76) — leaf docs page; no deps
- [ ] [#77 feat(docs): add JavaScript Weekly notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/77) — leaf docs page; no deps
- [ ] [#78 feat(docs): add Platformer notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/78) — leaf docs page; no deps
- [ ] [#79 feat(docs): add Axios AM notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/79) — leaf docs page; no deps
- [ ] [#80 feat(docs): add Frontend Focus notable-newsletter profile](https://github.com/LLazyEmail/awesome-newsletters/pull/80) — leaf docs page; no deps

---

## 2. Data seeds and static API payloads

- [ ] [#63 feat(website): add glossary.json data for newsletter terms](https://github.com/LLazyEmail/awesome-newsletters/pull/63) — `website/src/data/glossary.json`; pair with #64
- [ ] [#64 feat(api): publish glossary.json under static/api/v1](https://github.com/LLazyEmail/awesome-newsletters/pull/64) — static API copy; merge with or right after #63
- [ ] [#98 feat(data): add directories.yaml structured entries seed](https://github.com/LLazyEmail/awesome-newsletters/pull/98) — new `entries/` seed only; no deps

---

## 3. Small website / GitHub extras (no shared-file fights)

- [ ] [#100 feat(website): add RelatedResources component](https://github.com/LLazyEmail/awesome-newsletters/pull/100) — new component only; no deps
- [ ] [#103 feat(website): add robots.txt with sitemap pointer](https://github.com/LLazyEmail/awesome-newsletters/pull/103) — static file; no deps
- [ ] [#105 feat(github): add issue form for notable newsletter profiles](https://github.com/LLazyEmail/awesome-newsletters/pull/105) — issue template only; no deps

---

## 4. CI / entry-format fix

- [ ] [#58 ci: allow prefixed text before markdown links in entry-format](https://github.com/LLazyEmail/awesome-newsletters/pull/58) — one-line regex on `validate-entry-format.mjs`; rebase if #118 lands first (same workflow area)

---

## 5. Combined README sections

- [ ] [#121 feat(readme): combine overlapping README section PRs](https://github.com/LLazyEmail/awesome-newsletters/pull/121) — replaces closed #46/#57/#92–#97; touch `README.md` once; convert from draft if needed before merge

---

## 6. Combined Explore / catalog / generators

Merge this **before** the catalog/notable API workflows and the website README that documents the generators.

- [ ] [#122 feat(website): combine Explore, catalog, and generator PRs](https://github.com/LLazyEmail/awesome-newsletters/pull/122) — replaces closed #61/#65–#68/#81/#99/#102/#104/#106; touches `package.json`, config, Explore stack; draft — mark ready before merge

---

## 7. Workflows and docs that depend on #122

- [ ] [#62 ci: add workflow to regenerate catalog JSON API](https://github.com/LLazyEmail/awesome-newsletters/pull/62) — **depends on #122** (`generate:catalog` script); rebase after #122 if needed
- [ ] [#82 ci: add workflow to regenerate notable-newsletters JSON API](https://github.com/LLazyEmail/awesome-newsletters/pull/82) — **depends on #122** (`generate:notable-newsletters`); rebase after #122 if needed
- [ ] [#101 docs(website): document generators and JSON API in website README](https://github.com/LLazyEmail/awesome-newsletters/pull/101) — **depends on #122** (documents those generators); rebase after #122 if the README section drifts

---

## Blocked or waiting

Adoption PRs that switch local workflows to
[`LLazyEmail/documentation-actions`](https://github.com/LLazyEmail/documentation-actions).
**Do not merge until that repo’s reusable workflows are on its `main`.**
Then rebase each onto current `awesome-newsletters` `main` and re-check CI.

- [ ] [#110 ci: adopt documentation-actions star-request](https://github.com/LLazyEmail/awesome-newsletters/pull/110) — blocked on documentation-actions
- [ ] [#111 ci: adopt documentation-actions auto-rebase](https://github.com/LLazyEmail/awesome-newsletters/pull/111) — blocked on documentation-actions; needs a token that can push rebases if required by the action
- [ ] [#112 ci: adopt documentation-actions markdownlint](https://github.com/LLazyEmail/awesome-newsletters/pull/112) — blocked on documentation-actions; may replace local markdown-lint workflow
- [ ] [#113 ci: adopt documentation-actions lychee link-check](https://github.com/LLazyEmail/awesome-newsletters/pull/113) — blocked on documentation-actions; keep soft-fail behavior unless you intend hard fail
- [ ] [#114 ci: adopt documentation-actions test-deploy](https://github.com/LLazyEmail/awesome-newsletters/pull/114) — blocked on documentation-actions; needs Pages/build secrets as today
- [ ] [#115 ci: adopt documentation-actions Pages deploy](https://github.com/LLazyEmail/awesome-newsletters/pull/115) — blocked on documentation-actions; needs GitHub Pages source = GitHub Actions
- [ ] [#116 ci: adopt documentation-actions changelog](https://github.com/LLazyEmail/awesome-newsletters/pull/116) — blocked on documentation-actions; needs `contents: write` (or equivalent) for bot commits
- [ ] [#117 ci: adopt documentation-actions docs-index](https://github.com/LLazyEmail/awesome-newsletters/pull/117) — blocked on documentation-actions; needs write permission for index updates
- [ ] [#118 ci: adopt documentation-actions entry-format check](https://github.com/LLazyEmail/awesome-newsletters/pull/118) — blocked on documentation-actions; rebase after #58 if both still open (same workflow file)
- [ ] [#119 ci: adopt documentation-actions duplicate-links check](https://github.com/LLazyEmail/awesome-newsletters/pull/119) — blocked on documentation-actions
- [ ] [#120 ci: adopt documentation-actions sorted-sections check](https://github.com/LLazyEmail/awesome-newsletters/pull/120) — blocked on documentation-actions

---

## Settings to change

Before or while working the list above:

1. **Draft → Ready** — many PRs are drafts (#62–#64, #72–#80, #82, #98, #100–#105, #110–#120, #122). Mark **Ready for review** (or enable draft merges) before merging.
2. **Branch protection** — confirm required status checks still match the workflows you keep; after #110–#120 land, update required checks to the adoption job names.
3. **GitHub Pages** — Settings → Pages → Source = **GitHub Actions** (needed for deploy / #115).
4. **Actions permissions** — allow Actions to create PRs / write contents if changelog (#116) or docs-index (#117) should push from `GITHUB_TOKEN` (or use a PAT / app token in secrets).
5. **documentation-actions first** — merge and tag/publish reusable workflows in `LLazyEmail/documentation-actions` before adopting #110–#120 here.
6. **Do not merge this checklist PR into the “must land” queue** — see below.

---

## This checklist PR

- [ ] [#123 docs: add MERGE_ORDER.md merge checklist for open PRs](https://github.com/LLazyEmail/awesome-newsletters/pull/123) — **merge or close after use**; working note only, list last so it does not block real merges

---

## Quick count (at generation time)

| Group | Count |
| --- | --- |
| Ready path (sections 1–7) | 22 |
| Blocked adoption (#110–#120) | 11 |
| This checklist PR (#123) | 1 |
