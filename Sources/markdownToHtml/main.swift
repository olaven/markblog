//
//  main.swift
//  MarkdownToHtml
//
//  Created by Olav on 02/01/2019.
//

import Foundation

let url = URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/Sources/MarkdownToHtml/test.txt")

let data = LinedData(from: [
    "# Welcome to my blog post!",
    "## About me",
    "I like doing some things.",
    "For example, I enjoy: ",
    "* Programming",
    "- Reading",
    "- Spending time with my girfriend",
    "* Spending time wiht my dog",
    "*I also mistake lists for bold stuff.."
])

let converted = convert(data)

let dataWithUl = wrap(data, from: 2, to: 5, with: "ul")

for line in dataWithUl.content() {
    print(line)
}
print(dataWithUl)
