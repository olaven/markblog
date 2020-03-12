import { Tag } from "./serialize/mod.ts"
import { Item, Channel } from "./types.ts";


const convert_channel_to_tags = (channel_element: Channel): Tag[] => 
    Object.keys(channel_element)
        //@ts-ignore
        .map(element => ({ name: element, children: channel_element[element], attributes: []}));
    
const convert_items_to_tags = (items: Item[]): Tag[] => 
    items.map(item => ({
        name: "item", 
        children: Object.keys(item).map(key => ({
            name: key, 
            attributes: [],
            //@ts-ignore
            children: item[key]
        } as Tag)), 
        attributes: []
    }));


export const get_rss = (channel: Channel, items: Item[] = []): Tag => {

    const channel_tags = convert_channel_to_tags(channel);
    const item_tags = convert_items_to_tags(items)

    return {
        name: "rss", 
        children: [ {
            name: "channel", 
            children: [ ...channel_tags , ...item_tags ], 
            attributes: []
        } ], 
        attributes: [
            { key: "version", value: "2.0" }
        ]
    }
}

export const test_functions = {
    get_rss
}

//TODO: write RSS to file 
//TODO: combine serializing with get_rss in exposed API


//const xml = await read_file("./feed.rss");
//const parsed = parse_xml(xml);
//console.log("parsed", JSON.stringify(parsed, null, 4));
