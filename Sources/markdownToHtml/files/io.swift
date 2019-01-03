//
//  io.swift
//  MarkdownToHtml
//
//  Created by Olav on 03/01/2019.
//

import Foundation

/// Reading and writing some text to a file
/// Returns a LinedFile
/// Ex.: read(from: URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/test.txt"))
func read(from url: URL) throws -> LinedData {
    let text = try String.init(contentsOf: url)
    let substrings = (text.split(separator: "\n"))
    
    let lines = substrings.map({(substring) in
        String(substring)
    })
    
    return LinedData(from: lines)
}

/// Writes the contents of a LinedFile
/// to the specified location
/// URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/test.txt")
func write(_: LinedData, to url: URL) throws {
    // TODO: Go through all lines in lineddata and write to file
    try "some content wow\n\n".write(to: url, atomically: true, encoding: .utf8)

}
