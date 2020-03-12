
import {get_html} from "./common.ts";


export interface Post {
    title: string,
    html: string,
    location: string
    created: Date, 
    modification: Date
}

const get_title = (filename: string) => filename
    .replace(".md", "")
    .split("_")
    .join(" ");

const read_folder = async (folder: string) => {
    
    const result = await Deno.readDir(folder);
    return result;
};

const to_date = (unix_time: number) =>
    new Date((unix_time as number) * 1000)

const to_posts = (source: string, destination: string) => {

    return async (file: Deno.FileInfo): Promise<Post> => {
        
        const filename = file.name as string;
        
        const title = get_title(filename);
        const html = await get_html(`${source}/${filename}`);
        const location = `${destination}/${filename.replace(".md", ".html")}`
        const created = to_date(file.created as number); 
        const modification = to_date(file.modified as number);
        
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

export interface Collection {
    name: string,
    level: number, 
    path: string,
    subcollections: Collection[]
    posts: Post[]
}

const get_collection_name = (path: string) => {

    const parts = path.split("/");
    const last = parts[parts.length - 1];
    const name = last.replace("_", " ");
    return name; 
}

export const get_collection = async (source: string, destination: string, level = 0): Promise<Collection> => {

    const files = await read_folder(source);
    
    const collection: Collection = {
        name: get_collection_name(source),
        path: destination,
        level: level, //TODO: more readable 
        subcollections: await Promise.all(files.filter(is_collection).map(file => get_collection(`${source}/${file.name}`, `${destination}/${file.name}`, level + 1))),
        posts: await Promise.all(files.filter(is_post).map(to_posts(source, destination)))
    }      

    return collection;
}



