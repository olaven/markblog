from os import scandir


def init_command(path):
    print(path)
    scanned = scandir(path)
    for s in scanned:
        print(s.name)
