import { read_file } from "./common.ts";

export interface Options {
    post_source: string, 
    post_destination: string, 
    post_style: string,
    index_style: string, 
    rss_options?: {
        title: string, 
        description: string, 
        link: string, 
    }
}

export const get_options_path = (args: string[]) => {

    const flag = "--options"
    if (!args.includes(flag))
        return null; 

    const path = args[args.indexOf(flag) + 1];
    if (!path)
        throw "no path to options is specified..";

    if (!path.endsWith(".json"))
        throw `${path} does not look like a .json-file..`;

    return path;
}

export const read_user_options = async (path: string) => {
    
    const content = await read_file(path);
    const options = JSON.parse(content);
    return options; 
} 

//NOTE: has to be exported, as it is used in tests
export const default_options: Options = {
    post_source: "./posts", 
    post_destination: "./out", 
    post_style: "../style.css",
    index_style: "./style.css", 
}

export const get_options = async (args: string[]): Promise<Options> => {

    const options_path = get_options_path(args);
    const user_options = options_path?
        await read_user_options(options_path): 
        {}

    const options = { ...default_options, ...user_options }
    return options;
}