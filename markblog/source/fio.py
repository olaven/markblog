from os import scandir


def read_directory(path, include_directories=False):
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
