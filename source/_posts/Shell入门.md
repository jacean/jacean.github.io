---
title: Shell入门
date: 2016-03-16 17:12:51
tags:
    - Linux
    - Shell
categories:
    - Linux
---
入门参考[Linux Shell脚本教程：30分钟玩转Shell脚本编程](http://c.biancheng.net/cpp/shell/)。
> Shell本身是一个用C语言编写的程序，是用户使用Unix/Linux的桥梁。
Shell既是一种命令语言，又是一种程序设计语言。作为命令语言，交互式的解释和执行用户输入的命令;作为程序设计语言，定义了各种变量和参数，并提供了许多在高级语言中才具有的控制结构，包括循环和分支。
它虽然不是Unix/Linux系统内核的一部分，但它调用了系统核心的大部分功能来执行程序、建立文件并以并行的方式协调各个程序的运行。因此，对于用户来说，shell是最重要的实用程序，深入了解和熟练掌握shell的特性极其使用方法，是用好Unix/Linux系统的关键。
可以说，shell使用的熟练程度反映了用户对Unix/Linux使用的熟练程度。
Shell脚本是解释型的，不需要编译。可通过交互式(Interactive)和批处理(Batch)两种方式执行。
<!-- more -->

### 初识
Linux的标准默认shell脚本解释器是bash。
1. 通过-#!/bin/bash-标记使用的是哪一种Shell解释器。 

```Shell
#!/bin/bash
echo "Hello World !"
```
2. 执行Shell

```Shell
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```
注意，一定要写成./test.sh，而不是test.sh。运行其它二进制的程序也一样，直接写test.sh，linux系统会去PATH里寻找有没有叫test.sh的，而只有/bin, /sbin, /usr/bin，/usr/sbin等在PATH里，你的当前目录通常不在PATH里，所以写成test.sh是会找不到命令的，要用./test.sh告诉系统说，就在当前目录找。
通过这种方式运行bash脚本，第一行一定要写对，好让系统查找到正确的解释器。
这里的"系统"，其实就是shell这个应用程序（想象一下Windows Explorer），但我故意写成系统，是方便理解，既然这个系统就是指shell，那么一个使用/bin/sh作为解释器的脚本是不是可以省去第一行呢？是的。

```Shell
#!/bin/bash
echo "Hello"
read PERSON
echo "Nice to meet you ,$PERSON"
```
> jacean@jacean-Ubuntu:~$ info chmod
jacean@jacean-Ubuntu:~$ chmod +x ~/workspace/test.sh 
jacean@jacean-Ubuntu:~$ ~/workspace/test.sh
Hello
wanja
Nice to meet you ,wanja

3. 解释器运行

```Shell
/bin/sh test.sh
/bin/php test.php
```
这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。
### 变量
1. 定义变量
定义变量时，变量名不加美元符号（$），如：

```Shell
variableName="value"

myUrl="http://see.xidian.edu.cn/cpp/linux/"
myNum=100
```
注意，变量名和等号之间不能有空格，这可能和你熟悉的所有编程语言都不一样。同时，变量名的命名须遵循如下规则：
首个字符必须为字母（a-z，A-Z）。
中间不能有空格，可以使用下划线（_）。
不能使用标点符号。
不能使用bash里的关键字（可用help命令查看保留关键字）。

2. 使用变量
使用一个定义过的变量，只要在变量名前面加美元符号（$）即可，如：

```Shell
your_name="mozhiyan"
echo $your_name
echo ${your_name}
```
变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，比如下面这种情况：

```Shell
for skill in Ada Coffe Action Java 
do
    echo "I am good at ${skill}Script"
done
```
如果不给skill变量加花括号，写成echo "I am good at $skillScript"，解释器就会把$skillScript当成一个变量（其值为空），代码执行结果就不是我们期望的样子了。
推荐给所有变量加上花括号，这是个好的编程习惯。
3. 重新定义变量
已定义的变量，可以被重新定义，如：

```Shell
myUrl="http://see.xidian.edu.cn/cpp/linux/"
echo ${myUrl}
myUrl="http://see.xidian.edu.cn/cpp/shell/"
echo ${myUrl}
```
这样写是合法的，但注意，第二次赋值的时候不能写* $myUrl="http://see.xidian.edu.cn/cpp/shell/"*，使用变量的时候才加美元符（$）。
4. 只读变量
使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。
下面的例子尝试更改只读变量，结果报错：

```Shell
#!/bin/bash
myUrl="http://see.xidian.edu.cn/cpp/shell/"
readonly myUrl
myUrl="http://see.xidian.edu.cn/cpp/danpianji/"
```
运行脚本，结果如下：
> /bin/sh: NAME: This variable is read only.

5. 删除变量
使用 unset 命令可以删除变量。语法：
> unset variable_name
变量被删除后不能再次使用；unset 命令不能删除只读变量。
举个例子：

```Shell
#!/bin/sh
myUrl="http://see.xidian.edu.cn/cpp/u/xitong/"
unset myUrl
echo $myUrl
```
上面的脚本没有任何输出。
6. 变量类型
运行shell时，会同时存在三种变量：
  - 局部变量
    局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
  - 环境变量
所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
  - shell变量
shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行
7. 特殊变量
> $0	当前脚本的文件名
$n	传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2。
$#	传递给脚本或函数的参数个数。
$*	传递给脚本或函数的所有参数。
$@	传递给脚本或函数的所有参数。被双引号(" ")包含时，与 $* 稍有不同，下面将会讲到。
$?	上个命令的退出状态，或函数的返回值。
$$	当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。

> $* 和 $@ 的区别
$* 和 $@ 都表示传递给函数或脚本的所有参数，不被双引号(" ")包含时，都以"$1" "$2" … "$n" 的形式输出所有参数。
但是当它们被双引号(" ")包含时，"$*" 会将所有的参数作为一个整体，以"$1 $2 … $n"的形式输出所有参数；"$@" 会将各个参数分开，以"$1" "$2" … "$n" 的形式输出所有参数。
> 
```Shell
#!/bin/bash
echo "\$*=" $*
echo "\"\$*\"=" "$*"
echo "\$@=" $@
echo "\"\$@\"=" "$@"
echo "print each param from \$*"
for var in $*
do
    echo "$var"
done
echo "print each param from \$@"
for var in $@
do
    echo "$var"
done
echo "print each param from \"\$*\""
for var in "$*"
do
    echo "$var"
done
echo "print each param from \"\$@\""
for var in "$@"
do
    echo "$var"
done
```
> $*=  a b c d
"$*"= a b c d
$@=  a b c d
"$@"= a b c d
print each param from $*
a
b
c
d
print each param from $@
a
b
c
d
print each param from "$*"
a b c d
print each param from "$@"
a
b
c
d

8. 命令替换
命令替换是指Shell可以先执行命令，将输出结果暂时保存，在适当的地方输出。
命令替换的语法：
> `command`
注意是反引号，不是单引号，这个键位于 Esc 键下方。

```Shell
DATE=`date`
echo "Date is $DATE"
USERS=`who | wc -l`
echo "Logged in user are $USERS"
UP=`date ; uptime`
echo "Uptime is $UP"
```
运行结果：
> Date is Thu Jul  2 03:59:57 MST 2009
Logged in user are 1
Uptime is Thu Jul  2 03:59:57 MST 2009
03:59:57 up 20 days, 14:03,  1 user,  load avg: 0.13, 0.07, 0.15

9. 变量替换
变量替换可以根据变量的状态（是否为空、是否定义等）来改变它的值
可以使用的变量替换形式：
> ${var}	变量本来的值
${var:-word}	如果变量 var 为空或已被删除(unset)，那么返回 word，但不改变 var 的值。
${var:=word}	如果变量 var 为空或已被删除(unset)，那么返回 word，并将 var 的值设置为 word。
${var:?message}	如果变量 var 为空或已被删除(unset)，那么将消息 message 送到标准错误输出，可以用来检测变量 var 是否可以被正常赋值。
若此替换出现在Shell脚本中，那么脚本将停止运行。
${var:+word}	如果变量 var 被定义，那么返回 word，但不改变 var 的值。

### 运算符
1. expr 是一款表达式计算工具，使用它能完成表达式的求值操作。
例如，两个数相加：
```Shell
#!/bin/bash
val=`expr 2 + 2`
echo "Total value : $val"
```
运行脚本输出：
> Total value : 4
两点注意：
-表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
-完整的表达式要被 ` ` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。
2. 算术运算符

- \+	加法	`expr $a + $b` 结果为 30。
- \-	减法	`expr $a - $b` 结果为 10。
- \*	乘法	`expr $a \* $b` 结果为  200。
- \/	除法	`expr $b / $a` 结果为 2。
- \%	取余	`expr $b % $a` 结果为 0。
- \=	赋值	a=$b 将把变量 b 的值赋给 a。
- \=\=	相等。用于比较两个数字，相同则返回 true。	[ $a == $b ] 返回 false。
- \!\=	不相等。用于比较两个数字，不相同则返回 true。	[ $a != $b ] 返回 true。

注意：条件表达式要放在方括号之间，并且要有空格，例如 [$a==$b] 是错误的，必须写成 [ $a == $b ]。
3. 关系运算符
关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

- -eq	检测两个数是否相等，相等返回 true。	[ $a -eq $b ] 返回 true。
- -ne	检测两个数是否相等，不相等返回 true。	[ $a -ne $b ] 返回 true。
- -gt	检测左边的数是否大于右边的，如果是，则返回 true。	[ $a -gt $b ] 返回 false。
- -lt	检测左边的数是否小于右边的，如果是，则返回 true。	[ $a -lt $b ] 返回 true。
- -ge	检测左边的数是否大等于右边的，如果是，则返回 true。	[ $a -ge $b ] 返回 false。
- -le	检测左边的数是否小于等于右边的，如果是，则返回 true。	[ $a -le $b ] 返回 true。

4. 布尔运算符
- !	非运算，表达式为 true 则返回 false，否则返回 true。	[ ! false ] 返回 true。
- -o	或运算，有一个表达式为 true 则返回 true。	[ $a -lt 20 -o $b -gt 100 ] 返回 true。
- -a	与运算，两个表达式都为 true 才返回 true。	[ $a -lt 20 -a $b -gt 100 ] 返回 false。
5. 字符串运算符
- =	检测两个字符串是否相等，相等返回 true。	[ $a = $b ] 返回 false。
- !=	检测两个字符串是否相等，不相等返回 true。	[ $a != $b ] 返回 true。
- -z	检测字符串长度是否为0，为0返回 true。	[ -z $a ] 返回 false。
- -n	检测字符串长度是否为0，不为0返回 true。	[ -z $a ] 返回 true。
- str	检测字符串是否为空，不为空返回 true。	[ $a ] 返回 true。
6. 文件测试运算符
- -b file	检测文件是否是块设备文件，如果是，则返回 true。	[ -b $file ] 返回 false。
- -c file	检测文件是否是字符设备文件，如果是，则返回 true。	[ -b $file ] 返回 false。
- -d file	检测文件是否是目录，如果是，则返回 true。	[ -d $file ] 返回 false。
- -f file	检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。	[ -f $file ] 返回 true。
- -g file	检测文件是否设置了 SGID 位，如果是，则返回 true。	[ -g $file ] 返回 false。
- -k file	检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。	[ -k $file ] 返回 false。
- -p file	检测文件是否是具名管道，如果是，则返回 true。	[ -p $file ] 返回 false。
- -u file	检测文件是否设置了 SUID 位，如果是，则返回 true。	[ -u $file ] 返回 false。
- -r file	检测文件是否可读，如果是，则返回 true。	[ -r $file ] 返回 true。
- -w file	检测文件是否可写，如果是，则返回 true。	[ -w $file ] 返回 true。
- -x file	检测文件是否可执行，如果是，则返回 true。	[ -x $file ] 返回 true。
- -s file	检测文件是否为空（文件大小是否大于0），不为空返回 true。	[ -s $file ] 返回 true。
- -e file	检测文件（包括目录）是否存在，如果是，则返回 true。	[ -e $file ] 返回 true。

### 注释
\#开头的就是注释
不过，如果在开发过程中，遇到大段的代码需要临时注释起来，过一会儿又取消注释，怎么办呢？每一行加个#符号太费力了，可以把这一段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。

### 字符串
字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。单双引号的区别跟PHP类似。
单引号

```Shell
str='this is a string'
```
单引号字符串的限制：
- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单引号（对单引号使用转义符后也不行）。
双引号

```Shell
your_name='qinjx'
str="Hello, I know your are \"$your_name\"! \n"
```
双引号的优点：
- 双引号里可以有变量
- 双引号里可以出现转义字符

拼接字符串

```Shell
your_name="qinjx"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1
```
获取字符串长度

```Shell
string="abcd"
echo ${#string} #输出 4
```
提取子字符串

```Shell
string="alibaba is a great company"
echo ${string:1:4} #输出liba
```
查找子字符串

```Shell
string="alibaba is a great company"
echo `expr index "$string" is`
```
### 数组
1. 定义数组
在Shell中，用括号来表示数组，数组元素用“空格”符号分割开。定义数组的一般形式为：
> array_name=(value1 ... valuen)
例如：
> array_name=(value0 value1 value2 value3)

或者
> array_name=(
value0
value1
value2
value3
)

还可以单独定义数组的各个分量：
> array_name[0]=value0
array_name[1]=value1
array_name[2]=value2

可以不使用连续的下标，而且下标的范围没有限制。

2. 读取数组
读取数组元素值的一般格式是：
> ${array_name[index]}

例如：
> valuen=${array_name[2]}

使用@ 或 * 可以获取数组中的所有元素，例如：

> ${array_name[*]}
${array_name[@]}

3. 获取数组长度
获取数组长度的方法与获取字符串长度的方法相同，例如：

```Shell
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

### IF语句

```Shell
#!/bin/sh
a=10
b=20
if [ $a == $b ]
then
   echo "a is equal to b"
elif [ $a -gt $b ]
then
   echo "a is greater than b"
elif [ $a -lt $b ]
then
   echo "a is less than b"
else
   echo "None of the condition met"
fi
```

### CASE语句

```Shell
echo 'Input a number between 1 to 4'
echo 'Your number is:\c'
read aNum
case $aNum in
    1)  echo 'You select 1'
    ;;
    2)  echo 'You select 2'
    ;;
    3)  echo 'You select 3'
    ;;
    4)  echo 'You select 4'
    ;;
    *)  echo 'You do not select a number between 1 to 4'
    ;;
