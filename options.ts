import { read_file } from "./common.ts";

export interface Options {
    post_source: string, 
    post_destination: string, 
    post_style: string,
    index_style: string, }

const default_options: Options = {
    post_source: "./posts", 
    post_destination: "./out", 
    post_style: "../style.css",
    index_style: "./style.css", 
}

export const get_options_path = (args: string[]) => {

    const flag = "--options"
    if (!args.includes(flag))
        return null; 

    const path = args[args.indexOf(flag) + 1];
    if (!path)
        throw "no path to options is specified..";

    return path;
}

export const get_options = async (args: string[]): Promise<Options> => {

    const options_path = get_options_path(args);
    if (!options_path) return default_options;

    const file_content = await read_file(options_path);
    console.log(file_content)
    const options = JSON.parse(file_content) as Options;

    return options; 
}