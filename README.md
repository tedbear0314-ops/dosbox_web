# Fold DOS Web

V0.1 browser-first DOSBox-style player for testing DOS games on Samsung Galaxy Z Fold 7 with Chrome.

## Technology choice

- Uses js-dos v8, a browser/WebAssembly DOSBox ecosystem project.
- Keeps the DOSBox mental model through `.jsdos` bundles and generated `dosbox.conf` `[autoexec]` commands.
- The outer app is plain HTML/CSS/JavaScript with Vite, so it can later become a PWA or be wrapped with Capacitor/WebView for Android APK delivery.
- Vite is configured with `base: "/dosbox_web/"` for GitHub Pages.

## Run

```powershell
.\start-dev.cmd
```

Then open the shown local URL in Chrome.

## Build

```powershell
pnpm install
pnpm build
```

The production build is written to `dist/`.

## GitHub Pages

This repository is intended to publish at:

```text
https://tedbear0314-ops.github.io/dosbox_web/
```

Deployment is handled by `.github/workflows/deploy-pages.yml`.

## Use

1. Pick a DOS game `.zip`, `.jsdos`, or a game folder when the browser supports folder picking.
2. Choose one `.exe` or `.bat` from the list.
3. Press Start.
4. Use the on-screen arrow, Enter, Esc, keyboard, and touch mouse controls.

## Notes

- js-dos itself is loaded from the official js-dos CDN for this first local prototype.
- ZIP reading uses a browser-side ZIP library loaded from jsDelivr.
- Folder picking depends on browser support. ZIP remains the most reliable mobile flow.
- Later offline/PWA packaging should vendor those runtime files into `public/vendor`.
