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

/**
 * Wrtes to file 
 * @param path 
 * @param content 
 */
export const write_file = async (path: string, content: string) => {
    
    const data = encode(content);
    await create(path); 
    await writeFile(path, data); 
}

/**
 * Returns content of file
 * @param path 
 */
export const read_file = async (path: string): Promise<string> => {

    const data = await readFile(path);
    return decode(data);
};

/**
 * Returns true or false depending on wether file 
 * exists or not. 
 * @param path path to file
 */
export const file_exists = async (path: string): Promise<boolean> => {

    try {

        await readFile(path)
        return true; 
    } catch(error) {

        const does_not_exist = error instanceof Deno.errors.NotFound
        if (does_not_exist) 
            return false;
        
        throw error;
    }
}

/**
 * Returns content of `.md`-file as HTML. 
 * @param path 
 */
export const get_html = async (path: string): Promise<string> => {

    const content_as_markdown = (await read_file(path)) as string;
    const content_as_html = markdown_to_html(content_as_markdown);
    
    return content_as_html;
};
