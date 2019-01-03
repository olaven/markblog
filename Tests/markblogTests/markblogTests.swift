import XCTest
@testable import markblog

final class markblogTests: XCTestCase {
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct
        // results.
        XCTAssertEqual(markblog().text, "Hello, World!")
    }

    static var allTests = [
        ("testExample", testExample),
    ]
}
