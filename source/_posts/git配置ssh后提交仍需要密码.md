---
title: git配置ssh后提交仍需要密码
date: 2016-03-11 18:14:13
tags:
    - git
    - hexo
categories:
    - 博客建设
---
每次在配置git环境的时候，都会有配置ssh秘钥的步骤，然后根据资料的提示确实配置成功了。但是，每次提交的时候仍然需要输入密码，总觉得自己配置ssh哪里可能出了问题，今天才知道原来是提交的姿势不对。
既然配置了ssh秘钥，那么在提交的时候也自然是要以ssh方式提交了。以前一直默认是https。所以，错咯，改吧。
<!-- more -->
## Hexo博客ssh免密码提交
  首先我找到了.deploy_git/.git/config，然后发现里面的远程链接是

```
[branch "master"]
    remote = https://github.com/jacean/jacean.github.io.git
    merge = refs/heads/master
```
  所以我就把它改成了

```
[branch "master"]
    remote = git@github.com:jacean/jacean.github.io.git
    merge = refs/heads/master
```
  然后提交，刷新，发现还是不对。这可咋办，后来继续找，想起在设置和gitpage关联的时候在 _ config.yml里设置过git仓库。点开，发现里面果然也是https，于是赶紧改过来如下：

```
deploy:
  type: git
  repository: git@github.com:jacean/jacean.github.io.git
  branch: master 
```
然后提交，果然好了，不用再输，密码了哈哈。
至于具体是哪个起作用的，把.git下的config改成https后还是不需要密码，所以，在Hex中主要是看的Hexo的设置。
但是，在其他项目中，因为我们直接是用的git，所以要想走git的ssh，还是需要把.git/config的远程连接改为ssh的模式。
