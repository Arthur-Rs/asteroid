// deno-lint-ignore-file
import { ServerRequest } from "https://deno.land/std@0.83.0/http/server.ts";
import { getCookies } from "https://deno.land/std@0.83.0/http/cookie.ts";
import parserHeader from "./utils/parserHeader.ts";

class Request {
  serverRequest: ServerRequest;
  cookies: { [key: string]: any };
  headers: { [key: string]: any };
  body: { [key: string]: any };

  constructor(serverReq: ServerRequest) {
    this.serverRequest = serverReq;

    this.body = {};
    this.headers = {};
    this.cookies = {};

    this.getAllHeaders();
    this.getAllCookies();
  }

  private getAllHeaders() {
    for (const header of this.serverRequest.headers) {
      const { key, value } = parserHeader(header);

      this.headers[key] = value;
    }
  }

  private getAllCookies() {
    this.cookies = getCookies(this.serverRequest);
  }
}

export default Request;
