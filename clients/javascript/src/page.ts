import { BiDiClient, ScreenshotResult } from './bidi';
import { Element, ElementInfo, SelectorOptions, FluentElement, fluent } from './element';
import { ElementList, ElementListInfo } from './element-list';
import { debug } from './utils/debug';

export interface FindOptions {
  /** Timeout in milliseconds to wait for element. Default: 30000 */
  timeout?: number;
}

export interface ScreenshotOptions {
  /** Capture full scrollable page instead of just the viewport. */
  fullPage?: boolean;
  /** Capture a specific region of the page. */
  clip?: { x: number; y: number; width: number; height: number };
}

interface VibiumFindResult {
  tag: string;
  text: string;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface VibiumFindAllResult {
  elements: ElementListInfo[];
  count: number;
}

/** Page-level keyboard input. */
export class Keyboard {
  private client: BiDiClient;
  private contextId: string;

  constructor(client: BiDiClient, contextId: string) {
    this.client = client;
    this.contextId = contextId;
  }

  /** Press and release a key. Supports combos like "Control+a". */
  async press(key: string): Promise<void> {
    await this.client.send('vibium:keyboard.press', {
      context: this.contextId,
      key,
    });
  }

  /** Press a key down (without releasing). */
  async down(key: string): Promise<void> {
    await this.client.send('vibium:keyboard.down', {
      context: this.contextId,
      key,
    });
  }

  /** Release a key. */
  async up(key: string): Promise<void> {
    await this.client.send('vibium:keyboard.up', {
      context: this.contextId,
      key,
    });
  }

  /** Type a string of text character by character. */
  async type(text: string): Promise<void> {
    await this.client.send('vibium:keyboard.type', {
      context: this.contextId,
      text,
    });
  }
}

/** Page-level mouse input. */
export class Mouse {
  private client: BiDiClient;
  private contextId: string;

  constructor(client: BiDiClient, contextId: string) {
    this.client = client;
    this.contextId = contextId;
  }

  /** Click at (x, y) coordinates. */
  async click(x: number, y: number): Promise<void> {
    await this.client.send('vibium:mouse.click', {
      context: this.contextId,
      x,
      y,
    });
  }

  /** Move mouse to (x, y) coordinates. */
  async move(x: number, y: number): Promise<void> {
    await this.client.send('vibium:mouse.move', {
      context: this.contextId,
      x,
      y,
    });
  }

  /** Press mouse button down. */
  async down(): Promise<void> {
    await this.client.send('vibium:mouse.down', {
      context: this.contextId,
    });
  }

  /** Release mouse button. */
  async up(): Promise<void> {
    await this.client.send('vibium:mouse.up', {
      context: this.contextId,
    });
  }

  /** Scroll the mouse wheel. */
  async wheel(deltaX: number, deltaY: number): Promise<void> {
    await this.client.send('vibium:mouse.wheel', {
      context: this.contextId,
      x: 0,
      y: 0,
      deltaX,
      deltaY,
    });
  }
}

/** Page-level touch input. */
export class Touch {
  private client: BiDiClient;
  private contextId: string;

  constructor(client: BiDiClient, contextId: string) {
    this.client = client;
    this.contextId = contextId;
  }

  /** Tap at (x, y) coordinates. */
  async tap(x: number, y: number): Promise<void> {
    await this.client.send('vibium:touch.tap', {
      context: this.contextId,
      x,
      y,
    });
  }
}

export class Page {
  private client: BiDiClient;
  private contextId: string;

  /** Page-level keyboard input. */
  readonly keyboard: Keyboard;
  /** Page-level mouse input. */
  readonly mouse: Mouse;
  /** Page-level touch input. */
  readonly touch: Touch;

  constructor(client: BiDiClient, contextId: string) {
    this.client = client;
    this.contextId = contextId;
    this.keyboard = new Keyboard(client, contextId);
    this.mouse = new Mouse(client, contextId);
    this.touch = new Touch(client, contextId);
  }

  /** The browsing context ID for this page. */
  get id(): string {
    return this.contextId;
  }

  /** Navigate to a URL. */
  async go(url: string): Promise<void> {
    debug('page.go', { url, context: this.contextId });
    await this.client.send('vibium:page.navigate', {
      context: this.contextId,
      url,
    });
  }

