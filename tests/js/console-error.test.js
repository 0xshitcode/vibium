/**
 * JS Library Tests: Console & Error Events
 * Tests page.onConsole, page.onError, ConsoleMessage class, and removeAllListeners.
 *
 * Uses a local HTTP server — no external network dependencies.
 */

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('http');

const { browser } = require('../../clients/javascript/dist');

// --- Local test server ---

let server;
let baseURL;

before(async () => {
  server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><head><title>Console Test</title></head><body>Hello</body></html>');
  });

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      baseURL = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(() => {
  if (server) server.close();
});

// --- Console Events ---

describe('Console Events: page.onConsole', () => {
  test('onConsole() captures console.log', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const messages = [];
      page.onConsole((msg) => messages.push(msg));

      await page.eval('console.log("hello from test")');
      await page.wait(300);

      assert.ok(messages.length >= 1, `Expected at least 1 console message, got ${messages.length}`);
      const msg = messages.find(m => m.text().includes('hello from test'));
      assert.ok(msg, 'Should find console.log message');
      assert.strictEqual(msg.type(), 'log');
    } finally {
      await b.close();
    }
  });

  test('onConsole() captures console.warn', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const messages = [];
      page.onConsole((msg) => messages.push(msg));

      await page.eval('console.warn("warning msg")');
      await page.wait(300);

      const msg = messages.find(m => m.text().includes('warning msg'));
      assert.ok(msg, 'Should find console.warn message');
      assert.strictEqual(msg.type(), 'warn');
    } finally {
      await b.close();
    }
  });

  test('onConsole() captures console.error (not onError)', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const consoleMessages = [];
      const errors = [];
      page.onConsole((msg) => consoleMessages.push(msg));
      page.onError((err) => errors.push(err));

      await page.eval('console.error("console err")');
      await page.wait(300);

      // console.error should fire onConsole
      const msg = consoleMessages.find(m => m.text().includes('console err'));
      assert.ok(msg, 'console.error should fire onConsole');
      assert.strictEqual(msg.type(), 'error');

      // console.error should NOT fire onError
      const matchingError = errors.find(e => e.message.includes('console err'));
      assert.ok(!matchingError, 'console.error should NOT fire onError');
    } finally {
      await b.close();
    }
  });

  test('ConsoleMessage.args() returns serialized arguments', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const messages = [];
      page.onConsole((msg) => messages.push(msg));

      await page.eval('console.log("arg1", 42)');
      await page.wait(300);

      const msg = messages.find(m => m.text().includes('arg1'));
      assert.ok(msg, 'Should find console.log message');
      const args = msg.args();
      assert.ok(Array.isArray(args), 'args() should return an array');
      assert.ok(args.length >= 2, `Expected at least 2 args, got ${args.length}`);
    } finally {
      await b.close();
    }
  });
});

// --- Error Events ---

describe('Error Events: page.onError', () => {
  test('onError() captures uncaught exception', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const errors = [];
      page.onError((err) => errors.push(err));

      // Use setTimeout to create a truly uncaught exception (not caught by eval's promise)
      await page.eval('setTimeout(() => { throw new Error("boom uncaught") }, 0)');
      await page.wait(500);

      assert.ok(errors.length >= 1, `Expected at least 1 error, got ${errors.length}`);
      const err = errors.find(e => e.message.includes('boom uncaught'));
      assert.ok(err, 'Should capture uncaught exception');
      assert.ok(err instanceof Error, 'Should be an Error instance');
    } finally {
      await b.close();
    }
  });

  test('onError() does NOT fire for console.error', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const errors = [];
      page.onError((err) => errors.push(err));

      await page.eval('console.error("just a console error")');
      await page.wait(300);

      const matchingError = errors.find(e => e.message.includes('just a console error'));
      assert.ok(!matchingError, 'onError should NOT fire for console.error');
    } finally {
      await b.close();
    }
  });
});

// --- removeAllListeners ---

describe('removeAllListeners for console/error', () => {
  test('removeAllListeners("console") clears console callbacks', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const messages = [];
      page.onConsole((msg) => messages.push(msg));

      await page.eval('console.log("before clear")');
      await page.wait(300);
      assert.ok(messages.length >= 1, 'Should have captured message before clear');

      page.removeAllListeners('console');

      const countBefore = messages.length;
      await page.eval('console.log("after clear")');
      await page.wait(300);
      assert.strictEqual(messages.length, countBefore, 'Should not capture messages after removeAllListeners');
    } finally {
      await b.close();
    }
  });

  test('removeAllListeners("error") clears error callbacks', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go(baseURL);

      const errors = [];
      page.onError((err) => errors.push(err));

      page.removeAllListeners('error');

      await page.eval('setTimeout(() => { throw new Error("should not capture") }, 0)');
      await page.wait(500);

      const matching = errors.find(e => e.message.includes('should not capture'));
      assert.ok(!matching, 'Should not capture errors after removeAllListeners');
    } finally {
      await b.close();
    }
  });
});
