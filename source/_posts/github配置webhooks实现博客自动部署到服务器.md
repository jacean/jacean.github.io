---
title: github配置webhooks实现博客自动部署到服务器
date: 2016-04-15 20:26:44
tags:
    - Github
    - webhooks
categories:
    - 博客建设
---
最近买了腾讯云的服务器,就想着把博客迁移到腾讯云,毕竟github在国内的访问速度有限而且百度也不搜索.
但是,总不能每次push到github,还需要跑到服务器去pull吧,那可真是呵呵了就.
索性,github提供了webhooks来自定义git相关的执行动作,所以就试试咯~
<!-- more -->
### 服务器建立hook文件
首先在本地新建hook文件,以便后期github检测到改变动作后来执行,让服务器同步更新.
这个文件可以是各种类型.比如,php.
新建php文件githook.php,内容如下,然后放在网站根目录,记得不要添加到git追踪里.

```PHP
<?php
header("Content-Type: text/html; charset=gb2312");
error_reporting(7);
define("WWW_ROOT", "C:\\xampp\\htdocs\\jacean.github.io");
define("LOG_FILE", WWW_ROOT."\\git-hook.log");
exec(WWW_ROOT."\\githook.bat",$output,$ret);
echo "output:";
print_r($output);
echo "ret:".$ret;
$log = sprintf("[%s] %s %s\n", date('Y-m-d H:i:s', time()), $output,$ret);
file_put_contents(LOG_FILE, $log, FILE_APPEND);
```
githook.bat就可以写你的操作了.
比如,我的就是只有简单的一句,暂时:
> git pull origin master

update:
直接git pull的话有时候会提示本地修改将被覆盖,导致不能正确更新,所以重写如下:
> git fetch --all  
git reset --hard origin/master 

### github设置webhooks关联
然后在github,你的项目中,设置,webhooks&servies,add webhooks.
> Payload URL:http://www.xxx.xxx/githook.php

其他的基本默认就好.
添加后,github会自动ping一下,如果正确能连上的话,会给你一个小绿对勾在url的前面.

### apache账户权限设置
如果一切正常的话这样是好了,但是,你提交一次后发现并没有什么用.
然而本地执行bat是好的,你再手动打开githook.php,能看到输出返回了一个1.即ret的值是1.
这个情况去查一下官方说明,就知道是权限问题了,原谅我刚开始没有想到这个,搞得进了误区,以为是多大事.

打开服务,找到apache.如果没有的话,去xampp的apache下,有个install_apacheservice的bat,在关闭apache后执行,会看到在服务列表里多了apache.
然后属性apache,找到登陆,设置账户,这个账户得是有权限读写网站目录的账户,最高的就是administrator了.设置好后确定.
然后重启apache.

再次直接访问githook.php,发现ret=0了.想来是大功告成.
然后再提交一次试试,看看有木有效果吧~~~


### 总结
综上,可以看出这个原理其实很简单,当github检测到提交操作后,就会执行你的webhooks所指向的文件,然后在这个文件里咱们预设动作即可.
很简单吧.
hook钩子操作很有用.
比如你在自己服务器搭建了git服务,假设用的是gitstack,然后你希望在有提交的时候把最新版抄送到网站目录下,也可以使用hooks.
在gitstack的repositories下,找到项目,里面有个hooks,预设了很多hooksample,有提交前验证,提交后处理,或是其他,咱们都可以自己修改.
*注意还是要把gitstack的登陆用户设置好为有权限读写.*
我就在post-receive中加入了在网站目录下的git pull,以保持我的网站持续更新.
当然,也可以借助自己的git服务器为中介,在git到服务器后,再利用服务器的hooks,将提交发送到github,来实现github的同步更新.


参考:
[利用Github的Webhook部署博客](http://linroid.com/2015/01/21/using-github-webhook-to-deploy-my-blog/)

