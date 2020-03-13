import { Collection, Post } from "../collection.ts"
import { rss_from_blog } from "./converter.ts";
import { Channel } from "./types.ts";

//TODO: integrate RssOptions (or similar) into options? 

interface Blog {
    channel: Channel
    collections: Collection[]
}

const get_posts_in_collection = (collection: Collection): Post[] => {

    const posts_in_subcollections = collection.subcollections
        .flatMap(collection => collection.posts)
    
    const posts = collection.posts.concat(posts_in_subcollections)
    return posts; 
}

const get_posts_in_blog = (blog: Blog) => blog.collections
        .map(collection => get_posts_in_collection(collection))
        .flat();    

export const write_rss = (blog: Blog) => {

    const posts = get_posts_in_blog(blog);
    const rss = rss_from_blog(posts);
    
} 