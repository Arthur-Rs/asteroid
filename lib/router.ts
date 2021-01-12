import {
  addRouteOptions,
  ExceptionHandler,
  RequestHandler,
  Route,
  UseHandler,
} from "./interfaces/router.ts";
import generateId from "./utils/generateId.ts";

class Router {
  protected routes: { [route: string]: Route };
  protected requestHandlers: { [id: string]: RequestHandler };
  protected exceptionHandlers: { [id: string]: ExceptionHandler };

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

  private addRoute({ path, method, controller }: addRouteOptions) {
    this.routes[`${path}|${method}`] = {
      controller,
      requestHandlersId: Object.keys(this.requestHandlers),
      exceptionHandlersId: Object.keys(this.exceptionHandlers),
    };
  }

  use(handler: UseHandler) {
    if (handler instanceof Router) {
      return this.ConcatRouter(handler);
    }

    const args = handler.length;

    if (args <= 2) {
      const id = generateId(16);
      this.requestHandlers[id] = handler as RequestHandler;
    } else if (args === 3) {
      const id = generateId(8);
      this.exceptionHandlers[id] = handler as ExceptionHandler;
    } else {
      throw TypeError("Invalid Handler");
    }
  }

  get(path: string, controller: RequestHandler) {
    this.addRoute({ path, method: "GET", controller });
  }

  post(path: string, controller: RequestHandler) {
    this.addRoute({ path, method: "POST", controller });
  }

  put(path: string, controller: RequestHandler) {
    this.addRoute({ path, method: "PUT", controller });
  }

  patch(path: string, controller: RequestHandler) {
    this.addRoute({ path, method: "PATCH", controller });
  }

  delete(path: string, controller: RequestHandler) {
    this.addRoute({ path, method: "DELETE", controller });
  }
}

export default Router;
