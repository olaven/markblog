import { get_posts } from "../posts.ts";
import { get_index } from "../index.ts";
import { assemble_html_page, write_file } from "../common.ts";

export const build = async (options: BuildOptions) => {

    try {
        await Deno.mkdir(options.post_destination);
    } catch(error) {// already exists
    }

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

export interface BuildOptions {
    post_source: string, 
    post_destination: string, 
    post_style: string,
    index_style: string, 
}