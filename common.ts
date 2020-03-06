import marked, { decode, encode } from "./deps.ts";

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
    const content_as_html = marked(content_as_markdown);
    
    return content_as_html;
};

export const assemble_html_page = (content: string, stylesheet: string) => {

    if (!stylesheet.endsWith(".css")) throw "stylesheet name has to end with .css"

    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Blog</title>
            <!--Default stylesheet:-->
            <link rel="stylesheet" type="text/css" href="MB_STYLESHEET">
        </head>
        <body>
            MB_CONTENT
        </body>
        </html>
    `
    return template
        .replace("MB_CONTENT", content)
        .replace("MB_STYLESHEET", stylesheet); 
}