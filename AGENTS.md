# Guidance for AI coding agents

This repository is an **awesome list** of newsletter-related resources, plus (soon) a Docusaurus docs site under `website/`, mirroring [LLazyEmail/awesome-email-marketing](https://github.com/LLazyEmail/awesome-email-marketing).

## Do

- Prefer **small, single-purpose PRs** (one concern each).
- **Keep all existing list entries.** Restructure, fix formatting, or annotate — do not delete wholesale.
- Open PRs as **drafts** against `main` unless a human asks otherwise.
- Match the stack and workflow style of `awesome-email-marketing` when adding CI or the website (Docusaurus 3.x under `website/`, GitHub Pages deploy).
- Include the trailer `Co-authored-by: petroved <arthur.tkachenko.netweight@gmail.com>` on commits when working for Arthur Tkachenko / petroved.

## Don’t

- Don’t merge PRs unless explicitly asked.
- Don’t enable or guess at GitHub Pages / org secrets; note required settings for a human.
- Don’t invent resources that are not in the list or notes.
- Don’t run destructive git history rewrites on `main`.

## Layout (target)

- `README.md` — curated public list
- `notes/` — preserved scratch / course notes
- `website/` — Docusaurus site (when scaffolded)
- `.github/workflows/` — deploy, test-deploy, lint, link-check, star-request, auto-rebase, changelog
