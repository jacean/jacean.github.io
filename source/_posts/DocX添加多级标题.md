---
title: DocX添加多级标题
date: 2016-03-15 15:55:51
tags:
    - C#
    - DocX
categories:
    - .NET
---
DocX实现了很多对word的需求，即使是没有直接提供的方法，也可以通过自定义来实现。
如果要添加多级标题的话，实质上就是添加一个段落，只是设置字体格式不同而已。
自定义扩展函数来实现此功能.
<!-- more -->
## 定义扩展函数添加多级标题
实现方法是给Paragraph增加一个扩展函数来设置它的格式。比如Heading1,Heading2之类。
我的插入段函数有两个重载，一个是插入正常文本，一个是插入标题，需要提供标题级数。
还有一点需要注意的是，如果在paragraph.append(content)，改成appendline的话，会多出现换行符，尽量别用就好。

```C#
public static void insertParagraph(string docx,string content,int level)
{
using (DocX document = DocX.Load(docx))
{
 Paragraph pTitle = document.InsertParagraph();
 pTitle.Append(content).Heading(level).Color(Color.Black);
 document.Save();
}
}

public static void insertParagraph(string docx, string content)
{
 using (DocX document = DocX.Load(docx))
 {

 Paragraph pTitle = document.InsertParagraph();
 pTitle.Append(content);

 document.Save();
 }
}
 public static Paragraph Heading(this Paragraph paragraph,int level)
 {
 paragraph.StyleName = "Heading"+level.ToString();
 paragraph.ListItemType = ListItemType.Numbered;
 return paragraph;
 }
```
插入效果图
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_DocX-mutilevel-title.png)
