---
title: Ubuntu状态栏显示网速CPU
date: 2016-03-24 18:30:04
tags:
    - Ubuntu
categories:
    - Linux
---
作为系统操作的重要操作参数，网速和CPU占用等等，一直使用者所关心的。尤其是在需要下载或是上传文件的时候，对网速的关注可能会超出自己的想象，一直想要监视着网速。
所以，就找找能够在ubuntu状态栏上显示网速的插件程序。
[参考文章找到了indicator-sysmonitor](http://tieba.baidu.com/p/3005287033).
<!-- more -->

### 下载indicator-sysmonitor
这个软件需要一些依赖包，终端执行
>sudo apt-get install python python-psutil python-appindicator

然后下载indicator-sysmonitor的deb包。
>wget -c https://launchpad.net/indicator-sysmonitor/trunk/4.0/+download/indicator-sysmonitor_0.4.3_all.deb
sudo dpkg -i indicator-sysmonitor_0.4.3_all.deb

安装完毕。
### 更改显示图标
>由于软件默认显示图标是 sysmonitor.svg，而在 Ubuntu 14.04 64位系统中没有这个图标，这导致图标显示错误，很不美观。于是要把软件默认使用的图标改成一个存在的图标，当然也可以自己动手制作一个图标。但是系统中已经有很多图标了，找个好点的直接用上就行！
系统图标存放在：/usr/share/icons/Humanity/apps/ XX目录下（XX 为：128 16 192 22 24 32 48 64 中任一个，对应同一图标的不同尺寸，同一图标并不是每个尺寸都有）。打开/usr/share/icons/Humanity/apps/32 ，发现application-community.svg 还不错，所以我就用这个图标了！当然用其他的或者自己制作也是可以的！
找到喜欢的图标后，记下图标的文件名（不包括后缀），这里是 application-community，下面开始进行替换。终端执行命令：
sudo gedit /usr/bin/indicator-sysmonitor
将 724 行的 sysmonitor 改为刚才记下的 application-community

更改完毕后保存就行，然后运行indicator-sysmonitor，就可以在状态栏看到关于CPU和MEM信息。

### 自动启动
首先建立一个目录来存放启动文件。
>mkdir ~/.config/autostart

然后，鼠标右键点击标题栏上的图标，弹出菜单，选择首选项。打钩*Run on startup*,然后切换至Advanced，在sensor里选中net，然后点击添加，在输出栏里更改显示格式就好。
>cpu: {cpu} mem: {mem}net:{net}

### 启动程序
如果在终端启动程序的话，当关闭终端后程序也就自动关闭了，所以可以在dash里搜索sysmonitor，然后点击启动就好。

