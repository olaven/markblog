from markblog.test.test_base import TestBase
from markblog.source.commands.init import init


class InitTest(TestBase):

    def test_can_run(self):
        self.runner.invoke(init)
        self.assertTrue(True)

    def test_fails_on_invalid_path(self):
        print(self.runner)
        self.runner.invoke(init)
        self.assertFalse(False)
