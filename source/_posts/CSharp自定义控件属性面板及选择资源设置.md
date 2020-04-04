---
title: CSharp自定义控件属性面板及选择资源设置
date: 2016-03-15 14:38:16
tags:
    - CSharp
    - 自定义控件
categories:
    - .NET
---
在开发winForm的时候，.net的控件总是会不够用，就需要自定义控件来定制自己的控件使用。在这里总结下C#自定义控件的一些属性设置。
<!-- more -->
## c#自定义控件属性面板及选择资源设置
1. 自定义控件显示在工具箱的开关：
  将true改为false就可以不显示了。

```C#
[ToolboxItem(true)] public partial class UserControl1 : UserControl
```
2. 自定义控件在工具箱中的图标显示：
  可以使用已有控件的图标，

```C#
[ToolboxBitmap(typeof(System.Windows.Forms.PictureBox))]
public partial class UserControl1 : UserControl
```
如果不想用系统的图标，要使用自己的图标，可以这样（这部分未测试，源于参考文章）

```C#
[ToolboxBitmap(typeof(MyPanel), "WindowsApplication1.Images.MyPanel.bmp")]
public class MyPanel : UserControl
```
不过，一定要注意路径，WindowsApplication1.Images.MyPanel.bmp表示，解决方案是WindowsApplication1，目录是Images，文件名是MyPanel.bmp，同时，这个图片必须是“嵌入的资源”（点击文件,右键,属性,有一个文件属性,其中,在生成操作中,可以选择"嵌入的资源"）
3. 自定义控件在属性面板上的显示开关：

```C#
[Browsable(true)]
[Description("属性描述"), Category("属性类别"), DefaultValue("属性默认值，重置时使用")] 3 public override string Text
{
get { return label1.Text; }
set { label1.Text = value; }
}
```
category设定的是属性在属性面板上显示的类别，当使用了类别时，组件属性和事件可以按逻辑分组显示在属性浏览器中。Category("Appearance")就可以把属性从杂项转移到外观。
（摘抄自参考文章）用于设置默认的值，对于string,bool,int，可以直接写出来，如[DefaultValue(10)]，这是可以的，不过，不是这三种类型的话，就比较麻烦，一定要先转化为string才能设置成功。如上面的DarkGray，这是系统定义的颜色，这还是比较好处理的。不过，如果是一些自定义的颜色，如颜色是128,0,128，你应该将128转为16进制，写成0x800080，前缀0x是一定要加的。最后就这样[DefaultValue(typeof(Color), "0x800080")]
还有一种[DefaultValue(typeof(Color), "0, 70, 213")]
如果是字体的话需要[DefaultValue(typeof(Font), "宋体, 9pt")]
这两种特殊情况三种方法本人均未测试。
4. 自定义控件属性选择资源：
  如果自定义的属性不是文本等输入，是图片之类的就需要类似于picturebox的资源选择了，所以在设置属性的时候使用文件类型来定义，如选择图片的例下
```C#
[Browsable(true)]
[Description("设置控件图片"), Category("setPic"), DefaultValue(" ")]
public Bitmap setPic
{
get { return (Bitmap)this.pictureBox1.Image; }
set
{
this.pictureBox1.Image = value;
}
 }

```
这样的话就会在属性面板的设置中出现选择资源的对话框来选择。
5. 自定义控件属性选择下拉列表： 
在定义属性的时候需要先设置好枚举值，通过枚举来定义属性，如例下
```C#
public enum indexEnum
{
 a,
 b,
 c
}
public indexEnum index;
[Browsable(true)]
[Description("设置index"), Category("Index"), DefaultValue("属性默认值")]
 public indexEnum Index
{
 get { return index; }
 set { index = value; }
}

```

附：
参考文章[常用Design属性 【C#】妈妈再也不用担心自定义控件如何给特殊类型的属性添加默认值了，附自定义GroupBox一枚](http://www.tuicool.com/articles/En2ANjB)

