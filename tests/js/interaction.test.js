/**
 * JS Library Tests: Element Interaction
 * Tests click, dblclick, fill, type, press, clear, check, uncheck,
 * selectOption, hover, focus, tap, scrollIntoView, dispatchEvent.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

const { browser } = require('../../clients/javascript/dist');

// --- Checkpoint test: Login flow ---

describe('Interaction: Checkpoint', () => {
  test('login flow: fill + click', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const username = await page.find('#username');
      await username.fill('tomsmith');

      const password = await page.find('#password');
      await password.fill('SuperSecretPassword!');

      const loginBtn = await page.find('button[type="submit"]');
      await loginBtn.click();

      await page.waitForURL('**/secure');
      const url = await page.url();
      assert.ok(url.includes('/secure'), `Should be on /secure page, got: ${url}`);
    } finally {
      await b.close();
    }
  });

  test('checkbox: check and uncheck', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/checkboxes');

      const checkboxes = await page.findAll('input[type="checkbox"]');
      const first = checkboxes.first();

      // First checkbox starts unchecked
      await first.check();
      const checked = await page.evaluate(`
        return document.querySelectorAll('input[type="checkbox"]')[0].checked;
      `);
      assert.strictEqual(checked, true, 'First checkbox should be checked');

      // Uncheck it
      await first.uncheck();
      const unchecked = await page.evaluate(`
        return document.querySelectorAll('input[type="checkbox"]')[0].checked;
      `);
      assert.strictEqual(unchecked, false, 'First checkbox should be unchecked');
    } finally {
      await b.close();
    }
  });

  test('hover reveals hidden content', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/hovers');

      const figures = await page.findAll('.figure');
      const first = figures.first();
      await first.hover();

      // After hover, the caption should be visible
      // Wait briefly for CSS transition
      await new Promise(resolve => setTimeout(resolve, 500));
      const visible = await page.evaluate(`
        const caption = document.querySelector('.figure .figcaption');
        const style = window.getComputedStyle(caption);
        return style.opacity !== '0' && style.display !== 'none';
      `);
      assert.ok(visible, 'Hovering should reveal caption');
    } finally {
      await b.close();
    }
  });
});

// --- Individual interaction tests ---

describe('Interaction: Click variants', () => {
  test('click navigates via link', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com');

      const link = await page.find('a[href="/login"]');
      await link.click();

      await page.waitForURL('**/login');
      const url = await page.url();
      assert.ok(url.includes('/login'), `Should navigate to /login, got: ${url}`);
    } finally {
      await b.close();
    }
  });

  test('dblclick selects text', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      const h1 = await page.find('h1');
      await h1.dblclick();

      // Double-clicking on text should select it
      const selectedText = await page.evaluate(`
        return window.getSelection().toString();
      `);
      assert.ok(selectedText.length > 0, 'Double-click should select text');
    } finally {
      await b.close();
    }
  });
});

describe('Interaction: Input methods', () => {
  test('fill clears and enters text', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const username = await page.find('#username');
      await username.fill('firstvalue');
      await username.fill('secondvalue');

      const value = await page.evaluate(`
        return document.getElementById('username').value;
      `);
      assert.strictEqual(value, 'secondvalue', 'fill() should clear and replace text');
    } finally {
      await b.close();
    }
  });

  test('type appends text', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/inputs');

      const input = await page.find('input');
      await input.type('123');
      await input.type('45');

      const value = await page.evaluate(`
        return document.querySelector('input').value;
      `);
      assert.strictEqual(value, '12345', 'type() should append text');
    } finally {
      await b.close();
    }
  });

  test('clear removes text', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const username = await page.find('#username');
      await username.fill('sometext');
      await username.clear();

      const value = await page.evaluate(`
        return document.getElementById('username').value;
      `);
      assert.strictEqual(value, '', 'clear() should empty the input');
    } finally {
      await b.close();
    }
  });

  test('press sends key events', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const username = await page.find('#username');
      await username.fill('tomsmith');

      const password = await page.find('#password');
      await password.fill('SuperSecretPassword!');

      // Press Enter to submit instead of clicking
      await password.press('Enter');

      await page.waitForURL('**/secure');
      const url = await page.url();
      assert.ok(url.includes('/secure'), `Enter should submit form, got: ${url}`);
    } finally {
      await b.close();
    }
  });
});

describe('Interaction: Select', () => {
  test('selectOption changes dropdown value', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/dropdown');

      const dropdown = await page.find('#dropdown');
      await dropdown.selectOption('2');

      const value = await page.evaluate(`
        return document.getElementById('dropdown').value;
      `);
      assert.strictEqual(value, '2', 'selectOption should set dropdown value');
    } finally {
      await b.close();
    }
  });
});

describe('Interaction: Focus', () => {
  test('focus sets active element', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/login');

      const username = await page.find('#username');
      await username.focus();

      const activeId = await page.evaluate(`
        return document.activeElement ? document.activeElement.id : '';
      `);
      assert.strictEqual(activeId, 'username', 'focus() should set active element');
    } finally {
      await b.close();
    }
  });
});

describe('Interaction: Scroll', () => {
  test('scrollIntoView scrolls to element', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com');

      // The footer is below the fold
      const footer = await page.find('#page-footer');
      await footer.scrollIntoView();

      const inView = await page.evaluate(`
        const footer = document.getElementById('page-footer');
        const rect = footer.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
      `);
      assert.ok(inView, 'scrollIntoView should bring element into viewport');
    } finally {
      await b.close();
    }
  });
});

describe('Interaction: findAll index bug fix', () => {
  test('findAll().nth(1).click() acts on correct element', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://the-internet.herokuapp.com/checkboxes');

      const checkboxes = await page.findAll('input[type="checkbox"]');
      assert.strictEqual(checkboxes.count(), 2, 'Should find 2 checkboxes');

      // Second checkbox starts checked
      const secondChecked = await page.evaluate(`
        return document.querySelectorAll('input[type="checkbox"]')[1].checked;
      `);
      assert.strictEqual(secondChecked, true, 'Second checkbox starts checked');

      // Click the second one (index 1) to uncheck it
      await checkboxes.nth(1).click();

      const afterClick = await page.evaluate(`
        return document.querySelectorAll('input[type="checkbox"]')[1].checked;
      `);
      assert.strictEqual(afterClick, false, 'nth(1).click() should toggle second checkbox');

      // First checkbox should be unchanged
      const firstUnchanged = await page.evaluate(`
        return document.querySelectorAll('input[type="checkbox"]')[0].checked;
      `);
      assert.strictEqual(firstUnchanged, false, 'First checkbox should be unchanged');
    } finally {
      await b.close();
    }
  });
});

describe('Interaction: dispatchEvent', () => {
  test('dispatchEvent fires custom event', async () => {
    const b = await browser.launch({ headless: true });
    try {
      const page = await b.page();
      await page.go('https://example.com');

      // Set up an event listener
      await page.evaluate(`
        window.__eventFired = false;
        document.querySelector('h1').addEventListener('click', () => {
          window.__eventFired = true;
        });
      `);

      const h1 = await page.find('h1');
      await h1.dispatchEvent('click', { bubbles: true });

      const fired = await page.evaluate(`
        return window.__eventFired;
      `);
      assert.strictEqual(fired, true, 'dispatchEvent should fire the event');
    } finally {
      await b.close();
    }
  });
});
