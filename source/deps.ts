// Third party
import marked from "https://raw.githubusercontent.com/olaven/marked/strict-types/main.ts";
export { marked as markdown_to_html };
export {
  serialize,
  Tag,
} from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.2.0/mod.ts";
export {
  read_file,
  file_exists,
  create_dir,
  write_file,
} from "https://denopkg.com/olaven/dio";

//standard Deno lib
export { encode, decode } from "https://deno.land/std/encoding/utf8.ts";
export { green, red, yellow, bold } from "https://deno.land/std/fmt/colors.ts";

export {
  assertEquals,
  assert,
  assertThrows,
  assertThrowsAsync,
  assertStringContains,
} from "https://deno.land/std@v0.57.0/testing/asserts.ts";
