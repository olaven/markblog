//
//  converter.swift
//  MarkdownToHtml
//
//  Created by Olav on 03/01/2019.
//

import Foundation

func convert(_ data: LinedData) -> LinedData {
    for lineNumber in 0...data.content().count {
        
        if let line = data.content(at: lineNumber) {
            let converted = convert(line: line)
            data.replaceContent(at: lineNumber, with: converted)
        }
    }
    
    return data
}

func convert(line input: String) -> String {
    var line = input

    if let tag = getCorrectTag(for: input) {
        
        // remove the markdown tag
        // enclose remaining in html tags
        let index = line.index(line.startIndex, offsetBy: tag.md.count)

        line = wrap(String(line[index...]), in: tag.html)
    }
    
    return line
}

/// Goes through the tags in mapping and
/// returns the corresponding tag if there is any 
private func getCorrectTag(for line: String) -> Tag? {
    
    for (pattern, tag) in mapping {
        
        do {
            if try Regex(pattern).test(input: line) {
               return tag
            }
        } catch {
            continue
        }
    }
    
    return nil
}

/// Wraps the string in a tag with given name
/// ex. wrap("hello", in: "p") -> <p>hello</p>
private func wrap(_ string: String, in tag: String) -> String {
    return "<" + tag + ">" + string + "</" + tag + ">"
}


