---
title: CSS设置DOM宽高的一些小tips
date: 2016-04-02 21:29:36
tags:
    - CSS
    - web
categories:
    - 前端
---

做前端开发总会有一些小技巧需要用到，虽然简单，但是也很容易忘记。所以从现在开始就在这记录下一些感觉比较好玩的小tips。
<!-- more-->

### 高度等于宽度

1. 用js自然很简单了

```JavaScript
	$("#ss").attr("height",$("#ss").attr("width"));
```

2. 利用padding撑开
padding是依靠宽度来定大小的，百分比完全依赖于宽度

```HTML
 #container{
            width: 100%;
            height: 0;
            padding-bottom: 100%;
        }

```

### 高度等于屏高

1. 设置body和html为100%后，里面的元素就可以用百分比控制了

```HTML
		body,html{
            height:100%;
        }
         #container{
            width: 100%;
            height: 100%;
            /*padding-bottom: 100%;*/
        }

```
2. js设置

```JavaScript
 				//改变div的高度
                $("#container").height($(window).height());
                //改变div的宽度
                $("#container").width($(window).width());
```

持续更新。。。
