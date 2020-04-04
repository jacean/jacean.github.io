---
title: ubuntu安装搜狗输入法不出现或是不显示输入法切换
date: 2016-03-16 23:30:18
tags:
    - Ubuntu
categories:
    - Linux
---
不管在什么系统下，输入法始终是和系统交互最重要的东西。
转移到Ubuntu后，自然也要换个好点的输入法，一般就选搜狗咯，毕竟bing没占这一块。。。
首先下载搜狗拼音for linux  ：http://pinyin.sogou.com/linux/?r=pinyin
双击deb文件安装，安全性问题同意，然后再有啥的话安装、修复之类，总之显示安装完毕就成。
但是安装之后你会发现，切换输入法中还是没有搜狗 输入法，甚至连在菜单栏上显示的输入法图标都没有了。
<!-- more -->

在安装完毕搜狗输入法后你会发现同时安装了fctix的软件，这是因为Linux输入法暂时有两种框架，一种是ibus，一种是fctix，搜狗输入法属于fcitx，所以需要同时安装这个框架才行。我装的ubuntu默认的输入框架是ibus，所以首先你的切换到fcitx。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sougou-1.png)

![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sougou-2.png)

这样的话框架就调过来了。但是这样你会发现并没有什么卵用，所以还需要接着来。
在终端：
> jacean@jacean-Ubuntu:~$ fcitx autostart

![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sougou-4.png)
> jacean@jacean-Ubuntu:~$ fcitx-diagnose

#[](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sougou-5.png)

看到提示了吧，现在就可以开始用了，搜狗给你不一般的体验。。。。。。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sougou-6.png)



