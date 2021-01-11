import { AsteroidOptions } from "./core/interfaces/application.ts";
import Application from "./core/application.ts";

function asteroid(options: AsteroidOptions): Application {
  const application = new Application(options);

  return application;
}

export default asteroid;
export { Application };
export type { AsteroidOptions };
