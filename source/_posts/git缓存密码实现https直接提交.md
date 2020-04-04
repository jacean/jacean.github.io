---
title: git缓存密码实现https直接提交
date: 2016-04-17 12:47:01
tags:
    - git
    - Linux
    - windows
categories:
    - Linux
---
git是版本控制的利器,配置ssh后,通过ssh可以很方便不需要输入密码就轻松提交.
但是,如果没有配置ssh,或是其他原因需要用https的话,就需要不断输入密码,搞得很麻烦.所以可以试着缓存下密码来进行自动push.
Ubuntu和windows都可以一句命令实现.
<!-- more -->
Ubuntu下:
> git config credential.helper store
 
windows下:
> git config --global credential.helper wincred

这样就可以记住密码,自动提交了.
第一次输入用户密码,以后就不用了.

还有一件事,我在弄的时候不小心把windows下的用在了ubuntu上,就会有提示:
> git：'credential-wincred' 不是一个 git 命令。参见 'git --help'。

所以就记得
> git config --global --unset credential.helper wincred

来取消设置哦.
