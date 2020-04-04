---
title: ubuntu配置hexo和gitpage
date: 2016-03-17 00:10:11
tags:
    - Ubuntu
    - Hexo
    - GitPage
categories:
    - 博客建设
---
部署参考[官方文档](https://hexo.io/zh-cn/docs/index.html)和[潘柏信 HEXO+Github,搭建属于自己的博客](http://www.jianshu.com/p/465830080ea9)
按照官方文档一步步来没问题。最终完成很快的。

有几个和文档不同的地方记下来。

<!-- more -->

1. source下缺少_drafts
>安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。
$ hexo init <folder>
$ cd <folder>
$ npm install
新建完成后，指定文件夹的目录如下：
.
├── _config.yml
├── package.json
├── scaffolds
├── source
| ├── _drafts
| └── _posts
└── themes

我的在source下缺少_drafts，自己新建个文件夹补上就成。需要的话在config里将drafts设为true。草稿。

2. 最后部署到github有点磕掺
在github新建仓库：jacean.github.io
你没有看错，仓库名就是这个，jacean换成自己的git用户名。

```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
type: git
repository: https://github.com/jacean/jacean.github.io.git
branch: master
```
一定要写成这样，而且，注意，冒号之后有一个空格，没有空格的话就识别不出来，颜色也不对。我在这个问题上坑了好一会。

3. 安装主题
https://hexo.io/themes/
在这里找到喜欢的主题，点击名称进入作者的github，然后有命令提示一般。
> git clone https://github.com/MOxFIVE/hexo-theme-yelee.git themes/yelee
Change theme field in Hexo root's _config.yml file. 修改 Hexo 根目录对应配置文件。
 
> theme: yelee
Update 更新
 
> cd themes/yelee
git pull
