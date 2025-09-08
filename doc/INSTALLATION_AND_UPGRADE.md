# Digital PIN ERP (Dolibarr) — Installation & Upgrade Guide

This guide documents how we installed, secured, upgraded, and branded Dolibarr for Digital PIN ERP on Ubuntu (Nginx + PHP-FPM + MariaDB), plus key troubleshooting tips.

## 1) Prerequisites
- OS: Ubuntu Server
- Web: Nginx + php8.1-fpm
- DB: MariaDB 10.6+
- PHP extensions (required):
  - mbstring, gd, curl, xml, intl, imap, zip, mysqli
- File system:
  - Web root: `/opt/dolibarr/htdocs`
  - Data root (documents): `/opt/dolibarr/documents`

Quick install and service restart
```bash
sudo apt-get update -y
sudo apt-get install -y php8.1-mbstring php8.1-gd php8.1-curl php8.1-xml php8.1-intl php8.1-imap php8.1-zip
sudo systemctl restart php8.1-fpm
php -v && php -m | egrep -i "mbstring|gd|curl|xml|intl|imap|zip|mysqli"
```

## 2) Database
Create database and user (example)
```sql
CREATE DATABASE pinerp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pinerp'@'localhost' IDENTIFIED BY 'REPLACE_ME';
GRANT ALL PRIVILEGES ON pinerp.* TO 'pinerp'@'localhost';
FLUSH PRIVILEGES;
```

## 3) Configure Dolibarr
Ensure documents directory exists and is owned by the web user
```bash
sudo mkdir -p /opt/dolibarr/documents
sudo chown -R www-data:www-data /opt/dolibarr/documents
```

Set `htdocs/conf/conf.php` (sample values)
```
$dolibarr_main_url_root='https://erp.digitalpin.online';
$dolibarr_main_document_root='/opt/dolibarr/htdocs';
$dolibarr_main_url_root_alt='/custom';
$dolibarr_main_document_root_alt='/opt/dolibarr/htdocs/custom';
$dolibarr_main_data_root='/opt/dolibarr/documents';
$dolibarr_main_db_host='localhost';
$dolibarr_main_db_port='3306';
$dolibarr_main_db_name='pinerp';
$dolibarr_main_db_user='pinerp';
$dolibarr_main_db_pass='REPLACE_ME';
$dolibarr_main_db_type='mysqli';
$dolibarr_main_db_character_set='utf8mb4';
$dolibarr_main_db_collation='utf8mb4_unicode_ci';
$dolibarr_main_authentication='dolibarr';
```

## 4) Fresh install (web)
1. Browse to: `https://erp.digitalpin.online/install/index.php`
2. Complete the steps; when finished, the installer should create `install.lock`.
3. Hardening (recommended):
   - Make sure `install.lock` exists and is read-only in both:
     - `/opt/dolibarr/documents/install.lock`
     - `/opt/dolibarr/htdocs/install.lock`
   - Set `htdocs/conf/conf.php` read-only.

Create/verify install lock files manually if needed
```bash
sudo sh -c 'echo This_is_a_lock_file_to_prevent_use_of_install_or_upgrade_pages > /opt/dolibarr/documents/install.lock'
sudo sh -c 'echo This_is_a_lock_file_to_prevent_use_of_install_or_upgrade_pages > /opt/dolibarr/htdocs/install.lock'
sudo chown root:root /opt/dolibarr/{documents,htdocs}/install.lock
sudo chmod 444 /opt/dolibarr/{documents,htdocs}/install.lock
```

## 5) Upgrade procedure (safe)
Always backup first
```bash
# DB
mysqldump -u root -p --single-transaction pinerp > /root/backup-pinerp-$(date +%F).sql
# Files
sudo tar -czf /root/backup-dolibarr-files-$(date +%F).tar.gz /opt/dolibarr/htdocs /opt/dolibarr/documents
```

Unlock upgrade and run the wizard
```bash
# Create unlock files and (temporarily) remove install locks if present
sudo touch /opt/dolibarr/documents/upgrade.unlock /opt/dolibarr/htdocs/upgrade.unlock
sudo rm -f /opt/dolibarr/documents/install.lock /opt/dolibarr/htdocs/install.lock
```
- Open: `https://erp.digitalpin.online/install/index.php` (it will detect upgrade mode)
- If you see “Parameter versionfrom or versionto missing”, use direct URL with params, e.g.:
  - `https://erp.digitalpin.online/install/upgrade.php?versionfrom=18.0.4&versionto=22.0.0`
- Complete all steps until “finished”.

Re-lock after upgrade
```bash
# Recreate read-only locks and remove unlocks
for f in /opt/dolibarr/documents/install.lock /opt/dolibarr/htdocs/install.lock; do
  sudo sh -c "echo This_is_a_lock_file_to_prevent_use_of_install_or_upgrade_pages > $f"; sudo chown root:root $f; sudo chmod 444 $f;
done
sudo rm -f /opt/dolibarr/documents/upgrade.unlock /opt/dolibarr/htdocs/upgrade.unlock
```

