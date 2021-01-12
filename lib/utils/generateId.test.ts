import { indexOf } from "https://deno.land/std@0.83.0/bytes/mod.ts";
import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import generateId from "./generateId.ts";

Deno.test({
  name: "Generate a unique ID",
  fn: () => {
    const ids = [];

    for (let index = 0; index < 50; index++) {
      ids.push(generateId(8));
    }

    for (const id of ids) {
      const exist = ids.filter((_id) => _id === id).length;

      assertEquals(exist, 1);
    }
  },
});
