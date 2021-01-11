import { AsteroidOptions } from "./interfaces/application.ts";
import { serve, Server } from "https://deno.land/std@0.83.0/http/server.ts";
import Request from "./request.ts";
import Response from "./response.ts";
import Router from "./router.ts";

class Application extends Router {
  private server: Server;

  constructor(options: AsteroidOptions) {
    super();
    const { port, hostname, jsonParser } = options;

    this.server = serve({ port, hostname });
  }

  private async callHandlers(
    ids: string[],
    req: Request,
    res: Response,
    err?: Error,
  ) {
    for (const id of ids) {
      if (err) {
        await this.exceptionHandlers[id](err, req, res);
        continue;
      }

      await this.requestHandlers[id](req, res);
    }
  }

  private async listenRequests() {
    for await (const serverRequest of this.server) {
      const { url, method } = serverRequest;
      const request = new Request(serverRequest);
      const response = new Response(serverRequest);

      const route = this.routes[`${url}|${method}`];

      if (!route) return response.send({ status: 404 });

      const { requestHandlersId, exceptionHandlersId } = route;

      try {
        await this.callHandlers(requestHandlersId, request, response);
        await route.controller(request, response);
      } catch (error) {
        await this.callHandlers(exceptionHandlersId, request, response, error);
      }
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
