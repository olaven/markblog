import { assertEquals } from "./deps.ts";

//Temp. added to see if CI breaks
Deno.test("fail on purpose", () => {

    assertEquals(2, 1);
});