---
title: windows远程ubuntu的virtualbox中的windows虚拟机
date: 2016-03-16 23:41:41
tags:
    - windows
    - ubuntu
    - 虚拟机
categories:
    - Linux
---
想着以后要把ubuntu作为工作环境，但是windows中的C#开发还是得继续，所以就把之前windows中virtualbox的虚拟几在ubuntu中打开，我一般都是远程的，所以得把这个windows7虚拟机配置的能够在外网远程控制就好。
很简单了，在virtualBox中设置网卡为桥接，然后在win7中设置获取固定ip，然后在路由器中端口映射到这个ip，直接远程这个ip就可以了。保险的话还可以把这个ip来个mac绑定。
我把虚拟机的ip设为：192.168.xxruurx.197，开启允许远程
路由器中设置：路由器公网ip:1234===>192.168.xxx.197:3389
然后找一台windows电脑，mstsc后输入192.168.xxx.197:3389，就ok了。
 
