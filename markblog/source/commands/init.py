from os import listdir, mkdir
from click import echo, confirm


def init_command(path):
    print(path)
    existing = [file for file in listdir(path) if (file == "pages" or file == "index.html")]
    if len(existing) > 0:
        echo("Could not set up blog.")
        echo(str(existing) + " was already in directory.")
        return

    echo("Let's let up your blog!")
    if confirm("Do you want to continue?"):
        populate_directory(path)


def populate_directory(path):
    mkdir(path + "/pages", 0o755)
