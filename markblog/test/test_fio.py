import posix

from markblog.source.fio import read_directory
from markblog.test.test_base import TestBase


class IoTest(TestBase):

    def test_length_of_files(self):
        files = read_directory("files/markdown")
        self.assertEqual(2, len(files))

    def test_length_with__directories(self):
        files = read_directory("files/markdown", True)
        self.assertEqual(3, len(files))

    def test_returns_files(self):
        files = read_directory("files/markdown")
        for file in files:
            self.assertTrue(type(file) == posix.DirEntry)
