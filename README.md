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

Push to `main` triggers GitHub Actions (`Deploy GitHub Pages`), which builds `dist/` and publishes it.

In the repo: **Settings → Pages → Source → GitHub Actions**.

Static assets (CV PDFs, certificates) live in `public/` and are copied into the build.

Backup of the previous static site: branch `legacy-static`.
