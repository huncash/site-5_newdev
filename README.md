# eladoingatlan.szcenario.hu

Lean Next.js listing site for the Kismaros–Börzsönyliget property. Production listens on **port 5000** (`PORT`; `next start` has no `--port` flag). PM2 process: `eladoingatlan`, cwd `/var/www/eladoingatlan`. The site is the root of `eladoingatlan.szcenario.hu` (no `basePath`).

## Local

```bash
cd eladoingatlan
npm install
cp .env.example .env.local   # set RECIPIENT_ELADOINGATLAN + SMTP_*
npm run dev                  # http://localhost:5000
```

## Build notes

- Leaflet loads from **unpkg CDN** (no `leaflet` npm package, no marker PNG bundling).
- `images.unoptimized: true` avoids `sharp` / x86-64-v2 VPS crashes.
- Inbox addresses only in server env (`RECIPIENT_ELADOINGATLAN`).

## Nginx (sketch)

Proxy `eladoingatlan.szcenario.hu` → `http://127.0.0.1:5000`.

Deploy (push to `main`): `.github/workflows/deploy.yml`. The sync does not upload or delete the server `.env` / `.env.production` or the `data/` directory.
