import { Tag } from "./serialize/serialize.ts"

import { parse_xml } from "../deps.ts";
import { read_file } from "../common.ts"

export interface ChannelElements {
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


/**
 * "All elements of an item are optional, however at least one of title or description must be present."
 * - https://cyber.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
 */
interface ItemElements {
    title?: string, 
    link?: string, 
    description?: string,
    author?: string, //TODO: email formatted
    category?: string, //TODO: should have attributes
    comments?: string, //URL for page for comments
    enclosure?: string, //TODO: may have attributes
    guid?: string, // //TODO: may have attributes
    pubDate?: string, //TODO: proper formatting https://www.ietf.org/rfc/rfc822.txt Sun, 19 May 2002 15:21:36 GMT
    source?: Tag, //TODO: should have attributes, not string //source of rss feed <source url="http://www.tomalak.org/links2.xml">Tomalak's Realm</source>
}

const get_channel = (channelElements: ChannelElements, items: ItemElements[]): Tag => {

    const option_tags: Tag[] = Object.keys(channelElements)
        //@ts-ignore
        .map(element => ({ name: element, children: channelElements[element], attributes: []}))
    
    const item_tags: Tag[] = items
        .map(item => ({
            name: "item", 
            children: Object.keys(item).map(key => ({
                name: key, 
                attributes: [],
                //@ts-ignore
                children: item[key]
            } as Tag)), 
            attributes: []
        }));

    return {
        name: "channel", 
        children: [ ...option_tags , ...item_tags ], 
        attributes: []
    }
}

export const get_rss = (channel_elements: ChannelElements, item_elements: ItemElements[] = []): Tag => {

    const channel = get_channel(channel_elements, item_elements);

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

//TODO: write RSS to file 
//TODO: combine serializing with get_rss in exposed API


//const xml = await read_file("./feed.rss");
//const parsed = parse_xml(xml);
//console.log("parsed", JSON.stringify(parsed, null, 4));