## 6) Branding (upgrade-safe)
We use a small custom module to inject branding on the login and password-forgotten pages via hooks (no core edits):
- Module dir: `htdocs/custom/digitalpinbranding`
- Enable via: Home → Setup → Modules/Applications → “digitalpinbranding”
- Result: shows “Welcome to Digital PIN ERP Demo” and a link to `https://4egtrust.com` with tooltip “Digital PIN LLC”

## 7) Customer portal (optional)
- Path: `/opt/dolibarr/customer-portal` (Next.js 14)
- Env: `.env.local`
  - `DOL_API_BASE=https://erp.digitalpin.online/api/index.php`
  - `DOL_API_KEY=YOUR_DOLAPIKEY`
- Dev run: `npx next dev -p 3210` (then proxy `/portal` via Nginx if desired)

### Production deployment (app.digitalpin.online)
1) DNS
- Create an A record `app.digitalpin.online` → server IP (Proxy status can be proxied via Cloudflare once SSL is ready).

2) Environment
- Set `customer-portal/.env.production.local`:
```
DOL_API_BASE=https://erp.digitalpin.online/api/index.php
DOL_API_KEY=your_secure_server_side_key
NEXTAUTH_SECRET=replace-with-strong-random
NEXTAUTH_URL=https://app.digitalpin.online
```

3) Nginx vhost (HTTP + reverse proxy to Next.js on 3210)
```
server {
  listen 80;
  listen [::]:80;
  server_name app.digitalpin.online;

  location /.well-known/acme-challenge/ { root /var/www/certbot; }

  location / {
    proxy_pass http://127.0.0.1:3210/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

4) TLS certificate (Let’s Encrypt)
- Issue via nginx installer:
  - `sudo certbot --nginx -d app.digitalpin.online --redirect`
- Or webroot (fallback):
  - `sudo certbot certonly --webroot -w /var/www/certbot -d app.digitalpin.online`
- HTTPS vhost snippet:
```
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name app.digitalpin.online;
  ssl_certificate /etc/letsencrypt/live/app.digitalpin.online/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.digitalpin.online/privkey.pem;
  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
  add_header X-Frame-Options DENY;
  add_header X-Content-Type-Options nosniff;
  add_header Referrer-Policy strict-origin-when-cross-origin;
  location / {
    proxy_pass http://127.0.0.1:3210/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

5) Cloudflare configuration (required rules)
- SSL/TLS:
  - Mode: Full (strict)
  - Edge Certificates: Always Use HTTPS = ON; Minimum TLS = 1.2; HTTP/2 + HTTP/3 = ON; HSTS = ON (after you confirm HTTPS works), max-age 63072000, includeSubDomains, preload
- Caching (Cache Rules or Page Rules):
  - Bypass cache for:
    - Path equals `/.well-known/acme-challenge/*`
    - Path starts with `/api/`
  - Don’t cache POST/PUT/DELETE (default), but the rule above ensures no caching for all API calls.
- Security/WAF:
  - Ensure no rule strips custom headers; DOLAPIKEY must be forwarded as-is.
  - Optionally allowlist your office IPs for `/api/*` or add a country filter.
- Speed:
  - Disable Rocket Loader for app.digitalpin.online (avoids script injection issues).
- DNS:
  - After certificate issuance and HTTPS working, enable the orange cloud (proxy) for app.digitalpin.online.

6) Start portal (production)
```
cd /opt/dolibarr/customer-portal
npm ci
npm run build
npm run start -- -p 3210
```
Optional: create a systemd service to keep the app running (restart on-failure).

## 8) Troubleshooting
- Stuck at `install/check.php` (all green) and not proceeding:
  - Create `upgrade.unlock` (in both documents and htdocs), then open `install/index.php`.
- Error: “Parameter versionfrom or versionto missing” on `upgrade.php`:
  - Call `install/index.php` or add `?versionfrom=…&versionto=…` to the URL.
- “Install/upgrade disabled by install.lock”:
  - Temporarily remove `install.lock` files for the upgrade, then restore them after finishing.
- MySQL driver missing in installer:
  - Ensure `mysqli` extension is installed and loaded; see prerequisites command.
- PHP modules missing (gd, intl, …):
  - Install per prerequisites, restart `php8.1-fpm`.

## 9) Security notes
- Keep `install.lock` present and read-only after install/upgrade.
- Keep `upgrade.unlock` absent except during upgrade.
- Don’t expose your `DOLAPIKEY`; proxy API calls server-side (as done in the portal).

— Last updated: 2025-09-06

جهّزت وثيقة خارطة الطريق وإطار التصميم في الملف: doc/Plan the way، تشمل:

نظام تصميم موحّد (tokens + components) وإتاحة الوصولية.
هيكلة المعلومات للموقع العام، بوابة العملاء، وبوابة المورّدين.
تدفقات UX الأساسية (مصادقة، فواتير/مدفوعات، تذاكر، أوامر شراء).
التكامل التقني مع Dolibarr عبر خوادم البوابة فقط.
أمن وأداء وSEO وCloudflare (قواعد SSL/HSTS/Bypass Cache لـ /api/* وACME).
مراقبة وتشغيل وإطلاق مرحلي.
جدول زمني 6 أسابيع ومخرجات ومعايير قبول وخطوات عملية تالية.
جاهزون للبدء بتنفيذ الأسبوع الأول: تصميم tokens + مكونات أساسية وسكيلتون الصفحات.