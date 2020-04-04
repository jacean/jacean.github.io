---
title: windows下Ubuntu虚拟机安装
date: 2016-03-15 16:57:59
tags:
    - Ubuntu
    - VirtualBox
categories:
    - Linux
---
虽然一直是win+Ubuntu双系统，但是工作环境一直在win下，为了方便就给Ubuntu装了个虚拟机。使用VirtualBox。
记录一些问题和过程以便日后查找。
<!-- more -->
## virtualBox虚拟机不能选择64位系统:
这可能是因为windows开启了hyper-V.在windows功能中关闭就可以了.
virtualbox下安装.5.0.10，主程序安装完毕后记得安装扩展包才行.

## ssh登陆virtualbox安装的Ubuntu的同时也能连上互联网
在全局设定中添加网卡,然后给ubuntu启用第二张网卡.第一张还是nat,第二张设置成
仅主机(Host-Only)适配器，选择新添加的网卡。
！[](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualBox-wlan-1.png)
然后启动ubuntu来设置网卡。
但是，在我添加完后要启动ubuntu时报错了。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualBox-2.png)
> Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter #3' (VERR_INTNET_FLT_IF_NOT_FOUND).
> Failed to attach the network LUN (VERR_INTNET_FLT_IF_NOT_FOUND).
错误提示如上。
解决办法，在[stackoverflow](http://stackoverflow.com/questions/33725779/failed-to-open-create-the-internal-network-vagrant-on-windows10)上找到的。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualBox-3.png)
好可怜，我想评论感谢人家都不行。
网络设置参考[狼来了](http://www.cnblogs.com/leoyoungblog/p/4927591.html)
> -全局设定->网络->添加host only网络
> -设置host only网络IP
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_VirtualBox-4.png)
> -虚拟机使用2块网卡
网卡1：NAT网络地址转换
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualBox-5.png)
> 网卡2：host only（为便于分辨，可选用与网卡1不同的控制芯片）
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualbox-6.png)
> 虚拟机内设置网卡2静态IP，与主机host only网卡相同网段
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualbox-7.png)
添加ssh服务：在Ubuntu终端中输入命令：sudo apt-get install ssh
添加vsftpd服务：在Ubuntu终端中输入命令：sudo apt-get install vsftpd
Netstat -tlp
查看状态
 
## secureCRT中文乱码
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualbox-8.png)
选项->会话选项
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_virtualbox-9.png)
外观->字符编码，设为utf-8就可以了。

  


