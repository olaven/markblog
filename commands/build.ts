import { get_collection, Collection } from "../posts.ts";
import { get_index } from "../index.ts";
import { assemble_html_page, write_file, Options } from "../common.ts";

/**
 * Creates a directory. 
 * Fails silently if directory already 
 * exists. 
 */
const create_dir = async (path: string) => {

    try {
    
        await Deno.mkdir(path);
    } catch(error) {
    
        if (error.kind !== Deno.ErrorKind.AlreadyExists)
            throw error 
    }
}

const write_collection = async (current_path: string, collection: Collection, options: Options) => {

    collection.posts.forEach(async post => {

        const html = await assemble_html_page(post.html, options.post_style)
        write_file(post.location, html);
    });

    if (current_path !== options.post_destination) {

        //i.e. subcollections
        await create_dir(current_path);
    }

    collection.subcollections.forEach(subcollection => {

        //NOTE: remember that this is async 
        write_collection(collection.path, collection, options)
    });
}

export const build = async (options: Options) => {

    await create_dir(options.post_destination);

    const collection = await get_collection(options.post_source, options.post_destination);

    console.log(JSON.stringify(collection, null, 2));
    //const posts = await get_posts(options.post_source, options.post_destination);
    const index = await get_index(collection);
    const content = index.main_content.concat(index.links);
    const html = await assemble_html_page(content, options.index_style);
    write_file("index.html", html);
}