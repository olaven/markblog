import { Tag } from "./serialize/mod.ts";
import { assertEquals } from "../deps.ts";
import { rss_from_blog } from "./converter.ts";
const { test } = Deno;

const get_dummy_post = (title: string) => ({
    title: title, 
    html: `<h1>some content in ${title}</h1>`,
    location: `/some/location/{${title}`,
    created: new Date(), 
    modification: new Date()
});

test("can convert posts to rss-tag data structure", () => {

    const rss = rss_from_blog({
        channel: {
            title: "test blog",
            description: "test description", 
            link: "https://example.com"
        },
        collections: [
            {
                name: "some collection",
                subcollections: [], 
                level: 0, 
                path: "/some/path",
                posts: [
                    get_dummy_post("first"),
                    get_dummy_post("second"),
                    get_dummy_post("third"),
                ]
            }
        ]
    });

    const channel = rss.children[0] as Tag
    const items = channel.children as Tag[]

    const converted_posts = items
        .filter(item => item.name === "item")
        .map(item => (item as Tag).children)
        
    assertEquals(converted_posts.length, 3)
});
