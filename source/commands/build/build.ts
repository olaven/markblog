import { get_collection, Collection } from "../../blog/collection.ts"; //TODO: high coupling!
import { get_index } from "../../blog/index.ts";
import { write_file, create_dir } from "../../file_io.ts";
import { Options } from "../../blog/options.ts";
import { assemble_html_page, assemble_links } from "./assemble.ts";
import { bold, green } from "../../deps.ts";
import { generate_rss } from "./generate_rss.ts";

const write_posts = async (collection: Collection, options: Options) => {
  await create_dir(collection.path);

  const style_path = `../`.repeat(collection.level) + options.post_style;

  collection.posts
    .forEach(async (post) => {
      const html = await assemble_html_page(
        post.html,
        style_path,
        options.blog_title,
        options.favicon,
      );
      write_file(post.location, html);
    });

  collection.subcollections
    .forEach((subcollection) => write_posts(subcollection, options));
};

export const build = async (options: Options) => {
  await create_dir(options.post_destination);

  const collection = await get_collection(
    options.post_source,
    options.post_destination,
  );
  const index = await get_index(collection);

  //posts:
  await write_posts(collection, options);

  //index
  const links = assemble_links(collection);
  const content = index.main_content.concat(links);
  const html = await assemble_html_page(
    content,
    options.index_style,
    options.blog_title,
    options.favicon,
  );
  write_file("index.html", html);

  //rss
  await generate_rss(options, collection);

  console.log(bold(green("Done")) + " bulding.");
};
