---
title: Ubuntu15.10_VirtualBox出现virtualbox_kernel_driver_not_installed_(rc=-1908)
date: 2016-03-16 23:59:06
tags:
    - Ubuntu
    - VirtualBox
categories:
    - Linux
---
就是在一个风和日丽的时候，Ubuntu提醒我更新软件，我更新了，然后我的VirtualBox就罢工了。
google答案呗，果然又在[askubuntu](http://askubuntu.com/questions/498900/vbox-on-14-04-kernel-driver-not-installed-rc-1908)上找到了答案。
<!-- more -->
> The fix for 14.04 is indeed different, but not that different:
sudo apt-get install linux-headers-generic build-essential dkms
sudo apt-get remove --purge virtualbox-dkms
sudo apt-get install virtualbox-dkms
The install virtualbox-dkms command was actually failing applying the 13.10 fix. By fully purging the package things got back to normal.
Update [17-01-2015]: In the latest iteration of this bug a restart to the system is required between the apt-get remove command and the second apt-get install.

本来我安装的是5.0.16，结果更新后反倒成了5.0.14.然后我之前的虚拟机就打不开了。
> The device helper structure version has changed.
If you have upgraded VirtualBox recently, please make sure you have terminated all VMs and upgraded any extension packs. If this error persists, try re-installing VirtualBox. (VERR_PDM_DEVHLPR3_VERSION_MISMATCH).

没办法，只能到官网重新下载了对应于5。0.14的扩展包安装。提示是否降级，降呗。

ok，好了。
 
