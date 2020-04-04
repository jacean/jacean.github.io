---
title: 自定义shell实现hexo常用命令
date: 2016-03-16 21:38:27
tags:
    - Shell
    - hexo
categories:
    - 博客建设
---
利用Hexo搭建好博客之后，如果要新建或是生产都必须先切换到blog的根目录，然后在编辑文件的时候又得切换目录。但是一般，也就是新建直接编辑，那么多命令也是麻烦。
超过3行的持续输入已经令人产生厌烦，所以需要批处理来解决。在ubuntu下就是shell了。
于是就看了会Shell，自定义一些命令来简化操作。实现如下
> ~Hexonew 自定义shell实现hexo常用命令
change dir to /home/jacean/HexoBlog/source/_posts
INFO  Created: ~/HexoBlog/source/_posts/自定义shell实现hexo常用命令.md
hexo new 自定义shell实现hexo常用命令 
gvim 自定义shell实现hexo常用命令
~hexogd
INFO  Start processing
INFO  Files loaded in 659 ms> 
<!-- more -->

## Shell基础
[Shell入门](http://jacean.github.io/2016/03/16/Shell%E5%85%A5%E9%97%A8/)
## Hexo命令
默认Shell的解释器是bash，所以我就直接在bash的相关文件里应用更改。
1. 在$HOME下建立文件夹*mycmd*,在里面建立脚本文件。
- hexonew.sh

```Shell
#!/bin/bash

path=~/HexoBlog/source/_posts
current=$0
cd $path
echo "change dir to $path"
if [ $# -ge 1 ]
then
    for f in $*
    do  
        hexo new $f
        echo "hexo new $f "
#        hexo g
        gvim $f.md
        echo "gvim $f"
    done
else
    echo "parm error,need file1[,file2...]"
fi
#echo "change dir to $current"
cd ~
```
这段代码实现的是hexo的new，new后同时编辑文件，如果是多个就同时打开编辑。
- myalias

```
alias hexogd="cd ~/HexoBlog; hexo g -d;cd ~"
alias hexog="cd ~/HexoBlog; hexo g;cd ~"
alias hexod="cd ~/HexoBlog; hexo d;cd ~"
alias hexop="cd ~/HexoBlog/source/_posts"
alias hexonew=". hexonew.sh"
```
这段代码前3句是直接建立别名来执行命令，后一句是执行上一个hexonew.sh。那个*.*的意思是直接在本Shell下执行，不必新开子进程。
不过现在还不好使，需要在bash那里配置下。
2. 配置.bashrc
bash的配置文件在etc/和home文件夹之下都有，明显就是针对用户的设置，所以我选择编辑home下的.bashrc，个人习惯。
在末尾添加

```Shell
if [ -d "$HOME/mycmd" ]; then
	PATH=$PATH:~/mycmd
fi

if [ -f "$HOME/mycmd/myalias" ]; then
	. ~/mycmd/myalias
fi
```
第一个是把mycmd的路径加入path，第二个是把别名文件载入，这样的话别名文件里加载的hexonew.sh也就可以直接用了。

至此，大功告成，执行那几个命令都有相对实现，也不用再收到切换目录了。
