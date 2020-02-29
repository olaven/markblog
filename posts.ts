
import {get_html} from "./common.ts";

const get_title = (filename: string) => filename
    .replace(".md", "")
    .split("_")
    .join(" ");

export interface Post {
    title: string,
    html: string,
    location: string
    created: Date,
    modification: Date
}

const read_folder = (folder: string) =>
    Deno.readDir(folder);

const to_posts = (source: string, destination: string) => {

    return async (file: Deno.FileInfo): Promise<Post> => {
        
        const filename = file.name as string;

        const title = get_title(filename);
        const html = await get_html(`${source}/${filename}`);
        const location = `${destination}/${filename.replace(".md", ".html")}`
        const created = new Date(file.created as number); //FIXME: this and below date is wrongly converted
        const modification = new Date(file.modified as number);
        
        return {title, html, location, created, modification};
    }
};


const is_post = (file: Deno.FileInfo) => {

    const is_file = file.isFile();
    const is_markdown = (file.name as string).endsWith(".md");

    return is_file && is_markdown;
};

const is_collection = (file: Deno.FileInfo) => 
    file.isDirectory();

interface Collection {
    name: string,
    collections: Collection[]
    posts: Post[]
}

const get_collection_name = (path: string) => {

    const parts = path.split("/");
    const last = parts[parts.length - 1];
    const name = last.replace("_", " ");
    return name; 
}

export const get_collection = async (source: string, destination: string): Promise<Collection> => {

    const files = await read_folder(source);
    const collection: Collection = {
        name: get_collection_name(source),
        collections: await Promise.all(files.filter(is_collection).map(file => get_collection(`${source}/${file.name}`, `${destination}/${file.name}`))),
        posts: await Promise.all(files.filter(is_post).map(to_posts(source, destination)))
    }      

    return collection;
}

export const get_posts = async (source: string, destination: string) => Promise.all(
    (await read_folder(source))
        .filter(is_post)
        .map(to_posts(source, destination))
);




