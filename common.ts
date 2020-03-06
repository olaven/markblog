import { markdown_to_html, decode, encode } from "./deps.ts";

const { create, readFile, writeFile } = Deno; 


export const write_file = async (path: string, content: string) => {
    
    const data = encode(content);
    await create(path); 
    await writeFile(path, data); 
}

export const read_file = async (path: string): Promise<string> => {

    const data = await readFile(path);
    return decode(data);
};

export const get_html = async (path: string): Promise<string> => {

    const content_as_markdown = (await read_file(path)) as string;
    const content_as_html = markdown_to_html(content_as_markdown);
    
    return content_as_html;
};
