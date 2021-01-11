import { AsteroidOptions } from "./core/interfaces/application.ts";
import Application from "./core/application.ts";
import Router from "./core/router.ts";

function asteroid(options: AsteroidOptions): Application {
  const application = new Application(options);

  return application;
}

function router(): Router {
  const route = new Router();

  return route;
}

export default asteroid;
export { Application, router };
export type { AsteroidOptions };
