import { parse_xml } from "../deps.ts";
import { read_file } from "../common.ts"
/**
 * Testing RSS/XML-code 
 * for RSS functionality down 
 * the line
 */

export interface Tag {
    name: string, 
    children: Tag[] | string
}

export const stringify_tag = (tag: Tag): string => {
    
    const content = (typeof(tag.children) === "string")? 
        tag.children: 
        tag.children.map(child => stringify_tag(child))

    return `<${tag.name}>${content}</${tag.name}>`
}

interface Channel extends Tag {
    name: "channel", 
    children: Tag[]
}

interface RSS {
    channel: Channel
}


//const xml = await read_file("./feed.rss");
//const parsed = parse_xml(xml);
//console.log("parsed", JSON.stringify(parsed, null, 4));