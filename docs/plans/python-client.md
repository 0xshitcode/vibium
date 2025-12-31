# Python Client Plan

**Status: Implemented**

## Timeline

| Phase | Time |
|-------|------|
| Initial client (sync + async API) | ~10 min |
| Platform wheels + auto-download | ~15 min |
| **Total** | **~25 min**

## Overview

Python client for Vibium that mirrors the JS client API. Connects to the clicker binary via WebSocket and sends JSON-RPC commands.

## What Was Built

### Main Package: `clients/python/`

```
clients/python/
├── pyproject.toml          # Main package config with platform dependencies
├── README.md
└── src/vibium/
    ├── __init__.py         # Exports browser, browser_sync
    ├── browser.py          # Async launcher
    ├── browser_sync.py     # Sync wrapper (threading)
    ├── cli.py              # CLI (vibium install, vibium version)
    ├── clicker.py          # Binary finder + Chrome auto-download
    ├── client.py           # WebSocket client
    ├── element.py          # Element class (click, type, text)
    └── vibe.py             # Vibe class (go, screenshot, find, quit)
```

### Platform Packages: `packages/python/`

```
packages/python/
├── vibium_darwin_arm64/    # macOS Apple Silicon
├── vibium_darwin_x64/      # macOS Intel
├── vibium_linux_x64/       # Linux x64
├── vibium_linux_arm64/     # Linux ARM64
└── vibium_win32_x64/       # Windows x64
```

Each platform package contains the clicker binary in `src/*/bin/`.

## User Experience

```bash
pip install vibium
vibium install  # Optional: pre-download Chrome
```

```python
from vibium import browser_sync

vibe = browser_sync.launch()  # Auto-downloads Chrome if needed
vibe.go("https://example.com")
vibe.quit()
```

**First launch:**
- If Chrome not installed: "Downloading Chrome for Testing..." (auto)
- Subsequent launches: instant

## CLI

```bash
vibium install   # Download Chrome for Testing
vibium version   # Show version
```

## Key Features

1. **Platform dependencies** - Uses PEP 508 markers to auto-install correct binary:
   ```toml
   "vibium-darwin-arm64>=0.1.0; sys_platform == 'darwin' and platform_machine == 'arm64'"
   ```

2. **Auto-download Chrome** - `ensure_browser_installed()` runs `clicker install` if Chrome missing

3. **Binary finder** - Searches in order:
   - `VIBIUM_CLICKER_PATH` env var
   - Platform package (`vibium_darwin_arm64`, etc.)
   - PATH
   - Cache directory

## Makefile Targets

```bash
make package-python-platforms  # Copy binaries to Python packages
make package-python            # Build all Python wheels
make clean-python-packages     # Clean Python builds
```

## Testing

```bash
cd clients/python
python3 -m venv .venv
source .venv/bin/activate
pip install -e ../../packages/python/vibium_darwin_arm64
pip install -e .

python -c "
from vibium import browser_sync
vibe = browser_sync.launch()
vibe.go('https://example.com')
print(vibe.find('a').text())
vibe.quit()
"
```

## Publishing (Future)

```bash
# Build wheels
make package-python

# Publish to PyPI
twine upload packages/python/*/dist/*.whl
twine upload clients/python/dist/*.whl
```
