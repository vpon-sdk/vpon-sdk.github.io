---
layout:         "default"
title:          "How we made this website?"
lead:           "Jekyll introduction"
description:    ""
keywords:       ""
permalink:      why-jekyll/
lang:           "zh-tw"
---

# Origin
---
SDK Document 負責提供 Vpon 開發者文字上之技術支援。
舊版 SDK Document (Vpon Wiki) 的 Wiki 網站結構允許 Vpon MI 團隊快速建立、編輯、上傳技術文件，
但由於近來愈來愈多開發者建議 SDK Document 使用上可以有更好的 UX，
再加上 MI 希望可以更有效地管理該網站的前後台，
因此勢必須要有一個可以滿足以上幾點的解決方法。


# What is Jekyll?
---
Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free.

# How it works?
---
After you key the 'serve' command of jekyll, the process will go check the `_config.yml` and `Gemfile` first, for global settings and dependency settings. Then it runs liquid renderer to change all the liquid tags into corresponding results.

Then it looks for all the mrakdown documnets and transforms them into html pages. For more details in transforming markdowns to htmls, please go to


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

* 重複的設定
* 全域變數
* 套件設定
* 其他設定

For example:

```yaml
# Dependencies
markdown:           redcarpet
redcarpet:
  extensions:       ["no_intra_emphasis", "fenced_code_blocks", "autolink", "tables", "with_toc_data"]
highlighter:        pygments

# Permalinks
permalink:          pretty
```


## Front Matter
Any file that contains a YAML front matter block will be processed by Jekyll as a special file. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

```
---
layout: post
title: Blogging Like a Hacker
---
```

Between these triple-dashed lines, you can set predefined variables (see below for a reference) or even create custom ones of your own. These variables will then be available to you to access using Liquid tags both further down in the file and also in any layouts or includes that the page or post in question relies on.
