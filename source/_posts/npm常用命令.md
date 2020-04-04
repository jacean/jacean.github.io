---
title: npm常用命令
date: 2016-05-27 17:50:35
tags:
    - npm
categories:
    - web
---

开始练手gulp的时候就用上了npm，这是促进nodejs繁荣的包管理器，记录下它的一些常用命令以便查阅。
node package manager
<!--more-->
```
npm help		万能金钥匙

npm install xxx 安装模块

npm install xxx -g 将模块安装到全局环境中

npm ls 查看安装的模块及依赖

npm ls -g 查看全局安装的模块及依赖

npm uninstall xxx  (-g) 卸载模块

npm cache clean 清理缓存
```
## 安装
npm安装有两种方式
1. 命令行单个安装
安装的话针对当前项目和全局也分两种安装，之后的安装路径不同，作用域不同。
	1. 本地安装，package会被下载到当前所在目录，也只能在当前目录下使用。
    	> npm install pkg
	2. 全局安装，package会被下载到到特定的系统目录下，安装的package能够在所有目录下使用。
    	> npm install -g pkg
2. package.json安装
如果我们的项目依赖了很多package，可以将项目依赖的包都在package.json这个文件里声明，然后
> npm install

## 查看
1. 查看当前目录安装了哪些package
	> npm ls

2. 查看全局安装的模块及依赖
	> npm ls -g

3. 查看特定package的信息
	> npm ls pkg

4. 查看详细信息
	> npm info pkg

