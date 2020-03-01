import {Post, Collection} from "./posts.ts";
import {get_html} from "./common.ts";

interface Index {
    main_content: string,
    links: string,
    posts: Post[]
}

const get_links = (posts: Post[]) => {

    const list = posts
        .sort((a, b) => a.created > b.created? -1: 1)
        .map(post => `<li><a href="${post.location}">${post.title}</a></li>`)
        .join("\n"); 

    return "<h2>Posts</h2>".concat("<ul>", list, "</ul>");
}

export const get_index = async (collection: Collection): Promise<Index> => {

    const main_content = await get_html("index.md");
    const links = get_links(collection.posts);
    //TODO: colleciton rendering
    return {
        main_content,
        links,
        posts: collection.posts
    }
};