import {
  ExceptionHandler,
  RequestHandler,
  UseHandler,
} from "./interfaces/router.ts";
import generateId from "./utils/generateId.ts";

class Router {
  routes: { [route: string]: string };
  requestHandlers: { [id: string]: RequestHandler };
  exceptionHandlers: { [id: string]: ExceptionHandler };

  constructor() {
    this.routes = {};
    this.requestHandlers = {};
    this.exceptionHandlers = {};
  }

  private ConcatRouter(route: Router) {
    this.routes = Object.assign(this.routes, route.routes);
    this.requestHandlers = Object.assign(
      this.requestHandlers,
      route.requestHandlers,
    );
    this.exceptionHandlers = Object.assign(
      this.exceptionHandlers,
      route.requestHandlers,
    );
  }

  use(handler: UseHandler) {
    if (handler instanceof Router) {
      return this.ConcatRouter(handler);
    }

    const args = handler.length;

    if (args === 2) {
      const id = generateId(16);

      this.requestHandlers[id] = handler as RequestHandler;
    } else if (args === 3) {
      const id = generateId(8);

      this.exceptionHandlers[id] = handler as ExceptionHandler;
    } else {
      throw TypeError("Invalid Handler");
    }
  }
}

export default Router;
