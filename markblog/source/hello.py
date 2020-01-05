import click


@click.command()
@click.option("--shout", default=False, help="Should I shout?")
def hello(shout):
    message = "Hello, world!"
    output = message.upper() if shout else message
    click.echo(output)


if __name__ == '__main__':
    hello()
