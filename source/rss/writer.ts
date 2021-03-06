import { rss_from_blog } from "./converter.ts";
import { Blog } from "./types.ts";
import { serialize } from "../deps.ts";
import { write_file } from "../deps.ts";

export const write_rss = (blog: Blog, destination_path: string) => {
  const rss = rss_from_blog(blog);
  const serialized = serialize(rss);
  write_file(destination_path, serialized);
};
