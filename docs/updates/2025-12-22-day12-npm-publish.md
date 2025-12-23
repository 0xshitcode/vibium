# Day 12: Published to npm 🚀🎉📦

**Date:** 2025-12-22

Vibium v0.1.2 is live on npm. Three days before Christmas. 🎄

## What Got Published

Six packages, all at v0.1.2:

- `vibium` - main package (re-exports JS client, runs postinstall)
- `@vibium/darwin-arm64` - macOS Apple Silicon
- `@vibium/darwin-x64` - macOS Intel
- `@vibium/linux-arm64` - Linux ARM
- `@vibium/linux-x64` - Linux x64
- `@vibium/win32-x64` - Windows x64

Install with:

```bash
npm install vibium
```

Chrome for Testing downloads automatically on first install.

## Docs Overhaul

Made all JS examples REPL-friendly:

```javascript
// Option 1: require (REPL-friendly)
const { browserSync } = require('vibium')

// Option 2: dynamic import (REPL with --experimental-repl-await)
const { browser } = await import('vibium')

// Option 3: static import (in .mjs or .ts files)
import { browser, browserSync } from 'vibium'
```

Updated README, CONTRIBUTING, and npm-publishing guides with:
- All three import options
- Both sync and async examples
- Realistic selectors (example.com's actual `<a>` tag)
- Idiomatic file writing (sync: `fs`, async: `fs/promises`)

## Visible by Default

We flipped the default from headless to visible. Now when you run:

```javascript
const vibe = browserSync.launch()
```

You see the browser. No flags needed. This optimizes for the "aha!" moment when someone tries Vibium for the first time.

To hide the browser, explicitly pass `headless: true` or use `--headless` on the CLI.

## CLI Flag Change

```bash
# Old (no longer exists)
clicker screenshot https://example.com --headed

# New
clicker screenshot https://example.com --headless
```

The flag flipped because the default flipped. Visible is now the baseline.

## New Make Targets

```bash
make install-browser  # Download Chrome for Testing
make package          # Build all npm packages
make clean-packages   # Clean built packages
```

## What's Next

Three days until Christmas. The V1 goal is in sight:
- MCP server works with Claude Code
- JS client (sync + async) works
- CLI works
- npm packages published

Next: final polish, maybe a demo video? Definitely some memes.

✨🎅🎄🎁✨

*december 22, 2025*
