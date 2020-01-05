from unittest import TestCase
from click.testing import CliRunner
from markblog.source.hello import hello


class HelloTest(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.runner = CliRunner()

    def test_hello_world(self):
        result = self.runner.invoke(hello)
        self.assertEqual("Hello, world!", result.output.strip())

    def test_upper_case(self):
        result = self.runner.invoke(hello, ["--shout", "True"])
        self.assertEqual("Hello, World!".upper(), result.output.strip())
