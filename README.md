# Markblog ![Test](https://github.com/olaven/markblog/workflows/Test/badge.svg) [![codebeat badge](https://codebeat.co/badges/b9a1453a-7b64-4392-bde6-947ce7d96c79)](https://codebeat.co/projects/github-com-olaven-markblog-master)
The way to blog with markdown. 

- [Markblog](#markblog)
  - [About](#about)
  - [Installation](#installation)
  - [Getting started](#getting-started)
  - [Contributions](#contributions)
  - [Documentation](#documentation)
    - [Commands](#commands)
    - [Options](#options)

## About 
Markblog is a small `cli` that converts markdown files into a lightweight blog. 
It is not tied to any platform, and you own your files. In other words, you are the only one owning your content. 
Markblog aims to be easy to use and uncomplicated.

![](https://media0.giphy.com/media/3wDD0Khwova4o/200w_s.gif)

## Installation 
* Install [deno](https://deno.land)
* `deno install --allow-read --allow-write markblog https://raw.githubusercontent.com/olaven/markblog/master/markblog.ts`
* Update your path like the installation tells you to

## Getting started
* Run `markblog init` in an empty folder.
* Write posts in the generated `./posts`, in `.md`-files.
* Run `markblog build` to build pages.

## Contributions
All kinds of contributions are welcome. 
Feature requests, bug reports, code, 
artwork, documentation, or just feedback in general. 

Do not hesitate to [post an issue](https://github.com/olaven/markblog/issues/new) :honey_pot:

## Documentation
### Commands
* `markblog init` will set up everything (AKA 1 file and 1 folder 😅)
  * (_optional_) pass [options](#options) customize. Make sure to use the same options when building!
* `markblog build` actually builds your webpage. 
  * (_optional_) pass [options](#options) customize.
* `markblog help` if you are stuck 
### RSS 
Markblog automatically generates an rss-feed, `feed.xml` if `rss_options` is specified 
in the options file. See the RSS-option under [options](#options) for more details.
### Options 
Options enable you to specify where Markblog should look for files 
when generating your blog. There are default settings, and specifying 
custom options can be emitted entirely. If however, you want to use custom options, provide `./options.json` at the 
root of your blog directory. If you want options in a custom location, use 
`--options`-flag, like: `--options path/to/options.json`. 

As an example, custom location of posts _and_ custom stylesheet for posts would look 
something like this: 
```json
{
    "post_source": "./path/to/posts", 
    "post_style": "./path/to/custom/style.css",
}
```

* Title of blog 
  * `blog_title`
  * Title of the page, displayed in the browser tab
  * "Blog" by default
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
* Custom favicon 
  * `favicon`
  * Custom favicon
  * `""` by default 
* RSS feed 
  * `rss_options`
  * Specified necessary information for RSS. If present, feed is automatically generated. 
  * `title`, `description` and `link` must be present, i.e.:
    ```json
    {
      "rss_options": {
        "title": "My amazing blog!", 
        "description": "This is a blog about amazing stuff", 
        "link": "https://amazing-example-blog.com"
      }
    }
    ```  

