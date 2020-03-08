import { Tag } from "./serialize/serialize.ts"
import { test_functions, ChannelOptions } from "./rss.ts"
import { assertEquals, assert } from "../deps.ts";

const { test } = Deno;
const { get_rss, get_channel } = test_functions

const get_dummy_options = (
    title = "blog title", 
    link = "https://www.example.com", 
    description = "Description of test blog") => ({

        title, link, description
})

test("can get RSS", () => {

    const rss = get_rss(get_dummy_options())
    assert(rss);
});

test("RSS has _one_ child", () => {

    const rss = get_rss(get_dummy_options()); 
    assertEquals(rss.children.length, 1); 
});

test("RSS's child is a 'channel'-tag", () => {

    const channel = get_channel(get_dummy_options());

    assert(typeof(channel) !== "string"); 
    assertEquals(channel.name, "channel");
});

test("Channel has specified option-elements", () => {

    const category = "Newspapers"
    const options: ChannelOptions = {category, ...get_dummy_options()}

    const channel = get_channel(options);
    const tag = (channel.children as Tag[])
        .find(tag => tag.name === "category" && tag.children === category && tag.attributes.length === 0);

    assert(tag);
})