---
title: 浏览器首页被hao.qquu8.com/tn=……篡改
date: 2016-03-15 16:38:58
tags:
    - Other
---
有时候装了什么奇怪的软件可能会使自己的浏览器首页被莫名其妙的篡改。比如不干净的激活软件，或是其他下载工具。
[参考文章](http://www.techweb.com.cn/internet/2015-07-20/2177852.shtml),有几张图借用了参考文章里的，若有侵权请提出，立刻更改。
<!-- more -->
刚开始,我进入注册表搜索hao123,hao.qquu8.com，把能删的都删完了，但是并没有什么卵用。后来照下边的方法才弄好.

1. 第一步，首先在桌面和开始菜单里查看所有IE、Chrome浏览器快捷方式属性，把目标栏里的“http://hao.qquu8.com”删掉；
![Chrome浏览器快捷方式属性](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_other-index-changed-1.jpg)
我的这里是正常的，因为是win10，所以在开始屏幕那里右键文件位置（C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Google Chrome），那里的谷歌是好使的。
但是IE就发现问题了（C:\Users\XX\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Accessories），在快捷方式上果然有问题，怒而删之。

*别忘了进入C:\Users\你的用户名\AppData\Roaming\Microsoft\Internet Explorer\Quick Launch文件夹，同样是查看IE和Chrome的属性，然后把其中的“http://hao.qquu8.com”删掉。*
我是在这里发现了Chrome的问题，原来在这会有Chrome的快捷方式，而且还出错了，再次怒而删之！！！然后好了。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_other-index-changed-2.png)
我在这一步就已经成功了.
2. 第二步： 按一下组合键“Win+R”调出运行命令框。在打开栏中键入regedit.exe，回车，打开注册表编辑器（若弹出用户账户控制窗口，请点击 是 继续），依次定位到：
HKEY_CURRENT_USER\Software\Policies\Microsoft
展开Microsoft，查看其下是否包含子项 Internet Explorer 若有，删除（右击Internet Explorer，选择“删除”）。
然后再依次定位到以下3个注册表项。单击Main，查看右边细节窗口中[Default_Page_URL]值和[Start Page]值是否有异常。如果被修改了，请根据自己的需要改回（右击键值，选择“修改”进行更改）。
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Internet Explorer\Main
HKEY_ LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main
HKEY_USERS\Default\Software\Microsoft\Internet Explorer\Main
3. 第三步：
完成以上工作后，将系统设置为“显示隐藏的文件、文件夹”，然后在C:\Windows目录下找到OEM文件（或文件夹），将他们删除。
这两步以防万一我也做了一遍，但是并没有遇到上面所说的情况，可能是之前删注册表给搞干净了。
 
有些时候，任务栏的图标会被打上非法链接。可以在删除开始菜单的属性里的东西后取消固定后重新固定。
本质方法如下：
C:\Users\wanja\AppData\Roaming\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar
在这个目录下是任务栏快捷方式。属性，删除恶意指向就行。 


