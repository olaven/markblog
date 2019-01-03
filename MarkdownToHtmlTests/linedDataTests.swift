//
//  linedFileTests.swift
//  MarkdownToHtml
//
//  Created by Olav on 03/01/2019.
//

import XCTest
@testable import markblog

final class linedDataTests: XCTestCase {
    
    public func testReplacingContent() {
        let data = ["0", "1", "changeme", "3"]
        let linedData = LinedData(from: data)
        
        linedData.replaceContent(at: 2, with: "2")
        
        XCTAssertEqual(linedData.content(at: 2), "2")
    }
    
    static var allTests = [
        ("testReplacingContent", testReplacingContent),
    ]
    
}
