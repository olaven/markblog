import { markdown_to_html, decode, encode } from "./deps.ts";

const { create, readFile, writeFile } = Deno; 

/**
 * Creates a directory. 
 * Fails silently if directory already 
 * exists. 
 */
export const create_dir = async (path: string) => {

    try {
    
        await Deno.mkdir(path);
    } catch(error) {
        
        const does_already_exist_error = error instanceof Deno.errors.AlreadyExists;
        if (!does_already_exist_error) 
            throw error 
    }
}

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
