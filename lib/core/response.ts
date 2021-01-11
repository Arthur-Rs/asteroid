// deno-lint-ignore-file
import { ServerRequest } from "https://deno.land/std@0.83.0/http/server.ts";

class Response {
  serverRequest: ServerRequest;
  status: number;
  cookies: { [key: string]: any };
  headers: Headers;
  body: { [key: string]: any };

  constructor(serverReq: ServerRequest) {
    this.serverRequest = serverReq;

    this.body = {};
    this.headers = new Headers();
    this.cookies = {};
    this.status = 200;
  }

  header(headers: { [key: string]: any }) {
    const attributes = Object.entries(headers);

    for (const [key, value] of attributes) {
      this.headers.set(key, value);
    }
  }

  set(key: string, value: string) {
    this.headers.set(key, value);
  }

  send(data?: ResponseInit) {
    if (data) {
      if (data.headers) this.header(data.headers);
      this.status = data.status || this.status;
    }

    this.serverRequest.respond({
      headers: this.headers,
      status: this.status,
    });
  }
}

export default Response;
