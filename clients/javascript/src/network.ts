/**
 * Network request and response data classes.
 * Wrap BiDi event data for onRequest/onResponse callbacks.
 */

interface BiDiHeaderEntry {
  name: string;
  value: { type: string; value: string };
}

/** Wraps a BiDi network.beforeRequestSent event. */
export class Request {
  private data: Record<string, unknown>;

  constructor(data: Record<string, unknown>) {
    this.data = data;
  }

  /** The request URL. */
  url(): string {
    const req = this.data.request as Record<string, unknown> | undefined;
    return (req?.url as string) ?? '';
  }

  /** The HTTP method (GET, POST, etc.). */
  method(): string {
    const req = this.data.request as Record<string, unknown> | undefined;
    return (req?.method as string) ?? '';
  }

  /** Request headers as a simple key-value object. */
  headers(): Record<string, string> {
    const req = this.data.request as Record<string, unknown> | undefined;
    const entries = (req?.headers as BiDiHeaderEntry[]) ?? [];
    return convertHeaders(entries);
  }

  /** The request ID (BiDi network request identifier). */
  requestId(): string {
    const req = this.data.request as Record<string, unknown> | undefined;
    return (req?.request as string) ?? '';
  }

  /** Request body / post data. Not available via BiDi events. */
  async postData(): Promise<string | null> {
    return null;
  }
}

/** Wraps a BiDi network.responseCompleted event. */
export class Response {
  private data: Record<string, unknown>;

  constructor(data: Record<string, unknown>) {
    this.data = data;
  }

  /** The response URL. */
  url(): string {
    const resp = this.data.response as Record<string, unknown> | undefined;
    return (resp?.url as string) ?? (this.data.url as string) ?? '';
  }

  /** The HTTP status code. */
  status(): number {
    const resp = this.data.response as Record<string, unknown> | undefined;
    return (resp?.status as number) ?? 0;
  }

  /** Response headers as a simple key-value object. */
  headers(): Record<string, string> {
    const resp = this.data.response as Record<string, unknown> | undefined;
    const entries = (resp?.headers as BiDiHeaderEntry[]) ?? [];
    return convertHeaders(entries);
  }

  /** The request ID associated with this response. */
  requestId(): string {
    const req = this.data.request as Record<string, unknown> | undefined;
    return (req?.request as string) ?? '';
  }

  /** Response body as a string. Not yet implemented. */
  async body(): Promise<string | null> {
    return null;
  }

  /** Response body parsed as JSON. Not yet implemented. */
  async json(): Promise<unknown> {
    return null;
  }
}

/** Convert BiDi header entries [{name, value: {type, value}}] to Record<string, string>. */
function convertHeaders(entries: BiDiHeaderEntry[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const entry of entries) {
    result[entry.name] = entry.value?.value ?? '';
  }
  return result;
}
