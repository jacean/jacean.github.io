---
title: Git常用操作
tags:
  - git
date: 2020-04-04 16:27:57
categories:
  - git
---

工作中常用到的git操作和基本概念。
<!-- more -->

# Git常用操作

工作中常用的git基本操作。

## 基础概念

有几个基础概念科普下。引用一张图片

[Git仓库、缓冲区、工作副本相关概念]: https://blog.csdn.net/gardenyou/article/details/103307899

![三个区的示例](https://img-blog.csdn.net/20160917181038668)

git的操作，实际就是在仓库、缓冲区、工作区这三个区域之间导来导去。

工作区要进一步就add到缓冲区，缓冲区要进一步就commit到仓库。

仓库要退出来就reset，缓冲区要退出来就checkout。

## 下载仓库

一般来讲都是部门有自己的git仓库，直接去下载使用即可。这时要用到的操作就是```git clone```。

如果要自己创建的话，可以本地```git init```然后push到远端，现在大部分git服务都是提供web端服务的，所以可以直接在网站上创建新的仓库。

### ssh下载

比如，在github上创建一个Demo库，在创建时选中添加README，然后往本地下载。

```bash
 git clone git@github.com:jacean/Demo.git
```

注意，上面在clone后面跟的地址是ssh的地址，要使用ssh的传输方式，需要在客户端生成git的ssh密钥，然后将public密钥在git服务端注册，两端就可以没有密码通信了。

配置ssh一般三步走，生成密钥后拿public的区填到服务端的ssh key中即可。

```bash
git config --global user.name "姓名"
git config --global user.email "邮箱地址"
ssh-keygen -t rsa -C "你的邮箱地址"
```

### https下载

如果没有配置ssh，则可以直接选择https下载，下载效果是一样的，不过在下载的时候需要手动输入账号密码。

一般来说，我们肯定是希望输入一次密码之后git就可以记住这个密码，这个也有命令记住默认账号。

```bash
git clone https://github.com/jacean/Demo.git
# 设置全局配置，当然这个也有参数可以配置生效时间
git config --global credential.helper store
# 所有的配置都可以在不同层级的配置文件中体现，这个作为本地仓库配置的话，可以在.git/config文件中直接写入
[credential]
     helper = store
```

### 指定分支下载

使用clone命令不指定其他参数的话，下载下来的都是默认分支，一般是master。开发的时候，普通可能并不是直接在master上开发，有对应的开发分支。那就可以在下载的时候直接指定分支名，就不用下载下来之后再切换分支。

```
git clone git@github.com:jacean/Demo.git -b test1
```

## 基本流程

### 指定分支开发

如果不需要切换分支的话，下载下来代码之后就可以直接操做了。如果分支不是开发分支，可能有2种情形。

#### 直接在本地基于当前分支创建新分支

可以使用```git checkout```命令来创建新分支。

下面示例中包含的远端信息如```origin```在后面介绍。

[远程仓库的关联设置]: #远程仓库的关联设置

```bash
# 如果下载下来默认是master的话，查看本地分支是只有master的，而且前面标*表示是当前正在应用的分支
git branch
* master

# 可以使用-a来查看包含远端的分支，每个本地分支如果和远端<建立了关联>，就都可以找到对应的分支
$ git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/test1

# 创建test2分支，此时test2继承所有master的信息，并且仓库直接切换到test2
git checkout -b test2
# 此时查看本地分支
git branch
  master
* test2
# 查看远端分支，由于test2并没有和远端建立联系，所以并没有对应的远端分支
git branch -a
  master
* test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/test1

# 如果需要切回master，则可以直接
git checkout master
```

上述在切换分支的过程中，可能面临本地已经有了修改，导致```not clean```的现象，这时候可以选择多种方式来处理。在后面章节

[ 本地修改临时处理 ]:  #本地修改临时处理

中演示。

#### 直接切换远程分支

一般的流程是，先找到远程分支，然后创建一个对应的本地分支建立管理。实际可以一步到位。

```bash
# 当前我们只有mater分支和远端关联，并且有一个没有远端关联的本地分支test2
$ git branch
  master
* test2

# 直接切换在远端origin仓库上的test1分支
$ git checkout -t origin/test1
Branch test1 set up to track remote branch test1 from origin.
Switched to a new branch 'test1'

# 在查看，本地已经新建了和远端一样名字的分支test1
$ git branch
  master
* test1
  test2

```

#### 只fetch远端分支到本地分支不切换

这个操作也是很常见的，比如在干活的时候，想重新基于某个分支再开发就可以用这个方式，先通过fetch建立一个本地分支和远端分支关联起来，然后再切换。

这个时候，可以为本地分支指定一个和远端不一样的名字。

```bash
# 这个时候本地会出现新分支master1，这个分支继承了远端mster的所有信息。
# 这次创建分支，并没有切换本地分支，可以自己去用checkout切换
git fetch origin master:master1
```



### 推送本地开发patch

一般本地开发完了，就可以push到远端生效到服务器，并且创建后续的merge请求等。

#### 和远端有联系的分支可以直接push

比如直接用master分支或者指定分支下载的，没有切换分支，都可以直接push，他们再git内维护有和远端的对应关系。

```
git push
```

git当前支持2中push模式

```
warning: push.default is unset; its implicit value has changed in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the traditional behavior, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple

When push.default is set to 'matching', git will push local branches
to the remote branches that already exist with the same name.

Since Git 2.0, Git defaults to the more conservative 'simple'
behavior, which only pushes the current branch to the corresponding
remote branch that 'git pull' uses to update the current branch.

See 'git help config' and search for 'push.default' for further information.
(the 'simple' mode was introduced in Git 1.7.11. Use the similar mode
'current' instead of 'simple' if you sometimes use older versions of Git)
```

不过，开发的时候分支很多，各种关联，建议push的时候直接指定分支。如下一节。

#### 将本地创建的分支推送到远端并在远端建立新分支

因为是直接在本地创建的，所以没有和远端关联起来，在push的时候，如果要在远端也新建分支的话，可以

```bash
# 执行push并指定远端仓库origin，本地分支test2，远端分支test2
git push origin test2:test2

# 远端分支也可以改名字
git push origin test2:test3

# 此时再查看远端分支可以看到test2和test3
git branch -a
  master
* test1
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/test1
  remotes/origin/test2
```

#### 使用本地分支内容强制覆盖远端

说到强制，那就直接```-f```即可。即使本地分支内容落后于远端，也可以强制覆盖用本地的。

此操作，常用在本地回退修改时用，也可以在合并本地commit的时候用。

```bash
git push -f origin test2:test2
```

#### 合并多个commit到一个commit

一般本地修改可能经历了多次，但是push到远端和主线的修改合并时，如果一次patch带了多个修改，不利于后续回溯定位，所以一般建议把一次patch合并成一个commit。

常用步骤如下：

```bash
# 先找到其实commit点 abcde
git log
# 使用reset将提交记录回到abcde，指定--soft是保留这期间的修改，并且这些修改会汇总统一到缓存区
git reset --soft abcde
# 重新commit，因为是reset soft来的，修改还在缓冲区，可以直接commit
git commit -m "一次提交"
# 重新向远端push，但此时远端的记录是早于本地，会产生冲突，可以直接-f
git push -f origin test1:test1
# 更新后远端就只有一个commit点，所有修改合一，发起merge也方便检视
```



### 本地修改 

#### git status查看本地修改

对于Demo仓库，我们修改下readme文件，并且新建一个a.txt，然后创建文件夹dir1，里面新建文件1.txt。

查看当前结构

```bash
Demo
│  a.txt
│  README.md
│
└─dir1
        1.txt

```

通过```git status```查看

```bash
git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        a.txt
        dir1/

no changes added to commit (use "git add" and/or "git commit -a")


```

可以看到，readme文件自然是属于modified状态的，a.txt以及整个dir1目录则是untracked文件。

#### git add添加修改

如果我们要把a.txt纳入git管理，则需要显式的去git add a.txt下。对了，git add也可以指定目录，这时路径下的文件都会被add。

```bash
# 只添加update的文件，也就是已经被git管理的文件，对应上面，指挥添加readme
git add -u
git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        a.txt
        dir1/

# -A谨慎使用，会把所有的都给加如到git管理中
git add -A
git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        new file:   a.txt
        new file:   dir1/1.txt

```



只有经过add进入缓存区的文件才会被commit提交，所以，记得add。

#### git status 只查看被追踪的文件

一个大型工程，往往下载本地编译后会带来很多的临时文件，这些临时文件如果全部显示出来会有很大的干扰，所以可以加一个```-uno```参数，只查看git库文件。

```bash
git status -uno
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

#### git status只查看当前路径及以下的修改

默认情况下，git的命令都是全局生效的，所以，即使在子路径下，看到的git状态都是全局的。

```bash
$ pwd
/g/hexo/Demo/dir1

/g/hexo/Demo/dir1 (test1)
$ git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   ../README.md
        new file:   ../a.txt
        new file:   1.txt

```

大型工程往往由多个功能模块对应的多个文件夹组成，可以只关注于本文件夹下的修改，使用```.```参数可以指定为当前路径。

```bash
# 一个.表示当前路径
git status .
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   1.txt

# 两个点..表示上级路径
git status ..
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   ../README.md
        new file:   ../a.txt
        new file:   1.txt

# 这个路径限制对git大部分命令都是生效的，比如git add, git status等
# 如下，就只会查看当前路径下被追踪的文件了
git status -uno .
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   1.txt

Untracked files not listed (use -u option to show untracked files)

```



#### git stash 保存本地修改

一般在某个分支操作一番之后，可能又要切到某个分支去干活，这时候，一般会提示，本地有未提交的修改。

对于此，我们可以直接add -> commit， 如果不想提交的话，可以```git stash save```。

```git stash```是一个类似压栈的操作，每一次压栈都会有对应编号，可以通过```list```获得编号，指定具体要操作的编号，不指定的话，默认就是操作栈顶数据。

```bash
# 直接git stash会将当前修改压栈，后续直接pop即可。
git stash
# 不过，一般stash的话，可以指定标签，让我们知道我们压的是什么，添加辅助信息，方便后续弹栈
git stash save "test a"
# 使用list就可以查看当前你本地压了多少修改
git stash list
# 通过list找到对应的编号，就可以指定去show修改,如果不指定后买你的stash num，则默认是最新的一次
git stash show stash@{1}
# 恢复压栈的操作，对应自然是pop,对应的修改将不再在stash中
git stash pop stash@{1}
# 对于修改栈，如果不想弹出，可以直接apply，修改还会再stash中
git stash apply stash@{1}
# 不想要了直接drop
git stash drop stash@{1}
# 全都不想要了
git stash clear
```



#### git checkout 回退没有添加到缓冲区的修改

当我们在文件已经add之后没有commit之前继续修改，那么就会看到这样的情形

```bash
git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        new file:   a.txt
        new file:   dir1/1.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md

```

此时如果想丢弃add之后操作，直接```git checkout```即可。

```git checkout```会从当前保存的commit和缓冲区中检出文件。

```bash
git checkout README.md
# 可以看到没有了新的修改
git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        new file:   a.txt
        new file:   dir1/1.txt

```



如果当前没有任何修改保存到缓冲区，那么```git checkout```的操作就相当于把整个仓库恢复原状。

因为缓冲区的状态是空白，所以也就是相当于仓库的状态。

```bash
# 将前面的修改提交，然后修改a.txt
# 可以看到只有a.txt
git status
On branch test1
Your branch is ahead of 'origin/test1' by 1 commit.
  (use "git push" to publish your local commits)
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   a.txt

no changes added to commit (use "git add" and/or "git commit -a")

# 直接checkout a.txt
git checkout a.txt
# 这里也可以对这个给文件夹操作
git checkout .
# 甚至于删掉整个文件夹再恢复
git checkout dir1

# 整个恢复
git status
On branch test1
Your branch is ahead of 'origin/test1' by 1 commit.
  (use "git push" to publish your local commits)
nothing to commit, working directory clean

```

#### git reset HEAD移除缓冲区的修改

```bash
# 修改文件a.txt，然后add，查看已经再缓冲区
$ git status
On branch test1
Your branch is ahead of 'origin/test1' by 1 commit.
  (use "git push" to publish your local commits)
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   a.txt

# 使用reset HEAD
$ git reset HEAD a.txt
Unstaged changes after reset:
M       a.txt

# 将修改从缓冲区移除
$ git status
On branch test1
Your branch is ahead of 'origin/test1' by 1 commit.
  (use "git push" to publish your local commits)
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   a.txt

no changes added to commit (use "git add" and/or "git commit -a")

```

#### git reset --soft将已提交的修改恢复到缓存区

```bash
# git log找到之前的commit
git log
commit b77c0fba6717c95db35b65f66e4cd050a817bd92
Author: jacean <jaceanwan@gmail.com>
Date:   Sat Apr 4 15:42:10 2020 +0800

    aaa

commit 64e91b4b21c7951932826c13aceaedb73d2f65d1
Author: Jacean wan <jaceanwan@gmail.com>
Date:   Sat Apr 4 13:28:15 2020 +0800

    Initial commit

# git reset到指定的commit点，也就是上上次的提交
$ git reset --soft 64e91b4b21c7951932826c13aceaedb73d2f65d1

# 可以看到，之前提交的已经到了缓冲区，上次未提交的仍然在修改区内。
# 当前实际在上次的commit点了。
$ git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        new file:   a.txt
        new file:   dir1/1.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   a.txt

# 我们在提交以下，后续继续做演示
git commit -m "aaaa"
```

#### git reset --hard将已提交的修改丢弃

```bash
# reset 加hard重置
git reset --hard 64e91b4b21c7951932826c13aceaedb73d2f65d1
HEAD is now at 64e91b4 Initial commit

# 可以看到现在已经在上次的commit点了
# 但是之前修改的文件，不管是已提交的，未提交的都没了
# 所以，这个操作，慎用
$ git status
On branch test1
Your branch is up-to-date with 'origin/test1'.
nothing to commit, working directory clean

```





### 远程仓库的关联设置

下载一个git库，默认会有一个origin对应远端仓库，可以通过```git remote -v```查看

```bash
git remote -v
origin  git@github.com:jacean/Demo.git (fetch)
origin  git@github.com:jacean/Demo.git (push)
```

一般我们默认都是对应的origin操作，当然在分支和远端关联的时候要显式指定远端仓库是origin。

因为远端仓库可以添加多个，凡是同源的仓库都可以添加在一块。

一般来讲，就是fork的分支这种，可能涉及多个人的分支代码处理，就会添加多个远端。

```bash
# 添加一个新的远端仓库new remote，地址的话和现在的一样也没有关系~
git remote add newremote  git@github.com:jacean/Demo.git
# 重新查看就可以发现多了newremote的，对应fetch和push
git remote -v
newremote       git@github.com:jacean/Demo.git (fetch)
newremote       git@github.com:jacean/Demo.git (push)
origin  git@github.com:jacean/Demo.git (fetch)
origin  git@github.com:jacean/Demo.git (push)

# 此时，我们就可以基于newremote去操作了
# 重新下载分支，远端master对应master_new,会生成2个关系，分别对应本地和远端的信息
git fetch newremote  master:master_new
From github.com:jacean/Demo
 * [new branch]      master     -> master_new
 * [new branch]      master     -> newremote/master
# 在查看，remote下多了newremote
git branch -a
  master
  master_new
* test1
  test2
  remotes/newremote/master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/test1
  remotes/origin/test2
  remotes/origin/test3

# 还可以把本地分支向newremote推送
git push newremote test1:test1
# 如果有冲突或是时间差，都可以强制-f
git push -f newremote test1:test1
```

#### 





