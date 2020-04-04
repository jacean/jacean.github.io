---
title: 'C#在拖放文件的同时检测shift键的状态'
date: 2016-03-15 14:53:52
tags:
    - C#
categories:
    - .NET
---
老板要给原来文件拖放的功能加个扩展分类，于是想在文件拖放时判断shift键的状态来区分。
<!-- more -->
## 在拖放文件的同时检测shift键的状态
一般通过keydown和keyup来判断按下与否，但这都是需要控件事件触发，而在拖放的时候是没法触发key事件的，所以需要通过其他的检测。

百度后，找到了这么一句：

```C#
if (Control.ModifierKeys == Keys.Shift)
//keys Control.ModifierKeys 返回的是当前修改键的状态，ALT，SHIFT，CTRL
{
 shiftDown = true;
}
else
{
 shiftDown = false;
}
```
在文件拖放完成的事件中执行这个就可以得到shift的状态从而区分响应。
