import { Tag } from "./serialize/mod.ts";
import { assertEquals, assertStrContains } from "../deps.ts";
import { rss_from_blog, get_posts_in_blog } from "./converter.ts";
const { test } = Deno;

const get_dummy_post = (title: string, creationDate: Date = new Date()) => ({
    title: title, 
    html: `<h1>some content in ${title}</h1>`,
    location: `/some/location/{${title}`,
    created: creationDate, 
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


test("items are sorted with newest posts first", () => {

    const items = get_posts_in_blog({
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
                    get_dummy_post("expected third", new Date("October 13, 2018 11:13:00")),
                    get_dummy_post("expected first", new Date("October 13, 2020 11:13:00")),
                    get_dummy_post("exptected second", new Date("October 13, 2019 11:13:00")),
                ]
            }
        ]
    });
        
    assertEquals(items.length, 3)

    const [ first, second, third ] = items; 
    
    assertStrContains(first.title!, "first");
    assertStrContains(second.title!, "second");
    assertStrContains(third.title!, "third");
});