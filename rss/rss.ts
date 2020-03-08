import { Tag } from "./serialize/serialize.ts"

import { parse_xml } from "../deps.ts";
import { read_file } from "../common.ts"

export interface ChannelOptions {
    title: string, 
    link: string, 
    description: string, 
    language?: string, 
    copyright?: string, 
    managingEditor?: string, 
    webmaster?: string, 
    pubDate?: string, 
    lastBuildDate?: string, 
    category?: string, 
    generator?: string, 
    docs?: string, 
    cloud?: string, 
    ttl?: number, 
    image?: string, 
    rating?: string, 
    textInput?: string, 
    skipHours?: string, 
    skipDays?: string,
}

const get_channel = (options: ChannelOptions): Tag => {

    //NOTE: options for a channel as specified as child tags/elements
    const option_tags: Tag[] = Object.keys(options)
        //@ts-ignore
        .map(option => ({ name: option, children: options[option], attributes: []}))
    //const items: Tag //TODO: items element

    return {
        name: "channel", 
        children: [ ...option_tags/*, items*/ ], 
        attributes: []
    }
}

const get_rss = (options: ChannelOptions): Tag => {

    const channel = get_channel(options) 
    return {
        name: "rss", 
        children: [ channel ], 
        attributes: [
            { key: "version", value: "2.0" }
        ]
    }
}

export const test_functions = {
    get_channel, get_rss
}

//TODO: include items in RSS data structure (right now, only channel is added (line 42))
//TODO: write RSS to file 
//TODO: combine serializing with get_rss in exposed API


//const xml = await read_file("./feed.rss");
//const parsed = parse_xml(xml);
//console.log("parsed", JSON.stringify(parsed, null, 4));
