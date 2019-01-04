//
//  main.swift
//  MarkdownToHtml
//
//  Created by Olav on 02/01/2019.
//

import Foundation

let url = URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/Sources/MarkdownToHtml/test.txt")

var linedData : LinedData?
do {
    linedData = try read(from: url)
} catch let error {
    print(error)
}

let header = convert(line: "#header");
print(header) 

print(convert(line: "## Header"))

print(convert(line: "#### Header"))

print(convert(line: "- list item"))
print(convert(line: "*not a list item"))
print(convert(line: "* another list item"))

