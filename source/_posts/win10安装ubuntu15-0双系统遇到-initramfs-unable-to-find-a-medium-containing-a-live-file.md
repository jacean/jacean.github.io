---
title: win10安装ubuntu15.0双系统遇到(initramfs)unable_to_find_a_medium_containing_a_live_file
date: 2016-03-16 23:18:24
tags:
    - Ubuntu
    - win10
    - 双系统
categories:
    - Linux
---
因为要把工作环境转移到Ubuntu,所以自然不能只用虚拟机了。而之前的Ubuntu麒麟系统用起来有点不爽，于是就直接重装吧，装的是15.10，但是呢，一起安装双系统，三系统一点问题都没有的我，这次遇到问题了。
> (initramfs)unable to find a  medium  containing a  live  file
遇到这个问题我也头大了，因为以前装的时候都好好地，完全没啥风险，这次出问题简直始料未及啊。当下就赶紧查资料，果不其然，国内的方法都不好使或者是根本就没啥方法，于是google之。不过google也不是很给力啊，也是很多废答案。不过万幸找到了，在看完好多英文解答之后才找到的，发现原因后当时就哭了。
最终最有效最简单的办法是在[askubuntu](http://askubuntu.com/questions/15425/error-when-installing-unable-to-find-a-medium-containing-a-live-file-system)上找到的。
> For me changing from USB 3.0 socket to 2.0 helped. I'm using 10.04 Ubuntu on Asus 1015PEM.

原来仅仅是因为我把u盘插在了3.0的口上。。。。

[这里](http://askubuntu.com/questions/221835/installing-ubuntu-on-a-pre-installed-windows-with-uefi?lq=1)有个答案特别好，完美的分析了win和Ubuntu怎么互相搞，真的特别棒，您看看吧，就看一看啊。我真的耐着性子看了这么多英文，然后发现对我的问题并没有什么卵用，不开心。


