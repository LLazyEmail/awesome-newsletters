# Security Policy

## Supported versions

This repository is a curated markdown awesome-list plus a static Docusaurus documentation site. There is no production application runtime to patch.

## Reporting a vulnerability

If you discover a security issue in:

- repository automation (GitHub Actions workflows), or
- the published GitHub Pages site (XSS via injected markdown, dependency compromise, etc.)

please **do not** open a public issue with exploit details.

Instead, email **arthur.tkachenko.netweight@gmail.com** with:

1. A short description of the issue
2. Steps to reproduce (or a proof-of-concept)
3. Any suggested fix

We will acknowledge within a few business days and coordinate a fix + disclosure.

## Dependency updates

Website dependencies are intended to be kept current via Renovate (see `renovate.json`). Please prefer opening a PR for dependency bumps rather than filing a security advisory for routine upgrades.