esac


#!/bin/bash
option="${1}"
case ${option} in
   -f) FILE="${2}"
      echo "File name is $FILE"
      ;;
   -d) DIR="${2}"
      echo "Dir name is $DIR"
      ;;
   *) 
      echo "`basename ${0}`:usage: [-f file] | [-d directory]"
      exit 1 # Command to come out of the program with status 1
      ;;
esac
```
### FOR语句

```Shell
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```
### While语句

```Shell
COUNTER=0
while [ $COUNTER -lt 5 ]
do
    COUNTER='expr $COUNTER+1'
    echo $COUNTER
done

echo 'type <CTRL-D> to terminate'
echo -n 'enter your most liked film: '
while read FILM
do
    echo "Yeah! great film the $FILM"
done
```
### 函数
函数可以让我们将一个复杂功能划分成若干模块，让程序结构更加清晰，代码重复利用率更高。像其他编程语言一样，Shell 也支持函数。Shell 函数必须先定义后使用。

Shell 函数的定义格式如下：
> function_name () {
    list of commands
    [ return value ]
}

如果你愿意，也可以在函数名前加上关键字 function：
> function function_name () {
    list of commands
    [ return value ]
}

函数返回值，可以显式增加return语句；如果不加，会将最后一条命令运行结果作为返回值。
Shell 函数返回值只能是整数，一般用来表示函数执行成功与否，0表示成功，其他值表示失败。如果 return 其他数据，比如一个字符串，往往会得到错误提示：“numeric argument required”。
如果一定要让函数返回字符串，那么可以先定义一个变量，用来接收函数的计算结果，脚本在需要的时候访问这个变量来获得函数返回值。 
*调用函数只需要给出函数名，不需要加括号。*

像删除变量一样，删除函数也可以使用 unset 命令，不过要加上 .f 选项，如下所示：
> $unset .f function_name

如果你希望直接从终端调用函数，可以将函数定义在主目录下的 .profile 文件，这样每次登录后，在命令提示符后面输入函数名字就可以立即调用。

在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个参数...
注意，$10 不能获取第十个参数，获取第十个参数需要${10}。当n>=10时，需要使用${n}来获取参数。

$#	传递给函数的参数个数。
$*	显示所有传递给函数的参数。
$@	与$*相同，但是略有区别，请查看Shell特殊变量。
$?	函数的返回值。

### 重定向
- command > file	将输出重定向到 file。
- command < file	将输入重定向到 file。
- command >> file	将输出以追加的方式重定向到 file。
- n > file	将文件描述符为 n 的文件重定向到 file。
- n >> file	将文件描述符为 n 的文件以追加的方式重定向到 file。
- n >& m	将输出文件 m 和 n 合并。
- n <& m	将输入文件 m 和 n 合并。
- << tag	将开始标记 tag 和结束标记 tag 之间的内容作为输入。

/dev/null 文件

如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null：
$ command > /dev/null
/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到”禁止输出“的效果。
如果希望屏蔽 stdout 和 stderr，可以这样写：
$ command > /dev/null 2>&1

### 文件包含
像其他语言一样，Shell 也可以包含外部脚本，将外部脚本的内容合并到当前脚本。

Shell 中包含脚本可以使用：
. filename
或
source filename
两种方式的效果相同，简单起见，一般使用点号(.)，但是注意点号(.)和文件名中间有一空格。

