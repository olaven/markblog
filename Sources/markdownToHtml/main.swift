//
//  main.swift
//  MarkdownToHtml
//
//  Created by Olav on 02/01/2019.
//

import Foundation

let url = URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/test.md")

let data = try read(from: url) 
let converted = convert(data)

for line in converted.content() {
    print(line)
}
