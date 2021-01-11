import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import asteroid, { router } from "../lib/index.ts";

Deno.test({
  name: "Call middlewares",
  fn: async () => {
    let calls = 0;
    const app = asteroid({ port: 9090 });

    app.get("/route-1", (req, res) => {
      res.send();
    });

    app.use(() => {
      calls += 1;
    });

    app.get("/route-2", (req, res) => {
      res.send();
    });

    app.bootstrap();

    const responses = [];

    responses.push(await fetch("http://localhost:9090/route-1"));

    responses.push(await fetch("http://localhost:9090/route-1"));

    responses.push(await fetch("http://localhost:9090/route-2"));

    responses.push(await fetch("http://localhost:9090/route-2"));

    responses.push(await fetch("http://localhost:9090/route-2"));

    assertEquals(calls, 3);

    for await (const response of responses) {
      response.body?.cancel();
    }

    app.close();
  },
});

Deno.test({
  name: "Call extern middlewares",
  fn: async () => {
    let calls = 0;
    const app = asteroid({ port: 9090 });

    const routes = router();

    routes.get("/route-1", (req, res) => {
      res.send();
    });

    routes.use(() => {
      calls += 1;
    });

    routes.get("/route-2", (req, res) => {
      res.send();
    });

    app.use(routes);

    app.bootstrap();

    const responses = [];

    responses.push(await fetch("http://localhost:9090/route-1"));

    responses.push(await fetch("http://localhost:9090/route-1"));

    responses.push(await fetch("http://localhost:9090/route-2"));

    responses.push(await fetch("http://localhost:9090/route-2"));

    responses.push(await fetch("http://localhost:9090/route-2"));

    assertEquals(calls, 3);

    for await (const response of responses) {
      response.body?.cancel();
    }

    app.close();
  },
});
