import { Tag, stringify_tag } from "./rss.ts"
import { assertEquals, assert } from "../deps.ts";
const { test } = Deno 

test("can stringify", () => {

    const tag: Tag = {
        name: "my_tag_name", 
        children: [
            {
                name: "sub_tag", 
                children: "inner_content_of_tag"
            }
        ]
    }; 

    const actual = stringify_tag(tag);
    const expected = `<my_tag_name>
        <sub_tag>
            inner_content_of_tag
        </sub_tag>
    </my_tag_name>`.replace(/ /g,'').replace(/\n/g,'');

    assertEquals(actual, expected)
})