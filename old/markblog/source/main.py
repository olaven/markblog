import click

from markblog.source.commands.init import init_command


@click.group()
def cli():
    pass


@cli.command()
@click.argument("path", type=click.Path(exists=True))
def init(path):
    init_command(path)


if __name__ == '__main__':
    cli()
