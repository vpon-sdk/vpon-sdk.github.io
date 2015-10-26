---
layout:         "default"
title:          "How we made this website?"
lead:           "Jekyll introduction"
description:    ""
keywords:       ""
permalink:      why-jekyll/
lang:           "zh-tw"
---

# 緣起
---
SDK Document 負責提供 Vpon 開發者文字上之技術支援。
舊版 SDK Document (Vpon Wiki) 的 Wiki 網站結構允許 Vpon MI 團隊快速建立、編輯、上傳技術文件，
但由於近來愈來愈多開發者建議 SDK Document 使用上可以有更好的 UX，
再加上 MI 希望可以更有效地管理該網站的前後台，
因此勢必須要有一個可以滿足以上幾點的解決方法。


# Requirement
---



# What is Jekyll?
---
Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free.


# Generate a website

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


# Configuration
Jekyll allows you to concoct your sites in any way you can dream up. These options can either be specified in a `_config.yml` file placed in your site’s root directory, or can be specified as flags for the `jekyll` executable in the terminal.

# Front Matter defaults
當你遇到以下狀況的時候，最好在 `_confing.yml` 增加內容以增進撰寫效能：
- 重複的設定
- 全域變數
- 套件設定
- 其他設定

# Jekyll process
在 build 靜態網頁時 ($ jekyll build)，Jekyll 會先去看 `_confing.yml`，
查閱裡面的設定，接著 run liquid renderer 把 project 裡所有的 liquid tags 改成設定的文字，
再去跑 markdown converter 轉成靜態網頁


# Front Matter
The front matter is where Jekyll starts to get really cool. Any file that contains a YAML front matter block will be processed by Jekyll as a special file. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

```
---
layout: post
title: Blogging Like a Hacker
---
```

Between these triple-dashed lines, you can set predefined variables (see below for a reference) or even create custom ones of your own. These variables will then be available to you to access using Liquid tags both further down in the file and also in any layouts or includes that the page or post in question relies on.
