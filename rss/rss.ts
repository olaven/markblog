import { parse_xml } from "../deps.ts";
import { read_file } from "../common.ts"
/**
 * Testing RSS/XML-code 
 * for RSS functionality down 
 * the line
 */

interface Attribute {
    key: string, 
    value: string, 
}

export interface Tag {
    name: string, 
    children: Tag[] | string, 
    attributes: Attribute[]
}

export const stringify_tag = (tag: Tag): string => {
    
    const content = (typeof(tag.children) === "string")? 
        tag.children: 
        tag.children.map(child => stringify_tag(child))

    const attributes = tag.attributes
        .map(attribute => `${attribute.key}="${attribute.value}"`)
        .join(" ");

    //TODO: make more readable 
    return `<${tag.name}${attributes.length > 0? ` ${attributes}`: ``}>${content}</${tag.name}>`
}

interface Channel extends Tag {
    name: "channel", 
    children: Tag[]
}

interface RSS extends Tag {
    channel: Channel
}

const get_rss = () => {

    
}


//const xml = await read_file("./feed.rss");
//const parsed = parse_xml(xml);
//console.log("parsed", JSON.stringify(parsed, null, 4));
