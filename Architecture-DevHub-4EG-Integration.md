## Digital PIN Dev-hub vs 4EG Marketing — Integration Plan

This document outlines roles, deployment, and data flows between:
- Dev-hub: digitalpin.online (Next.js, this server)
- Marketing: 4egtrust.com (Next.js or similar frontend) with Strapi backend
- ERP: Dolibarr (erp.digitalpin.online)

### Roles
- Dev-hub (digitalpin.online):
  - Engineering portal, documentation, API explorers, internal demos, and customer portal staging.
  - Owns technical assets (CI notes, API proxies for staging, integration testbeds).
- Marketing (4egtrust.com + Strapi):
  - Public brand site, landing pages, blog, case studies, lead capture.
  - Strapi as content hub (pages, posts, media, forms).
- ERP (Dolibarr):
  - Operational backbone: customers (third parties), invoices, tickets, products, payments.

### Integration surfaces
- Leads:
  - Marketing forms → Strapi → (webhook) → Dev-hub or ERP when sales-qualified.
  - Option A: Dev-hub `/api/lead` forwards to Strapi (primary) and optionally ERP.
  - Option B: Strapi emits webhooks to Dev-hub → ERP (create thirdparty/ticket when rules match).
- Customers & Invoices:
  - Source of truth: Dolibarr. Strapi references (no duplication) or nightly snapshot for content-only needs.
- Tickets/Support:
  - Source of truth: Dolibarr. Dev-hub exposes secure views; Marketing site links to portal.

### Data contracts (draft)
- Lead (Strapi → Dev-hub webhook):
  - { id, name, email, company?, source, message, ts }
- Customer (ERP → Dev-hub):
  - { id, name, email, thirdpartyId, status }
- Invoice (ERP → Dev-hub):
  - { id, ref, total_ttc, status, due_date }

### Security
- Cloudflare Full (strict) on all public hosts.
- HSTS, CSP, no frames, minimal connect-src.
- Service accounts and least privilege for ERP API keys.

### Deployment templates
- systemd: build/systemd/digitalpin-website.service
- Nginx: build/nginx/digitalpin.online.conf

### Next steps
- Finalize webhook endpoints between Strapi and Dev-hub.
- Configure CRM/email for lead routing.
- Define a read-only Strapi content fetcher for Dev-hub docs (optional).
