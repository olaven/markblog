import { Tag } from "./serialize/mod.ts"
import { Post } from "../collection.ts"
import { get_rss } from "./rss.ts"
import { Channel, Item } from "./types.ts" //TODO: Decouple! Too many imports

const items_from_post = (posts: Post[]): Item[] => 
    posts.map(post => ({
        name: post.title, 
        link: post.location
    })); 

export const rss_from_posts = (posts: Post[]): Tag => {

    const channel: Channel = {
        title: "Defaulg blog name", //TODO: options
        description: "Default blog description",
        link: "https://example.com"
    }

    const items = items_from_post(posts); 
    const rss = get_rss(channel, items); 

    return rss; 
}



//TODO: write RSS to file 
//TODO: combine serializing with get_rss in exposed API