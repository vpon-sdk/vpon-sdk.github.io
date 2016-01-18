---
layout:         "default"
title:          "How we made this website?"
lead:           "Jekyll introduction"
description:    ""
keywords:       ""
permalink:      using-jekyll/
lang:           "zh-tw"
---

# Origin
---
Anyway, we just built a new website for Vpon SDK Document, using Jekyll!

# What is Jekyll?
---
Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free.

Take a visit to [Jekyll](www.jekyllrb.com).

# How it works?
---
After you key the 'serve' command of jekyll, the process will go check the `_config.yml` and `Gemfile` first, for global settings and dependency settings. Then it runs liquid renderer to change all the liquid tags into corresponding results.

Then it looks for all the mrakdown documnets and transforms them into HTML pages. For more details in transforming markdowns to HTMLs, please directly slide to [Basic Usage](#basic-usage).


# Installation
---
## Requirements
Installing Jekyll is easy and straight-forward, but there are a few requirements you’ll need to make sure your system has before you start.

* [Ruby](http://www.ruby-lang.org/en/downloads/) (including development headers, v1.9.3 or above for Jekyll 2 and v2 or above for Jekyll 3)
* [RubyGems](http://rubygems.org/pages/download)
* Linux, Unix, or Mac OS X
* [NodeJS](http://nodejs.org/), or another JavaScript runtime (Jekyll 2 and earlier, for CoffeeScript support).
* [Python 2.7](https://www.python.org/downloads/) (for Jekyll 2 and earlier)

## Install Gem

```
$ gem install jekyll
```
All of Jekyll’s gem dependencies are automatically installed by the above command, so you won’t have to worry about them at all.

## Install Bundler
[Bundler] provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.
Bundler is an exit from dependency hell, and ensures that the gems you need are present in development, staging, and production. Starting work on a project is as simple as:

```
$ bundle install
```
For more information, visit [Bundler].


# Generate a website
---

```
$ jekyll build
# => The current folder will be generated into ./_site
```

Jekyll also comes with a built-in development server that will allow you to preview what the generated site will look like in your browser locally.

```
$ jekyll serve
# => A development server will run at http://localhost:4000/
# Auto-regeneration: enabled. Use `--no-watch` to disable.
```
As of version 2.4, the serve command will watch for changes automatically.


# Basic Usage
---
## Configuration
You had better include some settings under such situations, into the `_confing.yml` for website performance.

* Repetitive settings
* 'Global' variables
* Plugin settings
* Other settings

> **Note:**
> What I mean 'Global' variable, is, for example, the img access path.

For example:

```yaml
# Dependencies
markdown:           redcarpet
redcarpet:
  extensions:       ["no_intra_emphasis", "fenced_code_blocks", "autolink", "tables", "with_toc_data"]
highlighter:        pygments

# Permalinks
permalink:          pretty

# urls
imgurl:             /assets/img
```
Then you can use it when loading a image:
{%raw%}`<img src="{{site.imgurl}}/img_example.png" />`{%endraw%}

## Front Matter
Any file that contains a YAML front matter block will be processed by Jekyll as a special file. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

```
---
layout: post
title: Blogging Like a Hacker
---
```

Between these triple-dashed lines, you can set predefined variables (see below for a reference) or even create custom ones of your own. These variables will then be available to you to access using Liquid tags both further down in the file and also in any layouts or includes that the page or post in question relies on.

## Layouts
Layout, as it implies, is the general appearace of a web page. You can create a layout in HTML, and use it for web pages. You may see a folder named `_layouts` at root; that is where we put layouts in.

Thanks to Liquid renderer, layouts can take HTML and markdown as well! For example, the layout below takes a markdown named `something.md` and build to an HTML.
{%raw%}
```html
...
<body>
    {% include header.html %}
    {% include something.md %}
    <div> </div>
    {{ content}}
...
```
{%endraw%}

### include .html
The files included by layouts should be placed in `_includes` at root. By so doing layouts can read such includes by Liquid renderer and make HTML combimation.

### include .md
Remember that Jekyll will transform all markdown files into HTML files. When layouts are about to gather specific markdowns, markdowns are ready for includes.

### include content
Most of the time people use Jekyll to build blog-aware websites. Therefore articles are the core for it! Jekyll has set the markdowns with fron matter requireing for a layout to be included into {%raw%}`{{content}}`{%endraw%}. So just type the content, choose a layout and check whether any errors in your terminal.



[Bundler]: http://bundler.io/
