---
title: Ubuntu安装Eclipse
date: 2016-03-16 23:44:19
tags:
    - Ubuntu
    - Eclipse
categories:
    - Linux
---
[参考文章](http://www.jb51.net/article/55131.htm)
1. 首先到http://www.oracle.com/technetwork/java/javase/downloads/下载jdk，我下载的是最新版jdk-8u20-linux-i586.tar.gz，下载完成使用命令
> sudo tar zxvf jdk-8u20-linux-i586.tar.gz

2.  然后将解压好的jdk1.8.0_20文件夹复制到/usr/lib/jvm目录里
> sudo cp -r ~/jdk1.8.0_20/ /usr/lib/jvm/
 
3.  配置环境变量 
> sudo gedit ~/.profile

<!-- more -->

在末尾加上：
> export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_20

然后保存关闭，使用source更新下 
source ~/.profile 
使用env命令察看JAVA_HOME的值 
env 
如果显示JAVA_HOME=/usr/lib/jvm/jdk1.8.0_20，说明配置成功。
4.  修改系统默认的jdk，如下
> sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk1.8.0_20/bin/java 300
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk1.8.0_20/bin/javac 300
sudo update-alternatives --config java
sudo update-alternatives --config javac

5. 查看java版本信息，
终端输入 java -version
看到如下信息，就说明修改Ok: 
> java version "1.8.0_20"
Java(TM) SE Runtime Environment (build 1.8.0_20-b26)
Java HotSpot(TM) Client VM (build 25.20-b23, mixed mode)

6. ubuntu下安装配置eclipse
去官网http://developer.android.com/sdk/index.html下载了eclipse包adt-bundle-linux-x86-20140702.zip，下载后解压到你想放的文件夹中就可以了。
解压命令 unzip adt-bundle-linux-x86-20140702.zip
我放在/home/kingqi/ADT目录下

7. 将eclipse执行文件符号链接到/usr/local/bin。
> cd /usr/local/bin
sudo ln -s /home/kingqi/ADT/adt-bundle-linux-x86-20140702/eclipse/eclipse

ok，大功告成，打开终端，输入eclipse就可以启动了。
好吧，完全是转载了，出处在最前，我就再加一句。。。版本号按自己下载的来。
下载eclipse的时候，选择国内的镜像提供商下载速度快，尤其是教育网，直接用大连东软的就特别快，10多M。

