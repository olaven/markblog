from unittest import TestCase
from click.testing import CliRunner


class TestBase(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.runner = CliRunner()