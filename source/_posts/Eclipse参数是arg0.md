---
title: Eclipse参数是arg0
date: 2016-03-24 22:27:07
tags:
    - Eclipse
categories:
    - 移动
---
Eclipse是一个很好的IDE，IDE能够帮助开发者快速编辑代码调试代码，这里就有代码补全的作用。代码补全，不仅仅是补全，还要能够根据函数本来的面目提供一定的指引，比如函数参数。
如果函数参数是arg0，arg1，那谁看都得懵逼不是，但是如果是postion，count，name之类的有语义的就大不一样了，很容易帮助开发者理解参数含义和使用对象。Eclipse就是可以这样的。
但是，有的人由于一些不恰当操作，会发现自己的Eclipse函数自动补全后，参数还真是arg0，arg1，这可就愁死人了。
我也遇到了，所以解决了。
<!-- more-->
这是因为缺少源码文件，导致eclipse无法分析。需要下载source for android sdk。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-7.png)
打开eclipse，定位到一个函数上，ctrl点击，出现绑定源代码文件的窗口，选择sources文件夹就好。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-8.png)
应用后
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_eclipse-10.png)
get!
