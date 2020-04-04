---
title: vscode配置C/C++的编译调试环境
date: 2016-04-04 23:11:08
tags:
    - vscode
    - c/c++
categories:
    - Linux
---
传说中的编辑器有两个，vim和emacs，一个是编辑器之神，一个是神的编辑器。然后又有众多小神，是两极多强格局。
然后，软爹说，要有我，于是vscode从天而降，带着继承自vs强大的智能，体积却极其轻简，同时支持插件，而且流畅至极，一脚踏进了编辑器之战。
于是，感觉要变天了。
用着轻量的编辑器，却又想把编辑器打造成IDE，，，于是开始了Debug插件的配置。
<!-- more -->
## 安装DEBUG
本来有一款C/C++的插件，是利用微软的CLI的，但是Ubuntu15.10不在支持之列，在尝试无果之后只能放弃，万幸还有Debug.
ctrl-p，呼出命令行，输入
> ext install debug

回车就可安装debug插件了。也可以在[vscodemarket](https://marketplace.visualstudio.com/items?itemName=webfreak.debug)里自己找.
## 调试，配置launch.json
插件安装好后，打开C项目，选中调试栏的齿轮设置，在弹出的下拉列表里选择debug，会自动生成一分launch.json,但是还不能直接用的，需要改改。

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug",
            "type": "gdb",
            "request": "launch",
            "target": "./bin/executable",
            "cwd": "${workspaceRoot}"
        }
    ]
}
```
其他的不多说了，主要就说下target，这个是gdb调试的目标，所以就应该是编译后的文件对吧。
那好，比如我有hello.c，那么在终端,首先切换到项目根目录，方便解释，然后执行如下，
> gcc -g hello.c -o hello

会生成编译后的hello文件，要调试的话就把gdb的targe指向这个文件，需要修改如下:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug",
            "type": "gdb",
            "request": "launch",
            "target": "hello",
            "cwd": "${workspaceRoot}"
        }
    ]
}
```

这时候在vscode里，点击绿色小三角，或是F5，就可以进行调试了。
可以在vscode的控制台里看到输出。如果需要输入，那么在最下面的命令输入里输入就好，不过那个只有单行显示，cry...
第一步至此完成了，可以用debug来调试了。
## 编译，配置tasks.json
如果每次都需要在外面编译后再来手动调试，无疑很烦，最好是在F5的时候先编译再执行调试，对吧。
vscode支持定义预处理任务，ctrl+shift-p,输入
> configure task runner

会自动生成一分tasks.json，里面有许多例子。咱们就只改改第一个就好，其他的先删掉。

```
// Available variables which can be used inside of strings.
// ${workspaceRoot}: the root folder of the team        # /home/jacean/workspace/C/
// ${file}: the current opened file                     # /home/jacean/workspace/C/hello.c
// ${fileBasename}: the current opened file's basename  # hello.c
// ${fileDirname}: the current opened file's dirname    # /home/jacean/workspace/C/
// ${fileExtname}: the current opened file's extension  #.c
// ${cwd}: the current working directory of the spawned process

// A task runner that calls the Typescript compiler (tsc) and
// Compiles a HelloWorld.ts program
{
    "version": "0.1.0",
    "command": "tsc",
    "isShellCommand": true,
    "showOutput": "silent",
    "args": ["HelloWorld.ts"],
    "problemMatcher": "$tsc"
}

```
最开始是一些替换变量，假设我的文件hello.c的完全路径是
> /home/jacean/workspace/C/hello.c

那么，那些变量对应的依次就是代码里#之后的,是项目空间路径，文件名，文件去除前缀，文件扩展名，文件所在目录，最后一个是衍生进程的目录(不太清楚).
这是预执行，那就是要执行那句编译命令了，所以修改如下

```
{
    "version": "0.1.0",
    "command": "gcc",
    "args": ["-g", "hello.c", "-o", "hello"],
    "problemMatcher": {
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
            "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
            "file": 1,
            "line": 2,
            "column": 3,
            "severity": 4,
            "message": 5
        }
    }
}
```
这个在官方说明里有，可以自己找找。然后直接F5，正常调试了。要是不信就删掉hello，然后重新来一次吧。
至此，就实现了一步编译调试。
![调试展示](http://7xrtyi.com1.z0.glb.clouddn.com/vscode-c-debug.jpg)

但是，每次都只针对一个文件，换个文件不是又要改，不能容忍，所以继续往下看。
## 自动编译当前打开文件并启动调试
这时候就需要那几个替换变量，把需要改变的用变量来替换。修改后如下:

```
//launch.json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Debug",
			"type": "gdb",
			"request": "launch",
			"target": "${file}.o",
			"cwd": "${workspaceRoot}",
            "preLaunchTask": "gcc"
		}
	]
}

//tasks.json
{
    "version": "0.1.0",
    "command": "gcc",
    "args": ["-g", "${file}", "-o", "${file}.o"],
    "problemMatcher": {
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
            "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
            "file": 1,
            "line": 2,
            "column": 3,
            "severity": 4,
            "message": 5
        }
    }
}
```
表骂我为什么要在后面加个o，因为我不知道怎么去除后缀。。。
> basename hello.c .c

要是能这样我就这样了，就是不会，所以只能变丑点，生成hello.c.o了。不过，反正编译对象人家又不看你长啥样，只要心灵美就行了不是。
然后，选中任意一个.c文件，F5或是绿三角，就会看到如愿以偿的可以调试了。虽然多出了个丑丑的.c.o。
![多出的.c.o](http://7xrtyi.com1.z0.glb.clouddn.com/cs-code-debug-2.jpg)

## 教训
1. 如果gcc后面的参数没有-g，那就不会生成可以调试的文件了，一定要有，否则F5会报错的。详情请参阅gcc命令。
> Debug adapter process has terminated unexpectedly


2. 最坑爹的，坑了我大半天时间的，就是权限问题。我的vscode文件夹在/opt/下，所以即使是配置好了其他的，调试也是报错
> Debug adapter process has terminated unexpectedly

最后实在无奈，快要放弃的时候想起来这是Ubuntu，可能和权限有关，于是把文件夹拷出来，放到home/jacean下，运行，然后再配，就好了，欲哭无泪啊！！！



