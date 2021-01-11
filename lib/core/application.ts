import { AsteroidOptions } from "./interfaces/application.ts";
import { serve, Server } from "https://deno.land/std@0.83.0/http/server.ts";
import Request from "./request.ts";

class Application {
  private server: Server;

  constructor(options: AsteroidOptions) {
    const { port, hostname, jsonParser } = options;

    this.server = serve({ port, hostname });
  }

  private async listenRequests() {
    for await (const serverRequest of this.server) {
      const request = new Request(serverRequest);
      const response = new Request(serverRequest);

      serverRequest.respond({
        status: 404,
      });
    }
  }

  close() {
    this.server.close();
  }

  async bootstrap(callback?: () => void) {
    callback && callback();

    try {
      await this.listenRequests();
    } catch (err) {
      console.log(err);
    }
  }
}

export default Application;
