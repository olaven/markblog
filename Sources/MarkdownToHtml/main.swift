//
//  main.swift
//  MarkdownToHtml
//
//  Created by Olav on 02/01/2019.
//

import Foundation

func getLinesFrom(_ path: String) throws -> Array<String>? {
    
    let text = try String.init(contentsOfFile: path)
    let substrings = (text.split(separator: "\n"))
    
    let lines = substrings.map({(substring) in
        String(substring)
    })
    
    return lines
}




let path = "/Users/olav/Documents/github/markblog/Sources/MarkdownToHtml/test.txt"
let lines = try getLinesFrom(path)

for line in lines ?? Array<String>() {
    print(line)
}

