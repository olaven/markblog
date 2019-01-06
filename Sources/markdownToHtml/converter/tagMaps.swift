//
//  tagMaps.swift
//  MarkdownToHtml
//
//  Created by Olav on 04/01/2019.
//

import Foundation

// Mapping from markdown to html

/// Information of a tag
struct Tag {
    
    init(md: String, html: String, tagType: TagType) {
        self.md = md
        self.html = html
        self.tagType = tagType
    }
    
    let md: String
    let html: String
    let tagType: TagType
}

/// pattern -> tag
let mapping: [String: Tag] = [
    "^#{1}[^#]": Tag(md: "#", html: "h1", tagType: .line),
    "^#{2}[^#]": Tag(md: "##", html: "h2", tagType: .line),
    "^#{3}[^#]": Tag(md: "###", html: "h3", tagType: .line),
    "^#{4}[^#]": Tag(md: "####", html: "h4", tagType: .line),
    "^#{5}[^#]": Tag(md: "#####", html: "h5", tagType: .line),
    "^#{6}[^#]": Tag(md: "######", html: "h6", tagType: .line),
    "^(^|(  )(  )*)-{1} ": Tag(md: "-", html: "li", tagType: .line),
    "^(^|(  )(  )*)\\*{1} ": Tag(md: "*", html: "li", tagType: .line)
]


/// Describes two types of tags with different logic
/// line: "#" -> "<h1></h1>
/// group: "*" -> "<ul></ul>" surrounding li-s
enum TagType {
    case line
    case group
}




