---
title: Hello My HexoBlog
date: 2016-03-11 10:50:42
tags: 
    - MarkDown
categories:
    - 博客建设
---
    
## 欢迎进入Hexo的世界。
   
本博客使用Hexo构建，部署在github，访问 <jacean.github.io> 即可访问本站。
博主，万嘉庆，邮箱:jaceanwan@gmail.com。
这篇文章主要熟悉下markdown的语法。
<!-- more -->
## MarkDown语法熟悉
参考文档：<http://www.jianshu.com/p/q81RER>
### 标题语法

  #作为标题的标志，一个即是一级标题，两个就是二级标题，直到6个。

### 列表语法

列表格式的话，只需要在文字前面加上 - 就可以了。
  - C#
  - C/C++
  - Java
  - Python

如果需要数字标号的话，直接加上1.，2.，3.即可.
  1. 谷歌
  2. 苹果
  3. 微软

### 链接和图片

只需要使用“[显示文本](链接地址)”就可以实现超链接。比如，
[百度](www.baidu.com) .
插入图片也是差不多。“![](图片链接地址)”。比如，
![](http://ww4.sinaimg.cn/bmiddle/aa397b7fjw1dzplsgpdw5j.jpg)

### 引用

在引用的文字前面加上 > 就好了，不过记得中间留一个空格。
> 中国人民从此站起来了！

### 粗体和斜体

两个*包含一段文本就是**粗体**的用法，一个*包含的就是*斜体*了。

### 表格
主要就靠|和-来分割。

| 学校     | 地点     | 专业   |
| -------- |:--------:| ------:|
| 大连理工 | 辽宁大连 | 自动化 |

好像一定要对齐才行。

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

加一句话，要在vim中使用系统剪切板，需要按shift+insert就行。
### 插入代码

```C
    void main()
    {
        printf("Hello Hexo!");
    }
```

