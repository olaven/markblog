import XCTest

#if !os(macOS)
public func allTests() -> [XCTestCaseEntry] {
    return [
        testCase(markblogTests.allTests),
        testCase(linedDataTests.allTests), 
    ]
}
#endif
