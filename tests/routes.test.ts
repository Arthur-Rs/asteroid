import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import asteroid, { router } from "../lib/index.ts";

Deno.test({
  name: "Integrate external routes to main instance",
  fn: async () => {
    const app = asteroid({ port: 9090 });

    const routes = router();

    routes.get("/", (req, res) => {
      res.send({
        status: 201,
      });
    });

    app.use(routes);

    app.bootstrap();

    const response = await fetch("http://localhost:9090");

    assertEquals(response.status, 201);

    await response.body?.cancel();

    app.close();
  },
});

Deno.test({
  name: "Create route with controller",
  fn: async () => {
    const app = asteroid({ port: 9090 });

    app.get("/", (req, res) => {
      res.send({
        status: 201,
      });
    });

    app.bootstrap();

    const response = await fetch("http://localhost:9090");

    assertEquals(response.status, 201);

    await response.body?.cancel();

    app.close();
  },
});
