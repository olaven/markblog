/**
 * To run this test code,
 * pass your dev.to API key 
 * as first argument, i.e.
 * deno test.ts <KEY>
 */

const { args } = Deno; 

const key = args[0];
console.log("key: ", key);


const article = {
        "title": "Hello, World!",
        "published": true,
        "body_markdown": "Hello DEV, this is my first post through API",
        "tags": [
            "discuss",
            "help"
        ],
        "series": "Hello series",
        //"canonical_url": "https://example.com/blog/hello"
    }

const response = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "api-key": key
    }, 
    body: JSON.stringify(article)
});

const body = await response.text(); 
console.log(response.status)
console.log(body);