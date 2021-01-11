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
    const app = asteroid({ port: 9090 });

    app.bootstrap();

    const response = await fetch("http://localhost:9090");

    assertEquals(response.status, 404);

    await response.body?.cancel();

    app.close();
  },
});
