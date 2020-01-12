from markblog.test.test_base import TestBase
from markblog.source.main import init


class InitTest(TestBase):

    def test_can_run(self):
        result = self.runner.invoke(init, "../files/markdown/subdir")
        self.assertNotIn("does not exist", result.output)

    def test_fails_on_invalid_path(self):
        result = self.runner.invoke(init, ["invalid/path"])
        self.assertIn("does not exist.", result.output)

    def test_stops_if_pages_present(self):
        result = self.runner.invoke(init, ["../files/existing_blog"])
        self.assertIn("was already in directory", result.output)

    def test_continues_if_pages_not_present(self):
        result = self.runner.invoke(init, ["../files/clean_blog"])
        self.assertIn("Let's let up your blog!", result.output)
        self.assertNotIn("was already in directory", result.output)

    def test_stops_if_denied(self):
        pass  # TODO: input with y/n
