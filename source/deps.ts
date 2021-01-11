// Third party
import marked from "https://raw.githubusercontent.com/olaven/marked/strict-types/main.ts";
import { serialize as _serialize, Tag as _Tag } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.2.0/mod.ts";

export { marked as markdown_to_html };
export const serialize = _serialize;
export type Tag = _Tag;

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
} from "https://deno.land/std@0.68.0/testing/asserts.ts";
