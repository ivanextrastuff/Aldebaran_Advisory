# Astral Heading

A frontend-only prototype for a ROCKWOOL Denmark general building insulation pitch. It demonstrates stakeholder-specific workflows, smart specification, material comparisons, renovation estimates, and a spec-to-site project pipeline.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

Vite prints the local development URL. To verify a production build:

```sh
npm run build
```

## Project structure

- `src/App.jsx`- React UI, hardcoded mock data, and local interactive state
- `src/styles.css` - responsive app and 16:9 pitch-slide styling
- `src/main.jsx` - React entry point
- `index.html` - Vite HTML entry point
- `vite.config.js` - Vite, React, and Tailwind CSS plugins

## Prototype scope

The app makes no API calls and has no backend or database. All interactions and data are local mock/demo content. Grant estimates, technical comparisons, and product/regulatory claims are illustrative and must be independently validated before real-world use.
