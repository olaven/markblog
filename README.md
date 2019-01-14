# Markblog 📖
The way to blog with markdown. 

## Vision 👁‍🗨
I want to write a blog. I also want to write using [markdown](https://en.wikipedia.org/wiki/Markdown), in my own environment. 
There are ways to do this. However, I did not find anything 
that was as simple and "plug-and-play"-like as I wanted. 

This need is what I want _Markblog_ to fix for me.

## Development 💻
The project is written in typescript and run with [ts-node](https://yarnpkg.com/en/package/ts-node). 

## Building 🔨
Running `yarn build` produces an `index.js`-file in `./build`. 
This file is also marked as "main" in `package.json`. 

## HTML structure 
Right now, the structure of the html-template looks like this: 
```html 
<h1 id="blog-header">Header</h1>
<div id="content-root">
    <div id="navigation-root"></div>
    <div id="posts-root"></div>
</div>
```