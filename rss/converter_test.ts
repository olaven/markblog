import { Tag } from "./serialize/mod.ts";
import { assertEquals, assert } from "../deps.ts";
import { rss_from_posts } from "./converter.ts";
const { test } = Deno;

const get_dummy_post = (title: string) => ({
    title: title, 
    html: `<h1>some content in ${title}</h1>`,
    location: `/some/location/{${title}`,
    created: new Date(), 
    modification: new Date()
});

test("can convert posts to rss-tag data structure", () => {

    const rss = rss_from_posts([
        get_dummy_post("first post"),
        get_dummy_post("second post"),
        get_dummy_post("third post"),
    ]);

    const channel = rss.children[0] as Tag
    const items = channel.children as Tag[]

    const converted_posts = items
        .filter(item => item.name === "item")
        .map(item => (item as Tag).children)
        
    assertEquals(converted_posts.length, 3)
});
