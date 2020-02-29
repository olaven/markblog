import { get_posts, get_collection } from "../posts.ts";
import { get_index } from "../index.ts";
import { assemble_html_page, write_file, Options } from "../common.ts";

export const build = async (options: Options) => {

    try {
        await Deno.mkdir(options.post_destination);
    } catch(error) {// already exists
    }

    const collection = await get_collection(options.post_source, options.post_destination);
    const prettified = JSON.stringify(collection, null, 2);
    console.log("collection", prettified);

    const posts = await get_posts(options.post_source, options.post_destination);
    const index = await get_index(posts);

    posts.forEach(async post => {

        const html = await assemble_html_page(post.html, options.post_style)
        write_file(post.location, html);
    });

    const content = index.main_content.concat(index.links);
    const html = await assemble_html_page(content, options.index_style);
    write_file("index.html", html);
}