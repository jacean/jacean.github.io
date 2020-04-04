---
title: Hexo使用yelee主题添加swiftype搜索
date: 2016-03-13 22:20:07
tags:
    - yelee
    - swiftype
categories:
    - 博客建设
---
yelee主题是自带有搜索框的，只是没有功能，而且要显示搜索框首先得在主题配置里打开。然后，需要的站内搜索功能可由第三方提供服务，我选择了swiftepy，还不错，现在就来说说怎么配置swiftype的搜索功能给Hexo的yelee主题。
<!-- more -->
## yelee主题使用swiftype添加站内搜索功能
### 打开yelee主题的搜索框
在theme的yelee里打开_config文件，找到searchBox，然后打开显示，如下：

``` 
  # 是否显示边栏中的搜索框（仅样式，未添加搜索功能）
  # Search Box in left column
  search_box: true
```

### 注册swiftype服务
这个就直接进入[swiftype](https://swiftype.com/),注create册账号，登陆，然后根据提示很容易就会设置好一个对应自己站点的Engine，注意一点是在输入网站的时候，不如我的http://jacean.github.io/，一定要有最后的斜杠/。设置好后进入Install，开始配置。
安装的时候，会有一段js，但是这个js咱还先不能直接粘贴啊，得先修改下配置。点击下边的*change Configuration*，进入后会有各种设置，选择*Search field*，edit，是选择怎么加搜索框的。因为yelle自带搜索框，所以我们选择*yes*，然后复制好css格式，后边要用，直接save，然后返回主配置，如果不自定义搜索结果的话直接*activate*，这里的设置就ok了。
然后，复制好那一大段js代码，准备修改yelle。
### 修改yelle
根据swiftype提示，要把这段js放在每个页面都能使用的位置，那自然是模板的head了。
因为Hexo是静态的，所以不要把js和css修改在生成好的html里，记得要在主题的布局文件里改。不过找search框的时候直接在网页里调试查找位置。
- 添加js
  HexoBlog/themes/yelee/layout/_partial/head.ejs，就在这个文件里修改，将js代码放在最后的</head>标签之前即可。
- 添加css
  HexoBlog/themes/yelee/layout/_partial/left-col.ejs，在这个文件里找到search，代码如下
  ```
        <% if (theme.search_box){ %>
        <form><input type="text" class="search st-default-search-input" placeholder=" Search..."></form>
        <%}%>        

  ```
### 大功告成
*hexo g -d*重新生成部署看看吧。
