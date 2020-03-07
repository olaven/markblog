# Markblog 📖
The way to blog with markdown. 

![](https://media0.giphy.com/media/3wDD0Khwova4o/200w_s.gif)

- [Markblog 📖](#markblog-%f0%9f%93%96)
  - [About](#about)
  - [Installation](#installation)
  - [Getting started](#getting-started)
  - [Documentation](#documentation)
    - [Commands](#commands)
    - [Options](#options)
## About 
Markblog is a small `cli` that converts markdown files into a lightweight blog. 
It is not tied to any platform, and you own your files. In other words, you are the only one owning your content. 
Markblog aims to be easy to use and uncomplicated.

## Installation 
* Install [deno](deno.land)
* `deno install --allow-read --allow-write markblog https://raw.githubusercontent.com/olaven/markblog/master/markblog.ts`
* Update your path like the installation tells you to

## Getting started
* Run `markblog init` in an empty folder.
* Write posts in the generated `./posts`, in `.md`-files.
* Run `markblog build` to build pages.

## Documentation
### Commands
* `markblog init` will set up everything (AKA 1 file and 1 folder 😅)
  * (_optional_) pass [options](#options) customize. Make sure to use the same options when building!
* `markblog build` actually builds your webpage. 
  * (_optional_) pass [options](#options) customize.
* `markblog help` if you are stuck 
### Options 
Options enable you to specify where Markblog should look for files 
when generating your blog. There are default settings, and specifying 
custom options can be emitted entirely. If however, you want to use custom options, a `.json`-file must be provided,
with `--options path/to/options.json`. The file has to be formatted in 
the following way: 
```json
{
    "post_source": "./my_posts", 
    "post_destination": "./my_destination", 
    "post_style": "../post_style.css",
    "index_style": "./index_style.css", 
}
```

* Source of posts
  * `post_source`
  * the directory where Markblog will search for blog-posts
  * `./posts` by default
* Destination of posts 
  * `post_destination`
  * The Directory where posts will go after building 
  * `./out` by default 
* CSS stylesheet of posts
  * `post_style`
  * The location of stylesheet for the posts, relative to `post_destination`
  * `../style.css` by default 
* CSS stylesheet of index
  * `index_style`
  * The location of stylesheet for the front page, relative to root folder
  * `./style.css` by default 

