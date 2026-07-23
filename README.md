# Idzi Łopatniuk — Portfolio

React (Vite) + Motion → [idzil.github.io](https://idzil.github.io/)

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to `main` builds the site and publishes it to the `gh-pages` branch.

**Required once** in GitHub:

1. Repo → **Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` / `/ (root)` → Save

Static assets (CV PDFs, certificates) live in `public/`.

Rollback of the old static site: branch `legacy-static`.
