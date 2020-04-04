---
title: onenote笔记导出成markdown发布到Hexo
date: 2016-03-15 16:32:17
tags:
    - Ubuntu
    - OneNote
    - Hexo
categories:
    - 博客建设
---
首先说明一点，就是我并没有找到可以直接由onenote笔记转换成markdown的方式。许多方法都是通过迂回策略，也就是先将onenote导出word，再把word转换成HTML，然后再转成markdown。
虽然有些麻烦，但还是挺好用的。需要用到unoconv和pandoc。原文[ubuntu 下将 word 文件转换为 markdown](http://wenzhixin.net.cn/2014/01/03/convert_word_to_markdown)
<!-- more -->
>主要介绍如何将 word 文件转换为 markdown 文件。
第一步：安装 unoconv 和 pandoc
*sudo apt-get install unoconv pandoc*
第二步：将 word 文件转换 html
*unoconv -f html -o file.html file.docx*
-f html：指定我们要转为 html 格式（format）
-o file.html：表示输出（output）的文件名为 file.html
file.docx：表示要转换的文件为 file.docx
第三步：将 html 转换为 markdown
*pandoc -f html -t markdown -o file.md file.html*
-f html：指定我们要从什么文件（from）转换
-t markdown：指定我们要转为 markdown 格式（to）
-o file.md：表示输出（output）的文件名为 file.md
file.docx：表示要转换的文件为 file.html
第四步：将图片拷贝到 images 中
转换出来后会有很多图片，需要将图片拷贝到 images 文件夹中， 然后在替换 md 中的 ![]( 为 ![(images/ 即可。

但是我转换后并没有出现image，具体看代码，发现转换后的html里引用的文件都成了直接的编码表示。所以可以在网页中另存为图片了。

