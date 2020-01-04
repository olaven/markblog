from unittest import TestCase
from source.fio import read_directory


class IoTest(TestCase):
    def test_returns_correct_count(self):
        files = read_directory("files/markdown")
        self.assertEqual(2, len(files))

    def test_may_include_directories(self):
        files = read_directory("files/markdown", True)
        self.assertEqual(3, len(files))
