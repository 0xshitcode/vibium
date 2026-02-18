/**
 * JS Library Tests: Lifecycle
 * Tests browser.page(), newPage(), newContext(), pages(), close(),
 * context.newPage(), context.close(), page.activate(), page.close()
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

const { browser } = require('../../clients/javascript/dist');

describe('JS Lifecycle', () => {
  test('browser.page() returns default page', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const vibe = await bro.page();
      assert.ok(vibe, 'Should return a page');
      assert.ok(vibe.id, 'Page should have an id');
    } finally {
      await bro.close();
    }
  });

  test('browser.newPage() creates new tab with unique ID', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const page1 = await bro.page();
      const page2 = await bro.newPage();
      assert.notStrictEqual(page1.id, page2.id, 'Pages should have different IDs');
    } finally {
      await bro.close();
    }
  });

  test('browser.pages() lists all tabs', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const pagesBefore = await bro.pages();
      await bro.newPage();
      await bro.newPage();
      const pagesAfter = await bro.pages();

      assert.ok(
        pagesAfter.length >= pagesBefore.length + 2,
        `Should have at least 2 more pages. Before: ${pagesBefore.length}, After: ${pagesAfter.length}`
      );
    } finally {
      await bro.close();
    }
  });

  test('page.close() removes a tab', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const newPage = await bro.newPage();
      const pagesBefore = await bro.pages();

      await newPage.close();

      const pagesAfter = await bro.pages();
      assert.strictEqual(
        pagesAfter.length,
        pagesBefore.length - 1,
        'Should have one fewer page'
      );
    } finally {
      await bro.close();
    }
  });

  test('page.bringToFront() activates a tab', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const page1 = await bro.page();
      const page2 = await bro.newPage();

      // Activate page1 (should not throw)
      await page1.bringToFront();
      assert.ok(true, 'bringToFront should succeed');
    } finally {
      await bro.close();
    }
  });

  test('browser.newContext() creates isolated context', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const ctx = await bro.newContext();
      assert.ok(ctx.id, 'Context should have an id');

      const vibe = await ctx.newPage();
      assert.ok(vibe.id, 'Page in new context should have an id');

      // Navigate in the new context
      await vibe.go('https://the-internet.herokuapp.com/');
      const title = await vibe.title();
      assert.match(title, /The Internet/i, 'Should navigate in new context');

      await ctx.close();
    } finally {
      await bro.close();
    }
  });

  test('context.close() removes all pages in context', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const ctx = await bro.newContext();
      await ctx.newPage();
      await ctx.newPage();

      const pagesBefore = await bro.pages();
      await ctx.close();
      const pagesAfter = await bro.pages();

      assert.ok(
        pagesAfter.length < pagesBefore.length,
        'Closing context should remove its pages'
      );
    } finally {
      await bro.close();
    }
  });

  test('multiple pages can navigate independently', async () => {
    const bro = await browser.launch({ headless: true });
    try {
      const page1 = await bro.page();
      const page2 = await bro.newPage();

      await page1.go('https://the-internet.herokuapp.com/');
      await page2.go('https://the-internet.herokuapp.com/login');

      const url1 = await page1.url();
      const url2 = await page2.url();

      assert.ok(!url1.includes('/login'), 'Page 1 should not be on login');
      assert.ok(url2.includes('/login'), 'Page 2 should be on login');
    } finally {
      await bro.close();
    }
  });

  test('browser.close() shuts down cleanly', async () => {
    const bro = await browser.launch({ headless: true });
    const vibe = await bro.page();
    await vibe.go('https://the-internet.herokuapp.com/');

    // close() should not throw
    await bro.close();
    assert.ok(true, 'browser.close() should complete without error');
  });
});
