//
//  LinedFile.swift
//  MarkdownToHtml
//
//  Created by Olav on 03/01/2019.
//

// This is really just a wrapper for [] at the moment.
// If nothing else, it makes mye idea easier think about.

import Foundation

/// Represents data in terms of lines
class LinedData {
    
    private var lines: [String]
    
    init(from array: [String]) {
        lines = array
    }
    
    /// Returns the content of the specified line
    public func content(at line: Int) -> String? {
        
        if thereIsElement(at: line) {
            return lines[line]
        }
        
        return nil
    }
    
    /// Returns all lines as an array
    public func content() -> [String] {
        return lines
    }
    
    /// Replaces the given content with
    /// given content
    public func replaceContent(at line: Int, with content: String) {
        if thereIsElement(at: line) {
            lines[line] = content
        }
    }
    
    
    
    /// Returns true if there is something at given index
    private func thereIsElement(at index: Int) -> Bool {
        if index >= 0 && index < lines.count {
            return true
        }
        
        return false
    }
    
}
