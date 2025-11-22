# Copilot instructions update report

Date: 2025-09-14

Summary
- Created repository-specific `.github/copilot-instructions.md` to guide AI coding agents working in this monorepo.
- File created at: `.github/copilot-instructions.md`

What I inspected
- Root `README.md` for project context and system requirements (Dolibarr ERP & CRM PHP core).
- `digitalpin-website/package.json` for dev/build scripts and dependencies (Next.js 14, next-auth, Tailwind).
- `digitalpin-website/next.config.mjs` for global CSP headers.
- `digitalpin-website/scripts/clean-routes.cjs` which removes generated localized/project routes during install/build.
- `digitalpin-website/lib/dolibarr.ts` — a build-safe stub used by portal APIs; important to preserve signature when replacing.
- Example API routes under `digitalpin-website/app/api/*` and `digitalpin-website/app/portal/api/*` demonstrating server-route patterns, env-gated external API usage, and error handling.

Key repo-specific guidance added
- Next.js App Router & server-route patterns: prefer server components and follow existing `app/` structure.
- Stubs & build-time safety: keep `lib/dolibarr.ts` API stable or update all callers when changing.
- Env-gated external APIs: lazy-load and provide safe non-network fallbacks (see `app/api/chat/route.ts`).
- CSP is centrally controlled in `next.config.mjs`; update it if adding external script/style sources.
- `scripts/clean-routes.cjs` must be updated if localized route layout changes.

Commands to validate changes locally
(From `digitalpin-website/`)
```bash
npm run dev      # runs next dev -p ${PORT:-3220}
npm run build    # runs next build
# After TS edits
npx tsc --noEmit  # typecheck using project tsconfig
```

Files added/changed
- Added: `.github/copilot-instructions.md` (concise guidance, examples, and file references)
- Added: `digitalpin-website/doc/Dev-Hub-web-content/copilot-instructions-report.md` (this file)

Next steps suggested
- Expand with a concrete example for replacing `lib/dolibarr.ts` with a real client + small tests.
- Clean up merge markers in `digitalpin-website/README.md` (currently contains conflict remnants).

If you'd like, I can implement either next step now. Please tell me which one to do.
