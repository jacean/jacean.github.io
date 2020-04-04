---
title: 建立最新版的wordpress_for_sae
date: 2016-03-24 22:41:53
tags:
    - wordpress
    - sae
categories:
    - 博客建设
---
wordpress是一个很不错的博客系统，现在的各种支持也很好，能够很方便的建立一个不错的博客。
依托于新浪云，建立wordpress for sae，而且是最新版的wordpress，需要自己动手改一下，而不仅仅是使用wordpressforsae的模板。
<!-- more -->
1. 在sae上新建自己的wordpress for sae，这会帮助我们初始化MySQL、在storage创建一个名为wordpress的domain、设置Memcache，方便之后的操作。
2. 安装并配置启用wordpress
3. 在wordpress官网下载最新版本的wordpress。解压，修改
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_wordpress-1.png)
```PHP
// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //

/** WordPress数据库的名称 */
define('DB_NAME', SAE_MYSQL_DB);

/** MySQL数据库用户名 */
define('DB_USER', SAE_MYSQL_USER);
 
/** MySQL数据库密码 */
define('DB_PASSWORD', SAE_MYSQL_PASS);

/** MySQL主机 */
define('DB_HOST', SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT);
```
这四处。可参照之前的wordpress for sae的此文件。
4. 重新压缩，保持格式
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_wordpress-2.png)
即压缩目录里没有wordpress主目录，直接就是代码文件。
5. 在sae的应用管理中代码管理，上传代码包。等待ok。就成功了。
6. 这样之后会发现进不了仪表盘，直接输入xxx/wp-admin即可。会提示需要更新数据库，确认更新即可。
7. 如果仪表盘是英文去设置改正就好。
8. 插件虽然显示有安装，但实际不行，还是svn之后在本地安装插件在上传。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_wordpress-3.png)
然后add，commit。ok。
安装主题也是同样的办法，因为没法直接在网站上操作sae的storage，只能在本地弄好之后提交，让文件覆盖。
9. 如上，我安装了jetpack插件。需要wordpress账户，这是墙外的，翻墙注册链接同意就好。然后进入主页会有强力启动很多功能，启动吧。然后查看所有功能，启用markdown就ok。


