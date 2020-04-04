---
title: Eclipse打开genymotion模拟器的sd卡
date: 2016-03-24 19:32:11
tags:
    - Android
    - Eclipse
    - genymotion
categories:
    - 移动
---
开发Android的时候，除了真机调试外，一个流畅的Android虚拟机可以提高开发体验，避免很多时候因为等待虚拟机而造成的烦躁。
genymotion模拟器是传说中最流畅的Android模拟器，想要开发Android必不可少的利器。
安装完genymotion后，在开发过程中，势必与模拟器中的文件要进行交互，怎么打开并使用模拟器中的SD卡，且见下文分晓。
<!-- more -->
1. window->>show view->>Other，然后弹出ShowView对话框，选择Android->>FileExplore，这样就可以看到文件浏览器了。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_Eclipse-1.png)
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-2.png)

2. 根据文件浏览器的提示确定SD的位置。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-3.png)
3. 使用位置
在指明路径的时候应该使用sdcard，而不是在浏览器中看到的真是路径。要替换为sdcard，否则找不到。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-4.png)
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-5.png)
4. 交互
点击右上角
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-6.png)

这样就OK了。

