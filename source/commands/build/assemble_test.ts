import { assert, assertThrows } from "../../deps.ts";
import { assemble_html_page } from "./assemble.ts"

const { test } = Deno;

test("replaces stylesheet", () => {
        
    const style = "location/style.css"
    const expected = `<link rel="stylesheet" type="text/css" href="${style}">`
    const result = assemble_html_page("content", style, "title", "favicon"); 

    assert(result.includes(expected))
});

test("replaces main content", () => {
    
    const content = "Custom content"
    const result = assemble_html_page(content, "style.css", "title", "favicon")

    assert(result.includes(content))
});

test("throws if style is not a css file", () => {

    assertThrows(() => {
        assemble_html_page("content", "not_css_file", "title", "favicon")
    });
});

test("adds title", () => {

    const title = "Hello, custom title";
    const result = assemble_html_page("content", "style.css", title, "favicon");
    assert(result.includes(title));
});

test("works with different titles", () => {

    Array(10).forEach(() => {

        const random_title = `title - ${Math.random()}`; 
        const result = assemble_html_page("content", "not_css_file", random_title, "favicon");
        assert(result.includes(random_title))
    });
});

test("adds favicon", () => {

    const favicon = "./path/to/favicon.png";
    const result = assemble_html_page("content", "style.css", "title", favicon);
    assert(result.includes(favicon));
})