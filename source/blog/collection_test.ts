import { assert, assertEquals } from "../deps.ts";
import { collection_test_functions } from "./collection.ts";
import { default_options } from "./options.ts";
const { test } = Deno;

const mock_direntry = (
  created: number,
  is_file: boolean,
  name = "name"
): Deno.DirEntry => ({
  name: name,
  isFile: is_file,
  isDirectory: !is_file,
  isSymlink: false,
});

const { get_posts_from_files, get_title } = collection_test_functions;

test("Posts from files are sorted by creation date", async () => {
  const posts = await get_posts_from_files(
    [
      mock_direntry(0, true),
      mock_direntry(2, true),
      mock_direntry(4, true),
      mock_direntry(3, true),
      mock_direntry(19, true),
    ],
    "./source",
    "destination",
    default_options.git_history
  );

  for (let i = 0; i < posts.length - 1; i++) {
    const current = posts[i];
    const next = posts[i + 1];

    assert(current.created > next.created);
  }
});

test("Directory with _ marks ' ' in collection title", async () => {
  const dirname = "my_name";
  const title = get_title(dirname);

  assertEquals(title, "my name");
});

test("Direcdtories with multiple _ marks multiple words", async () => {
  const dirname = "one_two_three";
  const title = get_title(dirname);

  assertEquals(title, "one two three");
});
