import { Collection, get_collection } from "../../blog/collection.ts"; //FIXME: high coupling!
import { get_index } from "../../blog/index.ts";
import { Options } from "../../blog/options.ts";
import { bold, create_dir, green, write_file } from "../../deps.ts";
import { get_latest_commit } from "../../git/git.ts";
import { assemble_html_page, assemble_links } from "./assemble.ts";
import { copy_assets } from "./assets.ts";
import { generate_rss } from "./generate_rss.ts";

const write_posts = async (collection: Collection, options: Options) => {
  await create_dir(collection.path);

  const style_path = `../`.repeat(collection.level) + options.post_style;

  collection.posts.forEach((post) => {
    const html = assemble_html_page({
      content: post.html,
      stylesheet: style_path,
      title: options.blog_title,
      favicon: options.favicon,
      latest_commit: post.latest_commit,
      history_options: options.git_history,
    });
    write_file(post.location, html);
  });

  collection.subcollections.forEach((subcollection) =>
    write_posts(subcollection, options)
  );
};

export const build = async (options: Options) => {
  await create_dir(options.post_destination);

  const collection = await get_collection({
    source: options.post_source,
    destination: options.post_destination,
    history_options: options.git_history,
  });

  const index = await get_index(collection);

  //posts:
  await write_posts(collection, options);

  //assets:
  await copy_assets(options);

  //index
  const links = assemble_links(collection);
  const content = index.main_content.concat(links);
  const html = assemble_html_page({
    content,
    stylesheet: options.index_style,
    title: options.blog_title,
    favicon: options.favicon,
    latest_commit: options.git_history.enabled
      ? await get_latest_commit("./index.md")
      : null,
    history_options: options.git_history,
  });
  write_file("index.html", html);

  //rss
  await generate_rss(options, collection);

  console.log(bold(green("Done")) + " bulding.");
};
