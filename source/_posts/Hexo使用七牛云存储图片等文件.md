---
title: Hexo使用七牛云存储图片等文件
date: 2016-03-14 00:29:36
tags: 
    - Hexo
    - yelee
    - 七牛云
categories:
    - 博客建设
---
博客是绑定在gitpage上的，但是国外的网站毕竟访问慢，但是又不想再部署到其他地方，折中，将大文件使用国内的云存储来快速访问。七牛云是个不错的选择，因为目前还不是标准用户，等待验证，所以我就只把图片传上去来做个范例。
<!-- more -->
## 使用七牛云加速网站图片加载
### 注册七牛云
七牛云和github有合作，可以直接使用github账号登陆，然后验证手机。身份验证之后就是标准用户，我静等验证通过。
### 七牛云存储
新建空间，然后上传图片。我暂时只能选择公共空间，建立后就进行上传文件。把自己网站的大文件，比如图片，js，css等上传，然后就会出现一个外链，利用这个外链就可以引用了。这是最简单的一种了。
比如这就是一张[七牛](http://www.qiniu.com/)上的图片: ![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_qiniu.png).
### 更改yelee的链接地址
yelee的文件都是分开组合的，然后引用文件是通过属性来设置引用，只要找到引用就可以更改。我暂时改了icon、apple-touch-icon和avatar。具体位置如下：
HexoBlog/themes/yelee/layout/_partial/head.ejs

```HTML
  <% if (theme.favicon){ %>
    <!--<link rel="icon" href="<%- theme.root_url %><%- theme.favicon %>">-->
	<link rel="icon" href="http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_favicon.png">
  <% } %>

  <%- css('font-awesome/css/font-awesome.min') %>
  <!-- <link rel="apple-touch-icon" href="<%- theme.root_url %>/apple-touch-icon.png">-->
       <link rel="apple-touch-icon" href="http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_apple-touch-icon.png">
```
HexoBlog/themes/yelee/layout/_partial/left-col.ejs

```HTML
        <a href="<%= config.root %>" class="profilepic">
            <!--<img src="<%- theme.root_url %><%=theme.avatar%>" class="animated zoomIn">-->
		<img src="http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_avatar.png" class="animated zoomIn">

        </a>
```
暂时就改动这些，至于字体我还不能上传，哭。。。
### EndToRefresh
*Hexo g -d*，刷新后享受七牛云提供的飞一般的流畅！
