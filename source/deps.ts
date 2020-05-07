// Third party
import marked from "https://raw.githubusercontent.com/olaven/marked/strict-types/main.ts";
export { marked as markdown_to_html };
export {
  serialize,
  Tag
} from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.2.0/mod.ts";

//standard Deno lib
export { encode, decode } from "https://deno.land/std/encoding/utf8.ts";
export { green, red, yellow, bold } from "https://deno.land/std/fmt/mod.ts";

export {
  assertEquals,
  assert,
  assertThrows,
  assertThrowsAsync,
  assertStrContains
} from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
