import { BiDiClient } from './bidi';
import { ElementList, ElementListInfo } from './element-list';
import { ElementNotFoundError } from './utils/errors';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementInfo {
  tag: string;
  text: string;
  box: BoundingBox;
}

export interface ScriptResult {
  type: string;
  result: {
    type: string;
    value?: unknown;
  };
}

export interface ActionOptions {
  /** Timeout in milliseconds for actionability checks. Default: 30000 */
  timeout?: number;
}

export interface SelectorOptions {
  role?: string;
  text?: string;
  label?: string;
  placeholder?: string;
  alt?: string;
  title?: string;
  testid?: string;
  xpath?: string;
  near?: string;
  timeout?: number;
}

export class Element {
  private client: BiDiClient;
  private context: string;
  private selector: string;
  private _index?: number;
  readonly info: ElementInfo;

  constructor(
    client: BiDiClient,
    context: string,
    selector: string,
    info: ElementInfo,
    index?: number
  ) {
    this.client = client;
    this.context = context;
    this.selector = selector;
    this.info = info;
    this._index = index;
  }

  /**
   * Click the element.
   * Waits for element to be visible, stable, receive events, and enabled.
   */
  async click(options?: ActionOptions): Promise<void> {
    await this.client.send('vibium:click', {
      context: this.context,
      selector: this.selector,
      index: this._index,
      timeout: options?.timeout,
    });
  }

  /**
   * Type text into the element.
   * Waits for element to be visible, stable, receive events, enabled, and editable.
   */
  async type(text: string, options?: ActionOptions): Promise<void> {
    await this.client.send('vibium:type', {
      context: this.context,
      selector: this.selector,
      text,
      index: this._index,
      timeout: options?.timeout,
    });
  }

  async text(): Promise<string> {
    const result = await this.client.send<ScriptResult>('script.callFunction', {
      functionDeclaration: `(selector) => {
        const el = document.querySelector(selector);
        return el ? (el.textContent || '').trim() : null;
      }`,
      target: { context: this.context },
      arguments: [{ type: 'string', value: this.selector }],
      awaitPromise: false,
      resultOwnership: 'root',
    });

    if (result.result.type === 'null') {
      throw new ElementNotFoundError(this.selector);
    }

    return result.result.value as string;
  }

  async getAttribute(name: string): Promise<string | null> {
    const result = await this.client.send<ScriptResult>('script.callFunction', {
      functionDeclaration: `(selector, attrName) => {
        const el = document.querySelector(selector);
        return el ? el.getAttribute(attrName) : null;
      }`,
      target: { context: this.context },
      arguments: [
        { type: 'string', value: this.selector },
        { type: 'string', value: name },
      ],
      awaitPromise: false,
      resultOwnership: 'root',
    });

    if (result.result.type === 'null') {
      return null;
    }

    return result.result.value as string;
  }

  async boundingBox(): Promise<BoundingBox> {
    const result = await this.client.send<ScriptResult>('script.callFunction', {
      functionDeclaration: `(selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return JSON.stringify({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        });
      }`,
      target: { context: this.context },
      arguments: [{ type: 'string', value: this.selector }],
      awaitPromise: false,
      resultOwnership: 'root',
    });

    if (result.result.type === 'null') {
      throw new ElementNotFoundError(this.selector);
    }

    return JSON.parse(result.result.value as string) as BoundingBox;
  }

  /** Find a child element by CSS selector or semantic options. Scoped to this element. */
  async find(selector: string | SelectorOptions, options?: { timeout?: number }): Promise<Element> {
    const params: Record<string, unknown> = {
      context: this.context,
      scope: this.selector,
      timeout: options?.timeout,
    };

    if (typeof selector === 'string') {
      params.selector = selector;
    } else {
      Object.assign(params, selector);
      if (selector.timeout) params.timeout = selector.timeout;
    }

    const result = await this.client.send<{
      tag: string;
      text: string;
      box: BoundingBox;
    }>('vibium:find', params);

    const info: ElementInfo = { tag: result.tag, text: result.text, box: result.box };
    const childSelector = typeof selector === 'string' ? selector : '';
    return new Element(this.client, this.context, childSelector, info);
  }

  /** Find all child elements by CSS selector or semantic options. Scoped to this element. */
  async findAll(selector: string | SelectorOptions, options?: { timeout?: number }): Promise<ElementList> {
    const params: Record<string, unknown> = {
      context: this.context,
      scope: this.selector,
      timeout: options?.timeout,
    };

    if (typeof selector === 'string') {
      params.selector = selector;
    } else {
      Object.assign(params, selector);
      if (selector.timeout) params.timeout = selector.timeout;
    }

    const result = await this.client.send<{
      elements: Array<{ tag: string; text: string; box: BoundingBox; index: number }>;
      count: number;
    }>('vibium:findAll', params);

    const selectorStr = typeof selector === 'string' ? selector : '';
    const elements = result.elements.map((el) => {
      const info: ElementInfo = { tag: el.tag, text: el.text, box: el.box };
      return new Element(this.client, this.context, selectorStr, info, el.index);
    });

    return new ElementList(this.client, this.context, selector, elements);
  }

  private getCenter(): { x: number; y: number } {
    return {
      x: this.info.box.x + this.info.box.width / 2,
      y: this.info.box.y + this.info.box.height / 2,
    };
  }
}

export { ElementList } from './element-list';
