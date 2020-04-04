---
title: vim写markdown在浏览器实时预览
date: 2016-03-17 00:24:38
tags:
    - Hexo
    - markdown
    - Vim
categories:
    - Linux
---
用了Hexo后，自然就不得不用markdown，而Ubuntu下不用Vim我不开心，于是就发现了*vim-instant-markdown*。

> vim-instant-markdown（https://github.com/suan/vim-instant-markdown ） 的安装相比其他插件较为特殊，它由 ruby 开发，所以你的 vim 必须集成 ruby 解释器（见“1 源码安装编辑器 vim ”），并且安装 pygments.rb、redcarpet、instant-markdown-d 三个依赖库：
gem install pygments.rb
gem install redcarpet
# 若系统提示无 npm 命令，你需要先执行 zypper --no-refresh install nodejs
npm -g install instant-markdown-d

此文不全。。。
