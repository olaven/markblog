import { Tag } from "./serialize/mod.ts"
import { Post, Collection } from "../collection.ts"
import { get_rss } from "./rss.ts"
import { Channel, Item } from "./types.ts" //TODO: Decouple! Too many imports

//TODO: integrate RssOptions (or similar) into options? 
interface Blog {
    channel: Channel
    collections: Collection[]
}

const items_from_post = (posts: Post[]): Item[] => 
    posts.map(post => ({
        name: post.title, 
        link: post.location
    })); 

const get_posts_in_collection = (collection: Collection): Post[] => {

    const posts_in_subcollections = collection.subcollections
        .flatMap(collection => collection.posts)

    const posts = collection.posts.concat(posts_in_subcollections)
    return posts; 
}

const get_posts_in_blog = (blog: Blog) => blog.collections
        .map(collection => get_posts_in_collection(collection))
        .flat();    

export const rss_from_blog = (blog: Blog): Tag => {

    const { channel } = blog;

    const posts = get_posts_in_blog(blog)
    const items = items_from_post(posts); 
    const rss = get_rss(channel, items); 

    return rss; 
}



//TODO: write RSS to file 
//TODO: combine serializing with get_rss in exposed API