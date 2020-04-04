---
title: 自定义含ListView控件获取listView的滚动条事件
date: 2016-03-15 16:07:26
tags:
    - C#
    - ListView
    - 自定义控件
categories:
    - .NET
---
自定义组合控件，内含有ListView控件，需要获取Listview的滚动条事件来进行操作。
事件外传，具体实现代码如下。
<!-- more -->

'''C#
public partial class myListview : ListView
{
public event ScrollEventHandler Scroll;
private const int WM_HSCROLL = 0x114;
private const int WM_VSCROLL = 0x115;
private const int MOUSEWHEEL = 0x020A;
private const int KEYDOWN = 0x0100;
 
protected virtual void OnScroll(ScrollEventArgs e)
{
ScrollEventHandler handler = this.Scroll;
if (handler != null)
{
handler(this, e);
}
}
protected override void WndProc(ref Message m)
{
base.WndProc(ref m);
if (m.Msg == MOUSEWHEEL || m.Msg == WM_VSCROLL || (m.Msg == KEYDOWN && (m.WParam == (IntPtr)40 || m.WParam == (IntPtr)35)))
{
// Trap WM_VSCROLL
OnScroll(new ScrollEventArgs((ScrollEventType)(m.WParam.ToInt32() & 0xffff), 0));
}
}
}

```
自定义控件的事件外传是做好自定义控件的关键，才能更好的实现逻辑。


