import { assert, assertThrows } from "../../deps.ts";
import { assemble_html_page } from "./assemble.ts"

const { test } = Deno;

test("replaces stylesheet", () => {
        
    const style = "location/style.css"
    const expected = `<link rel="stylesheet" type="text/css" href="${style}">`
    const result = assemble_html_page("content", style); 

    assert(result.includes(expected))
});

test("replaces main content", () => {
    
    const content = "Custom content"
    const result = assemble_html_page(content, "style.css")

    assert(result.includes(content))
});

test("throws if style is not a css file", () => {

    assertThrows(() => {
        assemble_html_page("content", "not_css_file")
    });
});

