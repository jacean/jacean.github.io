---
title: Hexo自定义页面禁用主题
date: 2016-03-12 12:36:06
tags: 
    - Hexo
categories:
    - 博客建设
---

在Hexo中添加自定义的网页，很容易就会被加载主题，使自己的网页变形，所以需要禁用主题，方法是在配置中添加跳过渲染的文件。
<!-- more -->
## 禁用主题添加自定义页面
  建立好博客雏形之后，想着快要求职投简历了，不如做一份网页简历，于是打算把aboutme作为简历展示。
  先在配置中开启about，然后Hexo g，发现在目录下自动建了about的文件夹，把代码放进去之后，提交，一打开发现自定义的页面被套了主题，完全变形了。这可不好。
  于是，关闭about，直接自己建个about文件夹，结果g了后被自动删除了，这可就不开心了。
  google之，找到 [Xuanwo的答案](https://github.com/hexojs/hexo/issues/1146#issuecomment-88380140),抄录如下：

```
skip_render使用了minimatch，开始匹配的位置是基于你的source_dir的，一般来说，是你的source文件夹下。下面我分别列举几种常见的情况进行说明：

请注意yml中的文件格式，输入单个数据请注意空格，输入数组请进行缩进

单个文件夹下全部文件：skip_render: test/*
单个文件夹下指定类型文件：skip_render: test/*.html
单个文件夹下全部文件以及子目录:skip_render: test/**
多个文件夹以及各种复杂情况：
skip_render:
    - `test1/*.html`
    - `test2/**`
```

  所以，我在config中的skip_render后加了about/**,在source下建立about文件夹，把代码放进去，*g -d*之后，about进入了代码库。刷新网页，然后点击about，正常了。

