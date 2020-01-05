import posix

from markblog.source.fio.fio import get_entries, read_file
from markblog.test.test_base import TestBase


def get_markdown_folder(include_directories=False):
    return get_entries("../files/markdown", include_directories)


class IoTest(TestBase):

    def test_length_of_files(self):
        entries = get_markdown_folder()
        self.assertEqual(2, len(entries))

    def test_length_with__directories(self):
        entries = get_markdown_folder(True)
        self.assertEqual(3, len(entries))

    def test_returns_files(self):
        entries = get_markdown_folder()
        for entry in entries:
            self.assertTrue(type(entry) == posix.DirEntry)

    def test_read_file_fails_if_directory(self):
        entries = get_markdown_folder(True)
        directory = next(entry for entry in entries if not entry.is_file())
        self.assertRaises(ValueError, read_file, directory)

    def test_does_not_raise_if_not_directory(self):
        entry = get_markdown_folder()[0]
        read_file(entry)
        self.assertTrue(True)

    def test_can_read_content(self):
        entries = get_markdown_folder()
        for entry in entries:
            content = read_file(entry)
            self.assertGreater(len(content), 1, "files must should contain something")
