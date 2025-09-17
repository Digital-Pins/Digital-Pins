# Dolibarr Upgrade Plan (Proposal)

This document outlines a safe path to keep Dolibarr secure and compatible with the customer portal.

## Recommendation
- Minimum: upgrade to latest 18.x patch (security/bug fixes).
- Preferred: stage-test the latest stable (e.g., 19.x/20.x when available) and upgrade after validation.

## Why
- Security fixes and supported PHP versions.
- REST API stability/bugfixes (thirdparties, invoices, tickets, events).
- Better module compatibility and performance.

## Pre‑flight checklist
- Inventory modules enabled and customizations.
- Move local UI edits from core files to a custom module/theme to avoid overwrite.
- Ensure PHP extensions installed (mbstring, gd, curl, xml, intl, imap, zip, mysqli/mysqlnd).
- Backups:
  - DB: `mysqldump -u root -p --single-transaction pinerp > /var/backups/pinerp_$(date +%F).sql`
  - Files: archive `htdocs/` and `documents/` (keep `htdocs/conf/conf.php`).

## Staging validation
- Clone DB + `documents/` to a staging instance/domain.
- Deploy the target Dolibarr version there.
- Validate:
  - Login, thirdparties, invoices, tickets, agenda events.
  - PDF generation, email templates, cron jobs.
  - Customer portal API calls (list invoices, create ticket, list events).

## Upgrade steps (tarball method)
1) Put production in maintenance mode (web server 503 page or Dolibarr maintenance).
2) Backup DB and files.
3) Download new version tarball from official site.
4) Extract and replace core directories (htdocs/, scripts/, etc.) but keep:
   - `htdocs/conf/conf.php`
   - `documents/`
   - any `htdocs/custom/` modules/themes
5) Run `install/upgrade.php` (web) and follow database migrations.
6) Clear caches (browser + Dolibarr temp if enabled).
7) Re‑enable cron jobs and verify logs.

## Rollback plan
- If validation fails, restore DB dump and previous code snapshot.

## Post‑upgrade checks
- Verify PHP version compatibility (8.1/8.2/8.3 as required by target Dolibarr).
- Check security settings and module statuses.
- Reapply branding only via custom module/theme (not core file edits).

## Customer portal compatibility
- Endpoints used:
  - `GET /thirdparties`, `GET /invoices`, `POST /tickets`, (future) `POST /events`
- Test these on staging after each upgrade.
