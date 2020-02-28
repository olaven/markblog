
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


const is_page = (file: Deno.FileInfo) => {

    const is_file = file.isFile();
    const is_markdown = (file.name as string).endsWith(".md");

    return is_file && is_markdown;
};



export const get_posts = async (source: string, destination: string) => Promise.all(
    (await read_folder(source))
        .filter(is_page)
        .map(to_posts(source, destination))
);




