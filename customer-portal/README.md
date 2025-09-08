# Digital PIN Customer Portal (Starter)

A minimal Next.js portal for customers to: book services, open tickets/complaints, view & pay invoices, and print reports. It talks to Dolibarr via REST API using a secure server-side proxy.

## What’s included
- Next.js 14 (app router) + TypeScript
- Server API routes acting as a proxy to Dolibarr (no API key in browser)
- Basic pages: login, dashboard, invoices (list), tickets (create)
- Ready to deploy behind Nginx on /portal or a subdomain

## Quick start
1. Create `.env.local` (example below)
2. Install deps
3. Run dev server on port 3200

```bash
npm i
npm run dev
```

## Env example (`.env.local`)
```
DOL_API_BASE=https://erp.digitalpin.online/api/index.php
DOL_API_KEY=your_secure_server_side_key
NEXTAUTH_SECRET=use-openssl-rand
NEXTAUTH_URL=http://localhost:3200
``` 

## Nginx sample (reverse proxy)
```
location /portal/ {
  proxy_pass http://127.0.0.1:3200/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Notes
- Keep DOL_API_KEY on the server only. API routes forward required calls.
- Extend pages to bookings, payments, and reports as needed.

## Production (app.digitalpin.online)
1) DNS
- Create an A record: `app.digitalpin.online` → server IP

2) Environment
- Create `.env.production.local` with:
```
DOL_API_BASE=https://erp.digitalpin.online/api/index.php
DOL_API_KEY=your_secure_server_side_key
NEXTAUTH_SECRET=replace-with-strong-random
NEXTAUTH_URL=https://app.digitalpin.online
```

3) Nginx
```
server {
  listen 443 ssl http2;
  server_name app.digitalpin.online;

  ssl_certificate /etc/letsencrypt/live/app.digitalpin.online/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.digitalpin.online/privkey.pem;

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

4) Run
```bash
npm ci
npm run build
npm run start
```

5) Hardening tips
- Ensure `DOL_API_KEY` stays server-side only.
- Keep systemd service or PM2 for process supervision.
- Confirm CSP allows only `https://erp.digitalpin.online` for connect-src.
