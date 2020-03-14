import { Tag } from "./serialize/mod.ts"
import { Post, Collection } from "../collection.ts"
import { get_rss } from "./rss.ts"
import { Blog, Item } from "./types.ts" //TODO: Decouple! Too many imports

//NOTE: exported for testing 
export const items_from_posts = (posts: Post[], blog_url: string): Item[] => posts
    .sort((a, b) => a.created < b.created? 1: -1)
    .map(post => {
        
        //NOTE: remove "." in potential "./"
        const location = post.location.startsWith(".")? 
            post.location.substr(1): 
            post.location

        const { title } = post; 
        const link = `${blog_url}${location}`

        return { title, link }
    }); 

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
    const items = items_from_posts(posts, blog.channel.link); 
    const rss = get_rss(channel, items); 

    return rss; 
}



//TODO: write RSS to file 
//TODO: combine serializing with get_rss in exposed API