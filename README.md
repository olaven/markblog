# Markblog 📖
The way to blog with markdown. 

# TODO: 
- [X] build-command
- [X] init-command 
- [X] collection of posts
- [X] Testing 
- [ ] config in separate file
- [ ] RSS Generation 

## Idea 👁‍🗨
I want to write a blog. I also want to write using [markdown](https://en.wikipedia.org/wiki/Markdown), in my own environment. 
There are ways to do this. However, I did not find anything 
that was as simple and "plug-and-play"-like as I wanted. 

This need is what I want _Markblog_ to fix for me. 

## Installation 
* Install [deno](deno.land)
* `deno install --allow-read --allow-write markblog https://raw.githubusercontent.com/olaven/markblog/master/markblog.ts`
* Update your path like the installation tells you to

## How to use
* Run `markblog init` in an empty folder.
* Write posts in the generated `./posts`, in `.md`-files.
* Run `markblog build` to build pages.