  /** Navigate back in history. */
  async back(): Promise<void> {
    await this.client.send('vibium:page.back', { context: this.contextId });
  }

  /** Navigate forward in history. */
  async forward(): Promise<void> {
    await this.client.send('vibium:page.forward', { context: this.contextId });
  }

  /** Reload the page. */
  async reload(): Promise<void> {
    await this.client.send('vibium:page.reload', { context: this.contextId });
  }

  /** Get the current page URL. */
  async url(): Promise<string> {
    const result = await this.client.send<{ url: string }>('vibium:page.url', {
      context: this.contextId,
    });
    return result.url;
  }

  /** Get the current page title. */
  async title(): Promise<string> {
    const result = await this.client.send<{ title: string }>('vibium:page.title', {
      context: this.contextId,
    });
    return result.title;
  }

  /** Get the full HTML content of the page. */
  async content(): Promise<string> {
    const result = await this.client.send<{ content: string }>('vibium:page.content', {
      context: this.contextId,
    });
    return result.content;
  }

  /** Wait until the page URL matches a pattern. */
  async waitForURL(pattern: string, options?: { timeout?: number }): Promise<void> {
    await this.client.send('vibium:page.waitForURL', {
      context: this.contextId,
      pattern,
      timeout: options?.timeout,
    });
  }

  /** Wait until the page reaches a load state. */
  async waitForLoad(state?: string, options?: { timeout?: number }): Promise<void> {
    await this.client.send('vibium:page.waitForLoad', {
      context: this.contextId,
      state,
      timeout: options?.timeout,
    });
  }

  /** Bring this page/tab to the foreground. */
  async bringToFront(): Promise<void> {
    await this.client.send('vibium:page.activate', { context: this.contextId });
  }

  /** Close this page/tab. */
  async close(): Promise<void> {
    await this.client.send('vibium:page.close', { context: this.contextId });
  }

  // --- Screenshots & PDF (Phase 5) ---

  /** Take a screenshot of the page. Returns a PNG buffer. */
  async screenshot(options?: ScreenshotOptions): Promise<Buffer> {
    const result = await this.client.send<ScreenshotResult>('vibium:page.screenshot', {
      context: this.contextId,
      fullPage: options?.fullPage,
      clip: options?.clip,
    });
    return Buffer.from(result.data, 'base64');
  }

  /** Print the page to PDF. Returns a PDF buffer. Only works in headless mode. */
  async pdf(): Promise<Buffer> {
    const result = await this.client.send<{ data: string }>('vibium:page.pdf', {
      context: this.contextId,
    });
    return Buffer.from(result.data, 'base64');
  }

  // --- Evaluation (Phase 5) ---

  /** Execute JavaScript in the page context (legacy — uses script.callFunction directly). */
  async evaluate<T = unknown>(script: string): Promise<T> {
    const result = await this.client.send<{
      type: string;
      result: { type: string; value?: T };
    }>('script.callFunction', {
      functionDeclaration: `() => { ${script} }`,
      target: { context: this.contextId },
      arguments: [],
      awaitPromise: true,
      resultOwnership: 'root',
    });

    return result.result.value as T;
  }

  /** Evaluate a JS expression and return the deserialized value. */
  async eval<T = unknown>(expression: string): Promise<T> {
    const result = await this.client.send<{ value: T }>('vibium:page.eval', {
      context: this.contextId,
      expression,
    });
    return result.value;
  }

  /** Evaluate a JS expression and return a handle ID for the result. */
  async evalHandle(expression: string): Promise<string> {
    const result = await this.client.send<{ handle: string }>('vibium:page.evalHandle', {
      context: this.contextId,
      expression,
    });
    return result.handle;
  }

  /** Inject a script into the page. Pass a URL or inline JavaScript. */
  async addScript(source: string): Promise<void> {
    const isURL = source.startsWith('http://') || source.startsWith('https://') || source.startsWith('//');
    await this.client.send('vibium:page.addScript', {
      context: this.contextId,
      ...(isURL ? { url: source } : { content: source }),
    });
  }

