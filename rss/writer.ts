import { rss_from_blog } from "./converter.ts";
import { Blog } from "./types.ts";
import { serialize } from "./serialize/mod.ts";
import { write_file } from "../common.ts";


export const write_rss = (blog: Blog, destination_path: string) => {

    const rss = rss_from_blog(blog);
    const serialized = serialize(rss);
    write_file(destination_path, serialized);
} 