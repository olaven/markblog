//
//  converter.swift
//  MarkdownToHtml
//
//  Created by Olav on 03/01/2019.
//

import Foundation

// wraps <li>s in <ul> and similar
func applyHtmlWrappers(to data: LinedData) {
    
}

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
        if let position = line.index(ofString: tag.md) {
            
            let index = line.index(position, offsetBy: tag.md.count)
            
            line = wrap(String(line[index...]), in: tag.html)
        }
    }
    
    return line
}

/// Goes through the tags in mapping and
/// returns the corresponding tag and its position
private func getCorrectTag(for line: String) -> Tag? {
    
    for (pattern, tag) in mapping {
        
        do {
            if try Regex(pattern).test(input: line) {
            // TODO: correct index
                
                
                
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
private func wrap(_ string: String, in name: String) -> String {
    let tags = getTags(from: name)
    
    return tags.start + string + tags.end
}


/// Returns data with lines wrapped
func wrap(_ data: LinedData, from start: Int, to end: Int, with name: String) -> LinedData {
    
    let wrapped = LinedData(from: data.content()) //avoiding reference being modified
    let tags = getTags(from: name)

    wrapped.insert(tags.start, at: start)
    wrapped.insert(tags.end, at: end)
    
    return wrapped
}

/// given a tag-name, returns html-tags for it 
private func getTags(from name: String) -> (start: String, end: String) {
    let start = "<" + name + ">"
    let end = "</" + name + ">"
    
    return (start, end)
}



// https://stackoverflow.com/questions/32305891/index-of-a-substring-in-a-string-with-swift/47727870
extension StringProtocol where Index == String.Index {
    func index(ofString string: Self, options: String.CompareOptions = []) -> Index? {
        return range(of: string, options: options)?.lowerBound
    }
}
