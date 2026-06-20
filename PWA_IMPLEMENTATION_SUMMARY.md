# Alfaaz Collective PWA Implementation Summary

Prepared: June 20, 2026

## Overview

The Alfaaz Collective frontend has been converted into a Progressive Web App. This means the site can now be installed on supported desktop and mobile browsers, has app metadata, has dedicated app icons, and can show a graceful offline page instead of failing silently when the network is unavailable.

## What Changed for Visitors

- The site is now installable as an app from supported browsers.
- Installed app name: `Alfaaz Collective`.
- Short app name: `Alfaaz`.
- App theme color now matches the site's dark editorial palette.
- Mobile browsers now receive Apple/mobile web app metadata.
- When offline, visitors get a branded offline fallback page.
- Previously visited pages and static assets can be served from cache.
- Live/API data is still fetched from the network so login, dashboard, notices, and submissions do not use stale cached API responses.

## PWA Features Implemented

### Web App Manifest

Added `frontend/public/manifest.webmanifest`.

The manifest defines:

- App name and short name
- App description
- Start URL and scope
- Standalone display mode
- Background and theme colors
- App categories
- Standard and maskable icons
- App shortcuts for Journal, Dashboard, and Submit Work

### App Icons

Added branded PNG icons under:

`frontend/public/images/icons/`

Files added:

- `icon-192.png`
- `icon-512.png`
- `maskable-512.png`

These are copied into `frontend/dist/images/icons/` during production builds.

### Service Worker

Added `frontend/public/sw.js`.

The service worker:

- Precaches the main site shell pages
- Precaches the manifest, offline page, favicon, PWA icons, and local gallery images
- Uses network-first behavior for page navigations
- Uses stale-while-revalidate behavior for static assets
- Avoids caching same-origin `/api/` requests
- Avoids caching non-GET requests
- Provides an offline fallback when navigation fails

### Offline Page

Added `frontend/public/offline.html`.

This gives offline users a branded Alfaaz page explaining that live features will reconnect when the network returns.

### Global Service Worker Registration

Updated `frontend/global.js`.

Every page that loads the shared global script now registers the service worker automatically on secure contexts, including localhost and HTTPS deployments.

### HTML Install Metadata

Updated all source HTML pages with PWA metadata:

- `frontend/index.html`
- `frontend/admin.html`
- `frontend/blogs.html`
- `frontend/dashboard.html`
- `frontend/exhibition.html`
- `frontend/login.html`
- `frontend/post.html`
- `frontend/register.html`
- `frontend/reset.html`
- `frontend/submit.html`

Added to each page:

- Manifest link
- Theme color
- Application name
- Mobile web app capability metadata
- Apple web app metadata
- Apple touch icon
- Favicon metadata where missing

Also added a viewport tag to `frontend/admin.html`.

## Build Output

The production build was regenerated, so `frontend/dist/` now includes:

- `manifest.webmanifest`
- `sw.js`
- `offline.html`
- PWA icons under `dist/images/icons/`
- Updated HTML pages with PWA metadata
- New Vite hashed asset files

Because Vite fingerprints built JavaScript files, old hashed files were replaced with new hashed files.

## Verification Completed

The implementation was checked with:

- `npm.cmd run build`
- `node --check public/sw.js`
- Manifest JSON parsing
- Local preview server at `http://127.0.0.1:4173/`
- Confirmed these endpoints returned HTTP 200:
  - `/`
  - `/manifest.webmanifest`
  - `/sw.js`

The manifest was also confirmed to include:

- `Alfaaz Collective`
- `icon-512.png`
- `maskable` icon purpose

## Deployment Notes

The project already builds through Vite and deploys `frontend/dist`, so the new PWA files will be included automatically after running:

```bash
cd frontend
npm run build
```

For the PWA install prompt to work in production, the site must be served over HTTPS. Localhost works for development testing.

After deployment, users may need to refresh once so the browser can pick up the new manifest and service worker.

