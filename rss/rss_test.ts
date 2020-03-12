import { Tag } from "./serialize/serialize.ts"
import { test_functions, ChannelElements } from "./rss.ts"
import { assertEquals, assert } from "../deps.ts";

const { test } = Deno;
const { get_rss, get_channel } = test_functions

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

    const channel = get_channel(basic_channel(), []);

    assert(typeof(channel) !== "string"); 
    assertEquals(channel.name, "channel");
});

test("Channel has specified option-elements", () => {

    const category = "Newspapers"
    const options: ChannelElements = {category, ...basic_channel()}

    const channel = get_channel(options, []);
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