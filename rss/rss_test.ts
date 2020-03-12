import { Tag } from "./serialize/mod.ts"
import { test_functions } from "./rss.ts"
import { assertEquals, assert } from "../deps.ts";
import { Channel } from "./types.ts";

const { test } = Deno;
const { get_rss } = test_functions

const basic_channel = (
    title = "blog title", 
    link = "https://www.example.com", 
    description = "Description of test blog") => ({

        title, link, description
}); 

const basic_item = (
    title = "post title", 
    link = "https://www.example.com/post"
) => ({
    title, link
});

test("can get RSS", () => {

    const rss = get_rss(basic_channel())
    assert(rss);
});

test("RSS has _one_ child", () => {

    const rss = get_rss(basic_channel()); 
    assertEquals(rss.children.length, 1); 
});

test("RSS's child is a 'channel'-tag", () => {

    const channel = get_rss(basic_channel(), []);

    assert(typeof(channel.children[0]) !== "string"); 
    assertEquals(channel.children[0].name, "channel");
});

test("Channel has specified option-elements", () => {

    const category = "Newspapers"
    const options = {category, ...basic_channel()}

    const channel = get_rss(options, []).children[0] as Tag;
    const tag = (channel.children as Tag[])
        .find(tag => tag.name === "category" && tag.children === category && tag.attributes.length === 0);

    assert(tag);
}); 

test("RSS structure includes items", () => {

    const channel_elements = basic_channel(); 
    const item_elements = [basic_item()]; 

    const rss = get_rss(channel_elements, item_elements)
    //TODO: actually test something
});