  /** Inject a stylesheet into the page. Pass a URL or inline CSS. */
  async addStyle(source: string): Promise<void> {
    const isURL = source.startsWith('http://') || source.startsWith('https://') || source.startsWith('//');
    await this.client.send('vibium:page.addStyle', {
      context: this.contextId,
      ...(isURL ? { url: source } : { content: source }),
    });
  }

  /** Expose a function on window. The function body is injected as a string. */
  async expose(name: string, fn: string): Promise<void> {
    await this.client.send('vibium:page.expose', {
      context: this.contextId,
      name,
      fn,
    });
  }

  // --- Page-level Waiting (Phase 4) ---

  /** Wait for a selector to appear on the page. Returns the element when found. */
  waitFor(selector: string | SelectorOptions, options?: FindOptions): FluentElement {
    const promise = (async () => {
      const params: Record<string, unknown> = {
        context: this.contextId,
        timeout: options?.timeout,
      };

      if (typeof selector === 'string') {
        params.selector = selector;
      } else {
        Object.assign(params, selector);
        if (selector.timeout && !options?.timeout) params.timeout = selector.timeout;
      }

      const result = await this.client.send<VibiumFindResult>('vibium:page.waitFor', params);
      const info: ElementInfo = { tag: result.tag, text: result.text, box: result.box };
      const selectorStr = typeof selector === 'string' ? selector : '';
      const selectorParams = typeof selector === 'string' ? { selector } : { ...selector };
      return new Element(this.client, this.contextId, selectorStr, info, undefined, selectorParams);
    })();
    return fluent(promise);
  }

  /** Wait for a fixed amount of time (milliseconds). Discouraged but useful for debugging. */
  async wait(ms: number): Promise<void> {
    await this.client.send('vibium:page.wait', {
      context: this.contextId,
      ms,
    });
  }

  /** Wait until a function returns a truthy value. The fn is polled repeatedly. */
  async waitForFunction<T = unknown>(fn: string, options?: { timeout?: number }): Promise<T> {
    const result = await this.client.send<{ value: T }>('vibium:page.waitForFunction', {
      context: this.contextId,
      fn,
      timeout: options?.timeout,
    });
    return result.value;
  }

  /** Find an element by CSS selector or semantic options. Waits for element to exist. */
  find(selector: string | SelectorOptions, options?: FindOptions): FluentElement {
    const promise = (async () => {
      const params: Record<string, unknown> = {
        context: this.contextId,
        timeout: options?.timeout,
      };

      if (typeof selector === 'string') {
        debug('page.find', { selector, timeout: options?.timeout });
        params.selector = selector;
      } else {
        debug('page.find', { ...selector, timeout: options?.timeout });
        Object.assign(params, selector);
        if (selector.timeout && !options?.timeout) params.timeout = selector.timeout;
      }

      const result = await this.client.send<VibiumFindResult>('vibium:find', params);

      const info: ElementInfo = {
        tag: result.tag,
        text: result.text,
        box: result.box,
      };

      const selectorStr = typeof selector === 'string' ? selector : '';
      const selectorParams = typeof selector === 'string' ? { selector } : { ...selector };
      return new Element(this.client, this.contextId, selectorStr, info, undefined, selectorParams);
    })();
    return fluent(promise);
  }

  /** Find all elements matching a CSS selector or semantic options. Waits for at least one. */
  async findAll(selector: string | SelectorOptions, options?: FindOptions): Promise<ElementList> {
    const params: Record<string, unknown> = {
      context: this.contextId,
      timeout: options?.timeout,
    };

    if (typeof selector === 'string') {
      debug('page.findAll', { selector, timeout: options?.timeout });
      params.selector = selector;
    } else {
      debug('page.findAll', { ...selector, timeout: options?.timeout });
      Object.assign(params, selector);
      if (selector.timeout && !options?.timeout) params.timeout = selector.timeout;
    }

    const result = await this.client.send<VibiumFindAllResult>('vibium:findAll', params);

    const selectorStr = typeof selector === 'string' ? selector : '';
    const selectorParams = typeof selector === 'string' ? { selector } : { ...selector };
    const elements = result.elements.map((el) => {
      const info: ElementInfo = { tag: el.tag, text: el.text, box: el.box };
      return new Element(this.client, this.contextId, selectorStr, info, el.index, selectorParams);
    });

    return new ElementList(this.client, this.contextId, selector, elements);
  }
}
