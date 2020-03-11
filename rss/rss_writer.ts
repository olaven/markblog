import { get_rss } from "./rss.ts"
import { serialize } from "./serialize/serialize.ts"

const channel = {
    title: "my blog", 
    link: "https://example.com", 
    description: "some example rss feed for blog"
}

const items = [
    { title: "first post", link: "https://example.com/first" },
    { title: "second post", link: "https://example.com/second" },
    { title: "third post", link: "https://example.com/third" }
]

const rss = await get_rss(channel, items); 
const serialized = serialize(rss)

console.log(serialized)
