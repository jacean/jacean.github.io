---
title: winForm鼠标坐标
date: 2016-03-15 14:57:43
tags:
    - C#
categories:
    - .NET
---
在C#winform中，可以用Control.MousePosition获得当前鼠标的坐标，使用PointToClient计算鼠标相对于某个控件的坐标，如下
```C#
Point screenPoint = Control.MousePosition;//鼠标相对于屏幕左上角的坐标
Point formPoint = this.PointToClient(Control.MousePosition);//鼠标相对于窗体左上角的坐标
Point contextMenuPoint = contextMenuStrip1.PointToClient(Control.MousePosition); //鼠标相对于contextMenuStrip1左上角的坐标

this.capture = true;//使用窗口捕捉鼠标移动事件,就是让当前的鼠标所有者为窗体，不能跨越控件
```
<!-- more -->
附，参考文章[CSDN回答](http://bbs.csdn.net/topics/350071938)
> 鼠标移动的事件属于某个控件, 你写的代码也跟那个控件有关.如果鼠标移出那个控件怎么办, 需要 grab 住鼠标, 使得鼠标移动到外面, 控件仍旧能接收到鼠标消息.随后你就跟踪鼠标移动事件,在移动中:

```C#
// 得到窗口句柄
POINT windowPoint = POINT.FromPoint(this.PointToScreen(new Point(e.X, e.Y)));
IntPtr hwnd = NativeUtils.WindowFromPoint(windowPoint);

if (hwnd != IntPtr.Zero) {
// 如果是托管的, 就能得到对应的 control 类对象
// 不是所有 hwnd 都是托管的哦
Control c = Control.FromHandle(hwnd);
}

[DllImport("user32.dll")]
public static extern IntPtr WindowFromPoint(POINT Point);
```
> 给你一个完整的示例：
```C#
/**********************
* 课题：将窗体中鼠标所在控件名显示在窗体标题上
* 作者：ZAXX
* QQ : 94027486
* 本课题可简单扩展：获取屏幕上鼠标所在位置的窗口句柄与类名
**********************/
using System;
using System.Drawing;
using System.Windows.Forms;
using System.Runtime.InteropServices;
namespace Zaxx
{
public partial class MouseOnControl: Form
{
[DllImport("User32.dll")]
private static extern IntPtr WindowFromPoint(Point p);

Timer timer;

public MouseOnControl()
{
InitializeComponent();
timer = new Timer();
timer.Interval = 200;
timer.Enabled = true;
timer.Tick += new EventHandler(timer_Tick);
}

void timer_Tick(object sender, EventArgs e)
{
Point p = Cursor.Position;
IntPtr h = WindowFromPoint(p);
foreach (Control con in this.Controls)
if (con.Handle == h)
this.Text = con.Name;
}
}
}
```
