import { assert } from "../deps.ts";
const { test } = Deno;
import { collection_test_functions } from "./collection.ts";

const mock_direntry = (created: number, is_file: boolean): Deno.DirEntry => ({
  name: "name",
  //size: 0,
  //modified: 0,
  //accessed: 0,
  //created,
  //dev: 0,
  //ino: 9,
  //mode: 0,
  //nlink: 0,
  //uid: Math.random(),
  //gid: Math.random(),
  //rdev: 0,
  //blocks: 0,
  //blksize: 0,
  isFile: is_file,
  isDirectory: !is_file,
  isSymlink: false,
});

const entry = mock_direntry(2, false)


const { get_posts_from_files } = collection_test_functions;

test("Posts from files are sorted by creation date", async () => {
  const posts = await get_posts_from_files([
    mock_direntry(0, true),
    mock_direntry(2, true),
    mock_direntry(4, true),
    mock_direntry(3, true),
    mock_direntry(19, true),
  ], "./source", "destination");

  for (let i = 0; i < posts.length - 1; i++) {
    const current = posts[i];
    const next = posts[i + 1];

    assert(current.created > next.created);
  }
});
