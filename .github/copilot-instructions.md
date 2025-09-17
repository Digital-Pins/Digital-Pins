<!--
  Short, actionable guidance for AI coding agents working in the Digital-Pins repository.
  Keep this file concise (20-50 lines). Replace or extend when repository structure changes.
-->

# Copilot instructions — Digital-Pins

- Project snapshot: monorepo-style repo with a PHP core (`htdocs/`), multiple web apps (notably `digitalpin-website/`), and integration glue for Dolibarr ERP.

- Primary web app: `digitalpin-website/` — a Next.js 14 app (App Router) + Tailwind. Customer portal lives at `digitalpin-website/customer-portal/` using the same Next.js layout.

- Build & dev commands (use from `digitalpin-website/`):
  - dev: `npm run dev` (runs `next dev -p ${PORT:-3220}`)
  - build: `npm run build` (runs `next build`)
  - start: `npm run start` (runs `next start -p ${PORT:-3220}`)
  - Note: pre/post install and prebuild scripts run `scripts/clean-routes.cjs` to remove generated routes; inspect that script before changing route generation.

- Key integration points to read before making changes:
  - `digitalpin-website/lib/dolibarr.ts` — lightweight stub used by portal API routes. Replace cautiously; maintain build-time safety when contacting real Dolibarr APIs.
  - `digitalpin-website/app/portal/api/**` — server-route handlers that call the `lib/dolibarr` functions; keep error format and HTTP statuses consistent.
  - `digitalpin-website/app/api/chat/route.ts` — demonstrates external OpenAI usage with a safe fallback; respect the same fallback pattern when adding external API calls.
  - `digitalpin-website/next.config.mjs` — global headers (CSP) are defined here; any change to script/style sources must be mirrored in CSP.
  - `digitalpin-website/scripts/clean-routes.cjs` — removes generated localized routes prior to build; altering app folder layout may require updating this script.

- Conventions & patterns specific to this repo:
  - App Router + `app/` directory: prefer server components for API and data fetching in `app/` routes; client components live under `app/components` or use 'use client'.
  - Lightweight stubs: `lib/dolibarr.ts` provides safe defaults for local dev and CI — don't assume production API availability.
  - Environment-driven runtime behavior: features (OpenAI usage, OAuth) are gated by env vars (e.g., `OPENAI_API_KEY`, `NEXTAUTH_*`). Add env checks and safe fallbacks.
  - Error handling in API routes: return JSON with { error } and appropriate status (see portal invoice routes).

- Small examples to follow:
  - Fetch invoice list in a server route: call `listCustomerInvoices({ limit: 50 })` and return `NextResponse.json(data)`; on catch, return `{ error: message }` and status from caught error.
  - Add external API integration: lazy-import or fetch only if required env var exists; provide a non-network fallback for tests/builds.

- Tests & validation guidance:
  - There are no centralized automated tests for the Next.js app in this repo; validate changes by running `npm run build` in `digitalpin-website/` and checking `.next` output.
  - After edits to TypeScript files, run `tsc --noEmit` (uses `digitalpin-website/tsconfig.json`) to catch type errors.

- When editing files:
  - Keep public API surface of `lib/dolibarr.ts` stable (same function names & signatures) unless you update all callers.
  - Avoid committing credentials. Use `.env` for local secrets and follow the `next-auth` provider callbacks pattern in `app/api/auth/[...nextauth]/route.ts`.

- Where to look for more context:
  - Root README: `README.md` (Dolibarr project context and system requirements)
  - App README: `digitalpin-website/README.md` (company/project notes; may include merge markers — prefer code files for canonical behaviour)

Please review these lines and tell me if you'd like me to expand examples (routing, stub replacement, or CSP updates).
