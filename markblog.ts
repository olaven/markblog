import {get_posts} from "./posts.ts";
import {write_file, assemble_html_page} from "./common.ts"
import {get_index} from "./index.ts";

const options = {
    post_source: "./posts", 
    post_destination: "./out", 
    post_style: "../style.css",
    index_style: "./style.css", 
}


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



