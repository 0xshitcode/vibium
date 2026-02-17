/**
 * JS Library Tests: Keyboard, Mouse, Screenshots, Evaluation
 * Tests page.keyboard, page.mouse, page.screenshot (options),
 * page.pdf, page.eval, page.evalHandle, page.addScript, page.addStyle, page.expose.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

const { browser } = require('../../clients/javascript/dist');

// --- Keyboard, Mouse ---

describe('Keyboard: page-level input', () => {
  test('keyboard.type() types text into focused input', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      // Click the input to focus it
      const input = await page.find('#username');
      await input.click();

      // Type via page.keyboard
      await page.keyboard.type('tomsmith');

      const val = await input.value();
      assert.strictEqual(val, 'tomsmith');
    } finally {
      await b.close();
    }
  });

  test('keyboard.press() sends a key press', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const input = await page.find('#username');
      await input.click();
      await page.keyboard.type('hello');

      // Press Backspace to delete last character
      await page.keyboard.press('Backspace');

      const val = await input.value();
      assert.strictEqual(val, 'hell');
    } finally {
      await b.close();
    }
  });

  test('keyboard.down() and keyboard.up() hold and release keys', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const input = await page.find('#username');
      await input.click();
      await page.keyboard.type('hello');

      // Hold shift, press Home to select all, release shift, then delete
      await page.keyboard.down('Shift');
      await page.keyboard.press('Home');
      await page.keyboard.up('Shift');
      await page.keyboard.press('Backspace');

      const val = await input.value();
      assert.strictEqual(val, '');
    } finally {
      await b.close();
    }
  });
});

describe('Mouse: page-level input', () => {
  test('mouse.click() clicks at coordinates', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      // Find the username input bounds and click it via mouse
      const input = await page.find('#username');
      const bounds = await input.bounds();
      const cx = bounds.x + bounds.width / 2;
      const cy = bounds.y + bounds.height / 2;

      await page.mouse.click(cx, cy);
      await page.keyboard.type('mouseuser');

      const val = await input.value();
      assert.strictEqual(val, 'mouseuser');
    } finally {
      await b.close();
    }
  });

  test('mouse.move() moves to coordinates', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/hovers');

      // Get first figure position
      const figure = await page.find('.figure');
      const bounds = await figure.bounds();
      const cx = bounds.x + bounds.width / 2;
      const cy = bounds.y + bounds.height / 2;

      // Move mouse to trigger hover
      await page.mouse.move(cx, cy);

      // Wait briefly for CSS transition
      await page.wait(500);

      const visible = await page.evaluate(`
        const caption = document.querySelector('.figure .figcaption');
        const style = window.getComputedStyle(caption);
        return style.opacity !== '0';
      `);
      assert.ok(visible, 'Hover caption should be visible after mouse.move');
    } finally {
      await b.close();
    }
  });

  test('mouse.wheel() scrolls the page', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('data:text/html,<body style="margin:0"><div style="height:5000px;background:linear-gradient(red,blue)">Tall</div></body>');

      // Scroll down
      await page.mouse.wheel(0, 500);
      await page.wait(300);

      const scrollY = await page.evaluate('return window.scrollY;');
      assert.ok(scrollY > 0, `Page should have scrolled down, scrollY: ${scrollY}`);
    } finally {
      await b.close();
    }
  });
});

// --- Screenshots & PDF ---

describe('Screenshots: options', () => {
  test('screenshot() returns a PNG buffer', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const buf = await page.screenshot();
      assert.ok(Buffer.isBuffer(buf), 'screenshot() should return a Buffer');
      assert.ok(buf.length > 100, 'Screenshot should have meaningful content');

      // Check PNG magic bytes
      assert.strictEqual(buf[0], 0x89);
      assert.strictEqual(buf[1], 0x50); // P
      assert.strictEqual(buf[2], 0x4e); // N
      assert.strictEqual(buf[3], 0x47); // G
    } finally {
      await b.close();
    }
  });

  test('screenshot({ fullPage: true }) captures full page', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const viewportShot = await page.screenshot();
      const fullShot = await page.screenshot({ fullPage: true });

      assert.ok(Buffer.isBuffer(fullShot), 'fullPage screenshot should return a Buffer');
      assert.ok(fullShot.length > 100, 'fullPage screenshot should have meaningful content');
    } finally {
      await b.close();
    }
  });

  test('screenshot({ clip }) captures a specific region', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const clipShot = await page.screenshot({
        clip: { x: 0, y: 0, width: 100, height: 100 },
      });

      assert.ok(Buffer.isBuffer(clipShot), 'clip screenshot should return a Buffer');
      assert.ok(clipShot.length > 100, 'clip screenshot should have meaningful content');
    } finally {
      await b.close();
    }
  });

  test('pdf() returns a PDF buffer', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const buf = await page.pdf();
      assert.ok(Buffer.isBuffer(buf), 'pdf() should return a Buffer');
      assert.ok(buf.length > 100, 'PDF should have meaningful content');

      // Check PDF magic bytes (%PDF)
      const header = buf.subarray(0, 5).toString('ascii');
      assert.ok(header.startsWith('%PDF'), `PDF should start with %PDF, got: ${header}`);
    } finally {
      await b.close();
    }
  });
});

// --- Evaluation ---

describe('Evaluation: page-level', () => {
  test('eval() evaluates an expression', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const result = await page.eval('1 + 1');
      assert.strictEqual(result, 2);
    } finally {
      await b.close();
    }
  });

  test('eval() returns strings', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const result = await page.eval('document.title');
      assert.strictEqual(result, 'Example Domain');
    } finally {
      await b.close();
    }
  });

  test('eval() returns null for undefined', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const result = await page.eval('undefined');
      assert.strictEqual(result, null);
    } finally {
      await b.close();
    }
  });

  test('evalHandle() returns a handle ID', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const handle = await page.evalHandle('document.body');
      assert.ok(typeof handle === 'string', `evalHandle should return string, got: ${typeof handle}`);
      assert.ok(handle.length > 0, 'Handle ID should not be empty');
    } finally {
      await b.close();
    }
  });

  test('addScript() injects inline JS', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      await page.addScript('window.__testVar = 42;');

      const result = await page.eval('window.__testVar');
      assert.strictEqual(result, 42);
    } finally {
      await b.close();
    }
  });

  test('addStyle() injects inline CSS', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      await page.addStyle('body { background-color: rgb(255, 0, 0) !important; }');

      const bg = await page.evaluate(`
        return window.getComputedStyle(document.body).backgroundColor;
      `);
      assert.strictEqual(bg, 'rgb(255, 0, 0)');
    } finally {
      await b.close();
    }
  });

  test('expose() injects a named function on window', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      await page.expose('myAdd', '(a, b) => a + b');

      const result = await page.eval('window.myAdd(2, 3)');
      assert.strictEqual(result, 5);
    } finally {
      await b.close();
    }
  });
});

// --- Checkpoint ---

describe('Input & Eval Checkpoint', () => {
  test('keyboard.type, mouse.click, screenshot, eval all work together', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      // Use keyboard.type via page.keyboard
      const input = await page.find('#username');
      await input.click();
      await page.keyboard.type('tomsmith');

      // Use mouse.click to click password field
      const pwInput = await page.find('#password');
      const pwBounds = await pwInput.bounds();
      await page.mouse.click(
        pwBounds.x + pwBounds.width / 2,
        pwBounds.y + pwBounds.height / 2
      );
      await page.keyboard.type('SuperSecretPassword!');

      // Verify values using eval
      const username = await page.eval('document.querySelector("#username").value');
      assert.strictEqual(username, 'tomsmith');
      const password = await page.eval('document.querySelector("#password").value');
      assert.strictEqual(password, 'SuperSecretPassword!');

      // Take screenshot
      const shot = await page.screenshot();
      assert.ok(Buffer.isBuffer(shot), 'Screenshot should be a buffer');
      assert.ok(shot.length > 100, 'Screenshot should have content');

      // Submit the form
      const btn = await page.find('button[type="submit"]');
      await btn.click();
      await page.waitForURL('**/secure');

      const url = await page.url();
      assert.ok(url.includes('/secure'), `Should be on /secure, got: ${url}`);
    } finally {
      await b.close();
    }
  });
});
