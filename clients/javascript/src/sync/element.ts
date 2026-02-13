import { SyncBridge } from './bridge';
import { ActionOptions, BoundingBox, ElementInfo } from '../element';

export class ElementSync {
  private bridge: SyncBridge;
  private elementId: number;
  readonly info: ElementInfo;

  constructor(bridge: SyncBridge, elementId: number, info: ElementInfo) {
    this.bridge = bridge;
    this.elementId = elementId;
    this.info = info;
  }

  /**
   * Click the element.
   * Waits for element to be visible, stable, receive events, and enabled.
   */
  click(options?: ActionOptions): void {
    this.bridge.call('element.click', [this.elementId, options]);
  }

  /** Double-click the element. */
  dblclick(options?: ActionOptions): void {
    this.bridge.call('element.dblclick', [this.elementId, options]);
  }

  /**
   * Fill the element with text (clears existing content first).
   * For inputs and textareas.
   */
  fill(value: string, options?: ActionOptions): void {
    this.bridge.call('element.fill', [this.elementId, value, options]);
  }

  /**
   * Type text into the element.
   * Waits for element to be visible, stable, receive events, enabled, and editable.
   */
  type(text: string, options?: ActionOptions): void {
    this.bridge.call('element.type', [this.elementId, text, options]);
  }

  /**
   * Press a key while the element is focused.
   * Supports key names ("Enter", "Tab") and combos ("Control+a").
   */
  press(key: string, options?: ActionOptions): void {
    this.bridge.call('element.press', [this.elementId, key, options]);
  }

  /** Clear the element's content (select all + delete). */
  clear(options?: ActionOptions): void {
    this.bridge.call('element.clear', [this.elementId, options]);
  }

  /** Check a checkbox (no-op if already checked). */
  check(options?: ActionOptions): void {
    this.bridge.call('element.check', [this.elementId, options]);
  }

  /** Uncheck a checkbox (no-op if already unchecked). */
  uncheck(options?: ActionOptions): void {
    this.bridge.call('element.uncheck', [this.elementId, options]);
  }

  /** Select an option in a <select> element by value. */
  selectOption(value: string, options?: ActionOptions): void {
    this.bridge.call('element.selectOption', [this.elementId, value, options]);
  }

  /** Hover over the element (move mouse to center, no click). */
  hover(options?: ActionOptions): void {
    this.bridge.call('element.hover', [this.elementId, options]);
  }

  /** Focus the element. */
  focus(options?: ActionOptions): void {
    this.bridge.call('element.focus', [this.elementId, options]);
  }

  /** Drag this element to a target element. */
  dragTo(target: ElementSync, options?: ActionOptions): void {
    this.bridge.call('element.dragTo', [this.elementId, (target as any).elementId, options]);
  }

  /** Tap the element (touch action). */
  tap(options?: ActionOptions): void {
    this.bridge.call('element.tap', [this.elementId, options]);
  }

  /** Scroll the element into view. */
  scrollIntoView(options?: ActionOptions): void {
    this.bridge.call('element.scrollIntoView', [this.elementId, options]);
  }

  /** Dispatch a DOM event on the element. */
  dispatchEvent(eventType: string, eventInit?: Record<string, unknown>, options?: ActionOptions): void {
    this.bridge.call('element.dispatchEvent', [this.elementId, eventType, eventInit, options]);
  }

  text(): string {
    const result = this.bridge.call<{ text: string }>('element.text', [this.elementId]);
    return result.text;
  }

  getAttribute(name: string): string | null {
    const result = this.bridge.call<{ value: string | null }>('element.getAttribute', [this.elementId, name]);
    return result.value;
  }

  boundingBox(): BoundingBox {
    const result = this.bridge.call<{ box: BoundingBox }>('element.boundingBox', [this.elementId]);
    return result.box;
  }
}
