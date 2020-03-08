import { Tag, stringify_tag } from "./rss.ts"
import { assertEquals, assert } from "../deps.ts";
const { test } = Deno 

test("can stringify tag", () => {

    const tag: Tag = {
        name: "my_tag_name", 
        children: [
            {
                name: "sub_tag", 
                children: "inner_content_of_tag", 
                attributes: []
            }
        ],
        attributes: []
    }; 

    const actual = stringify_tag(tag);
    const expected = `<my_tag_name><sub_tag>inner_content_of_tag</sub_tag></my_tag_name>`

    assertEquals(actual, expected)
});

test("parsing includes attributes", () => {

    const tag: Tag = {
        name: "tag", 
        children: [], 
        attributes: [
            { key: "key1", value: "value1"},
            { key: "key2", value: "value2"},
        ]
    }

    const actual = stringify_tag(tag);
    const expected = `<tag key1="value1" key2="value2"></tag>`;
    assertEquals(actual, expected);
});

test("parsing includes attributes on children", () => {

    const tag: Tag = {
        name: "parent", 
        children: [
            {
                name: "child", 
                children: [], 
                attributes: [
                    { key: "child_key", value: "child_value" }
                ]
            }
        ], 
        attributes: [
            { key: "parent_key", value: "parent_value"}
        ]
    }

    const actual = stringify_tag(tag);
    const expected = `<parent parent_key="parent_value"><child child_key="child_value"></child></parent>`;
    assertEquals(actual, expected);
});

test("parsing includes attributes on children _and_ string child", () => {

    const tag: Tag = {
        name: "parent", 
        children: [
            {
                name: "child", 
                children: "inner child value",
                attributes: [
                    { key: "child_key", value: "child_value" }
                ]
            }
        ], 
        attributes: [
            { key: "parent_key", value: "parent_value"}
        ]
    }

    const actual = stringify_tag(tag);
    const expected = `<parent parent_key="parent_value"><child child_key="child_value">inner child value</child></parent>`;
    assertEquals(actual, expected);
});