---
title: DocX给word添加目录TOC
date: 2016-03-15 15:15:55
tags:
    - C#
    - DocX
categories:
    - .NET
---
DocX是一款开源的C#操作word的库，使用方便，也很轻巧，比起微软的interop使用体验要好多了。可以在不打开word的情况下直接修改word，可以完成日常所需的操作，是实现批量操作word的好帮手。
我这里主要是针对给word添加目录时遇到的一些问题记录下。刚要做目录的时候，我就想DocX应该提供了这个方面的函数。于是我就在讨论区搜索，看看别人是怎么用的。我搜索了catalog; catalogue; list; contents;，但是都没有和目录有关的东西，搞得我以为没提供，于是就又各种搜索，什么list之类的，搜着搜着就找到了一篇。
说是需要下载一个patch，但是不造在哪。还有的提供了利用其他的xml布局来帮助生成目录的。这些都不用管了，我用的是在DocX.cs里的源码里直接修改下的好方法。
<!-- more -->
[答案在DocX的codeplex里](http://docx.codeplex.com/discussions/528384),抄录如下：
> Hello together, 
> 
> i'm sorry, i didn't like your solution proposals as I use docx to not have a need to include the open sdk. (But it took me to this solution 95% of the way, so thanks!) 
> 
> I found out DocX can actually do that easily with just a few minor changes to the code. 
>  
> To accomplish that goal add the following lines to DocX.cs into the class:
>
```C#
/// <summary>
/// Activate Updating Fields on Open
/// </summary>
    public void UpdateFieldsOnOpen()
    {
        XElement element = new XElement(XName.Get("updateFields", DocX.w.NamespaceName));
        element.Add(new XAttribute(XName.Get("val", DocX.w.NamespaceName), "true"));
        settings.Root.AddFirst(element);
    }
```
> Finally you need to modify the save process slightly because docx reloads the settings part directly before saving the document.
```C#
 // Comment out or remove those lines:
- using (TextReader tr = new StreamReader(settingsPart.GetStream()))
- settings = XDocument.Load(tr);
// Insert this instead:
+ if (settings == null )
+ {
+ using (TextReader tr = new StreamReader(settingsPart.GetStream()))
+ settings = XDocument.Load(tr);
+ }
```
>Use these lines to use the new option:
>
```C#
docx.UpdateFieldsOnOpen();
docx.Save();
```
>As a result, word will tell you that some fields need updating when you open the document. 
Well after you bypassed that new preview mode that they put into word to complicate usage. Which i know everybody at my workplace loves very much.  
It works on my computer :). 
I hope it will help YOU ALL TOO since you are great people that deserve TOCs. 

> Best regards,

> shoff

如上所述，就是在DocX.cs的源代码里改一下，在代码末尾添加:

```C#
    <summary>
    /// Activate Updating Fields on Open
    /// </summary>
    public void UpdateFieldsOnOpen()
    {
        XElement element = new XElement(XName.Get("updateFields", DocX.w.NamespaceName));
        element.Add(new XAttribute(XName.Get("val", DocX.w.NamespaceName), "true"));
        settings.Root.AddFirst(element);
    }

``` 

然后再修改下保存的函数save(),

```C#
                         //using (TextReader tr = new StreamReader(settingsPart.GetStream()))
                         // settings = XDocument.Load(tr);
                         if (settings == null)
                         {
                                       using (TextReader tr = new StreamReader(settingsPart.GetStream()))
                                       settings = XDocument.Load(tr);
                         }
```
把原本是注释里的代码改成现在的样子。
然后重新生成下DocX.dll。
在使用的时候自己添加个函数

```C#
public static void update(string docx)
                {
                        using (DocX document = DocX.Load(docx))
                        {
                                document.UpdateFieldsOnOpen();
                                document.Save();
                        }
                        
                }
```
让文档在打开的时候自动更新目录域。
不过这样的话你得首先有目录，我用的办法是新建一个word，给它加上目录，然后创建新word的时候把这个的目录页给插入到新文档里。

```C#
public static void loadTOC(string s, string path, string name)
                {
                        if (!Directory.Exists(path))
                        {
                                Directory.CreateDirectory(path);
                        }
                        string docx = @path + "\\" + name;
                        DocX _template = DocX.Load(s);
                        DocX _document = DocX.Create(docx);
                        _document.InsertDocument(_template);
                        _document.SaveAs(docx);
                        addNewpage(docx);

                }
```
至此，目录就可以正常使用了。每次打开就会提示更新域。

如上，结果今天一大早去翻看Example的时候，发现原来作者已经更新了，并且添加了操作目录的代码。使用起来也很简单。

```C#
public static void AddToc(string docx)
                {
                      
                        using (var document = DocX.Load(docx))
                        {
                                document.InsertTableOfContents("目录", TableOfContentsSwitches.O | TableOfContentsSwitches.U | TableOfContentsSwitches.Z | TableOfContentsSwitches.H, "Heading2");
                                document.Save();
                        }
                 }
```
这样就已经ok了，也不用修改什么代码了，作用和之前的那个一样。顿时心里一阵草泥马奔腾而过。
提醒：多看example里的项目，有需求先在里面找。

