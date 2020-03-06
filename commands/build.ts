import { get_collection, Collection } from "../collection.ts";
import { get_index } from "../index.ts";
import { assemble_html_page, write_file, Options } from "../common.ts";
import { bold, green } from "../deps.ts";

/**
 * Creates a directory. 
 * Fails silently if directory already 
 * exists. 
 */
const create_dir = async (path: string) => {

    try {
    
        await Deno.mkdir(path);
    } catch(error) {
        
        const does_already_exist_error = error instanceof Deno.errors.AlreadyExists;
        if (!does_already_exist_error) 
            throw error 
    }
}

const get_header_level = (level: number) => {

    if (level >= 5) return 6;
    else return level + 1;
}

const render_links = (collection: Collection, level = 0): string => {

    const posts = collection.posts
        .sort((a, b) => a.created  < b.created? 1: -1)
        .map(post => `<li><a href="${post.location}">${post.title}<a/></li>`)
        .join("")

    const collections = collection.subcollections
        .map(subcollection => render_links(subcollection, level + 1))
        .join("")

    return `
        <h${get_header_level(level)}>${collection.name}</h${get_header_level(level)}>
        <ul>
            ${posts}
            ${collections}
        </ul>
    `
}

const write_posts = async (collection: Collection, options: Options) => {

    await create_dir(collection.path);

    collection.posts
        .forEach(async (post) => {
            
            const style_path = `../`.repeat(collection.level) + options.post_style;
            const html = await assemble_html_page(post.html, style_path);
            write_file(post.location, html);
        });

    collection.subcollections
        .forEach(subcollection => 
            write_posts(subcollection, options)
        );
}

export const build = async (options: Options) => {

    await create_dir(options.post_destination);

    const collection = await get_collection(options.post_source, options.post_destination);
    const index = await get_index(collection);

    //posts: 
    await write_posts(collection, options);

    //index
    const links = render_links(collection);
    const content = index.main_content.concat(links);
    const html = await assemble_html_page(content, options.index_style);
    write_file("index.html", html);

    console.log(bold(green("Done")) + " bulding.");
}