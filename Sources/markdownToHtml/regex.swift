//
//  regex.swift
//  MarkdownToHtml
//
//  Created by Olav on 04/01/2019.
//

import Foundation

class Regex {
    // heavily based on example at: https://benscheirman.com/2014/06/regex-in-swift/
    let expression: NSRegularExpression
    let pattern: String
    
    init(_ pattern: String) throws {
        self.pattern = pattern
        self.expression = try NSRegularExpression(pattern: pattern, options: .caseInsensitive)
    }
    
    func test(input: String) -> Bool {
        let matches = expression.matches(in: input, options: .anchored, range: NSMakeRange(0, input.count))
        
        return matches.count > 0
    }
}
