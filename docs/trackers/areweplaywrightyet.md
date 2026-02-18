# Are We Playwright Yet?

Vibium's Playwright-equivalent API coverage. 170 commands across 23 categories, tracked across 6 implementation targets.

**Legend:** ✅ Done · 🟡 Partial · ⬜ Not started · — N/A

---

## Navigation (9 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.go(url)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.back()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.forward()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.reload()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.url()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.title()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.waitForURL(pattern)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.waitForLoad(state?)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.content()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |

## Pages & Contexts (12 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `browser.page()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `browser.newPage()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `browser.newContext()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.newPage()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `browser.pages()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `context.close()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `browser.close()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ⬜ |
| `browser.onPage(fn)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `browser.onPopup(fn)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `browser.removeAllListeners(event?)` | ✅ | ⬜ | ⬜ | ⬜ | — | — |
| `page.bringToFront()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.close()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |

## Element Finding (6 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.find('css')` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.find({role, text, …})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.findAll('css')` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.findAll({…})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.find('css')` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.find({…})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Selector Strategies (10 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `find({role: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({text: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({label: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({placeholder: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({alt: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({title: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({testid: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({xpath: '…'})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({near: '…'})` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| `find({role, text}) combo` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Locator Chaining & Filtering (8 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `el.first()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.last()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.nth(index)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.count()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.filter({hasText})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.filter({has})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.or(other)` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.and(other)` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Element Interaction (16 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `el.click()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.dblclick()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.fill(value)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.type(text)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.press(key)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.clear()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.check()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.uncheck()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.selectOption(val)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.setFiles(paths)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.hover()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.focus()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.dragTo(target)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.tap()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.scrollIntoView()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.dispatchEvent(type)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Element State (14 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `el.text()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.innerText()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.html()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.value()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.attr(name)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.bounds()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `el.isVisible()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.isHidden()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.isEnabled()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.isChecked()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.isEditable()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.eval(fn)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.screenshot()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.waitFor({state})` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |

## Keyboard & Mouse (10 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.keyboard.press(key)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.keyboard.down(key)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.keyboard.up(key)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.keyboard.type(text)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.mouse.click(x,y)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.mouse.move(x,y)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.mouse.down()` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.mouse.up()` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.mouse.wheel(dx,dy)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.touch.tap(x,y)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Network Interception (13 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.route(pattern, handler)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `route.fulfill(response)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `route.continue(overrides?)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `route.abort(reason?)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.onRequest(fn)` | ✅ | — | ⬜ | ⬜ | — | — |
| `page.onResponse(fn)` | ✅ | — | ⬜ | ⬜ | — | — |
| `page.setHeaders(headers)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.waitForRequest(pat)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.waitForResponse(pat)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.unroute(pattern)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.removeAllListeners(event?)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.routeWebSocket(pat)` | ⬜ | ⬜ | ⬜ | ⬜ | — | — |
| `page.onWebSocket(fn)` | ✅ | — | ⬜ | ⬜ | — | — |

## Request & Response (8 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `request.url()` | ✅ | — | ⬜ | ⬜ | — | — |
| `request.method()` | ✅ | — | ⬜ | ⬜ | — | — |
| `request.headers()` | ✅ | — | ⬜ | ⬜ | — | — |
| `request.postData()` | ✅ | — | ⬜ | ⬜ | — | — |
| `response.status()` | ✅ | — | ⬜ | ⬜ | — | — |
| `response.headers()` | ✅ | — | ⬜ | ⬜ | — | — |
| `response.body()` | ✅ | — | ⬜ | ⬜ | — | — |
| `response.json()` | ✅ | — | ⬜ | ⬜ | — | — |

## Dialogs (5 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.onDialog(fn)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `dialog.accept(text?)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `dialog.dismiss()` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `dialog.message()` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `dialog.type()` | ✅ | ✅ | ⬜ | ⬜ | — | — |

## Screenshots & PDF (4 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.screenshot()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.screenshot({fullPage})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.screenshot({clip})` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.pdf()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Cookies & Storage (5 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `context.cookies(urls?)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.setCookies()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.clearCookies()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.storageState()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.addInitScript()` | ✅ | ✅ | ⬜ | ⬜ | — | — |

## Emulation (8 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.setViewport(size)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.viewport()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.emulateMedia(opts)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.setContent(html)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.setGeolocation()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.grantPermissions()` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.window()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.setWindow(opts)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Frames (4 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.frame(nameOrUrl)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.frames()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.mainFrame()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| Frames have full Page API | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Accessibility (3 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.a11yTree()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ⬜ |
| `el.role()` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `el.label()` | ✅ | ✅ | ⬜ | ⬜ | — | — |

## Console, Errors & Workers (3 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.onConsole(fn)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.onError(fn)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.workers()` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Waiting (5 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.waitFor(selector)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.wait(ms)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.waitForFunction(fn)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.waitForEvent(name)` | ⬜ | ⬜ | ⬜ | ⬜ | — | — |
| `page.pause()` | ⬜ | ⬜ | ⬜ | ⬜ | — | ⬜ |

## Downloads & Files (4 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.onDownload(fn)` | ✅ | — | ⬜ | ⬜ | — | — |
| `download.saveAs(path)` | ✅ | — | ⬜ | ⬜ | ⬜ | ⬜ |
| `el.setFiles(paths)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.onFileChooser(fn)` | ⬜ | ⬜ | ⬜ | ⬜ | — | — |

## Clock (8 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.clock.install(opts?)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.fastForward(ms)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.runFor(ms)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.pauseAt(time)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.resume()` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.setFixedTime(time)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.setSystemTime(time)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |
| `page.clock.setTimezone(tz)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | — |

## Tracing (6 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `context.tracing.start(opts)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.tracing.stop(opts)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.tracing.startChunk(opts)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.tracing.stopChunk(opts)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.tracing.startGroup(name)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `context.tracing.stopGroup()` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Evaluation (5 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.eval(expr)` | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ |
| `page.evalHandle(expr)` | ✅ | ✅ | ⬜ | ⬜ | — | — |
| `page.addScript(src)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.addStyle(src)` | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.expose(name, fn)` | ✅ | — | ⬜ | ⬜ | — | — |

## AI-Native Methods (4 commands)

| Command | JS async | JS sync | PY async | PY sync | MCP | CLI |
|---------|----------|---------|----------|---------|-----|-----|
| `page.check(claim)` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.check(claim, {near})` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.do(action)` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| `page.do(action, {data})` | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
