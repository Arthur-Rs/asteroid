import { AsteroidOptions } from "./lib/interfaces/application.ts";
import Application from "./lib/application.ts";
import Router from "./lib/router.ts";
import Request from "./lib/request.ts";
import Response from "./lib/response.ts";

function asteroid(options: AsteroidOptions): Application {
  const application = new Application(options);

  return application;
}

function router(): Router {
  const route = new Router();

  return route;
}

export default asteroid;
export { Application, Request, Response, router };
export type { AsteroidOptions };
