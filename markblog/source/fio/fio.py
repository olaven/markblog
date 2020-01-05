from os import scandir


def get_entries(path, include_directories=False):
    """
    :param include_directories: 
    :param path: path to directory
    :return: files in given directory
    """

    if include_directories:
        files = [file for file in scandir(path)]
    else:
        files = [file for file in scandir(path) if file.is_file()]

    return files


def read_file(entry):
    """
    Returns the text in given file.
    :param entry: file to read (posix.DirEntry)
    :return:
    """
    if not entry.is_file():
        raise ValueError("argument must be a file (not directory or something else)")
    file = open(entry.path, 'r')
    content = file.read()
    file.close()
    return content

