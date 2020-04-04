---
title: 'C#设置ListView行高'
date: 2016-03-15 16:28:01
tags:
    - C#
    - ListView
categories:
    - .NET
---
listView的行高没法单独设置，可以迂回策略，通过在里面放一个imageList来把行高撑大。
代码如下：
<!-- more -->

```C#
ImageList imgList = new ImageList();
imgList.ImageSize = new Size(1, LV_NOW_ROWHEIGHT);
lv.SmallImageList = imgList;
```
这样就可以了，通过调整LV_NOW_ROWHEIGHT来调整行高.
