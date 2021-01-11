import Request from "../request.ts";
import Response from "../response.ts";
import Router from "../router.ts";

export type RequestHandler = (
  request: Request,
  response: Response,
) => Promise<void> | void;

export type ExceptionHandler = (
  error: Error,
  request: Request,
  response: Response,
) => Promise<void> | void;

export type UseHandler = RequestHandler | ExceptionHandler | Router;
