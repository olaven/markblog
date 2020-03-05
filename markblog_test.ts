import { suite, assertEquals, assert, assertThrows } from "./deps.ts";
import { assemble_html_page } from "./common.ts"

suite(/*"html page assembly"*/)
    .add("replaces stylesheet", () => {
        
        const style = "location/style.css"
        const expected = `<link rel="stylesheet" type="text/css" href="${style}">`
        const result = assemble_html_page("content", style); 

        assert(result.includes(expected))
    })
    .add("replaces main content", () => {
        
        const content = "Custom content"
        const expected = `<body>
            ${content}
        </body>`
        const result = assemble_html_page(content, "style.css")

        assert(result.includes(expected))
    })
    .add("throws if style is not a css file", () => {

        assertThrows(() => {
            assemble_html_page("content", "not_css_file")
        });
    })
    .run();

