import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import asteroid from "../lib/index.ts";

Deno.test({
  name: "Create an asteroid instance and running",
  fn: () => {
    let running = false;
    const app = asteroid({ port: 9090 });

    app.bootstrap(() => {
      running = true;
    });

    assertEquals(running, true);

    app.close();
  },
});

Deno.test({
  name: "Receive a request and return a 404 error",
  fn: async () => {
    let running = false;
    const app = asteroid({ port: 9090 });

    app.bootstrap(() => {
      running = true;
    });

    const response = await fetch("http://localhost:9090");

    assertEquals(response.status, 404);

    await response.body?.cancel();
    app.close();
  },
});

Deno.test({
  name: "Collect the request header",
  fn: async () => {
    let running = false;
    const app = asteroid({ port: 9090 });

    app.bootstrap(() => {
      running = true;
    });

    const response = await fetch("http://localhost:9090", {
      headers: [
        ["Content-Type", "Application/json"],
      ],
    });

    assertEquals(response.status, 404);

    await response.body?.cancel();
    app.close();
  },
});
