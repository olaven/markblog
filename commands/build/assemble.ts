import { Collection } from "../../collection.ts"

export const assemble_html_page = (content: string, stylesheet: string) => {
    if (!stylesheet.endsWith(".css")) throw "stylesheet name has to end with .css"

    const template = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Blog</title>
                
                <!--Code highlighting-->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
                <script>hljs.initHighlightingOnLoad();</script>
                
                <!--Default stylesheet:-->
                <link rel="stylesheet" type="text/css" href="MB_STYLESHEET">
            </head>
            <body>
                MB_CONTENT
            </body>
        </html>
    `
    return template
        .replace("MB_CONTENT", content)
        .replace("MB_STYLESHEET", stylesheet); 
}

const get_header_level = (level: number) => {

    if (level >= 5) return 6;
    else return level + 1;
}

export const assemble_links = (collection: Collection, level = 0): string => {

    const posts = collection.posts
        .sort((a, b) => a.created  < b.created? 1: -1)
        .map(post => `<li><a href="${post.location}">${post.title}<a/></li>`)
        .join("")

    const collections = collection.subcollections
        .map(subcollection => assemble_links(subcollection, level + 1))
        .join("")

    return `
        <h${get_header_level(level)}>${collection.name}</h${get_header_level(level)}>
        <ul>
            ${posts}
            ${collections}
        </ul>
    `
}