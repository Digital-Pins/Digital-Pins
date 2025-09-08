# Projects Catalog & Docs Linkage

This site renders a Projects catalog from Markdown files and links to external docs served via Nginx.

## Where content lives

- Project definitions: `projects-defination/*.md` (one file per project)
- Public docs: `/opt/dolibarr/doc/Dev-Hub-web-content` (served at `/docs/`)

## Markdown frontmatter (required)

```yaml
title: Human‑readable title
summary: Short business summary
status: Under Development | Planning | Live
tags: [Integration, ERP, Security]
lastUpdated: YYYY-MM-DD
links:
  - label: Case Study
    url: /docs/DigitalPin-Implementation-Case-Study.md
```

## Add a new project

1. Create `projects-defination/<slug>.md` with the frontmatter above and body content.
2. Use standard Markdown; GitHub‑Flavored Markdown (tables/tasks) is supported.
3. Optional: emojis in headings; an automatic emoji badge is inferred from tags/status.
4. Build & restart:
   - `npm run build`
   - restart systemd service for the site

## Docs linkage

- Place PDFs/MDs under `/opt/dolibarr/doc/Dev-Hub-web-content` to expose them at `/docs/*`.
- Reference those files in `links` frontmatter so they appear as buttons on the project detail page.

## Deployment

- Service: `digitalpin-website` (Next.js start on port 3220)
- Nginx vhost proxies `digitalpin.online` → `127.0.0.1:3220`; `/docs/` is an alias to the docs folder.
- Cloudflare: SSL Full (strict); no special caching needed for `/projects/*`.

## Notes

- Dates in frontmatter are normalized to strings; prefer `YYYY-MM-DD`.
- Slugs are derived from file names (without `.md`). Keep them lowercase and hyphenated.
