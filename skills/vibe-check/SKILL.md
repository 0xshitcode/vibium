---
name: vibe-check
description: Browser automation for AI agents. Use when the user needs to navigate websites, read page content, fill forms, click elements, take screenshots, or manage browser tabs.
---

# Vibium Browser Automation — CLI Reference

The `vibium` CLI automates Chrome via the command line. The browser auto-launches on first use (daemon mode keeps it running between commands).

```
vibium navigate <url> → vibium text → vibium screenshot -o shot.png
```

## Commands

### Navigation
- `vibium navigate <url>` — go to a page
- `vibium url` — print current URL
- `vibium title` — print page title

### Reading Content
- `vibium text` — get all page text
- `vibium text "<selector>"` — get text of a specific element
- `vibium html` — get page HTML (use `--outer` for outerHTML)
- `vibium find "<selector>"` — element info (tag, text, bounding box)
- `vibium find-all "<selector>"` — all matching elements (`--limit N`)
- `vibium eval "<js>"` — run JavaScript and print result
- `vibium screenshot -o file.png` — capture screenshot

### Interaction
- `vibium click "<selector>"` — click an element
- `vibium type "<selector>" "<text>"` — type into an input
- `vibium hover "<selector>"` — hover over an element
- `vibium scroll [direction]` — scroll page (`--amount N`, `--selector`)
- `vibium keys "<combo>"` — press keys (Enter, Control+a, Shift+Tab)
- `vibium select "<selector>" "<value>"` — pick a dropdown option

### Waiting
- `vibium wait "<selector>"` — wait for element (`--state visible|hidden|attached`, `--timeout ms`)

### Tabs
- `vibium tabs` — list open tabs
- `vibium tab-new [url]` — open new tab
- `vibium tab-switch <index|url>` — switch tab
- `vibium tab-close [index]` — close tab

### Daemon
- `vibium daemon start` — start background browser
- `vibium daemon status` — check if running
- `vibium daemon stop` — stop daemon

## Global Flags

| Flag | Description |
|------|-------------|
| `--headless` | Hide browser window |
| `--json` | Output as JSON |
| `--oneshot` | One-shot mode (no daemon) |
| `-v, --verbose` | Debug logging |
| `--wait-open N` | Wait N seconds after navigation |
| `--wait-close N` | Keep browser open N seconds before closing |

## Daemon vs Oneshot

By default, commands connect to a **daemon** — a background process that keeps the browser alive between commands. This is fast and lets you chain commands against the same page.

Use `--oneshot` (or `VIBIUM_ONESHOT=1`) to launch a fresh browser for each command, then tear it down. Useful for CI or one-off scripts.

## Common Patterns

**Read a page:**
```sh
vibium navigate https://example.com
vibium text
```

**Fill a form:**
```sh
vibium navigate https://example.com/login
vibium type "input[name=email]" "user@example.com"
vibium type "input[name=password]" "secret"
vibium click "button[type=submit]"
```

**Extract structured data:**
```sh
vibium navigate https://example.com
vibium eval "JSON.stringify([...document.querySelectorAll('a')].map(a => a.href))"
```

**Multi-tab workflow:**
```sh
vibium tab-new https://docs.example.com
vibium text "h1"
vibium tab-switch 0
```

## Tips

- All click/type/hover actions auto-wait for the element to be actionable
- Use `vibium find` to inspect an element before interacting
- Use `vibium text "<selector>"` to read specific sections
- `vibium eval` is the escape hatch for complex DOM queries
- Screenshots save to the current directory by default (`-o` to change)
