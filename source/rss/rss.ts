import { Tag } from "../deps.ts"
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
            ["version", "2.0"]
        ]
    }
}

export const test_functions = {
    get_rss
}


