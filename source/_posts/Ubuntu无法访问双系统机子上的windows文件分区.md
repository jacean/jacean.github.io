---
title: Ubuntu无法访问双系统机子上的windows文件分区
date: 2016-03-17 00:04:56
tags:
    - Ubuntu
    - windows
categories:
    - Linux
---
装好Ubuntu用了几天，因为要用ps，所以回到win10，结果再回来发现无法进入windows的文件分区了。
> Error mounting /dev/sda1 at /media/jacean/系统保留: Command-line `mount -t "ntfs" -o "uhelper=udisks2,nodev,nosuid,uid=1000,gid=1000" "/dev/sda1" "/media/jacean/系统保留"' exited with non-zero exit status 14: The disk contains an unclean file system (0, 0).
Metadata kept in Windows cache, refused to mount.
Failed to mount '/dev/sda1': 不允许的操作
The NTFS partition is in an unsafe state. Please resume and shutdown
Windows fully (no hibernation or fast restarting), or mount the volume
read-only with the 'ro' mount option.

参考ubuntu提示和这篇[博客](http://blog.sina.com.cn/s/blog_6b7bd17e0101eyz9.html),确定问题是windows在win8以后添加的快速启动功能导致的.

<!-- more -->
快速启动有助于windows快速关机并迅速恢复,但是这是需要缓存当前状态,当ubuntu试图打开这些windows分区时,会发现这些缓存,认为是不安全的状态,为了不影响改变windows状态就会直接表示拒绝访问.并提示将windows完全关闭,取消快速启动.
当然,快速启动不影响重启,如果是重启的话是不会有这种问题的,只有选择关机在按电源开启才会.
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_windowspower.png)

有时候会发现启用快速启动的开关是灰色的没法点击,那就滚动到开头,有个<<<更改当前不可用设置>>>,把这个打开就行了,然后修改保存.大功告成.关机,开机试试.
