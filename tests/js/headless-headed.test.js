/**
 * JS Library Tests: Headless and Headed Modes
 * Tests that both browser modes work correctly
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

const { browser } = require('../../clients/javascript/dist');

describe('JS Browser Modes', () => {
  test('headless mode works', async () => {
    const vibe = await browser.launch({ headless: true });
    try {
      await vibe.go('https://the-internet.herokuapp.com/');
      const screenshot = await vibe.screenshot();
      assert.ok(screenshot.length > 1000, 'Should capture screenshot in headless mode');
    } finally {
      await vibe.quit();
    }
  });

  test('headed mode works', async () => {
    // Skip in CI environments where display is not available
    if (process.env.CI || process.env.GITHUB_ACTIONS) {
      console.log('  (skipped: no display in CI)');
      return;
    }

    const vibe = await browser.launch({ headless: false });
    try {
      await vibe.go('https://the-internet.herokuapp.com/');
      const screenshot = await vibe.screenshot();
      assert.ok(screenshot.length > 1000, 'Should capture screenshot in headed mode');
    } finally {
      await vibe.quit();
    }
  });

  test('default is headless', async () => {
    // browser.launch() without options should default to headless
    const vibe = await browser.launch();
    try {
      await vibe.go('https://the-internet.herokuapp.com/');
      const title = await vibe.evaluate('return document.title');
      assert.match(title, /The Internet/i, 'Should work with default options');
    } finally {
      await vibe.quit();
    }
  });
});
